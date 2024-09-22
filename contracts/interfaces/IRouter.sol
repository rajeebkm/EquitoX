// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {bytes64, EquitoMessage} from "../libraries/EquitoMessageLibrary.sol";

/// @title IRouter
/// @notice Interface for the Router contract, used to interact with the cross-chain messaging protocol.
interface IRouter {
    /// @notice Emitted when a message send request is created.
    /// @param message The message being sent.
    /// @param messageData The data of the message being sent.
    event MessageSendRequested(EquitoMessage message, bytes messageData);

    /// @notice Emitted when a new verifier is added.
    /// @param verifier The address of the new verifier.
    event VerifierAdded(address indexed verifier);

    /// @notice Emitted when a messages has successfully been delivered, ready to be executed.
    /// @param messageHash The hash of the message that has been delivered.
    event MessageDelivered(bytes32 messageHash);

    /// @notice Emitted when a message has successfully been executed.
    /// @param messageHash The hash of the message that has been executed.
    event MessageExecuted(bytes32 messageHash);

    /// @notice Emitted when the Equito fees are set.
    event EquitoFeesSet();

    /// @notice Event emitted when the equito address is set.
    event EquitoAddressSet();

    /// @notice Sends a cross-chain message using Equito.
    /// @param receiver The address of the receiver.
    /// @param destinationChainSelector The chain selector of the destination chain.
    /// @param data The message data.
    /// @return The hash of the message.
    function sendMessage(bytes64 calldata receiver, uint256 destinationChainSelector, bytes calldata data)
        external
        payable
        returns (bytes32);

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
    ) external payable;

    /// @notice Delivers messages to be stored for later execution.
    /// @param messages The list of messages to be delivered.
    /// @param verifierIndex The index of the verifier used to verify the messages.
    /// @param proof The proof provided by the verifier.
    function deliverMessages(EquitoMessage[] calldata messages, uint256 verifierIndex, bytes calldata proof) external;

    /// @notice Executes a stored message.
    /// @param message The message to be executed.
    /// @param messageData The data of the message to be executed.
    function executeMessage(EquitoMessage calldata message, bytes calldata messageData) external payable;

    /// @notice Returns the chain selector of the current chain.
    function chainSelector() external view returns (uint256);

    /// @notice Returns the equito address.
    function equitoAddress() external view returns (bytes32, bytes32);

    function getFee(address sender) external view returns (uint256);
}
