// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {IEquitoVerifier} from "../interfaces/IEquitoVerifier.sol";
import {IEquitoReceiver} from "../interfaces/IEquitoReceiver.sol";
import {IRouter} from "../interfaces/IRouter.sol";
import {IEquitoFees} from "../interfaces/IEquitoFees.sol";
import {IOracle} from "../interfaces/IOracle.sol";
import {bytes64, EquitoMessage, EquitoMessageLibrary} from "./EquitoMessageLibrary.sol";
import {Errors} from "./Errors.sol";

/// @title ECDSAVerifier
/// @notice This contract is part of the Equito Protocol and verifies that a set of `EquitoMessage` instances
///         have been signed by a sufficient number of Validators, as determined by the threshold.
/// @dev Uses ECDSA for signature verification, adhering to the Ethereum standard.
contract ECDSAVerifier is IEquitoVerifier, IEquitoReceiver, IEquitoFees {
    /// @notice The list of validator addresses.
    address[] public validators;
    /// @notice The threshold percentage of validator signatures required for verification.
    uint256 public immutable threshold = 70;
    /// @notice The current session identifier for the validator set.
    uint256 public session;
    /// @notice The cost of sending a message in USD, defaults to 1 USD.
    /// @dev The cost required to send a message, denominated in USD, with 3 decimals.
    ///      This value is used to calculate fees for message.
    uint256 public messageCostUsd = 1_000;
    /// @notice Stores the session ID and accumulated fees amount.
    mapping(uint256 => uint256) public fees;
    /// @notice Stores addresses exempt from paying fees.
    mapping(address => bool) public noFee;

    /// @notice The Oracle contract used to retrieve token prices.
    /// @dev This contract provides token price information required for fee calculation.
    IOracle public oracle;

    /// @notice The Router contract used to send cross-chain messages.
    /// @dev This contract is responsible for routing messages across different chains in the protocol.
    IRouter public router;

    /// @notice Emitted when the validator set is updated.
    event ValidatorSetUpdated();
    /// @notice Event emitted when the cost of sending a message in USD is set.
    event MessageCostUsdSet(uint256 newMessageCostUsd);
    /// @notice Event emitted when fees are transferred to the liquidity provider.
    event FeesTransferred(address indexed liquidityProvider, uint256 session, uint256 amount);
    /// @notice Event emitted when an address is added to the noFee list.
    event NoFeeAddressAdded(address indexed noFeeAddress);
    /// @notice Event emitted when an address is removed from the noFee list.
    event NoFeeAddressRemoved(address indexed noFeeAddress);

    /// @notice Initializes the contract with the initial validator set and session identifier.
    /// @param _validators The initial list of validator addresses.
    /// @param _session The initial session identifier.
    /// @param _oracle The address of the Oracle contract used to retrieve token prices.
    constructor(address[] memory _validators, uint256 _session, address _oracle) {
        validators = _validators;
        session = _session;
        oracle = IOracle(_oracle);
        noFee[address(this)] = true;
    }

    modifier onlySovereign(EquitoMessage calldata message) {
        (bytes32 lower, bytes32 upper) = router.equitoAddress();

        if (message.sourceChainSelector != 0 || message.sender.lower != lower || message.sender.upper != upper) {
            revert Errors.InvalidSovereign();
        }
        _;
    }

    /// @notice Sets the Router contract used to send cross-chain messages.
    /// @dev This function can only be called once to set the Router contract.
    ///      It's needed to avoid cyclical dependencies between the Router and Verifier contracts at deploy.
    /// @param _router The address of the Router contract.
    function setRouter(address _router) external override {
        if (address(router) != address(0)) {
            revert Errors.RouterAlreadySet();
        }
        router = IRouter(_router);
    }

    /// @notice Verifies an `EquitoMessage` has been signed by a sufficient number of Validators.
    /// @param message The `EquitoMessage` to verify.
    /// @param proof The concatenated ECDSA signatures from the validators.
    /// @return True if the message is verified successfully, otherwise false.
    function verifyMessage(EquitoMessage calldata message, bytes calldata proof)
        external
        view
        override
        returns (bool)
    {
        return _verifySignatures(keccak256(abi.encode(message)), proof);
    }

    /// @notice Verifies that a set of `EquitoMessage` instances have been signed by a sufficient number of Validators.
    /// @param messages The array of `EquitoMessage` instances to verify.
    /// @param proof The concatenated ECDSA signatures from the validators.
    /// @return True if the messages are verified successfully, otherwise false.
    function verifyMessages(EquitoMessage[] calldata messages, bytes calldata proof)
        external
        view
        override
        returns (bool)
    {
        if (messages.length == 0) return false;

        if (messages.length == 1) {
            return _verifySignatures(keccak256(abi.encode(messages[0])), proof);
        } else {
            return _verifySignatures(keccak256(abi.encode(messages)), proof);
        }
    }

    /// @notice Verifies that a hashed message has been signed by a sufficient number of Validators.
    /// @param hash The hash of the message to verify.
    /// @param proof The concatenated ECDSA signatures from the validators.
    /// @return True if the signatures are verified successfully, otherwise false.
    function _verifySignatures(bytes32 hash, bytes memory proof) internal view returns (bool) {
        if (proof.length % 65 != 0) return false;

        uint256 validatorsLength = validators.length;
        address[] memory signatories = new address[](validatorsLength);

        uint256 c = 0;
        uint256 i = 0;

        bytes32 r;
        bytes32 s;
        uint8 v;
        address signer;

        while (i < proof.length) {
            // The Signature Verification is inspired by OpenZeppelin's ECDSA Verification:
            // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4032b42694ff6599b17ffde65b2b64d7fc8a38f8/contracts/utils/cryptography/ECDSA.sol#L128-L142

            assembly {
                r := mload(add(proof, add(i, 32)))
                s := mload(add(proof, add(i, 64)))
                v := byte(0, mload(add(proof, add(i, 96))))
            }

            if (uint256(s) <= 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
                signer = ecrecover(hash, v, r, s);
                if (contains(validators, signer)) {
                    if (!contains(signatories, signer)) {
                        signatories[c] = signer;
                        c += 1;
                    }
                }
            }

            i += 65;
        }

        return c >= (validatorsLength * threshold) / 100;
    }

    /// @notice Helper function to check if an address is present in an array.
    /// @param array The array of addresses to search.
    /// @param value The address to search for.
    /// @return True if the address is found, otherwise false.
    function contains(address[] memory array, address value) internal pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }

    /// @notice Retrieves the fee amount required to send a message.
    /// @param sender The address of the Message Sender, usually an Equito App.
    /// @return The fee amount in wei.
    function getFee(address sender) external view returns (uint256) {
        return _getFee(sender);
    }

    /// @notice Allows a payer to pay the fee for sending a message.
    /// @param sender The address of the Message Sender, usually an Equito App.
    function payFee(address sender) external payable {
        uint256 fee = _getFee(sender);

        if (fee > msg.value) {
            revert Errors.InsufficientFee();
        }

        fees[session] += msg.value;

        emit FeePaid(sender, msg.value);
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
        if (msg.sender != address(router)) {
            revert Errors.InvalidRouter(msg.sender);
        }

        bytes1 operation = messageData[0];

        if (operation == 0x01) {
            // Update the validator set
            uint256 currentSession;
            address[] memory newValidators;
            (, currentSession, newValidators) = abi.decode(messageData, (bytes32, uint256, address[]));

            if (currentSession != session) revert Errors.SessionIdMismatch();

            _updateValidators(newValidators);

            (bytes32 lower, bytes32 upper) = router.equitoAddress();

            router.sendMessage(bytes64(lower, upper), 0, abi.encode(currentSession, fees[currentSession]));
        } else if (operation == 0x02) {
            // Update the message cost
            uint256 newMessageCostUsd;
            (, newMessageCostUsd) = abi.decode(messageData, (bytes32, uint256));

            _setMessageCostUsd(newMessageCostUsd);
        } else if (operation == 0x03) {
            // Transfer fees to the liquidity provider
            address liquidityProvider;
            uint256 sessionId;
            uint256 amount;
            (, liquidityProvider, sessionId, amount) = abi.decode(messageData, (bytes32, address, uint256, uint256));

            _transferFees(liquidityProvider, sessionId, amount);
        } else if (operation == 0x04) {
            // Add address to the noFee list
            address noFeeAddress;
            (, noFeeAddress) = abi.decode(messageData, (bytes32, address));

            _addNoFeeAddress(noFeeAddress);
        } else if (operation == 0x05) {
            // Remove address from the noFee list
            address noFeeAddress;
            (, noFeeAddress) = abi.decode(messageData, (bytes32, address));

            _removeNoFeeAddress(noFeeAddress);
        } else {
            revert Errors.InvalidOperation();
        }
    }

    /// @notice Transfers fees to the liquidity provider.
    /// @param liquidityProvider The address of the liquidity provider.
    /// @param amount The amount of fees to transfer.
    function _transferFees(address liquidityProvider, uint256 sessionId, uint256 amount) internal {
        if (liquidityProvider == address(0)) {
            revert Errors.InvalidLiquidityProvider();
        }

        if (sessionId > session) {
            revert Errors.InvalidSessionId();
        }

        uint256 sessionFees = fees[sessionId];
        uint256 transferAmount = (amount > sessionFees) ? sessionFees : amount;

        fees[sessionId] -= transferAmount;

        (bool success,) = payable(liquidityProvider).call{value: transferAmount}("");
        if (!success) revert Errors.TransferFailed();

        emit FeesTransferred(liquidityProvider, sessionId, transferAmount);
    }

    /// @notice Updates the list of Validators.
    /// @param _validators The new list of validator addresses.
    function _updateValidators(address[] memory _validators) internal {
        validators = _validators;
        session += 1;

        emit ValidatorSetUpdated();
    }

    /// @notice Adds an address to the noFee list.
    /// @param noFeeAddress The address to be added to the noFee list.
    function _addNoFeeAddress(address noFeeAddress) internal {
        noFee[noFeeAddress] = true;
        emit NoFeeAddressAdded(noFeeAddress);
    }

    /// @notice Removes an address from the noFee list.
    /// @param noFeeAddress The address to be removed from the noFee list.
    function _removeNoFeeAddress(address noFeeAddress) internal {
        noFee[noFeeAddress] = false;
        emit NoFeeAddressRemoved(noFeeAddress);
    }

    /// @notice Calculates the fee amount required to send a message based on the current messageCostUsd and tokenPriceUsd from the Oracle.
    /// @param sender The address of the Message Sender, usually an Equito App.
    /// @return The fee amount in wei.
    function _getFee(address sender) internal view returns (uint256) {
        if (noFee[sender]) {
            return 0;
        }

        uint256 tokenPriceUsd = oracle.getTokenPriceUsd();
        if (tokenPriceUsd == 0) {
            revert Errors.InvalidTokenPriceFromOracle();
        }

        return (messageCostUsd * 1e18) / tokenPriceUsd;
    }

    /// @notice Sets the cost of sending a message in USD.
    /// @param _messageCostUsd The new cost of sending a message in USD.
    function _setMessageCostUsd(uint256 _messageCostUsd) internal {
        if (_messageCostUsd == 0) {
            revert Errors.CostMustBeGreaterThanZero();
        }

        messageCostUsd = _messageCostUsd;
        emit MessageCostUsdSet(_messageCostUsd);
    }
}
