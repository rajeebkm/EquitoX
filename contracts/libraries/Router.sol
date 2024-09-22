// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {IRouter} from "../interfaces/IRouter.sol";
import {IEquitoReceiver} from "../interfaces/IEquitoReceiver.sol";
import {IEquitoVerifier} from "../interfaces/IEquitoVerifier.sol";
import {IEquitoFees} from "../interfaces/IEquitoFees.sol";
import {bytes64, EquitoMessage, EquitoMessageLibrary} from "./EquitoMessageLibrary.sol";
import {Errors} from "./Errors.sol";

/// @title Router
/// @notice The Router contract is used in the Equito Protocol to exchange messages with different blockchains.
///         Equito Validators will listen to the events emitted by this contract's `sendMessage` function,
///         to collect and relay messages to the appropriate destination chains.
///         Equito Validators will also deliver messages to this contract, to be routed to the appropriate receivers.
contract Router is IRouter, IEquitoReceiver {
    /// @notice The chain selector for the chain where the Router contract is deployed.
    uint256 public immutable chainSelector;

    /// @notice The Equito Protocol address.
    bytes64 public equitoAddress;

    /// @notice The list of verifiers used to verify the messages.
    IEquitoVerifier[] public verifiers;

    /// @notice Stores the messages that have already been processed to prevent replay attacks,
    ///         avoiding duplicate messages to be processed twice, hence the name.
    mapping(bytes32 => bool) public isDuplicateMessage;

    /// @notice Stores the message hashes that have been delivered and are awaiting execution.
    mapping(bytes32 => bool) public storedMessages;

    /// @notice The EquitoFees contract used to handle fee-related operations.
    /// @dev This contract reference is used to interact with the fee management system.
    IEquitoFees public equitoFees;

    /// @notice Initializes the Router contract with a chain selector, an initial verifier and the address of the EquitoFees contract..
    /// @param _chainSelector The chain selector of the chain where the Router contract is deployed.
    /// @param _initialVerifier The address of the initial verifier contract.
    /// @param _equitoFees The address of the EquitoFees contract.
    /// @param _equitoAddress The address of the Equito Protocol.
    constructor(uint256 _chainSelector, address _initialVerifier, address _equitoFees, bytes64 memory _equitoAddress) {
        if (_initialVerifier == address(0)) {
            revert Errors.InitialVerifierZeroAddress();
        }

        chainSelector = _chainSelector;

        IEquitoVerifier(_initialVerifier).setRouter(address(this));
        verifiers.push(IEquitoVerifier(_initialVerifier));

        equitoFees = IEquitoFees(_equitoFees);

        equitoAddress = _equitoAddress;
    }

    modifier onlySovereign(EquitoMessage calldata message) {
        if (
            message.sourceChainSelector != 0 || message.sender.lower != equitoAddress.lower
                || message.sender.upper != equitoAddress.upper
        ) revert Errors.InvalidSovereign();
        _;
    }

    /// @notice Sends a cross-chain message using Equito.
    /// @param receiver The address of the receiver.
    /// @param destinationChainSelector The chain selector of the destination chain.
    /// @param data The message data.
    /// @return The hash of the message.
    function sendMessage(bytes64 calldata receiver, uint256 destinationChainSelector, bytes calldata data)
        external
        payable
        returns (bytes32)
    {
        equitoFees.payFee{value: msg.value}(msg.sender);

        EquitoMessage memory newMessage = EquitoMessage({
            blockNumber: block.number,
            sourceChainSelector: chainSelector,
            sender: EquitoMessageLibrary.addressToBytes64(msg.sender),
            destinationChainSelector: destinationChainSelector,
            receiver: receiver,
            hashedData: keccak256(data)
        });

        emit MessageSendRequested(newMessage, data);

        return keccak256(abi.encode(newMessage));
    }

    /// @notice Verify and execute a message with the appropriate receiver contract.
    /// @param message The message to be executed.
    /// @param messageData The data of the message to be executed.
    /// @param verifierIndex The index of the verifier used to verify the message.
    /// @param proof The proof to provide to the verifier.
    function deliverAndExecuteMessage(
        EquitoMessage calldata message,
        bytes calldata messageData,
        uint256 verifierIndex,
        bytes calldata proof
    ) external payable {
        if (verifierIndex >= verifiers.length) {
            revert Errors.InvalidVerifierIndex();
        }

        if (!verifiers[verifierIndex].verifyMessage(message, proof)) {
            revert Errors.InvalidMessagesProof();
        }

        bytes32 messageHash = keccak256(abi.encode(message));

        if (
            message.destinationChainSelector == chainSelector && !isDuplicateMessage[messageHash]
                && message.hashedData == keccak256(messageData)
        ) {
            address receiver = EquitoMessageLibrary.bytes64ToAddress(message.receiver);
            IEquitoReceiver(receiver).receiveMessage{value: msg.value}(message, messageData);
            isDuplicateMessage[messageHash] = true;
            emit MessageExecuted(messageHash);
        }
    }

    /// @notice Delivers messages to be stored for later execution.
    /// @param messages The list of messages to be delivered.
    /// @param verifierIndex The index of the verifier used to verify the messages.
    /// @param proof The proof provided by the verifier.
    function deliverMessages(EquitoMessage[] calldata messages, uint256 verifierIndex, bytes calldata proof) external {
        if (verifierIndex >= verifiers.length) {
            revert Errors.InvalidVerifierIndex();
        }

        if (!verifiers[verifierIndex].verifyMessages(messages, proof)) {
            revert Errors.InvalidMessagesProof();
        }

        uint256 _chainSelector = chainSelector;

        for (uint256 i = 0; i < messages.length;) {
            bytes32 messageHash = keccak256(abi.encode(messages[i]));

            if (
                messages[i].destinationChainSelector == _chainSelector && !isDuplicateMessage[messageHash]
                    && !storedMessages[messageHash]
            ) {
                storedMessages[messageHash] = true;
                emit MessageDelivered(messageHash);
            }

            unchecked {
                ++i;
            }
        }
    }

    /// @notice Executes a stored message.
    /// @param message The message to be executed.
    /// @param messageData The data of the message to be executed.
    function executeMessage(EquitoMessage calldata message, bytes calldata messageData) external payable {
        bytes32 messageHash = keccak256(abi.encode(message));

        if (
            message.destinationChainSelector == chainSelector && storedMessages[messageHash]
                && !isDuplicateMessage[messageHash] && message.hashedData == keccak256(messageData)
        ) {
            address receiver = EquitoMessageLibrary.bytes64ToAddress(message.receiver);
            IEquitoReceiver(receiver).receiveMessage{value: msg.value}(message, messageData);
            isDuplicateMessage[messageHash] = true;
            delete storedMessages[messageHash];
            emit MessageExecuted(messageHash);
        }
    }

    /// @notice Gets the current fee amount required to send a message.
    /// @param sender The address of the Message Sender, usually an Equito App.
    /// @return The current fee amount in wei.
    function getFee(address sender) public view returns (uint256) {
        return equitoFees.getFee(sender);
    }

    /// @notice Receives a cross-chain message from the Router contract.
    /// @param message The Equito message received.
    /// @param messageData The data of the message received.
    function receiveMessage(EquitoMessage calldata message, bytes calldata messageData)
        external
        payable
        override
        onlySovereign(message)
    {
        if (msg.sender != address(this)) {
            revert Errors.InvalidRouter(msg.sender);
        }

        bytes1 operation = messageData[0];

        if (operation == 0x01) {
            // Add verifier
            address newVerifier;
            (, newVerifier) = abi.decode(messageData, (bytes32, address));

            _addVerifier(newVerifier);
        } else if (operation == 0x02) {
            // Update the equito fees
            address newEquitoFees;
            (, newEquitoFees) = abi.decode(messageData, (bytes32, address));

            _setEquitoFees(newEquitoFees);
        } else if (operation == 0x03) {
            // Update the equito address
            bytes64 memory newEquitoAddress;
            (, newEquitoAddress) = abi.decode(messageData, (bytes32, bytes64));

            _setEquitoAddress(newEquitoAddress);
        } else {
            revert Errors.InvalidOperation();
        }
    }

    /// @notice Adds a new verifier to the Router contract.
    /// @param _newVerifier The address of the new verifier.
    function _addVerifier(address _newVerifier) internal {
        IEquitoVerifier verifier = IEquitoVerifier(_newVerifier);
        verifier.setRouter(address(this));
        verifiers.push(verifier);
        emit VerifierAdded(_newVerifier);
    }

    /// @notice Sets the equitoFees.
    /// @param _equitoFees The new equito fees address to set.
    function _setEquitoFees(address _equitoFees) internal {
        equitoFees = IEquitoFees(_equitoFees);
        emit EquitoFeesSet();
    }

    /// @notice Sets the equitoAddress.
    /// @param _equitoAddress The new equito address to set.
    function _setEquitoAddress(bytes64 memory _equitoAddress) internal {
        equitoAddress.lower = _equitoAddress.lower;
        equitoAddress.upper = _equitoAddress.upper;
        emit EquitoAddressSet();
    }
}
