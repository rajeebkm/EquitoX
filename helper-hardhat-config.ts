import { seiTestnet } from "viem/chains";

export interface networkConfigItem {
  chainId: number;
  chainSelector?: number;
  deployer: string;
  goldskySlug?: string;
  usdc?: string;
  usdcAdmin?: string;
  routerContract: string;

}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  hardhat: {
    chainId: 31337,
    deployer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  localhost: {
    chainId: 31337,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  ethSepolia: {
    chainId: 11155111,
    chainSelector: 1001,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  arbSepolia: {
    chainId: 421614,
    chainSelector: 1004,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x5C5386A7D14d9D6c24913386db74c20e36Bc436c"
  },
  opSepolia: {
    chainId: 11155420,
    chainSelector: 1006,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0xa5e465Be96341b4f1233eF334A4bac2e9Fd10981"
  },
  polygonAmoy: {
    chainId: 80002,
    chainSelector: 1003,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0xa5e465Be96341b4f1233eF334A4bac2e9Fd10981"
  },
  baseSepolia: {
    chainId: 84532,
    chainSelector: 1007,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x1EeF0D9b300B2Fca1BDB39481d23D16101B0E19B"
  },
  fantomTestnet: {
    chainId: 4002,
    chainSelector: 1008,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x045258c0Ecb1DEAeC2EA717fF0cC0dd23cF3AfC5"
  },
  lineaSepolia: {
    chainId: 59141,
    chainSelector: 1014,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34"
  },
  blastSepolia: {
    chainId: 168587773,
    chainSelector: 1018,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x496883645073B0e10C0D200C4f860024118C5e86"
  },
  scrollSepolia: {
    chainId: 534351,
    chainSelector: 1020,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x4D7E6e482c77e9142bf92490772f4466e8634bC4"
  },
  avalancheFuji: {
    chainId: 43113,
    chainSelector: 1005,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0xc75E01e91ba540A22bb85bdB60e6a830F3560777"
  },
  celoAlfajores: {
    chainId: 44787,
    chainSelector: 1009,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x5C5386A7D14d9D6c24913386db74c20e36Bc436c"
  },
  opBNBTestnet: {
    chainId: 5611,
    chainSelector: 1022,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0xc97c952D2ec7cF359F4848bFD4eb90303F5Fe631"
  },
  seiTestnet: {
    chainId: 1328,
    chainSelector: 1017,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x29FeBDd370c8bc815455d518AE38a79D1e200f52"
  },
};

export const forkedChain = ["localhost"];
export const testNetworkChains = ["ethSepolia"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
