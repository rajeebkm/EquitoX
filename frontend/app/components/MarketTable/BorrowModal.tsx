"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ChainSelect from '../ChainSelect';
import { ChainDirection, useEquito } from "../Providers/Equito/EquitoProvider";
import { useReadContract } from "wagmi";


import { useAccount } from "wagmi";
import { routerAbi } from "@equito-sdk/evm";
import { formatUnits, parseEther, parseEventLogs, parseUnits } from "viem";
import { useApprove } from "../Providers/Equito/UseApprove";
import { generateHash } from "@equito-sdk/viem";
import {
    useWriteContract,
    useSwitchChain,
} from "wagmi";
import { waitForTransactionReceipt, getBlock, getBalance } from "@wagmi/core";
import toast from 'react-hot-toast';


import { EQUITOXABI } from '../../lib/abi/EquitoXAbi';
import { config } from '@/app/lib/wagmi';
import { NATIVE_ADDRESS } from "../../lib/chains";




interface Token {
    imageUrl: string;
    token: string;
    walletBalance: string;
    status: string;
}


interface TokenDisplayProps {
    imageUrl: string;
    token: string;
    status: string;
}


const TokenDisplay: React.FC<TokenDisplayProps> = ({ imageUrl, token }) => (
    <div className="flex items-center">
        <Image
            src={imageUrl}
            alt={token}
            width={30}
            height={30}
            className="mr-3 rounded-full"
        />
        <span className="text-lg font-medium">{token}</span>
    </div>
);


interface InputWithMaxButtonProps {
    label: string;
    placeholder: string;
    value: string;
    onMaxButtonClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    additionalInfo: string;
}


const InputWithMaxButton: React.FC<InputWithMaxButtonProps> = ({
    label,
    placeholder,
    value,
    onMaxButtonClick,
    onChange,
    additionalInfo
}) => (
    <div className="mb-2 mt-2">
        <label className="block text-sm font-medium mb-2">{label}</label>
        <div className="relative">
            <input
                type="number"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-3 pr-20 bg-gray-900 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 text-lg"
            />
            <button
                onClick={onMaxButtonClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-400 text-white py-1 px-3 rounded-lg transition duration-200"
            >
                MAX
            </button>
        </div>
        <span className="text-sm text-gray-400 mt-1 inline-block">{additionalInfo}</span>
    </div>
);


interface BorrowModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableTokens: Token[];
}


const BorrowModal: React.FC<BorrowModalProps> = ({ isOpen, onClose, availableTokens }) => {
    const { data, writeContractAsync, isPending, reset } = useWriteContract();
    const { chain: sourceChain }: any = useEquito()["from"];
    const { chain: destinationChain }: any = useEquito()["to"];
    const { switchChainAsync } = useSwitchChain();
    const { address, isConnected } = useAccount();
    const approve = useApprove();
    const [collateralAmount, setCollateralAmount] = useState<string>('');
    const [borrowAmount, setBorrowAmount] = useState<string>('');
    const [selectedCollateralToken, setSelectedCollateralToken] = useState<Token | null>(availableTokens[0] || null);
    const [selectedBorrowToken, setSelectedBorrowToken] = useState<Token | null>(availableTokens[0] || null);
    const [collateralDropdownOpen, setCollateralDropdownOpen] = useState(false);
    const [borrowDropdownOpen, setBorrowDropdownOpen] = useState(false);
    const [walletBalance, setWalletBalance] = useState<string>('');
    const [isTransactionPending, setIsTransactionPending] = useState(false);


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


    const { data: protocolBalance }: any = useReadContract({
        address: destinationChain?.EquitoXCore,
        abi: EQUITOXABI,
        functionName: "getProtocolBalance",
        args: [],
        chainId: destinationChain?.definition.id,
    });


    const protocolBalanceInEth = protocolBalance
        ? formatUnits(protocolBalance, 18)
        : '0';


    const { data: sourceChainFees }: any = useReadContract({
        address: sourceChain?.RouterContract,
        abi: routerAbi,
        functionName: "getFee",
        args: [sourceChain?.RouterContract || NATIVE_ADDRESS],
        chainId: sourceChain?.definition.id,
    });


    const { data: destinationChainFees }: any = useReadContract({
        address: destinationChain?.RouterContract,
        abi: routerAbi,
        functionName: "getFee",
        args: [destinationChain?.RouterContract || NATIVE_ADDRESS],
        chainId: destinationChain?.definition.id,
    });


    const { data: maxBorrowAmount }: any = useReadContract({
        address: sourceChain?.EquitoXCore,
        abi: EQUITOXABI,
        functionName: "getMaxBorrowAmountOnDestinationChain",
        args: [
            address || NATIVE_ADDRESS,
            destinationChain?.chainSelector || 0,
            NATIVE_ADDRESS,
        ],
        chainId: sourceChain?.definition.id,
    });
    const maxBorrowAmountInEth = maxBorrowAmount
        ? formatUnits(maxBorrowAmount, 18)
        : '0';


    const { data: destinationChainAmount }: any = useReadContract({
        address: sourceChain?.EquitoXCore,
        abi: EQUITOXABI,
        functionName: "getDestinationChainAmount",
        args: [
            parseEther(collateralAmount, "wei"),
            destinationChain?.chainSelector,
            NATIVE_ADDRESS,
        ],
        chainId: sourceChain?.definition.id,
    });


    const destinationChainAmountInEth = destinationChainAmount
        ? formatUnits(destinationChainAmount, 18)
        : '0';


    if (!isOpen || !selectedCollateralToken || !selectedBorrowToken) return null;


    const handleMaxCollateralClick = () => setCollateralAmount(walletBalance);
    const handleMaxBorrowClick = () => setBorrowAmount(maxBorrowAmountInEth);




    const handleTokenChange = (token: Token, type: 'collateral' | 'borrow') => {
        if (type === 'collateral' && token.status !== "Coming Soon") {
            setSelectedCollateralToken(token);
            setCollateralAmount('');
            setCollateralDropdownOpen(false);
        }
        if (type === 'borrow' && token.status !== "Coming Soon") {
            setSelectedBorrowToken(token);
            setBorrowAmount('');
            setBorrowDropdownOpen(false);
        }
    };




    const handleLendingAndBorrowing = async () => {
        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }
        if (!collateralAmount) {
            toast.error("Please enter the Amount");
            return;
        }
        if (!sourceChain) {
            toast.error("Please select the valid Source Chain");
            return;
        }


        if (Number(collateralAmount) > Number(formatUnits(maxBorrowAmount, 18))) {
            toast.error(`You can borrow upto ${maxBorrowAmountInEth} amount`);
            return;
        }
        if (Number(collateralAmount) <= 0) {
            toast.error("Please enter the valid Amount");
            return;
        }
        if (!destinationChain) {
            toast.error("Please select the valid  Destination Chain");
            return;
        }
        if (destinationChainAmount > protocolBalance) {
            toast.error("Sorry for inconvenience, Destination chain does not have enough balance to process the transaction please lend less amount");
            return;
        }


        toast.loading("Wait for transaction.......");
        setIsTransactionPending(true);;
        try {
            const txnHashBorrowAmount = await writeContractAsync({
                address: sourceChain?.EquitoXCore,
                abi: EQUITOXABI,
                functionName: "borrow",
                value: BigInt(sourceChainFees),
                chainId: sourceChain?.definition.id,
                args: [
                    parseEther(collateralAmount, "wei"),
                    destinationChain?.chainSelector || 0,
                    NATIVE_ADDRESS,
                ],
            });


            const sendReceipt = await waitForTransactionReceipt(config, {
                hash: txnHashBorrowAmount,
                chainId: sourceChain?.definition.id,
            });


            const sentMessage = parseEventLogs({
                abi: routerAbi,
                logs: sendReceipt.logs,
            }).flatMap(({ eventName, args }) =>
                eventName === "MessageSendRequested" ? [args] : []
            )[0];


            const { sentPingTimestamp }: any = await getBlock(config, {
                chainId: sourceChain?.definition.id,
                blockNumber: sendReceipt.blockNumber,
            });


            const { proof } = await approve.execute({
                messageHash: generateHash(sentMessage.message),
                fromTimestamp: Number(sentPingTimestamp) * 1000,
                chainSelector: sourceChain?.chainSelector,
            });


            await switchChainAsync({ chainId: destinationChain?.definition.id });


            const txnHashDeliverAndExecuteMessage = await writeContractAsync({
                address: destinationChain?.RouterContract,
                abi: routerAbi,
                functionName: "deliverAndExecuteMessage",
                args: [sentMessage.message, sentMessage.messageData, BigInt(0), proof],
                chainId: destinationChain?.definition.id,
            });


            await waitForTransactionReceipt(config, {
                hash: txnHashDeliverAndExecuteMessage,
                chainId: destinationChain?.definition.id,
            });
            toast.dismiss()
            toast.success("Loan Borrowed!");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-gray-800 text-white rounded-lg p-4 w-full max-w-3xl h-[80vh] shadow-2xl overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Borrow {selectedBorrowToken.token}</h2>
                    <button
                        className="text-black bg-red-500 hover:bg-red-600 rounded-full p-1 transition duration-200"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>


                <div className="flex flex-col mb-4 bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium mb-2">Collateral Market</label>


                    <div className="relative mb-4">
                        <div className="flex space-x-3">


                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 cursor-pointer flex items-center justify-between"
                                onClick={() => setCollateralDropdownOpen(!collateralDropdownOpen)}
                            >
                                <TokenDisplay
                                    imageUrl={selectedCollateralToken.imageUrl}
                                    token={selectedCollateralToken.token} status={''} />
                                <span className="text-gray-400">{collateralDropdownOpen ? '▲' : '▼'}</span>
                            </div>




                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 flex items-center justify-center"
                            >
                                <ChainSelect mode="from" />
                                {sourceChain ? (
                                    <p>
                                        Fee: {formatUnits(sourceChainFees || 0, 18)}{" "}
                                        {sourceChain?.definition?.nativeCurrency?.symbol}
                                    </p>
                                ) : ("")}


                            </div>




                        </div>


                        {collateralDropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-600 mt-1 rounded-lg z-10">
                                {availableTokens.map((token) => (
                                    <div
                                        key={token.token}
                                        className={`flex items-center p-3 cursor-pointer ${token.status === "Coming Soon" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                                        onClick={() => handleTokenChange(token, 'collateral')}
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


                    <InputWithMaxButton
                        label="Collateral Amount"
                        placeholder={`min 10 ${selectedCollateralToken.token}`}
                        value={collateralAmount}
                        onMaxButtonClick={handleMaxCollateralClick}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        additionalInfo={`Wallet Balance: ${walletBalance} ${selectedCollateralToken.token}`}
                    />
                </div>


                <div className="flex flex-col mb-4 bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium mb-2">Borrow Market</label>
                    <div className="relative mb-4">
                        <div className="flex space-x-3">
                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 cursor-pointer flex items-center justify-between"
                                onClick={() => setBorrowDropdownOpen(!borrowDropdownOpen)}
                            >
                                <TokenDisplay
                                    imageUrl={selectedBorrowToken.imageUrl}
                                    token={selectedBorrowToken.token} status={''} />
                                <span className="text-gray-400">{borrowDropdownOpen ? '▲' : '▼'}</span>
                            </div>
                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 flex items-center justify-center"
                            >
                                <ChainSelect mode="to" />
                                {destinationChain ? (
                                    <p>
                                        Fee: {formatUnits(destinationChainFees || 0, 18)}{" "}
                                        {destinationChain?.definition?.nativeCurrency?.symbol}
                                    </p>
                                ) : ("")}
                            </div>
                        </div>
                        {borrowDropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-600 mt-1 rounded-lg z-10">
                                {availableTokens.map((token) => (
                                    <div
                                        key={token.token}
                                        className={`flex items-center p-3 cursor-pointer ${token.status === "Coming Soon" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                                        onClick={() => handleTokenChange(token, 'borrow')}
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
                    <InputWithMaxButton
                        label="Borrow Amount"
                        placeholder={`min 50 ${selectedBorrowToken.token}`}
                        value={String(destinationChainAmountInEth)}
                        onMaxButtonClick={handleMaxBorrowClick}
                        onChange={(e) => setBorrowAmount(e.target.value)}
                        additionalInfo={`Available Reserves: ${String(protocolBalanceInEth)} ${selectedCollateralToken.token}`}
                    />
                </div>


                <div className="flex justify-between items-center mb-4 text-sm bg-gray-700 p-4 rounded-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Fees</span>
                        <span className="font-semibold">0%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Borrow APR</span>
                        <span className="font-semibold">10.890%</span>
                    </div>
                </div>


                <div className="mb-4">
                    <p className="text-sm text-white">
                        You have selected a native token as collateral which will be converted to rtokens 1rETH = 1ETH
                    </p>
                </div>


                <button onClick={handleLendingAndBorrowing} disabled={isTransactionPending} className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded-lg text-lg font-semibold transition duration-200">
                    {isTransactionPending ? 'Processing...' : 'Borrow'}
                </button>
            </div>
        </div>
    );
};


export default BorrowModal;
