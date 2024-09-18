import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";


import { cookieStorage, createStorage } from "wagmi";
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
    scrollSepolia
} from "wagmi/chains";


export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID not defined!");

const metadata = {
    name: "EquitoX",
    description: "Built with ❤️ by Team Bit Lords",
    url: "",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
}

const chains = [sepolia,
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
    scrollSepolia] as const;


export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    auth: {
        email: true,
        socials: ["google", "x", "github", "discord", "apple"],
        showWallets: true,
        walletFeatures: true
    },
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})