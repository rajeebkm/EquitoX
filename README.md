# EquitoX - Boost your crypto earnings by lending and borrowing against your collateral

## Overview

**EquitoX** is a decentralized Web3 protocol for lending, borrowing, token swaps, staking, and yield farming. Built to leverage blockchain technology, EquitoX allows users to earn interest, borrow assets with collateral, swap tokens, and participate in staking and yield farming opportunities, all without intermediaries.

## Features

1. **Lending & Borrowing**:

   - Lend your assets and earn interest.
   - Borrow assets by providing collateral.
   - Algorithmic interest rates based on market supply and demand.
   - Multi-collateralized asset support.

2. **Swap**:

   - Instant token swaps with minimal fees.
   - Powered by internal liquidity pools for efficient trading.
   - Support for major token standards like ERC-20.

3. **Staking**:

   - Stake supported tokens to earn staking rewards.
   - Lock tokens for specified durations to maximize returns.
   - Multiple staking tiers based on the lock-up period.

4. **Yield Farming**:
   - Provide liquidity and earn yield farming rewards.
   - Liquidity mining program to reward LP token holders.
   - Stake LP tokens to boost earnings.

## Table of Contents

- [Installation](#installation)
- [Lending & Borrowing](#lending--borrowing)
- [Swap](#swap)
- [Staking](#staking)
- [Yield Farming](#yield-farming)
- [Contract Architecture](#contract-architecture)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## Installation

### Prerequisites

- Node.js >= v16
- Yarn or npm
- Hardhat or Truffle for smart contract development
- Solidity >= 0.8.x

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/rajeebkm/EquitoX.git
   cd EquitoX
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

4. Deploy to local or test network:
   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

## Lending & Borrowing

### Lend Assets

To lend an asset:

1. Deposit tokens into the protocol.
2. Receive interest-bearing tokens representing your deposit.

Example:

```js
await lendingContract.deposit(assetAddress, amount);
```

### Borrow Assets

To borrow an asset:

1. Provide supported collateral.
2. Borrow up to your collateral limit.

Example:

```js
await lendingContract.borrow(assetAddress, collateralAmount);
```

### Repay Loans

To repay your borrowed assets:

```js
await lendingContract.repay(assetAddress, borrowAmount);
```

### Interest Rates

Interest rates are dynamic, adjusting based on the utilization of each asset in the lending pool.

## Swap

EquitoX includes a token swap feature, enabling users to exchange tokens efficiently within the protocol.

### How to Swap Tokens

1. Approve the tokens for swapping.
2. Use the `swap` function to exchange tokens.

Example:

```js
await swapContract.swap(inputTokenAddress, outputTokenAddress, amount);
```

## Staking

Users can stake tokens in the staking pool to earn rewards.

### Staking Process

1. Deposit tokens to the staking contract.
2. Earn staking rewards over time.

Example:

```js
await stakingContract.stake(stakingTokenAddress, amount);
```

Rewards can be claimed or left to accumulate.

## Yield Farming

Yield farming allows users to provide liquidity and earn rewards.

### Steps to Participate in Yield Farming

1. Add liquidity to the supported pool.
2. Stake your LP tokens in the yield farming contract.
3. Earn yield farming rewards over time.

Example:

```js
await farmingContract.stakeLP(lpTokenAddress, amount);
```

## Contract Architecture

- **LendingContract**: Manages the lending, borrowing, and collateral mechanics.
- **SwapContract**: Provides token swapping functionality.
- **StakingContract**: Manages staking deposits and reward distribution.
- **FarmingContract**: Handles yield farming and liquidity rewards.

## How to Contribute

We welcome community contributions to EquitoX! To get involved:

1. Fork the repository and create a new branch:

   ```bash
   git checkout -b feature-branch
   ```

2. Make your changes and commit them:

   ```bash
   git commit -m "Add new feature"
   ```

3. Push to your branch:

   ```bash
   git push origin feature-branch
   ```

4. Open a pull request on GitHub, and we’ll review your changes!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
