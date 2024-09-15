"use client";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";
import GithubIcon from "./svg/GithubIcon";
import UpRightArrowIcon from "./svg/UpRightArrowIcon";
import Features from "./components/Features/Features";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("/background.gif")',
          filter: "blur(6px)",
        }}
      ></div>

      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-10 mt-6 font-serif bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-16 mb-5 text-center lg:flex-row lg:text-left">
          <div className="flex flex-col w-full gap-6 lg:w-1/2">
            <h2 className="text-5xl font-extrabold text-gray-200 transition duration-700 ease-in-out transform md:text-6xl lg:text-7xl dark:text-gray-200 hover:scale-105">
              EquitoX
            </h2>
            <p className="text-lg text-gray-200 transition duration-700 ease-in-out transform md:text-3xl lg:text-2xl dark:text-gray-200 animate-fadeInDelay hover:scale-105">
              Boost your crypto earnings by lending and borrowing against your
              collateral
            </p>

            <div className="flex gap-4 z-0">
              <Link href="https://github.com/rajeebkm/EquitoX" legacyBehavior>
                <a className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white transition duration-700 ease-in-out bg-blue-600 border-2 border-blue-600 rounded-md shadow-md font-medium hover:bg-blue-600 hover:shadow-lg active:bg-blue-800 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <span>Welcome to EquitoX</span>
                  <GithubIcon />
                </a>
              </Link>
              <Link href="/" legacyBehavior>
                <a className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-black transition duration-700 ease-in-out bg-white border-2 border-blue-600 rounded-md shadow-md font-medium hover:bg-blue-600 hover:shadow-lg active:bg-white active:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <span>Start Exploring</span>
                  <UpRightArrowIcon />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex justify-center w-full lg:w-1/2 lg:justify-end">
            <Image
              className="relative transition duration-700 ease-in-out transform hover:scale-105 dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="/cryptohero.png"
              alt="hero page"
              width={600}
              height={150}
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-6xl text-center lg:text-left mt-10">
          <h2 className="text-xl font-extrabold text-gray-800 dark:text-gray-200 mt-10 z-0">
            SUPPORTED ASSETS
          </h2>
          <div className="flex justify-center gap-12 mt-6 z-0">
            <Image
              src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=034"
              alt="Ethereum"
              width={40}
              height={40}
            />
            <Image
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=034"
              alt="Bitcoin"
              width={60}
              height={60}
            />
            <Image
              src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=034"
              alt="USDC"
              width={60}
              height={60}
            />
            <Image
              src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=034"
              alt="USDT"
              width={60}
              height={60}
            />
            <Image
              src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=034"
              alt="DAI"
              width={60}
              height={60}
            />
            <Image
              src="https://cryptologos.cc/logos/starknet-token-strk-logo.svg?v=034"
              alt="STARK"
              width={60}
              height={60}
            />
          </div>
        </div>
      </div>
      <div className="relative z-0">
        <Features />
        <Footer />
      </div>
    </main>
  );
}
