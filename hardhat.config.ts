import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@openzeppelin/hardhat-upgrades"
import "@nomicfoundation/hardhat-foundry"
import * as dotenv from "dotenv"
import "solidity-docgen"
import "hardhat-abi-exporter"
import "hardhat-contract-sizer"
import "@nomiclabs/hardhat-solhint"
dotenv.config()

const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN || ""
const TESTNET_API_KEY = process.env.TESTNET_API_KEY || ""
const MAINNET_API_KEY = process.env.TESTNET_API_KEY || ""

const config: HardhatUserConfig = {
  paths: {
    sources: "contracts",
    tests: "test"
  },
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 300
      },
      viaIR: true
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      chainId: 31337,
      forking: {
        url: ""
      }
    },
    testnet: {
      url: "",
      chainId: 11155111,
      accounts: [PRIVATE_KEY_ADMIN]
    },
    mainnet: {
      url: "",
      chainId: 1,
      accounts: [PRIVATE_KEY_ADMIN]
    }
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
      "Lend",
      "Borrow",
      "USDCEquitoX"
    ]
  },
  sourcify: {
    enabled: false
  },
  etherscan: {
    apiKey: {
        testnet: TESTNET_API_KEY,
        mainnet: MAINNET_API_KEY
    },
    customChains: [
        {
            network: "testnet",
            chainId: 11155111,
            urls: {
                apiURL: "",
                browserURL: ""
            }
        },
        {
            network: "mainnet",
            chainId: 1,
            urls: {
                apiURL: "",
                browserURL: ""
            }
        }
    ]
},
  docgen: {
    outputDir: "./docs",
    pages: "files",
    collapseNewlines: true
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true
    // only: [":ERC20$"]
  },
  gasReporter: {
    currency: "USD",
    enabled: false,
    excludeContracts: [],
    showTimeSpent: true,
    token: "MATIC"
  }
}

export default config
