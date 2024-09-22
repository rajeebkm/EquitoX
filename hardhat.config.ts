import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-foundry";
import * as dotenv from "dotenv";
import "solidity-docgen";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-solhint";
dotenv.config();

const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN || "";
const TESTNET_API_KEY = process.env.TESTNET_API_KEY || "";
const MAINNET_API_KEY = process.env.TESTNET_API_KEY || "";
const ETHEREUM_SEPOLIA_RPC = process.env.ETHEREUM_SEPOLIA_RPC || "";
const ARBITRUM_SEPOLIA_RPC = process.env.ARBITRUM_SEPOLIA_RPC || "";
const OPTIMISM_SEPOLIA_RPC = process.env.OPTIMISM_SEPOLIA_RPC || "";
const POLYGON_AMOY_RPC = process.env.POLYGON_AMOY_RPC || "";
const BASE_SEPOLIA_RPC = process.env.BASE_SEPOLIA_RPC || "";
const FANTOM_SEPOLIA_RPC = process.env.FANTOM_SEPOLIA_RPC || "";
const LINEA_SEPOLIA_RPC = process.env.LINEA_SEPOLIA_RPC || "";
const BLAST_SEPOLIA_RPC = process.env.BLAST_SEPOLIA_RPC || "";
const SCROLL_SEPOLIA_RPC = process.env.SCROLL_SEPOLIA_RPC || "";
const AVALANCHE_FUJI_RPC = process.env.AVALANCHE_FUJI_RPC || "";
const CELO_ALFAJORES_RPC = process.env.CELO_ALFAJORES_RPC || "";
const OP_BNB_RPC = process.env.OP_BNB_RPC || "";

const config: HardhatUserConfig = {
  paths: {
    sources: "contracts",
    tests: "test",
  },
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 300,
      },
      viaIR: true,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      forking: {
        url: "",
      },
    },
    ethSepolia: {
      url: ETHEREUM_SEPOLIA_RPC,
      chainId: 11155111,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    arbSepolia: {
      url: ARBITRUM_SEPOLIA_RPC,
      chainId: 421614,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    opSepolia: {
      url: OPTIMISM_SEPOLIA_RPC,
      chainId: 11155420,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    polygonAmoy: {
      url: POLYGON_AMOY_RPC,
      chainId: 80002,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC,
      chainId: 84532,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    fantomTestnet: {
      url: FANTOM_SEPOLIA_RPC,
      chainId: 4002,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    lineaSepolia: {
      url: LINEA_SEPOLIA_RPC,
      chainId: 59141,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    blastSepolia: {
      url: BLAST_SEPOLIA_RPC,
      chainId: 168587773,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    scrollSepolia: {
      url: SCROLL_SEPOLIA_RPC,
      chainId: 534351,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    avalancheFuji: {
      url: AVALANCHE_FUJI_RPC,
      chainId: 43113,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    celoAlfajores: {
      url: CELO_ALFAJORES_RPC,
      chainId: 44787,
      accounts: [PRIVATE_KEY_ADMIN],
    },
    opBNBTestnet: {
      url: OP_BNB_RPC,
      chainId: 5611,
      accounts: [PRIVATE_KEY_ADMIN],
    },
  },
  abiExporter: {
    path: "./constants/abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 4,
    only: [
      "Diamond",
      "DiamondCutFacet",
      "DiamondLoupeFacet",
      "OwnershipFacet",
      "USDCEquitoX",
      "EquitoXCore",
    ],
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      testnet: TESTNET_API_KEY,
      mainnet: MAINNET_API_KEY,
    },
    customChains: [
      {
        network: "testnet",
        chainId: 11155111,
        urls: {
          apiURL: "",
          browserURL: "",
        },
      },
      {
        network: "mainnet",
        chainId: 1,
        urls: {
          apiURL: "",
          browserURL: "",
        },
      },
    ],
  },
  docgen: {
    outputDir: "./docs",
    pages: "files",
    collapseNewlines: true,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
    // only: [":ERC20$"]
  },
  gasReporter: {
    currency: "USD",
    enabled: false,
    excludeContracts: [],
    showTimeSpent: true,
    token: "MATIC",
  },
};

export default config;
