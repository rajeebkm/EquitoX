import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const Borrow = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse md:items-center gap-8 feature">
      <div className="px-2 md:px-8">
        <h2 className="flex font-serif items-center gap-2 text-2xl font-semibold">
          <span>Borrowing</span>
          <span>
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-lg font-serif opacity-75">
        EquitoX borrowing feature empowers users to access liquidity without selling their crypto assets. 
        By leveraging your existing tokens as collateral, you can borrow stablecoins or other cryptocurrencies,
        maintaining your portfolio's long-term potential while gaining immediate access to funds.
        Whether you're looking to capitalize on a new investment opportunity or cover short-term needs, 
        EquitoX allows you to borrow against assets like Ethereum, USDC, USDT, or DAI with ease and transparency.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 feat-img-left" aria-hidden>
        <div className="relative col-start-1 row-start-1 w-90 rounded-[8px] shadow-lg overflow-hidden">
          <img
            src="/borrowing.png"
            alt="borrowing-image"
            className="w-full h-full object-cover dark-img"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>

    </div>
  );
};

export default Borrow;
