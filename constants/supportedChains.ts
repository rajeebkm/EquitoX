import {
  sepolia,
  bscTestnet,
  polygonAmoy,
  arbitrumSepolia,
  avalancheFuji,
  optimismSepolia,
  baseSepolia,
  fantomTestnet,
  celoAlfajores,
  mantleSepoliaTestnet,
  rolluxTestnet,
  lineaSepolia,
  blastSepolia,
  gnosisChiado,
  opBNBTestnet,
  telosTestnet,
  scrollSepolia,
  seiTestnet
} from "wagmi/chains";
import { Address, type Chain as Definition } from "viem";

const seiEvmAtlantic: Definition = {
  id: 1328,
  name: "Sei Atlantic",
  nativeCurrency: {
    decimals: 18,
    name: "SEI",
    symbol: "SEI",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-testnet.sei-apis.com"],
    },
  },
};

const merlinTestnet: Definition = {
  id: 686868,
  name: "Merlin Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BTC",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.merlinchain.io"],
    },
  },
};

const oasisEmeraldTestnet: Definition = {
  id: 42261,
  name: "Oasis Emerald Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ROSE",
    symbol: "ROSE",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.emerald.oasis.dev"],
    },
  },
};

export const chains: Chain[] = [
  {
    chainSelector: 1001,
    name: "Ethereum Sepolia",
    img: 1027,
    definition: sepolia,
    EquitoXCoreContract: "0x8e156eC4e2194526ee9E752170D1dF25C81965B1",
    RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  },
  // {
  //   chainSelector: 1002,
  //   name: "BNB Smart Chain Testnet",
  //   img: 1839,
  //   definition: bscTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  {
    chainSelector: 1003,
    name: "Polygon Amoy",
    img: 3890,
    definition: polygonAmoy,
    EquitoXCoreContract: "0xcd96D36cd8aEe0bd76ed1c0054c1289739d2AD3D",
    RouterContract: "0xa5e465Be96341b4f1233eF334A4bac2e9Fd10981",
  },
  {
    chainSelector: 1004,
    name: "Arbitrum Sepolia",
    img: 11841,
    definition: arbitrumSepolia,
    EquitoXCoreContract: "0x5a274CE5e4bd6e0C0f75d4B495a1b9237CEB54bB",
    RouterContract: "0x5C5386A7D14d9D6c24913386db74c20e36Bc436c",
  },
  // {
  //   chainSelector: 1005,
  //   name: "Avalanche Fuji",
  //   img: 5805,
  //   definition: avalancheFuji,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  {
    chainSelector: 1006,
    name: "Optimism Sepolia",
    img: 11840,
    definition: optimismSepolia,
    EquitoXCoreContract: "0xac9A9B500a313f4c1B980b4492d3F436376F9776",
    RouterContract: "0xa5e465Be96341b4f1233eF334A4bac2e9Fd10981",
  },
  {
    chainSelector: 1007,
    name: "Base Sepolia",
    img: 9195,
    definition: baseSepolia,
    EquitoXCoreContract: "0xac9A9B500a313f4c1B980b4492d3F436376F9776",
    RouterContract: "0x1EeF0D9b300B2Fca1BDB39481d23D16101B0E19B",
  },
  // {
  //   chainSelector: 1008,
  //   name: "Fantom Testnet",
  //   img: 3513,
  //   definition: fantomTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1009,
  //   name: "Celo Alfajores",
  //   img: 5567,
  //   definition: celoAlfajores,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1010,
  //   name: "Telos Testnet",
  //   img: 4660,
  //   definition: telosTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1012,
  //   name: "Rollux Tanenbaum",
  //   img: 541,
  //   definition: rolluxTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1014,
  //   name: "Linea Sepolia",
  //   img: 27657,
  //   definition: lineaSepolia,
  //   EquitoXCoreContract: "0x97fdd4C259EF60235A00718B04F5708Cccd1b7d9",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1015,
  //   name: "Oasis Emerald Testnet",
  //   img: 7653,
  //   definition: oasisEmeraldTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1016,
  //   name: "Merlin Testnet",
  //   img: 30712,
  //   definition: merlinTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1017,
  //   name: "Sei EVM Atlantic",
  //   img: 23149,
  //   definition: seiEvmAtlantic,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1018,
  //   name: "Blast Sepolia",
  //   img: 28480,
  //   definition: blastSepolia,
  //   EquitoXCoreContract: "0xc6DD3264b1C14897fFB9f578a4Cf14fC8D7C5C9B",
  //   RouterContract: "0x496883645073B0e10C0D200C4f860024118C5e86",
  // },
  // {
  //   chainSelector: 1019,
  //   name: "Gnosis Chiado",
  //   img: 1659,
  //   definition: gnosisChiado,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  {
    chainSelector: 1020,
    name: "Scroll Sepolia",
    img: 26998,
    definition: scrollSepolia,
    EquitoXCoreContract: "0x4595c0Fa428e4BE211566237041D1e4FEac7fda4",
    RouterContract: "0x4D7E6e482c77e9142bf92490772f4466e8634bC4",
  },
  // {
  //   chainSelector: 1021,
  //   name: "Mantle Sepolia",
  //   img: 27075,
  //   definition: mantleSepoliaTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  // {
  //   chainSelector: 1022,
  //   name: "opBNB Testnet",
  //   img: 1839,
  //   definition: opBNBTestnet,
  //   EquitoXCoreContract: "0xb9DA4a490895abB1D65cc85545C04850C391DD56",
  //   RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  // },
  {
    chainSelector: 1017,
    name: "Sei Testnet",
    img: 1328,
    definition: seiTestnet,
    EquitoXCoreContract: "0x697Ce475f23C39E75e674772C90E670c7a8A3155",
    RouterContract: "0x29FeBDd370c8bc815455d518AE38a79D1e200f52",
  },
];

export type Chain = {
  chainSelector: number;
  name: string;
  img: number;
  definition: Definition;
  EquitoXCoreContract?: Address;
  RouterContract?: Address;
};

export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
