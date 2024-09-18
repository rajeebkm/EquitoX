import { EquitoClient } from "@equito-sdk/client";

let client: EquitoClient;

export const getEquitoClient = async () => {
  if (!client) {
    const wsProvider ="wss://aleph.testequito.live";
    const archiveWsProvider = "wss://aleph.testequito.live";
    if (!wsProvider || !archiveWsProvider) {
      throw new Error(
        "Missing environment variables NEXT_TESTNET_WS_ENDPOINT and NEXT_TESTNET_ARCHIVE_WS_ENDPOINT for Equito client"
      );
    }

    client = await EquitoClient.create({
      wsProvider,
      archiveWsProvider,
    });
  }
  return client;
};