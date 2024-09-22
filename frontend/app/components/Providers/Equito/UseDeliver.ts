import { Hex } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import {
    useWriteContract,
    useWaitForTransactionReceipt,
    useSwitchChain,
} from "wagmi";
import { useCallback } from "react";
import { routerAbi } from "@equito-sdk/evm";
import { EquitoMessage } from "@equito-sdk/core";
import { config } from "../../../../config/index";
import { EquitoState } from "./EquitoProvider";


type UseDeliverArgs = {
    equito: EquitoState;
};

export const useDeliver = ({ equito: { chain, router } }: UseDeliverArgs) => {
    const { switchChainAsync } = useSwitchChain();
    const chainId = chain?.definition.id;
    const {
        data: hash,
        writeContractAsync,
        isPending,
        reset,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess,
        isError,
    } = useWaitForTransactionReceipt({
        hash,
        chainId,
        query: {
            enabled: !!hash && chainId !== undefined,
        },
    });

    const execute = useCallback(
        async (
            proof: Hex,
            message: EquitoMessage,
            messageData: Hex,
            fee?: bigint
        ) => {
            if (!chainId || !chain) {
                throw new Error("No chain found, please select a chain");
            }

            if (!router.data) {
                throw new Error("Router contract address not found");
            }

            try {
                await switchChainAsync({ chainId });
                const hash = await writeContractAsync({
                    address: router.data,
                    abi: routerAbi,
                    functionName: "deliverAndExecuteMessage",
                    ...(fee !== undefined && { value: fee }),
                    args: [message, messageData, BigInt(0), proof],
                    chainId,
                });

                return await waitForTransactionReceipt(config, {
                    hash,
                    chainId,
                });
            } catch (error) {
                console.log({ error });
                throw new Error("Transaction failed");
            }
        },
        [chain, chainId, router.data, switchChainAsync, writeContractAsync]
    );

    return {
        isPending,
        isConfirming,
        isSuccess,
        isError,
        execute,
        reset,
    };
};