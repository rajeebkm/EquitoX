import {
  sepolia,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  scrollSepolia,
  polygonAmoy,
  // fantomTestnet,
  // celoAlfajores,
  // mantleSepoliaTestnet,
  // rolluxTestnet,
  // lineaSepolia,
  // blastSepolia,
  // gnosisChiado,
  // opBNBTestnet,
  // telosTestnet,
  // bscTestnet,

  // avalancheFuji,
} from "wagmi/chains";
import { Address, type Chain as Definition } from "viem";
// const seiEvmAtlantic: Definition = {
//   id: 1328,
//   name: "Sei Atlantic",
//   nativeCurrency: {
//     decimals: 18,
//     name: "SEI",
//     symbol: "SEI",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://evm-rpc-testnet.sei-apis.com"],
//     },
//   },
// };
// const merlinTestnet: Definition = {
//   id: 686868,
//   name: "Merlin Testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "BTC",
//     symbol: "BTC",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://testnet-rpc.merlinchain.io"],
//     },
//   },
// };
// const oasisEmeraldTestnet: Definition = {
//   id: 42261,
//   name: "Oasis Emerald Testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "ROSE",
//     symbol: "ROSE",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://testnet.emerald.oasis.dev"],
//     },
//   },
// };
export const chains: Chain[] = [
  {
    chainSelector: 1001,
    name: "Ethereum Sepolia",
    img: 1027,
    definition: sepolia,
    EquitoXCore: "0x992530cb1EC7E682bf625cF121D2f2E9ca75D4AC",
    RouterContract: "0x35D899517F07b1026e36F6418c53BC1305dCA5a5",
  },
  {
    chainSelector: 1004,
    name: "Arbitrum Sepolia",
    img: 11841,
    definition: arbitrumSepolia,
    EquitoXCore: "0x36F7B4fc0ad44D15510BDC2190E5cfAaEAE1a94D",
    RouterContract: "0x5C5386A7D14d9D6c24913386db74c20e36Bc436c",
  },
  {
    chainSelector: 1006,
    name: "Optimism Sepolia",
    img: 11840,
    definition: optimismSepolia,
    EquitoXCore: "0x9bAe9b1Cc2F9E1a4820D2204A899876f8F9c6A41",
    RouterContract: "0xa5e465Be96341b4f1233eF334A4bac2e9Fd10981",
  },
  {
    chainSelector: 1007,
    name: "Base Sepolia",
    img: 9195,
    definition: baseSepolia,
    EquitoXCore: "0x9bAe9b1Cc2F9E1a4820D2204A899876f8F9c6A41",
    RouterContract: "0x1EeF0D9b300B2Fca1BDB39481d23D16101B0E19B",
  },
  {
    chainSelector: 1020,
    name: "Scroll Sepolia",
    img: 26998,
    definition: scrollSepolia,
    EquitoXCore: "0x04dC87a8913362EfaAE26378eA35E0e25Cf704fB",
    RouterContract: "0x4D7E6e482c77e9142bf92490772f4466e8634bC4",
  },


  // {
  //   chainSelector: 1017,
  //   name: "Sei EVM Atlantic",
  //   img: 23149,
  //   definition: seiEvmAtlantic,
  //   EquitoXCore: "0xB18DB8cabC97546e4eB5B26AeDB4a56231fF10CC",
  //   RouterContract: "0x29FeBDd370c8bc815455d518AE38a79D1e200f52",
  // },

  // {
  //   chainSelector: 1003,
  //   name: "Polygon Amoy",
  //   img: 3890,
  //   definition: polygonAmoy,
  //   EquitoXCore: "0xcd96D36cd8aEe0bd76ed1c0054c1289739d2AD3D",
  //   RouterContract: "0xa5e465Be96341b4f1233eF334A4bac2e9Fd10981",
  // },


  // {
  //   chainSelector: 1002,
  //   name: "BNB Smart Chain Testnet",
  //   img: 1839,
  //   definition: bscTestnet,
  //   EquitoXCore: "0x97fdd4C259EF60235A00718B04F5708Cccd1b7d9",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1008,
  //   name: "Fantom Testnet",
  //   img: 3513,
  //   definition: fantomTestnet,
  //   EquitoXCore: "0xbC2ca9a5364DBd68d2c8Fb091E662Da952697B50",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1009,
  //   name: "Celo Alfajores",
  //   img: 5567,
  //   definition: celoAlfajores,
  //   EquitoXCore: "0x7863FEbeCdB96ef880CD0d44534a2334A86b3075",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1010,
  //   name: "Telos Testnet",
  //   img: 4660,
  //   definition: telosTestnet,
  //   EquitoXCore: "0x77B5BbFe337Ba9cE2A6424Bd01F1D398772B5865",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1012,
  //   name: "Rollux Tanenbaum",
  //   img: 541,
  //   definition: rolluxTestnet,
  //   EquitoXCore: "0xFCe87EADF6498139C980606663f775d7E44C135f",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1014,
  //   name: "Linea Sepolia",
  //   img: 27657,
  //   definition: lineaSepolia,
  //   EquitoXCore: "0x974e51Bb569fD476bb570c03E227cA4723cA2091",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1015,
  //   name: "Oasis Emerald Testnet",
  //   img: 7653,
  //   definition: oasisEmeraldTestnet,
  //   EquitoXCore: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1016,
  //   name: "Merlin Testnet",
  //   img: 30712,
  //   definition: merlinTestnet,
  //   EquitoXCore: "0x06483170e91AaA74d7A8E8f49eFb049136a1D181",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },

  // {
  //   chainSelector: 1018,
  //   name: "Blast Sepolia",
  //   img: 28480,
  //   definition: blastSepolia,
  //   EquitoXCore: "0xc97c952D2ec7cF359F4848bFD4eb90303F5Fe631",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1019,
  //   name: "Gnosis Chiado",
  //   img: 1659,
  //   definition: gnosisChiado,
  //   EquitoXCore: "0x80b97071EAC4214345bb2580bbED3eee78a1CfD2",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1005,
  //   name: "Avalanche Fuji",
  //   img: 5805,
  //   definition: avalancheFuji,
  //   EquitoXCore: "0x79c440ABA2bB23D44fEB21bF1Cc6a37E0657E7Fd",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1021,
  //   name: "Mantle Sepolia",
  //   img: 27075,
  //   definition: mantleSepoliaTestnet,
  //   EquitoXCore: "0x066dEcA8BB6d87bBe7f896f9490DefA4AA4DEcC1",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
  // {
  //   chainSelector: 1022,
  //   name: "opBNB Testnet",
  //   img: 1839,
  //   definition: opBNBTestnet,
  //   EquitoXCore: "0x8b671D34202fE0b07Ec701a02Dd0d5c36A90c79E",
  //   RouterContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
  // },
];
export type Chain = {
  chainSelector: number;
  name: string;
  img: number;
  definition: Definition;
  EquitoXCore: Address;
  RouterContract: Address;
};
export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
