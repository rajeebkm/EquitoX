// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/// @title IEquitoFees
/// @notice Interface for the IEquitoFees contract, used to collect fees for Message Send transactions.
interface IEquitoFees {
    /// @notice Emitted when a fee is paid.
    /// @param sender The address of the Message Sender, usually an Equito App.
    /// @param amount The amount of the fee paid.
    event FeePaid(address indexed sender, uint256 amount);

    /// @notice Gets the current fee amount required to send a Message.
    /// @param sender The address of the Message Sender, usually an Equito App.
    /// @return The current fee amount in wei.
    function getFee(address sender) external view returns (uint256);

    /// @notice Pays the fee. This function should be called with the fee amount sent as msg.value.
    /// @param sender The address of the Message Sender, usually an Equito App.
    function payFee(address sender) external payable;
}
