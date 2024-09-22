// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

/// @title bytes64
/// @notice A struct that holds two bytes32 values, used to store a 64-byte value.
/// @dev Used to store 64-byte long values for the sender and receiver addresses in the EquitoMessage struct.
struct bytes64 {
    bytes32 lower;
    bytes32 upper;
}

/// @title EquitoMessage
/// @notice The ubiquitous message structure for cross-chain communication, used by the Router contract to deliver and receive messages.
/// @dev Designed to be used by any chain supported by the Equito protocol.
struct EquitoMessage {
    /// @notice Block number at which the message is emitted.
    uint256 blockNumber;
    /// @notice Selector for the source chain, acting as an id.
    uint256 sourceChainSelector;
    /// @notice Address of the sender.
    bytes64 sender;
    /// @notice Selector for the destination chain, acting as an id.
    uint256 destinationChainSelector;
    /// @notice Address of the receiver.
    bytes64 receiver;
    /// @notice Hash of the payload of the message to be delivered.
    bytes32 hashedData;
}

/// @title EquitoMessageLibrary
/// @notice Library providing helper functions for EquitoMessage struct.
/// @dev Contains hashing function for EquitoMessage.
library EquitoMessageLibrary {
    /// @notice Converts an address to a bytes64 struct.
    /// @param addr The address to convert.
    /// @return The bytes64 struct containing the address.
    /// @dev The upper bytes32 value is set to 0. This operation cannot fail.
    function addressToBytes64(address addr) internal pure returns (bytes64 memory) {
        return bytes64(bytes32(uint256(uint160(addr))), bytes32(0));
    }

    /// @notice Converts a bytes64 struct to an address.
    /// @param b64 The bytes64 struct to convert.
    /// @return The address contained in the bytes64 struct's lower bytes32.
    /// @dev The upper bytes32 value is ignored. This operation cannot fail.
    function bytes64ToAddress(bytes64 memory b64) internal pure returns (address) {
        return address(uint160(uint256(b64.lower)));
    }
}
