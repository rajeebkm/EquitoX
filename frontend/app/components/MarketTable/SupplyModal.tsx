"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Token {
    imageUrl: string;
    token: string;
    walletBalance: string;
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

    if (!isOpen || !selectedToken) return null;

    const handleMaxClick = () => setAmount(selectedToken.walletBalance);
    const handleTokenChange = (token: Token) => {
        setSelectedToken(token);
        setAmount('');
        setDropdownOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-gray-800 text-white rounded-lg p-4 w-full max-w-lg shadow-2xl">
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
                        <div
                            className="bg-gray-900 text-white p-3 rounded-lg border border-gray-600 w-full cursor-pointer flex items-center justify-between"
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
                        {dropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-600 mt-1 rounded-lg z-10">
                                {availableTokens.map((token) => (
                                    <div
                                        key={token.token}
                                        className="flex items-center p-3 cursor-pointer hover:bg-gray-800"
                                        onClick={() => handleTokenChange(token)}
                                    >
                                        <Image
                                            src={token.imageUrl}
                                            alt={token.token}
                                            width={30}
                                            height={30}
                                            className="mr-3 rounded-full"
                                        />
                                        <span>{token.token}</span>
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
                            Wallet Balance: {selectedToken.walletBalance} {selectedToken.token}
                        </span>
                    </div>
                </div>


                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">You will receive</label>
                    <input
                        type="text"
                        disabled
                        value={`1 r${selectedToken.token}`}
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
                        <span className="text-gray-400">STRK APR</span>
                        <span className="font-semibold">12.694%</span>
                    </div>
                </div>


                <button className="w-full bg-green-600 hover:bg-green-500 p-2 rounded-lg text-lg font-semibold transition duration-200">
                    Supply
                </button>
            </div>
        </div>
    );
};

export default SupplyModal;
