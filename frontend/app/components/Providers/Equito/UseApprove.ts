import { useMutation } from "@tanstack/react-query";
import { Hex } from "viem";
import { getEquitoClient } from "../../../lib/equito-client";
import { useState } from "react";

const baseExplorerUrl = "https://explorer.equito.network/messages";

type ExecuteArgs = {
    messageHash: Hex;
    fromTimestamp: number;
    chainSelector: number;
};

export const useApprove: any = () => {
    const [txLink, setTxLink] = useState<string | undefined>();

    const { mutateAsync: execute, ...rest } = useMutation({
        mutationFn: async ({
            messageHash,
            fromTimestamp,
            chainSelector,
        }: ExecuteArgs) => {
            const equitoClient = await getEquitoClient();

            try {
                const { proof, timestamp } = await equitoClient.getConfirmationTime({
                    chainSelector,
                    messageHash,
                    fromTimestamp,
                    listenTimeout: 100,
                });

                setTxLink(`${baseExplorerUrl}?hash=${messageHash}`);
                return { proof, timestamp };
            } catch (error) {
                console.warn(
                    "Error getting confirmation time for ",
                    messageHash,
                    "\n",
                    error
                );

                let proof: Hex | undefined;
                do {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    proof = await equitoClient.getProof(messageHash, chainSelector);
                    if (!proof) {
                        console.warn(`No proof found for ${messageHash} `);
                    }
                } while (!proof);

                setTxLink(`${baseExplorerUrl}?hash=${messageHash}`);
                return { proof, timestamp: undefined };
            }
        },
    });
    return { txLink, execute, ...rest };
};
