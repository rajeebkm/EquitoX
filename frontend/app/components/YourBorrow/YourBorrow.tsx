"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import { routerAbi } from "@equito-sdk/evm";
import { formatUnits, parseEther, parseEventLogs, parseUnits } from "viem";
import { useApprove } from "../Providers/Equito/UseApprove";
import { generateHash } from "@equito-sdk/viem";
import {
    useAccount,
    useReadContract,
    useSwitchChain,
    useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt, getBlock, getBalance } from "@wagmi/core";
import toast from 'react-hot-toast';

import { EQUITOXABI } from '../../lib/abi/EquitoXAbi';
import { chains } from "../../lib/chains"
import { config } from '@/app/lib/wagmi';
import { NATIVE_ADDRESS } from "../../lib/chains";

const RepayLoanAmount = () => {
    let loans = [];
    const [isTransactionPending, setIsTransactionPending] = useState(false);
    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();
    const { switchChainAsync } = useSwitchChain();
    const approve = useApprove();

    let loanIdCounter = 1;

    for (let i = 0; i < chains.length; i++) {
        const chain = chains[i];

        const { data: repaymentamount }: any = useReadContract({
            address: chain?.EquitoXCore,
            abi: EQUITOXABI,
            functionName: "getRepayAmount",
            args: [address, chain?.chainSelector],
            chainId: chain?.definition.id,
        });

        const { data: borrow }: any = useReadContract({
            address: chain?.EquitoXCore,
            abi: EQUITOXABI,
            functionName: "userBorrow",
            args: [chain?.chainSelector, address],
            chainId: chain?.definition.id,
        });

        const destinationChain = chains?.filter((chain) => {
            return chain.chainSelector == (borrow != undefined ? borrow[3] : 0);
        })[0];

        const sourceChain = chains.filter((chain) => {
            return chain.chainSelector == (borrow != undefined ? borrow[2] : 0);
        })[0];

        const { data: fees }: any = useReadContract({
            address: destinationChain?.RouterContract,
            abi: routerAbi,
            functionName: "getFee",
            args: [destinationChain?.RouterContract || NATIVE_ADDRESS],
            chainId: destinationChain?.definition.id,
        });

        const { data: HealthFactor } = useReadContract({
            address: chain?.EquitoXCore,
            abi: EQUITOXABI,
            functionName: "getHealthFactor",
            args: [address || NATIVE_ADDRESS],
            chainId: chain?.definition.id,
        });

        if (borrow == undefined || borrow[2] != chain.chainSelector) {
            continue;
        }
        if (borrow != undefined) {
            
            loans.push({
                loanId: loanIdCounter++,  
                source: sourceChain,
                destination: destinationChain,
                repaymentamount: repaymentamount,
                fees: fees,
                HealthFactor: Number(HealthFactor) / 100,
            });
        }
    }

    const handleClick = async (loan: any) => {
        switchChainAsync({ chainId: loan.destination?.definition.id });
        toast.loading("Wait for transaction.......");
        setIsTransactionPending(true);
        try {
            const txnHashRepay = await writeContractAsync({
                address: loan?.destination?.EquitoXCore,
                abi: EQUITOXABI,
                functionName: "repay",
                value: loan?.repaymentamount + loan?.fees,
                args: [loan?.source?.chainSelector, NATIVE_ADDRESS],
                chainId: loan.destination?.definition.id,
            });
            const sendReceipt = await waitForTransactionReceipt(config, {
                hash: txnHashRepay,
                chainId: loan?.destination?.definition.id,
            });
            const sentMessage = parseEventLogs({
                abi: routerAbi,
                logs: sendReceipt.logs,
            }).flatMap(({ eventName, args }) =>
                eventName === "MessageSendRequested" ? [args] : []
            )[0];

            const { sentPingTimestamp }: any = await getBlock(config, {
                chainId: loan.destination?.definition.id,
                blockNumber: sendReceipt.blockNumber,
            });

            const { proof } = await approve.execute({
                messageHash: generateHash(sentMessage.message),
                fromTimestamp: Number(sentPingTimestamp) * 1000,
                chainSelector: loan.destination?.chainSelector,
            });

            await switchChainAsync({ chainId: loan.source?.definition.id });

            const txnHashDeliverAndExecuteMessage = await writeContractAsync({
                address: loan.source?.RouterContract,
                abi: routerAbi,
                functionName: "deliverAndExecuteMessage",
                args: [sentMessage.message, sentMessage.messageData, BigInt(0), proof],
                chainId: loan.source?.definition.id,
            });

            await waitForTransactionReceipt(config, {
                hash: txnHashDeliverAndExecuteMessage,
                chainId: loan.source?.definition.id,
            });
            toast.dismiss()
            toast.success("Loan Repaid!");
        } catch (error) {
            console.error("Transaction error:", error);
            toast.dismiss();
            toast.error("An error occurred while repay the loan.");
        } finally {
            setIsTransactionPending(false);
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center w-full pt-5 mb-20 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
                {loans.length > 0 ? (
                    <table className="min-w-full border border-gray-200 rounded-lg table-auto bg-gray-900 text-white shadow-md z-0">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Loan ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source Chain</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Destination Chain</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Repayment Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Health Factor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan, idx) => (
                                <tr key={idx} className="hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.loanId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.source?.definition?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.destination?.definition?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatUnits(loan?.repaymentamount, 18)} {loan?.destination?.definition?.nativeCurrency?.symbol}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan?.HealthFactor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                            onClick={() => handleClick(loan)}
                                            disabled={isTransactionPending}
                                        >
                                            {isTransactionPending ? 'Processing...' : 'Pay Loan'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex border border-gray-100 p-20 text-center text-2xl font-bold text-red-600 z-0">User Don't have any loan</div>
                )}
            </div>
        </>
    );
};


export default RepayLoanAmount;
