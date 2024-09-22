// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {EquitoApp} from "./EquitoApp.sol";
import {bytes64, EquitoMessage, EquitoMessageLibrary} from "./EquitoMessageLibrary.sol";

/// @title EquitoERC20
/// @notice This contract implements a cross-chain ERC20 token that can be
///         transferred between different blockchains using the Equito protocol.
contract EquitoERC20 is EquitoApp, ERC20 {
    /// @notice Constructor that initializes the ERC20 token with a name, symbol, and initial supply.
    /// @param _router The address of the router contract.
    /// @param name The name of the token.
    /// @param symbol The symbol of the token.
    /// @param supply The initial supply of tokens to mint.
    constructor(address _router, string memory name, string memory symbol, uint256 supply)
        EquitoApp(_router)
        ERC20(name, symbol)
    {
        _mint(msg.sender, supply);
    }

    /// @notice Sends a cross-chain message using Equito.
    /// @param receiver The address of the receiver on the destination chain.
    /// @param destinationChainSelector The identifier of the destination chain.
    /// @param amount The amount of tokens to send.
    function crossChainTransfer(bytes64 calldata receiver, uint256 destinationChainSelector, uint256 amount)
        external
        payable
    {
        _burn(msg.sender, amount);
        bytes memory data = abi.encode(receiver, amount);
        router.sendMessage{value: msg.value}(getPeer(destinationChainSelector), destinationChainSelector, data);
    }

    /// @notice Receives a cross-chain message from a peer.
    ///         Mints the appropriate amount of tokens to the receiver address.
    /// @param message The Equito message received.
    /// @param messageData The data of the message received.
    function _receiveMessageFromPeer(EquitoMessage calldata message, bytes calldata messageData) internal override {
        (bytes64 memory receiver, uint256 amount) = abi.decode(messageData, (bytes64, uint256));
        _mint(EquitoMessageLibrary.bytes64ToAddress(receiver), amount);
    }
}
