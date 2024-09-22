"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ChainSelect from "../../components/ChainSelect";
import { useEquito } from "../../components/Providers/Equito/EquitoProvider";
import { formatUnits, parseEther } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { EQUITOXABI } from "../../lib/abi/EquitoXAbi";
import { useAccount } from "wagmi";
import toast from 'react-hot-toast';
import { waitForTransactionReceipt, getBalance } from "@wagmi/core";
import { config } from '@/app/lib/wagmi';
import { routerAbi } from "@equito-sdk/evm";
import { NATIVE_ADDRESS } from "../../lib/chains"

interface Token {
    imageUrl: string;
    token: string;
    walletBalance: string;
    status: string;
}
interface SupplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableTokens: Token[];
}

const SupplyModal: React.FC<SupplyModalProps> = ({ isOpen, onClose, availableTokens }) => {
    const [amount, setAmount] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<Token | null>(availableTokens[0] || null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isTransactionPending, setIsTransactionPending] = useState(false);
    const [walletBalance, setWalletBalance] = useState<string>('');
    const { chain }: any = useEquito()["from"];
    const { writeContractAsync } = useWriteContract();
    const { address, isConnected } = useAccount();

    useEffect(() => {
        fetchBalance();
    }, [address]);

    async function fetchBalance() {
        try {
            const balance = await getBalance(config, {
                address: address!
            });
            setWalletBalance(balance.formatted);
        } catch (error) {
            toast.error("Error in fetching wallet balance");
            toast.dismiss();
        }
    }

    const { data: chainFees }: any = useReadContract({
        address: chain?.RouterContract,
        abi: routerAbi,
        functionName: "getFee",
        args: [chain?.RouterContract || NATIVE_ADDRESS],
        chainId: chain?.definition.id,
    });

    if (!isOpen || !selectedToken) return null;

    const handleMaxClick = () => setAmount(walletBalance);
    const handleTokenChange = (token: Token) => {
        if (token.status !== "Coming Soon") {
            setSelectedToken(token);
            setAmount('');
            setDropdownOpen(false);
        }
    };

    const handleAddSupply = async () => {
        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }
        if (!amount) {
            toast.error("Please Enter the Amount");
            return;
        }
        if (Number(amount) <= 0) {
            toast.error("Please Enter the valid Amount");
            return;
        }
        if (!chain) {
            toast.error("Select the Valid Chain");
            return;
        }

        toast.loading("Wait for transaction.......");
        setIsTransactionPending(true);
        try {
            const txnHash = await writeContractAsync({
                address: chain?.EquitoXCore,
                abi: EQUITOXABI,
                functionName: "supplyCollateral",
                value: parseEther(amount),
                chainId: chain?.definition.id,
            });


            await waitForTransactionReceipt(config, {
                hash: txnHash,
                chainId: chain?.definition.id,
            });


            toast.dismiss();
            toast.success("Collateral Deposited!");
            onClose();
        } catch (error) {
            console.error("Transaction error:", error);
            toast.dismiss();
            toast.error("An error occurred while borrowing the loan.");
        } finally {
            setIsTransactionPending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-gray-800 text-white rounded-lg p-4 w-full max-w-3xl h-[80vh] shadow-2xl overflow-y-auto"> {/* Increased modal width */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Supply {selectedToken.token}</h2>
                    <button
                        className="text-black bg-red-500 hover:bg-red-600 rounded-full p-1 transition duration-200"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>

                <div className="flex flex-col mb-4 bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium mb-2">Supply Market</label>
                    <div className="relative mb-4">
                        <div className="flex space-x-3">
                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 cursor-pointer flex items-center justify-between"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="flex items-center">
                                    <Image
                                        src={selectedToken.imageUrl}
                                        alt={selectedToken.token}
                                        width={30}
                                        height={30}
                                        className="mr-3 rounded-full"
                                    />
                                    <span className="text-lg font-medium">{selectedToken.token}</span>
                                </div>
                                <span className="text-gray-400">{dropdownOpen ? '▲' : '▼'}</span>
                            </div>


                            <div className="bg-gray-900 text-white p-3 rounded-lg flex-1 flex items-center justify-center">
                                <ChainSelect mode="from" className="w-full" />
                                {chain ? (
                                    <p>
                                        Fee: {formatUnits(chainFees || 0, 18)}{" "}
                                        {chain?.definition?.nativeCurrency?.symbol}
                                    </p>
                                ) : ("")}
                            </div>
                        </div>


                        {dropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-600 mt-1 rounded-lg z-10">
                                {availableTokens.map((token) => (
                                    <div
                                        key={token.token}
                                        className={`flex items-center p-3 cursor-pointer ${token.status === "Coming Soon" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                                        onClick={() => handleTokenChange(token)}
                                    >
                                        <Image
                                            src={token.imageUrl}
                                            alt={token.token}
                                            width={30}
                                            height={30}
                                            className="mr-3 rounded-full"
                                        />
                                        <span>{token.token} {token.status === "Coming Soon" && '(Coming Soon)'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="mb-2 mt-2">
                        <label className="block text-sm font-medium mb-2">Amount</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder={`min 1 ${selectedToken.token}`}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-3 pr-20 bg-gray-900 rounded-lg border border-gray-600 focus:outline-none focus:border-green-500 text-lg"
                            />
                            <button
                                onClick={handleMaxClick}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-400 text-white py-1 px-3 rounded-lg transition duration-200"
                            >
                                MAX
                            </button>
                        </div>
                        <span className="text-sm text-gray-400 mt-1 inline-block">
                            Wallet Balance: {walletBalance} {selectedToken.token}
                        </span>
                    </div>
                </div>


                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">You will receive</label>
                    <input
                        type="text"
                        disabled
                        value={`${amount} r${selectedToken.token}`}
                        className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-lg"
                    />
                </div>


                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="stakeRTokens"
                        className="mr-2 w-4 h-4 text-green-600 focus:ring-0"
                    />
                    <label htmlFor="stakeRTokens" className="text-sm">I would like to stake the r{selectedToken.token}</label>
                </div>


                <div className="flex justify-between items-center mb-6 text-sm bg-gray-700 p-4 rounded-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Fees</span>
                        <span className="font-semibold">0%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">APR</span>
                        <span className="font-semibold">24.334%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Supply APR</span>
                        <span className="font-semibold">11.64%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">ETH APR</span>
                        <span className="font-semibold">12.694%</span>
                    </div>
                </div>


                <button
                    onClick={handleAddSupply}
                    className={`w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg transition duration-200 ${isTransactionPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isTransactionPending}
                >
                    {isTransactionPending ? 'Processing...' : 'Supply'}
                </button>
            </div>
        </div>
    );
};


export default SupplyModal;
