import { useQuery } from "@tanstack/react-query";
import { getEquitoClient } from "../../../lib/equito-client";

type UseRouterArgs = {
 chainSelector?: number;
};

export const useRouter = ({ chainSelector }: UseRouterArgs) =>
 useQuery({
   queryKey: ["routerContract", chainSelector],
   queryFn: async () =>
     await (await getEquitoClient()).getRouter(chainSelector || 0),
   enabled: !!chainSelector,
 });
