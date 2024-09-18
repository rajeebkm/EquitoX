"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ChainCard } from '../ChainCard';

interface Token {
    imageUrl: string;
    token: string;
    walletBalance: string;
}

interface TokenDisplayProps {
    imageUrl: string;
    token: string;
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
    const [collateralAmount, setCollateralAmount] = useState<string>('');
    const [borrowAmount, setBorrowAmount] = useState<string>('');
    const [selectedCollateralToken, setSelectedCollateralToken] = useState<Token | null>(availableTokens[0] || null);
    const [selectedBorrowToken, setSelectedBorrowToken] = useState<Token | null>(availableTokens[0] || null);
    const [collateralDropdownOpen, setCollateralDropdownOpen] = useState(false);
    const [borrowDropdownOpen, setBorrowDropdownOpen] = useState(false);

    if (!isOpen || !selectedCollateralToken || !selectedBorrowToken) return null;

    const handleMaxCollateralClick = () => setCollateralAmount(selectedCollateralToken.walletBalance);
    const handleMaxBorrowClick = () => setBorrowAmount('MAX_BORROW');


    const handleTokenChange = (token: Token, type: 'collateral' | 'borrow') => {
        if (type === 'collateral') {
            setSelectedCollateralToken(token);
            setCollateralAmount('');
            setCollateralDropdownOpen(false);
        } else {
            setSelectedBorrowToken(token);
            setBorrowAmount('');
            setBorrowDropdownOpen(false);
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
                                    token={selectedCollateralToken.token}
                                />
                                <span className="text-gray-400">{collateralDropdownOpen ? '▲' : '▼'}</span>
                            </div>



                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 flex items-center justify-center"
                            >
                                <ChainCard mode="from" />
                            </div>
                        </div>


                        {collateralDropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-600 mt-1 rounded-lg z-10">
                                {availableTokens.map((token) => (
                                    <div
                                        key={token.token}
                                        className="flex items-center p-3 cursor-pointer hover:bg-gray-800"
                                        onClick={() => handleTokenChange(token, 'collateral')}
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


                    <InputWithMaxButton
                        label="Collateral Amount"
                        placeholder={`min 10 ${selectedCollateralToken.token}`}
                        value={collateralAmount}
                        onMaxButtonClick={handleMaxCollateralClick}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        additionalInfo={`Wallet Balance: ${selectedCollateralToken.walletBalance} ${selectedCollateralToken.token}`}
                    />
                </div>


                <div className="flex flex-col mb-4 bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium mb-2">Borrow Market</label>
                    <div className="relative mb-4">
                        <div className="flex space-x-3">
                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg w-full cursor-pointer flex items-center justify-between"
                                onClick={() => setBorrowDropdownOpen(!borrowDropdownOpen)}
                            >
                                <TokenDisplay
                                    imageUrl={selectedBorrowToken.imageUrl}
                                    token={selectedBorrowToken.token}
                                />
                                <span className="text-gray-400">{borrowDropdownOpen ? '▲' : '▼'}</span>
                            </div>
                            <div
                                className="bg-gray-900 text-white p-3 rounded-lg flex-1 flex items-center justify-center"
                            >
                                <ChainCard mode="to" />
                            </div>
                        </div>
                        {borrowDropdownOpen && (
                            <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-600 mt-1 rounded-lg z-10">
                                {availableTokens.map((token) => (
                                    <div
                                        key={token.token}
                                        className="flex items-center p-3 cursor-pointer hover:bg-gray-800"
                                        onClick={() => handleTokenChange(token, 'borrow')}
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
                    <InputWithMaxButton
                        label="Borrow Amount"
                        placeholder={`min 50 ${selectedBorrowToken.token}`}
                        value={borrowAmount}
                        onMaxButtonClick={handleMaxBorrowClick}
                        onChange={(e) => setBorrowAmount(e.target.value)}
                        additionalInfo="Available Reserves: 396.2K"
                    />
                </div>


                <div className="flex justify-between items-center mb-4 text-sm bg-gray-700 p-4 rounded-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Fees</span>
                        <span className="font-semibold">0%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400">Borrow APR</span>
                        <span className="font-semibold">11.50%</span>
                    </div>
                </div>


                <div className="mb-4">
                    <p className="text-sm text-white">
                        You have selected a native token as collateral which will be converted to rtokens 1rSTRK = 1.0188STRK
                    </p>
                </div>


                <button className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded-lg text-lg font-semibold transition duration-200">
                    Borrow
                </button>
            </div>
        </div>
    );
};


export default BorrowModal;