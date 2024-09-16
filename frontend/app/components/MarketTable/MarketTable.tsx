"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import SupplyModal from './SupplyModal';
import BorrowModal from './BorrowModal';


interface TokenData {
 token: string;
 price: string;
 supply: string;
 borrow: string;
 available: string;
 utilization: string;
 supplyAPR: string;
 boostedAPR: string;
 borrowAPR: string;
 walletBalance: string;
 imageUrl: string;
}


const data: TokenData[] = [
 {
   token: 'USDT',
   price: '1.0000',
   supply: '98.33K',
   borrow: '76.66K',
   available: '21.67K',
   utilization: '77.96%',
   supplyAPR: '9.670%',
   boostedAPR: '12.253%',
   borrowAPR: '20.540%',
   walletBalance: '0.0000',
   imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=034',
 },
 {
   token: 'USDC',
   price: '1.0000',
   supply: '133.3K',
   borrow: '105.6K',
   available: '27.74K',
   utilization: '79.19%',
   supplyAPR: '11.640%',
   boostedAPR: '12.540%',
   borrowAPR: '25.040%',
   walletBalance: '0.0000',
   imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=034',
 },
 {
   token: 'wETH',
   price: '2.277K',
   supply: '107.4K',
   borrow: '57.29K',
   available: '50.11K',
   utilization: '53.34%',
   supplyAPR: '3.450%',
   boostedAPR: '13.473%',
   borrowAPR: '10.890%',
   walletBalance: '0.0000',
   imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=034',
 },
 {
   token: 'wBTC',
   price: '58.55K',
   supply: '0.1046',
   borrow: '0.0276',
   available: '0.0770',
   utilization: '26.38%',
   supplyAPR: '1.640%',
   boostedAPR: '11.490%',
   borrowAPR: '11.490%',
   walletBalance: '0.0000',
   imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=034',
 },
 {
   token: 'DAI',
   price: '1.0000',
   supply: '2.464K',
   borrow: '481.06',
   available: '1.983K',
   utilization: '19.51%',
   supplyAPR: '0.760%',
   boostedAPR: '11.490%',
   borrowAPR: '11.490%',
   walletBalance: '0.0000',
   imageUrl: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=034',
 },
];


const MarketTable = () => {
 const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);
 const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
 const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);


 const handleSupplyClick = (token: TokenData) => {
   setSelectedToken(token);
   setIsSupplyModalOpen(true);
 };


 const handleBorrowClick = (token: TokenData) => {
   setSelectedToken(token);
   setIsBorrowModalOpen(true);
 };


 const handleCloseModal = () => {
   setIsSupplyModalOpen(false);
   setIsBorrowModalOpen(false);
   setSelectedToken(null);
 };


 return (
   <div className="flex flex-col items-center justify-center w-full mt-12 pt-20 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg">
     <div className="w-full mb-6 flex font-sans flex-col sm:flex-row justify-between items-center z-0">
       <h1 className="text-4xl font-bold text-gray-200 dark:text-gray-200 mb-2 sm:mb-0">
         Markets
       </h1>
       <div className="text-lg flex flex-col sm:flex-row mb-2 sm:mb-0">
         <p className="mb-2 sm:mr-6 text-gray-400">Your Net Worth: <span className="font-semibold text-gray-200">$123,456</span></p>
         <p className="mb-2 sm:mr-6 text-gray-400">Net APR: <span className="font-semibold text-gray-200">7.890%</span></p>
       </div>
     </div>


     <table className="min-w-full border border-gray-200 rounded-lg table-auto bg-gray-900 text-white shadow-md z-0">
       <thead>
         <tr>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Market
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Price
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Total Supply
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Total Borrow
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Available
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Utilization
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Supply APR
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Borrow APR
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
             Actions
           </th>
         </tr>
       </thead>
       <tbody>
         {data.map((token, idx) => (
           <tr key={idx} className="hover:bg-gray-800">
             <td className="px-6 py-4 whitespace-nowrap flex items-center">
               <Image
                 src={token.imageUrl}
                 alt={token.token}
                 width={30}
                 height={30}
                 className="mr-2"
               />
               <span className="mr-2">{token.token}</span>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">{token.price}</td>
             <td className="px-6 py-4 whitespace-nowrap">{token.supply}</td>
             <td className="px-6 py-4 whitespace-nowrap">{token.borrow}</td>
             <td className="px-6 py-4 whitespace-nowrap">{token.available}</td>
             <td className="px-6 py-4 whitespace-nowrap">{token.utilization}</td>
             <td className="px-6 py-4 whitespace-nowrap">
               <div>{token.supplyAPR}</div>
               <div className="text-green-500">{token.boostedAPR}</div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               <div>{token.borrowAPR}</div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               <button className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleSupplyClick(token)}>
                 Supply
               </button>
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 ml-2 rounded" onClick={() => handleBorrowClick(token)}>
                 Borrow
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     <SupplyModal isOpen={isSupplyModalOpen} onClose={handleCloseModal} availableTokens={data} />
     <BorrowModal isOpen={isBorrowModalOpen} onClose={handleCloseModal} availableTokens={data} />
   </div>
 );
};


export default MarketTable;





