"use client";
import React from "react";
import Image from 'next/image';
import Navbar from "../Navbar";

interface TokenStatus {
    staked: string;
    locked: string;
    unlocked: string;
}

interface TokenIcons {
    S: boolean;
    U: boolean;
    L: boolean;
}

interface TokenData {
    token: string;
    amount: string;
    exchangeRate: string;
    supplyAPR: string;
    effectiveAPR: string;
    status: TokenStatus;
    icons: TokenIcons;
    imageUrl: string;
}

const YourSupply: React.FC = () => {
    const data: TokenData[] = [
        {
            token: "rUSDT",
            amount: "0.0007",
            exchangeRate: "1.015",
            supplyAPR: "70.00%",
            effectiveAPR: "70.00%",
            status: {
                staked: "9.9691",
                locked: "0.0000",
                unlocked: "0.0000",
            },
            icons: { S: true, U: true, L: true },
            imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=034',
        },
        {
            token: "rBTC",
            amount: "0.0143",
            exchangeRate: "1.005",
            supplyAPR: "2.49%",
            effectiveAPR: "2.49%",
            status: {
                staked: "9.9691",
                locked: "0.0000",
                unlocked: "0.0000",
            },
            icons: { S: true, U: true, L: true },
            imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=034',
        },
        {
            token: "rUSDC",
            amount: "9.9691",
            exchangeRate: "1.003",
            supplyAPR: "0.85%",
            effectiveAPR: "1.03%",
            status: {
                staked: "9.9691",
                locked: "0.0000",
                unlocked: "0.0000",
            },
            icons: { S: true, U: true, L: true },
            imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=034',
        },
        {
            token: "rDAI",
            amount: "21.981",
            exchangeRate: "1.001",
            supplyAPR: "0.50%",
            effectiveAPR: "0.51%",
            status: {
                staked: "9.9691",
                locked: "0.0000",
                unlocked: "0.0000",
            },
            icons: { S: true, U: true, L: true },
            imageUrl: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=034',
        },
    ];


    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center w-full pt-5 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
                <table className="min-w-full border border-gray-200 rounded-lg table-auto bg-gray-900 text-white shadow-md z-0">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                rToken
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                rToken Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Exchange Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Supply APR
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Effective APR
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.token}
                                        width={30}
                                        height={30}
                                        className="mr-2"
                                    />
                                    <span>{item.token}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.exchangeRate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.supplyAPR}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.effectiveAPR}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        {item.icons.S && (
                                            <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                                                S
                                            </span>
                                        )}
                                        <span>{item.status.staked}</span>
                                        {item.icons.U && (
                                            <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">
                                                U
                                            </span>
                                        )}
                                        <span>{item.status.unlocked}</span>
                                        {item.icons.L && (
                                            <span className="bg-gray-500 text-white rounded-full px-2 py-1 text-xs">
                                                L
                                            </span>
                                        )}
                                        <span>{item.status.locked}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">
                                        Actions
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default YourSupply;




