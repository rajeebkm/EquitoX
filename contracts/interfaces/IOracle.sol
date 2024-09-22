// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/// @title IOracle
/// @notice Interface for an Oracle contract, used to retrieve token prices.
interface IOracle {
    /// @notice Retrieves the price of a token in USD.
    /// @return The price of the token in USD, with 3 decimals.
    function getTokenPriceUsd() external view returns (uint256);
}
