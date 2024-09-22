import { networkConfig, testNetworkChains } from "../helper-hardhat-config";
import { updateContractsJson } from "../utils/updateContracts";
import { ethers, upgrades, network } from "hardhat";
import verify from "../utils/verify";
import fs from "fs";

const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 };

const main = async () => {
  let tx, txr, usdAddress;
  const accounts = await ethers.getSigners();
  const networkName = network.name;
  console.log("Network Name: ", networkName);
  const owner = accounts[0].address;
  const deployer = networkConfig[networkName].deployer;
  const usdcAdmin = networkConfig[networkName].usdcAdmin;
  console.log("owner: ", owner,"\ndeployer: ", deployer)

  if (deployer?.toLowerCase() !== owner.toLowerCase()) {
    throw Error("Deployer must be the Owner");
  }

  const EquitoXCore = await ethers.getContractFactory("EquitoXCore");

  // Settings
  const equitoXCoreFactory: any = await EquitoXCore.attach("0x35f715e03A67c5E46157ad9CEe5C1519C8D69d29");
  console.log(await equitoXCoreFactory.getProtocolBalance());

  let token0 = "0x743a979fA7D5E100B37C0b464754Ff8391608286";
  let nativeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  let tokens = [token0, nativeToken];

  let chainSelectors = [networkConfig[networkName].chainSelector, networkConfig[networkName].chainSelector];

  let prices = ["1", "2500"];
  let chainSelectorsforPeers = [networkConfig[networkName].chainSelector];
  let peers = ["0x35f715e03A67c5E46157ad9CEe5C1519C8D69d29"];

  tx = await equitoXCoreFactory.setLendBorrowAddresses(
    chainSelectorsforPeers,
    peers,
  );
  const setLendBorrowAddressesTx = await tx.wait(1);

  if (!setLendBorrowAddressesTx.status) {
    throw Error(`failed to setLendBorrowAddresses: `);
  }
  tx = await equitoXCoreFactory.updateTokenPrices(chainSelectors, tokens, prices);
  const updateTokenPricesTx = await tx.wait(1);
  if (!updateTokenPricesTx.status) {
    throw Error(`failed to updateTokenPrices: `);
  }

};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
