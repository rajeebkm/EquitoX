// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/// @title TransferHelper
/// @notice Library with helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false.
library TransferHelper {
    /// @notice Approves a specified amount of tokens to be spent by a spender.
    /// @param token The address of the ERC20 token contract.
    /// @param to The address of the spender.
    /// @param value The amount of tokens to approve.
    /// @dev Calls the `approve` function on the token contract.
    function safeApprove(address token, address to, uint256 value) internal {
        // The signature function is bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));
        // Check if the call was successful and the data is empty or the data is a boolean value
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: APPROVE_FAILED");
    }

    /// @notice Transfers a specified amount of tokens to a recipient.
    /// @param token The address of the ERC20 token contract.
    /// @param to The address of the recipient.
    /// @param value The amount of tokens to transfer.
    /// @dev Calls the `transfer` function on the token contract.
    function safeTransfer(address token, address to, uint256 value) internal {
        // The signature function is bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        // Check if the call was successful and the data is empty or the data is a boolean value
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: TRANSFER_FAILED");
    }

    /// @notice Transfers a specified amount of tokens from a sender to a recipient.
    /// @param token The address of the ERC20 token contract.
    /// @param from The address of the sender.
    /// @param to The address of the recipient.
    /// @param value The amount of tokens to transfer.
    /// @dev Calls the `transferFrom` function on the token contract.
    function safeTransferFrom(address token, address from, address to, uint256 value) internal {
        // The signature function is bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        // Check if the call was successful and the data is empty or the data is a boolean value
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: TRANSFER_FROM_FAILED");
    }

    /// @notice Transfers a specified amount of ETH to a recipient.
    /// @param to The address of the recipient.
    /// @param value The amount of ETH to transfer.
    /// @dev Calls the recipient with the specified amount of ETH.
    function safeTransferETH(address to, uint256 value) internal {
        (bool success,) = to.call{value: value}(new bytes(0));
        // Check if the call was successful
        require(success, "TransferHelper: ETH_TRANSFER_FAILED");
    }
}
