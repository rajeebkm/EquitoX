export interface networkConfigItem {
  chainId: number;
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
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  arbSepolia: {
    chainId: 421614,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  opSepolia: {
    chainId: 11155420,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  polygonAmoy: {
    chainId: 80002,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  baseSepolia: {
    chainId: 84532,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  fantomTestnet: {
    chainId: 4002,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  lineaSepolia: {
    chainId: 59141,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  blastSepolia: {
    chainId: 168587773,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  scrollSepolia: {
    chainId: 534351,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  avalancheFuji: {
    chainId: 43113,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  celoAlfajores: {
    chainId: 44787,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
  opBNBTestnet: {
    chainId: 5611,
    deployer: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    usdcAdmin: "0x2dC727b15203992B65D7ADbc0108781f1Cb1F9F3",
    routerContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5"
  },
};

export const forkedChain = ["localhost"];
export const testNetworkChains = ["ethSepolia"];
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
