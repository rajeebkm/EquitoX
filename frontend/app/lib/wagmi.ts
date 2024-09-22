import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { chains } from "./chains";
import { type Chain as Definition } from "viem";


const chainDefinitions = chains.map((chain) => chain.definition) as [
    Definition
];

export const getChainTrasports = () =>
    chainDefinitions.reduce(
        (acc, { id }) => ({
            ...acc,
            [id]: http(),
        }),
        {}
    );

export const wagmiConfig: any = (() => {
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
    if (!projectId) {
        throw new Error("Missing VITE_WALLET_CONNECT_PROJECT_ID");
    }


    return getDefaultConfig({
        appName: "Equito PingPong",
        projectId,
        wallets: [
            ...getDefaultWallets().wallets,
            {
                groupName: "Other",
                wallets: [argentWallet, trustWallet, ledgerWallet],
            },
        ],
        chains: chainDefinitions,
    });
})();


export const config = (() => {
    return createConfig({
        chains: chainDefinitions,
        transports: getChainTrasports(),
    });
})();
