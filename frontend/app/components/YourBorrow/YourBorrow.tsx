"use client";

import React from "react";
import Image from "next/image";
import Navbar from "../Navbar";

interface TokenData {
    token: string;
    amount: string;
    imageUrl: string;
}

interface SpendStatus {
    status: string;
    icon: string;
    other: string;
}

interface BorrowData {
    id: string;
    borrowed: TokenData;
    borrowAPR: string;
    effectiveAPR: string;
    collateral: TokenData;
    spendStatus: SpendStatus;
    riskPremium: string;
}

const borrowData: BorrowData[] = [
    {
        id: "Borrow ID1",
        borrowed: {
            token: "dETH",
            amount: "0.029926",
            imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014",
        },
        borrowAPR: "8.5%",
        effectiveAPR: "3.2%",
        collateral: {
            token: "rDAI",
            amount: "19.962862",
            imageUrl: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=014",
        },
        spendStatus: {
            status: "LIQUIDITY",
            icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014",
            other: "1.234/2.23",
        },
        riskPremium: "N/A",
    },
    {
        id: "Borrow ID2",
        borrowed: {
            token: "dUSDT",
            amount: "3.612652",
            imageUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014",
        },
        borrowAPR: "3.5%",
        effectiveAPR: "3.2%",
        collateral: {
            token: "rUSDT",
            amount: "339.550924",
            imageUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014",
        },
        spendStatus: {
            status: "SWAP",
            icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=014",
            other: "1.234/2.23",
        },
        riskPremium: "N/A",
    },
];


const BorrowTable: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center w-full pt-5 mb-20 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
                <table className="min-w-full border border-gray-200 rounded-lg table-auto bg-gray-900 text-white shadow-md z-0">
                    <thead>
                        <tr className="text-gray-400 text-sm uppercase">
                            <th className="px-4 py-3 text-left">Borrow ID</th>
                            <th className="px-4 py-3 text-left">Borrowed</th>
                            <th className="px-4 py-3 text-left">Borrow APR</th>
                            <th className="px-4 py-3 text-left">Effective APR</th>
                            <th className="px-4 py-3 text-left">Collateral</th>
                            <th className="px-4 py-3 text-left">Spend Status</th>
                            <th className="px-4 py-3 text-left">Risk Premium</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="px-4 py-3">{item.id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        <Image
                                            src={item.borrowed.imageUrl}
                                            alt={item.borrowed.token}
                                            width={24}
                                            height={24}
                                            className="mr-2"
                                        />
                                        <div>
                                            <span>{item.borrowed.token}</span>
                                            <br />
                                            <span className="text-yellow-500">{item.borrowed.amount}</span>
                                        </div>
                                    </div>
                                </td>


                                <td className="px-4 py-3">{item.borrowAPR}</td>
                                <td className="px-4 py-3">{item.effectiveAPR}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        <Image
                                            src={item.collateral.imageUrl}
                                            alt={item.collateral.token}
                                            width={24}
                                            height={24}
                                            className="mr-2"
                                        />
                                        <div>
                                            <span>{item.collateral.token}</span>
                                            <br />
                                            <span className="text-yellow-500">{item.collateral.amount}</span>
                                        </div>
                                    </div>
                                </td>


                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        {item.spendStatus.icon && (
                                            <Image
                                                src={item.spendStatus.icon}
                                                alt={item.spendStatus.status}
                                                width={24}
                                                height={24}
                                                className="mr-2"
                                            />
                                        )}
                                        {item.spendStatus.icon && (
                                            <Image
                                                src={item.spendStatus.icon}
                                                alt={item.spendStatus.status}
                                                width={24}
                                                height={24}
                                                className="mr-2"
                                            />
                                        )}
                                        <div>
                                            <span>{item.spendStatus.status}</span>
                                            <br />
                                            <span>{item.spendStatus.other}</span>
                                        </div>
                                    </div>
                                </td>


                                <td className="px-4 py-3">
                                    {item.riskPremium === "N/A" ? "Not Applicable" : item.riskPremium}
                                </td>
                                <td className="px-4 py-3">
                                    <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">
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


export default BorrowTable;





