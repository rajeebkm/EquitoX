// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/// @title Errors
/// @notice Defines all error messages used in the EquitoApp contracts.
library Errors {
    /// @notice Thrown when the router address is invalid.
    /// @param router The address of the router that caused the error.
    error InvalidRouter(address router);

    /// @notice Thrown when the router address is zero.
    error RouterAddressCannotBeZero();

    /// @notice Thrown when the proof for verifying messages is invalid.
    error InvalidMessagesProof();

    /// @notice Thrown when the verifier index provided is out of bounds.
    error InvalidVerifierIndex();

    /// @notice Thrown when the initial verifier address provided in the constructor is zero.
    error InitialVerifierZeroAddress();

    /// @notice Thrown when the lengths of arrays are invalid.
    error InvalidLength();

    /// @notice Thrown when the sender of a message is invalid.
    error InvalidMessageSender();

    /// @notice Thrown when the provided fee is insufficient to cover the required cost.
    error InsufficientFee();

    /// @notice Thrown when the amount of ether sent with the transaction is insufficient.
    error InsufficientValueSent();

    /// @notice Thrown when the provided cost is not greater than zero.
    error CostMustBeGreaterThanZero();

    /// @notice Thrown when the token price retrieved from the oracle is invalid or zero.
    error InvalidTokenPriceFromOracle();

    /// @notice Thrown when a message is received from an invalid sovereign account.
    error InvalidSovereign();

    /// @notice Thrown when an invalid operation code is encountered in the received message.
    error InvalidOperation();

    /// @notice Thrown when an invalid liquidity provider address is provided.
    error InvalidLiquidityProvider();

    /// @notice Thrown when a transfer of fees to the liquidity provider fails.
    error TransferFailed();

    /// @notice Thrown when there is a mismatch in session IDs during validation.
    error SessionIdMismatch();

    /// @notice Thrown when attempting to set the router, but the router is already set.
    error RouterAlreadySet();

    /// @notice Thrown when an invalid sender is calling a function.
    error InvalidSender(address sender);

    /// @notice Thrown when the provided session ID does not match the current session.
    error InvalidSessionId();

    /// @notice Thrown when a Peer address is not found in the mapping, given a chain selector.
    /// @param chainSelector The chain selector for which the peer address is requested.
    error InvalidPeer(uint256 chainSelector);
}
