// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract USDC_Storage {
    mapping(address => bool) faucetMinted;

    error AlreadyMinted(address);

    address public admin;
    mapping(address => uint256) lastMinted;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _; // Continue executing the function
    }
}

/// @custom:oz-upgrades-from test/Mocks/mockToken.sol:USDCEquitoX
contract USDCEquitoX is USDC_Storage, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() payable {
        _disableInitializers();
    }

    function initialize(string memory _name, string memory _symbol, address _admin) public initializer {
        __ERC20_init(_name, _symbol);
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        admin = _admin;
        // Mint initial tokens to the contract deployer (for testing purposes)
        _mint(msg.sender, 1_000_000 * (10 ** uint256(decimals())));
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function mint(address _account, uint256 _amount) external payable onlyOwner {
        _mint(_account, _amount);
    }

    function decimals() public pure override returns (uint8 _decimals) {
        return 18;
    }

    function faucetMint(address _address) public onlyAdmin {
        if (lastMinted[_address] + 7 days > block.timestamp) {
            revert AlreadyMinted(_address);
        }
        lastMinted[_address] = block.timestamp;
        _mint(_address, 10_000 * (10 ** uint256(decimals())));
    }

    function increaseAllowance(address spender, uint256 value) external {
        _approve(msg.sender, spender, allowance(msg.sender, spender) + value);
    }

    function decreaseAllowance(address spender, uint256 value) external {
        uint256 currentAllowance = allowance(msg.sender, spender);
        require(value >= currentAllowance, "not enough to decrease");
        _approve(msg.sender, spender, currentAllowance - value);
    }

    function changeAdmin(address newAdmin) external {
        require(msg.sender == owner() || msg.sender == admin, "unauth");
        admin = newAdmin;
    }

    function walletLastMinted(address _userAddress) public view returns (uint256 _lastMinted) {
        return lastMinted[_userAddress];
    }
}
