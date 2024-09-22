"use client"
import { Chain } from "../../../lib/chains";
import {
 Dispatch,
 PropsWithChildren,
 SetStateAction,
 createContext,
 useContext,
 useState,
 useMemo,
} from "react";
import { useRouter } from "./UseRouter";

export type EquitoState = {
 chain?: Chain;
 router: ReturnType<typeof useRouter>;
};

export type EquitoActions = {
 setChain: Dispatch<SetStateAction<Chain | undefined>>;
};

type Equito = EquitoState & EquitoActions;

export type ChainDirection = "from" | "to";

type EquitoContext =
 | {
   from: Equito;
   to: Equito;
   reset: VoidFunction;
 }
 | undefined;

const equitoContext = createContext<EquitoContext>(undefined);

export const EquitoProvider = ({ children }: PropsWithChildren<object>) => {
 const [fromChain, setFromChain] = useState<Equito["chain"]>();
 const [toChain, setToChain] = useState<Equito["chain"]>();

 const fromRouter = useRouter({
   chainSelector: fromChain?.chainSelector,
 });

 const toRouter = useRouter({
   chainSelector: toChain?.chainSelector,
 });

 const value = useMemo(
   () => ({
     from: {
       chain: fromChain,
       setChain: setFromChain,
       router: fromRouter,
     },
     to: {
       chain: toChain,
       setChain: setToChain,
       router: toRouter,
     },
     reset: () => {
       setFromChain(undefined);
       setToChain(undefined);
     },
   }),
   [fromChain, fromRouter, toChain, toRouter]
 );

 return (
   <equitoContext.Provider value={value}>{children}</equitoContext.Provider>
 );
};

export const useEquito = () => {
 const context = useContext(equitoContext);
 if (!context) {
   throw new Error("useEquito must be used within a EquitoProvider");
 }

 return context;
};
