// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import {EquitoMessage} from "../libraries/EquitoMessageLibrary.sol";

/// @title IEquitoReceiver
/// @notice Interface for contracts that can receive cross-chain messages via the Router contract.
interface IEquitoReceiver {
    /// @notice Receives a cross-chain message from the Router contract.
    /// @param message The Equito message received.
    /// @param messageData The data of the message.
    function receiveMessage(EquitoMessage calldata message, bytes calldata messageData) external payable;
}
