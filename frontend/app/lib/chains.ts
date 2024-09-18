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
      pingPongContract: "0x2BA6E972739670dA840F1393F321f524D24DA079",
    },
    {
      chainSelector: 1002,
      name: "BNB Smart Chain Testnet",
      img: 1839,
      definition: bscTestnet,
      pingPongContract: "0xe2f05B08e9CF9278cc331376DCC184991B956Cfa",
    },
    {
      chainSelector: 1003,
      name: "Polygon Amoy",
      img: 3890,
      definition: polygonAmoy,
      pingPongContract: "0x79c440ABA2bB23D44fEB21bF1Cc6a37E0657E7Fd",
    },
    {
      chainSelector: 1004,
      name: "Arbitrum Sepolia",
      img: 11841,
      definition: arbitrumSepolia,
      pingPongContract: "0x420475cA23aA49c3d4DdA42D609f7bE142a82Ad9",
    },
    {
      chainSelector: 1005,
      name: "Avalanche Fuji",
      img: 5805,
      definition: avalancheFuji,
      pingPongContract: "0x79c440ABA2bB23D44fEB21bF1Cc6a37E0657E7Fd",
    },
    {
      chainSelector: 1006,
      name: "Optimism Sepolia",
      img: 11840,
      definition: optimismSepolia,
      pingPongContract: "0x757676a6a14271389E3496cFb11eEE86210502B4",
    },
    {
      chainSelector: 1007,
      name: "Base Sepolia",
      img: 9195,
      definition: baseSepolia,
      pingPongContract: "0xbC2ca9a5364DBd68d2c8Fb091E662Da952697B50",
    },
    {
      chainSelector: 1008,
      name: "Fantom Testnet",
      img: 3513,
      definition: fantomTestnet,
      pingPongContract: "0xbC2ca9a5364DBd68d2c8Fb091E662Da952697B50",
    },
    {
      chainSelector: 1009,
      name: "Celo Alfajores",
      img: 5567,
      definition: celoAlfajores,
      pingPongContract: "0x7863FEbeCdB96ef880CD0d44534a2334A86b3075",
    },
    {
      chainSelector: 1010,
      name: "Telos Testnet",
      img: 4660,
      definition: telosTestnet,
      pingPongContract: "0x77B5BbFe337Ba9cE2A6424Bd01F1D398772B5865",
    },
    {
      chainSelector: 1012,
      name: "Rollux Tanenbaum",
      img: 541,
      definition: rolluxTestnet,
      pingPongContract: "0xFCe87EADF6498139C980606663f775d7E44C135f",
    },
    {
      chainSelector: 1014,
      name: "Linea Sepolia",
      img: 27657,
      definition: lineaSepolia,
      pingPongContract: "0x974e51Bb569fD476bb570c03E227cA4723cA2091",
    },
    {
      chainSelector: 1015,
      name: "Oasis Emerald Testnet",
      img: 7653,
      definition: oasisEmeraldTestnet,
      pingPongContract: "0xca0BfbdA7a627E42cef246286f1A208c32362c34",
    },
    {
      chainSelector: 1016,
      name: "Merlin Testnet",
      img: 30712,
      definition: merlinTestnet,
      pingPongContract: "0x06483170e91AaA74d7A8E8f49eFb049136a1D181",
    },
    {
      chainSelector: 1017,
      name: "Sei EVM Atlantic",
      img: 23149,
      definition: seiEvmAtlantic,
      pingPongContract: "0x79B880BB92fa287255A1d8Ede1cC77d15dc361Ce",
    },
    {
      chainSelector: 1018,
      name: "Blast Sepolia",
      img: 28480,
      definition: blastSepolia,
      pingPongContract: "0xc97c952D2ec7cF359F4848bFD4eb90303F5Fe631",
    },
    {
      chainSelector: 1019,
      name: "Gnosis Chiado",
      img: 1659,
      definition: gnosisChiado,
      pingPongContract: "0x80b97071EAC4214345bb2580bbED3eee78a1CfD2",
    },
    {
      chainSelector: 1020,
      name: "Scroll Sepolia",
      img: 26998,
      definition: scrollSepolia,
      pingPongContract: "0x496883645073B0e10C0D200C4f860024118C5e86",
    },
    {
      chainSelector: 1021,
      name: "Mantle Sepolia",
      img: 27075,
      definition: mantleSepoliaTestnet,
      pingPongContract: "0x066dEcA8BB6d87bBe7f896f9490DefA4AA4DEcC1",
    },
    {
      chainSelector: 1022,
      name: "opBNB Testnet",
      img: 1839,
      definition: opBNBTestnet,
      pingPongContract: "0x8b671D34202fE0b07Ec701a02Dd0d5c36A90c79E",
    },
  ];
  
  export type Chain = {
    chainSelector: number;
    name: string;
    img: number;
    definition: Definition;
    pingPongContract: Address;
  };
  
  export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";