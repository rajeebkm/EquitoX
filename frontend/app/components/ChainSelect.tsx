import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Check, ChevronsUpDown, Link } from "lucide-react";
import { Chain, chains } from "../lib/chains";
import { useSwitchChain } from "wagmi";
import { ChainDirection, useEquito } from "./Providers/Equito/EquitoProvider";
import toast from "react-hot-toast";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type ChainSelectProps = PopoverTriggerProps & {
  mode: ChainDirection;
};

export default function ChainSelect({ mode, disabled }: ChainSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { chain, setChain } = useEquito()[mode];
  const { switchChainAsync } = useSwitchChain();

  const onSelectChain = async (chain: Chain) => {
    setOpen(false);
    if (chain) {
      if (mode === "from") {
        try {
          await switchChainAsync({ chainId: chain.definition.id });
          setChain(chain);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message.split("\n")[0]
              : "Failed to switch chain";
          toast.error(message);
        }
      } else {
        setChain(chain);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          className={"w-full sm:w-72 flex items-center gap-2"}
          disabled={disabled}
        >
          <div className="flex items-center gap-1">
            {chain ? (
              <>
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${chain.img}.png`}
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt="logo-chain"
                />
                <p className="w-44 truncate">{chain.name}</p>
              </>
            ) : (
              <>
                <Link className={"h-4 w-4"} />
                Select chain
              </>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder={`Search...`} />
            <CommandEmpty>No results found.</CommandEmpty>
            {chains.map((item) => (
              <CommandItem
                className="text-md hover:cursor-pointer gap-1"
                onSelect={() => onSelectChain(item)}
                key={item.chainSelector}
              >
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.img}.png`}
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt="logo-chain"
                />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    chain?.chainSelector === item.chainSelector
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}