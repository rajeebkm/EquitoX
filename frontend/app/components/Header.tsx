"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {

  return (
    <>
      <header className="w-full fixed backdrop-2xl font-serif font-bold light:border-neutral-800 lg:bg-white lg:light:bg-zinc-800/50 left-0 top-0 z-10 flex flex-wrap gap-4 py-2 px-2 md:py-1 md:px-10 justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/">
            <div className="">
              <Image
                className="border border-transparent"
                src="/logo.png"
                alt="logo"
                width={90}
                height={70}
              />
            </div>
          </a>
        </div>

        <div className="flex items-center gap-4 ml-auto md:flex md:gap-8">
          <Link href="/" legacyBehavior>
            <a className="text-gery-300 text-xl hover:underline text-blue-600">Pools</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gery-300 text-xl hover:underline text-blue-600">Swap</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gery-300 text-xl hover:underline text-blue-600">Lend & Borrow</a>
          </Link>
        </div>

        <div className="hidden md:flex gap-8">
          <div className="flex items-center">
            <w3m-button />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
