// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {EquitoMessage} from "../libraries/EquitoMessageLibrary.sol";

/// @title IEquitoVerifier
/// @notice Interface for the verifier contract used in the Equito protocol to verify cross-chain messages.
interface IEquitoVerifier {
    /// @notice Verifies an `EquitoMessage` using the provided proof.
    /// @param message The `EquitoMessage` to verify.
    /// @param proof The proof provided to verify the message.
    /// @return True if the message is verified successfully, otherwise false.
    function verifyMessage(EquitoMessage calldata message, bytes calldata proof) external returns (bool);

    /// @notice Verifies a set of Equito messages using the provided proof.
    /// @param messages The array of Equito messages to verify.
    /// @param proof The proof provided to verify the messages.
    /// @return True if the messages are verified successfully, otherwise false.
    function verifyMessages(EquitoMessage[] calldata messages, bytes calldata proof) external returns (bool);

    /// @notice Sets the address of the router contract.
    /// @dev This function is called by the Router when a new Verifier is added.
    ///      It should revert if the Router address is already set.
    /// @param router The address of the router contract.
    function setRouter(address router) external;
}
