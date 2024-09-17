"use client";
import { useState } from 'react';
import Link from 'next/link';


const Navbar = () => {
    const [selectedLink, setSelectedLink] = useState('');


    return (
        <nav className="flex flex-row pt-20 mt-20 z-0">
            <div className="container px-6 flex justify-between">
                <div className="flex items-start space-x-6 z-0">
                    <Link href="/lending-borrowing" legacyBehavior>
                        <a
                            onClick={() => setSelectedLink('/market-dashboard')}
                            className={`text-lg transition-colors duration-200 ease-in-out ${selectedLink === '/market-dashboard'
                                ? 'text-white font-semibold border-b-2 border-white'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Markets
                        </a>
                    </Link>
                    <Link href="/spend-borrow" legacyBehavior>
                        <a
                            onClick={() => setSelectedLink('/spend-borrow')}
                            className={`text-lg transition-colors duration-200 ease-in-out ${selectedLink === '/spend-borrow'
                                ? 'text-white font-semibold border-b-2 border-white'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Spend Borrow
                        </a>
                    </Link>
                    <Link href="/your-supply" legacyBehavior>
                        <a
                            onClick={() => setSelectedLink('/your-supply')}
                            className={`text-lg transition-colors duration-200 ease-in-out ${selectedLink === '/your-supply'
                                ? 'text-white font-semibold border-b-2 border-white'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Your Supply
                        </a>
                    </Link>
                    <Link href="/your-borrow" legacyBehavior>
                        <a
                            onClick={() => setSelectedLink('/your-borrow')}
                            className={`text-lg transition-colors duration-200 ease-in-out ${selectedLink === '/your-borrow'
                                ? 'text-white font-semibold border-b-2 border-white'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            Your Borrow
                        </a>
                    </Link>
                </div>
            </div>


            <div className="container px-6 flex justify-end">
                <div className="flex items-end space-x-6 z-0">
                    <p className="text-gray-400">
                        Your Net Worth: <span className="font-semibold text-gray-200">$123,456</span>
                    </p>
                    <p className="text-gray-400">
                        Net APR: <span className="font-semibold text-gray-200">7.890%</span>
                    </p>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
