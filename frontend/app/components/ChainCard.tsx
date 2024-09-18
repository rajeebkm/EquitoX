import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import ChainSelect from "./ChainSelect";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { Skeleton } from "./ui/skeleton";
import { ChainDirection, useEquito } from "./Providers/Equito/EquitoProvider";

type ChainCardProps = {
  mode: ChainDirection;
};


export const ChainCard = ({ mode }: ChainCardProps) => {

  const { address } = useAccount();
  const { chain } = useEquito()[mode];
  const pingMessage: any = "hello"
  const setPingMessage: any = "hello"
  const pongMessage: any = "hello"
  const status: any = ''
  const pingFee: any = 9
  const pongFee: any = 90

  const onInput = mode === "from" ? setPingMessage : undefined;
  const cardTitle = `${mode === "from" ? "Source" : "Destination"} Chain`;
  const value =
    mode === "from"
      ? pingMessage
      : pongMessage
        ? pongMessage
        : "Waiting for ping...";
  const label = `${mode === "from" ? "Ping" : "Pong"} Message`;

  const nativeCurrency = chain?.definition.nativeCurrency.symbol;
  const transactionFee = (mode === "from" ? pingFee : pongFee).fee;
  const isTransactionFeeLoading = (mode === "from" ? pingFee : pongFee)
    .isLoading;

  const isProcessing =
    status !== "isIdle" && status !== "isError" && status !== "isSuccess";

  return (
    <div className="flex gap-1">
      <ChainSelect mode={mode} disabled={!address} />
      {isTransactionFeeLoading ? (
        <Skeleton className="w-full h-2" />
      ) : (
        <p className="text-muted-foreground text-sm h-2">
          {!chain
            ? ""
            : transactionFee === undefined
              ? "Fee not found"
              : `Fee: ${Number(formatUnits(transactionFee, 18)).toFixed(
                8
              )} ${nativeCurrency}`}
        </p>
      )}
    </div>
  );
};


