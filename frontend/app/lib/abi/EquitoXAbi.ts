export const EQUITOXABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_router",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "InvalidLength",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidMessageSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "chainSelector",
                "type": "uint256"
            }
        ],
        "name": "InvalidPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "router",
                "type": "address"
            }
        ],
        "name": "InvalidRouter",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RouterAddressCannotBeZero",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "messageHash",
                "type": "bytes32"
            }
        ],
        "name": "BorrowRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destinationChainSelector",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "destinationChainToken",
                "type": "address"
            }
        ],
        "name": "borrow",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "collateralRatio",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feesInPercentagePerMonth",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destinationChainSelector",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "destinationChainToken",
                "type": "address"
            }
        ],
        "name": "getDestinationChainAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getHealthFactor",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "destinationChainSelector",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "destinationChainToken",
                "type": "address"
            }
        ],
        "name": "getMaxBorrowAmountOnDestinationChain",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "chainSelector",
                "type": "uint256"
            }
        ],
        "name": "getPeer",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "lower",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "upper",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct bytes64",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getProtocolBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "sourceChainSelectorOfLoan",
                "type": "uint256"
            }
        ],
        "name": "getRepayAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "liquidateLoan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "liquidationRatio",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "peers",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "lower",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "upper",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "sourceChainSelector",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "lower",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "upper",
                                "type": "bytes32"
                            }
                        ],
                        "internalType": "struct bytes64",
                        "name": "sender",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "destinationChainSelector",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "lower",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "upper",
                                "type": "bytes32"
                            }
                        ],
                        "internalType": "struct bytes64",
                        "name": "receiver",
                        "type": "tuple"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "hashedData",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct EquitoMessage",
                "name": "message",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "messageData",
                "type": "bytes"
            }
        ],
        "name": "receiveMessage",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "sourceChainSelectorOfLoan",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "repay",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_collateralRatio",
                "type": "uint256"
            }
        ],
        "name": "setCollateralRatio",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_feesInPercentagePer30Days",
                "type": "uint256"
            }
        ],
        "name": "setFeesInPercentagePer30Days",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "chainSelectors",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "swapAddresses",
                "type": "address[]"
            }
        ],
        "name": "setLendBorrowAddresses",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_liquidationRatio",
                "type": "uint256"
            }
        ],
        "name": "setLiquidationRatio",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "chainSelectors",
                "type": "uint256[]"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "lower",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "upper",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct bytes64[]",
                "name": "addresses",
                "type": "tuple[]"
            }
        ],
        "name": "setPeers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "supplyCollateral",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "tokenPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "chainSelectors",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "tokenAddress",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "prices",
                "type": "uint256[]"
            }
        ],
        "name": "updateTokenPrices",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userBorrow",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "lower",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "upper",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct bytes64",
                "name": "user",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sourceChainSelector",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destinationChainSelector",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "destinationChainToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

