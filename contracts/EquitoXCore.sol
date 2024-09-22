// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {EquitoApp} from "./libraries/EquitoApp.sol";
import {bytes64, EquitoMessage} from "./libraries/EquitoMessageLibrary.sol";
import {TransferHelper} from "./libraries/TransferHelper.sol";
import {Errors} from "./libraries/Errors.sol";
import {EquitoMessageLibrary} from "./libraries/EquitoMessageLibrary.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title EquitoXCore
/// @notice This contract facilitates token lending between different blockchains using the Equito protocol.
contract EquitoXCore is EquitoApp {
    using SafeERC20 for IERC20Metadata;

    /// ========================== STORAGES ========================== ///

    /// @notice MAXIMUM Collateral ratio of the user collateral to the Borrow amount.
    uint256 public collateralRatio;

    /// @notice LIQUIDATION_RATIO if the loan amount crosses this ratio, the loan can be liquidated.
    uint256 public liquidationRatio;

    /// @notice FEES in percentage for every month.
    uint256 public feesInPercentagePerMonth;

    /// @dev The address used to represent the native token.
    address internal constant NATIVE_TOKEN = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    /// @notice Mapping to store the prices of supported tokens on different chains.
    /// @dev The first key is the chain selector, and the second key is the token address.
    mapping(uint256 => mapping(address => uint256)) public tokenPrice;

    /// @notice Mapping to store balances of user collateral.
    /// @dev The key is the user address.
    mapping(address => uint256) public balances;

    /// @notice Mapping to store user borrow details of destination chain or source chain.
    /// @dev The first key is the chain selector, and the second key is the user address.
    mapping(uint256 => mapping(address => Borrow)) public userBorrow;

    /// @notice Struct to store borrow information.
    /// @param user The address of the user who requested the borrow.
    /// @param loanAmount The loan amount taken by the user in the destination chain (in wei for native tokens, or in the corresponding amount for ERC20 tokens).
    /// @param sourceChainSelector The chain selector of the source chain for the borrow.
    /// @param destinationChainSelector The chain selector of the destination chain for the borrow.
    /// @param destinationChainToken The token borrowed in the destination chain.
    /// @param startTime The start time of the loan.
    struct Borrow {
        bytes64 user;
        uint256 loanAmount;
        uint256 sourceChainSelector;
        uint256 destinationChainSelector;
        address destinationChainToken;
        uint256 startTime;
    }

    /// ========================== EVENTS ========================== ///

    /// @notice Event emitted when a borrow is requested.
    /// @param user The address of the user who requested the borrow.
    /// @param messageHash The hash of the message sent to the destination chain.
    event BorrowRequested(address user, bytes32 messageHash);

    /// ========================== CONSTRUCTOR ========================== ///

    /// @param _router The Router contract
    constructor(address _router) payable EquitoApp(_router) {}

    // ========================== FUNCTIONS ========================== //

    /// ========================== EXTERNAL FUNCTIONS ========================== ///

    /// @notice Set the maximum collateral ratio
    /// @param _collateralRatio The new collateral ratio value
    function setCollateralRatio(uint256 _collateralRatio) external onlyOwner {
        collateralRatio = _collateralRatio;
    }

    /// @notice Set the liquidation ratio
    /// @param _liquidationRatio The new liquidation ratio value
    function setLiquidationRatio(uint256 _liquidationRatio) external onlyOwner {
        liquidationRatio = _liquidationRatio;
    }

    /// @notice Set the fees percentage per month
    /// @param _feesInPercentagePer30Days The new fees percentage value
    function setFeesInPercentagePer30Days(uint256 _feesInPercentagePer30Days) external onlyOwner {
        feesInPercentagePerMonth = _feesInPercentagePer30Days;
    }

    /// @notice Set the lending addresses on multiple chains.
    /// @param chainSelectors An array of chain selectors.
    /// @param swapAddresses An array of addresses corresponding to the chain selectors.
    function setLendBorrowAddresses(uint256[] calldata chainSelectors, address[] calldata swapAddresses)
        external
        onlyOwner
    {
        bytes64[] memory Address64 = new bytes64[](chainSelectors.length);
        for (uint256 i = 0; i < chainSelectors.length; i++) {
            Address64[i] = EquitoMessageLibrary.addressToBytes64(swapAddresses[i]);
        }
        _setPeers(chainSelectors, Address64);
    }

    /// @notice Set token prices for multiple chains.
    /// @param chainSelectors An array of chain selectors.
    /// @param tokenAddress An array of token addresses corresponding to the chains.
    /// @param prices An array of prices for each token on the respective chains.
    function updateTokenPrices(uint256[] memory chainSelectors, address[] memory tokenAddress, uint256[] memory prices)
        external
        onlyOwner
    {
        if (chainSelectors.length != prices.length || chainSelectors.length != tokenAddress.length) {
            revert Errors.InvalidLength();
        }
        for (uint256 i = 0; i < chainSelectors.length; i++) {
            tokenPrice[chainSelectors[i]][tokenAddress[i]] = prices[i];
        }
    }

    /// @notice Fallback function to accept native token deposits.
    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    /// ========================== PUBLIC FUNCTIONS ========================== ///

    /// @notice Allows a user to borrow an amount on the destination chain using collateral from the source chain.
    /// @param _amount The amount of source tokens.
    /// @param destinationChainSelector The identifier of the destination chain.
    /// @param destinationChainToken The address of the token on the destination chain.
    function borrow(uint256 _amount, uint256 destinationChainSelector, address destinationChainToken)
        public
        payable
    {
        require(
            getMaxBorrowAmountOnDestinationChain(msg.sender, destinationChainSelector, destinationChainToken)
                >= _amount,
            "user cannot withdraw greater than their max borrow amount"
        );

        Borrow memory borrow = Borrow(
            EquitoMessageLibrary.addressToBytes64(msg.sender),
            _amount,
            router.chainSelector(),
            destinationChainSelector,
            destinationChainToken,
            block.timestamp
        );

        userBorrow[router.chainSelector()][msg.sender] = borrow;
        bytes1 operationID = 0x01;
        bytes memory data = abi.encode(operationID, borrow);
        bytes32 messageHash =
            router.sendMessage{value: msg.value}(getPeer(destinationChainSelector), destinationChainSelector, data);

        emit BorrowRequested(msg.sender, messageHash);
    }

    /// @notice Repay the borrowed amount on the source chain.
    /// @param sourceChainSelectorOfLoan The chain selector of the source chain where the loan was taken.
    /// @param token The token to be repaid (either native or ERC20).
    function repay(uint256 sourceChainSelectorOfLoan, address token) public payable {
        bytes1 operationID = 0x02;

        bytes memory data = abi.encode(operationID, userBorrow[sourceChainSelectorOfLoan][msg.sender]);

        bytes32 messageHash = router.sendMessage{value: router.getFee(address(this))}(
            getPeer(sourceChainSelectorOfLoan), sourceChainSelectorOfLoan, data
        );

        delete userBorrow[sourceChainSelectorOfLoan][msg.sender];

        if (token != NATIVE_TOKEN) {
            require(
                IERC20Metadata(token).balanceOf(msg.sender)
                    >= getRepayAmount(msg.sender, sourceChainSelectorOfLoan)
                    && msg.value >= router.getFee(address(this))
            );
        } else {
            require(
                msg.value >= router.getFee(address(this)) + getRepayAmount(msg.sender, sourceChainSelectorOfLoan)
            );
        }
    }

    /// @notice Liquidate a user's loan if it exceeds the liquidation ratio.
    /// @param user The address of the user whose loan is to be liquidated.
    function liquidateLoan(address user) public payable {
        require(getHealthFactor(user) > liquidationRatio, "USER Loan is not Liquidatable");

        delete userBorrow[router.chainSelector()][user];
        balances[msg.sender] = balances[user];
        balances[user] = 0;

        bytes1 operationID = 0x03;
        bytes memory data = abi.encode(operationID, userBorrow[router.chainSelector()][msg.sender]);

        bytes32 messageHash = router.sendMessage{value: router.getFee(address(this))}(
            getPeer(userBorrow[router.chainSelector()][user].destinationChainSelector),
            userBorrow[router.chainSelector()][user].destinationChainSelector,
            data
        );
    }

    /// @notice Allows a user to withdraw their collateral if they do not have an outstanding loan.
    function withdrawCollateral() public {
        require(
            userBorrow[router.chainSelector()][msg.sender].loanAmount == 0,
            "user is having a loan which is to be repaid"
        );
        uint256 amount = balances[msg.sender];
        delete balances[msg.sender];
        payable(msg.sender).transfer(amount);
    }

    /// @notice Allows a user to supply collateral to the contract.
    function supplyCollateral() public payable {
        balances[msg.sender] += msg.value;
    }

    /// ========================== VIEW FUNCTIONS ========================== ///

    /// @notice Calculates the amount to be repaid for a loan on the destination chain.
    /// @param user The address of the user.
    /// @param sourceChainSelectorOfLoan The chain selector of the source chain where the loan was taken.
    /// @return The amount to be repaid.
    function getRepayAmount(address user, uint256 sourceChainSelectorOfLoan) public view returns (uint256) {
        Borrow memory borrow = userBorrow[sourceChainSelectorOfLoan][user];

        uint256 daysSinceLoan = (block.timestamp - borrow.startTime) / 86400;

        return borrow.loanAmount + ((borrow.loanAmount * feesInPercentagePerMonth * daysSinceLoan) / 3000);
    }

    /// @notice Calculates the health factor of a user's loan based on collateral and borrow amounts.
    /// @param user The address of the user.
    /// @return The health factor as a percentage (in basis points).
    function getHealthFactor(address user) public view returns (uint256) {
        Borrow memory borrow = userBorrow[router.chainSelector()][user];
        uint256 collateral = balances[user] * tokenPrice[router.chainSelector()][NATIVE_TOKEN];
        uint256 destinationBorrowValue =
            borrow.loanAmount * tokenPrice[borrow.destinationChainSelector][borrow.destinationChainToken];

        return (destinationBorrowValue * 100) / collateral;
    }

    /// @notice Calculates the maximum amount a user can borrow on the destination chain.
    /// @param user The address of the user.
    /// @param destinationChainSelector The identifier of the destination chain.
    /// @param destinationChainToken The token on the destination chain.
    /// @return The maximum borrow amount.
    function getMaxBorrowAmountOnDestinationChain(
        address user,
        uint256 destinationChainSelector,
        address destinationChainToken
    ) public view returns (uint256) {
        uint256 collateral = balances[user] * tokenPrice[router.chainSelector()][NATIVE_TOKEN];

        return (collateral * collateralRatio / tokenPrice[destinationChainSelector][destinationChainToken]);
    }

    /// @notice Calculates the equivalent amount of a token on the destination chain.
    /// @param amount The amount of tokens to be converted on the destination chain.
    /// @param destinationChainSelector The selector/ID of the destination chain.
    /// @param destinationChainToken The token address on the destination chain.
    /// @return The calculated equivalent amount of tokens on the destination chain.
    function getDestinationChainAmount(
        uint256 amount,
        uint256 destinationChainSelector,
        address destinationChainToken
    ) public view returns (uint256) {
        return (
            (amount * tokenPrice[destinationChainSelector][destinationChainToken])
                / tokenPrice[router.chainSelector()][NATIVE_TOKEN]
        );
    }

    /// @notice Gets the current balance of the contract in native currency (ETH or native token).
    /// @return The balance of the contract in the native currency.
    function getProtocolBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /// ========================== INTERNAL FUNCTIONS ========================== ///
    /**
     * @notice Handles messages received from peers, performing different operations based on the message type.
     * @dev This function decodes the messageData into an operation ID and a Borrow struct, then processes the message based on the operation.
     * @param message The EquitoMessage containing source chain selector and other metadata.
     * @param messageData The data sent in the message, which includes the operation ID and the Borrow details.
     *
     * Operation IDs:
     * - 0x01: Registers a borrow and transfers the loan amount to the user on the destination chain.
     * - 0x02: Repays the borrow and deletes the user's borrow record.
     * - 0x03: Liquidates a loan and deletes the user's borrow record.
     */
    function _receiveMessageFromPeer(EquitoMessage calldata message, bytes calldata messageData) internal override {
        (bytes1 operationID, Borrow memory borrow) = abi.decode(messageData, (bytes1, Borrow));

        // Operation: Register borrow and transfer loan amount
        if (operationID == 0x01) {
            userBorrow[message.sourceChainSelector][EquitoMessageLibrary.bytes64ToAddress(borrow.user)] = borrow;

            // Transfer loan amount to the user in native tokens or ERC20 tokens
            if (borrow.destinationChainToken == NATIVE_TOKEN) {
                TransferHelper.safeTransferETH(EquitoMessageLibrary.bytes64ToAddress(borrow.user), borrow.loanAmount);
            } else {
                TransferHelper.safeTransfer(
                    borrow.destinationChainToken, EquitoMessageLibrary.bytes64ToAddress(borrow.user), borrow.loanAmount
                );
            }

            // Operation: Repay loan and delete the borrow record
        } else if (operationID == 0x02) {
            delete userBorrow[router.chainSelector()][
                EquitoMessageLibrary.bytes64ToAddress(borrow.user)
            ];

            // Operation: Liquidate loan and delete the borrow record
        } else if (operationID == 0x03) {
            delete userBorrow[router.chainSelector()][
                EquitoMessageLibrary.bytes64ToAddress(borrow.user)
            ];
        }
    }
}
