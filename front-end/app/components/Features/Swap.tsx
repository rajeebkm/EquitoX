import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const Swap = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-8 feature">
      <div className="px-2 md:px-8">
        <h2 className="flex font-serif items-center gap-2 text-2xl font-semibold">
          <span>Token Swap</span>
          <span>
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-lg font-serif opacity-75">
        Welcome to EquitoX, the ultimate cross-chain token swap platform designed to unlock the full potential of 
        your crypto assets. Whether you're trading across Ethereum, Binance Smart Chain, or other major networks,
        EquitoX enables seamless and secure token swaps with real-time, transparent pricing.
        With support for a wide range of assets like Ethereum, USDC, USDT, and DAI, you can manage your portfolio 
        across multiple chains without the hassle of intermediaries.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 feat-img-left" aria-hidden>
        <div className="relative col-start-1 row-start-1 w-full rounded-[8px] shadow-lg overflow-hidden">
          <img
            src="/hero.png"
            alt="token-swap-image"
            className="w-full h-full object-cover dark-img"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>

    </div>
  );
};

export default Swap;
