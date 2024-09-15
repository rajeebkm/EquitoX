import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const Lend = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-8 feature">
            <div className="px-2 md:px-8">
                <h2 className="flex font-serif items-center text-2xl font-semibold gap-2">
                    <span>Lending</span>
                    <span>
                        <UpRightArrowIcon />
                    </span>
                </h2>
                <p className="text-lg font-serif opacity-75">
                EquitoX offers a powerful lending platform that allows users to unlock the full potential of their crypto assets.
                Whether you're looking to earn passive income by lending assets like Ethereum, USDC, USDT, or DAI, or need immediate
                access to funds for trading, EquitoX ensures a seamless and secure process. Our lending platform is designed with 
                flexibility and transparency, giving you complete control over your crypto collateral.
                </p>
            </div>
            <div
                className="md:p-4 grid grid-cols-1 grid-rows-1 feat-img-right"
                aria-hidden
            >
                <div className="relative col-start-1 row-start-1 w-90 rounded-[8px] shadow-lg overflow-hidden">
                    <img
                        src="/hero.png"
                        alt="lending-image"
                        className="w-full h-full object-cover dark-img"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default Lend;
