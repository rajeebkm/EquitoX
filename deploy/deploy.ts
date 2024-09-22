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

  if (deployer?.toLowerCase() !== owner.toLowerCase()) {
    throw Error("Deployer must be the Owner");
  }

  let ozExist = fs.existsSync(
    `.openzeppelin/unknown-${network.config.chainId}.json`,
  );
  if (ozExist) {
    console.log(
      "%c Deleting existing OpenZeppelin deployment file",
      "color:red",
    );
    fs.rmSync(`.openzeppelin/unknown-${network.config.chainId}.json`);
  }

  // Deploy USDC and other Tokens contract (Mock tokens for testing)
  const startBlock: any = await ethers.provider.getBlock("latest");
  console.log(startBlock!.number);
  let USDC;
  if (networkName === "mainnet") {
    usdAddress = { target: "" };
  } else {
    USDC = await ethers.getContractFactory("USDCEquitoX");
    const usdcNew = await upgrades.deployProxy(USDC, [
      "USDC",
      "USDC",
      usdcAdmin,
    ]);
    usdAddress = await usdcNew.waitForDeployment();
    console.log("USDC deployed to:", usdAddress.target);
  }

  const Router = networkConfig[networkName].routerContract;

  // Deploy EquitoXCore contract
  const EquitoXCore = await ethers.getContractFactory("EquitoXCore");
  const equitoXCore = await EquitoXCore.deploy(Router);
  await equitoXCore.waitForDeployment();
  console.log("EquitoXCore deployed:", equitoXCore.target);

  // // Deploy DiamondCutFacet
  // const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet")
  // const diamondCutFacet = await DiamondCutFacet.deploy()
  // await diamondCutFacet.waitForDeployment()
  // console.log("DiamondCutFacet deployed:", diamondCutFacet.target)

  // const DiamondLoupeFacet = await ethers.getContractFactory("DiamondLoupeFacet")
  // const diamondLoupeFacet = await DiamondLoupeFacet.deploy()
  // await diamondLoupeFacet.waitForDeployment()
  // console.log("DiamondLoupeFacet deployed:", diamondLoupeFacet.target)

  // const OwnershipFacet = await ethers.getContractFactory("OwnershipFacet")
  // const ownershipFacet = await OwnershipFacet.deploy()
  // await ownershipFacet.waitForDeployment()
  // console.log("OwnershipFacet deployed:", ownershipFacet.target)

  // const DiamondInit = await ethers.getContractFactory("DiamondInit")
  // const diamondInit = await DiamondInit.deploy()
  // await diamondInit.waitForDeployment()
  // console.log("DiamondInit deployed:", diamondInit.target)

  // const Diamond = await ethers.getContractFactory("Diamond")
  // const diamond = await Diamond.deploy(owner, diamondCutFacet.target)
  // await diamond.waitForDeployment()
  // console.log(" Diamond deployed:", diamond.target)

  // // const FacetNames = ["DiamondLoupeFacet", "OwnershipFacet"]

  // const diamondLoupe = ["0xcdffacc6", "0x52ef6b2c", "0xadfca15e", "0x7a0ed627", "0x01ffc9a7"]

  // const ownershipF = ["0x8da5cb5b", "0xf2fde38b"]
  // const cut = []

  // // 0xc354bd6e
  // cut.push({
  //     facetAddress: diamondLoupeFacet.target,
  //     action: FacetCutAction.Add,
  //     functionSelectors: diamondLoupe
  // })

  // cut.push({
  //     facetAddress: ownershipFacet.target,
  //     action: FacetCutAction.Add,
  //     functionSelectors: ownershipF
  // })

  // const diamondCut = await ethers.getContractAt("IDiamondCut", diamond.target)

  // let functionCall = diamondInit.interface.encodeFunctionData("init", [
  //     usdAddress.target
  // ])
  // tx = await diamondCut.diamondCut(cut, diamondInit.target, functionCall)
  // console.log("Diamond cut tx: ", tx.hash)
  // txr = await tx.wait()
  // if (!txr?.status) {
  //     throw Error(`Diamond upgrade failed: ${tx.hash}`)
  // }
  // console.log("Completed diamond cut")

  // Settings
  const equitoXCoreFactory: any = await EquitoXCore.attach(equitoXCore.target);
  tx = await equitoXCoreFactory.setCollateralRatio("60");
  const crTx = await tx.wait(1);
  if (!crTx.status) {
    throw Error(`failed to setCollateralRatio: `);
  }

  tx = await equitoXCoreFactory.setLiquidationRatio("90");
  const lrTx = await tx.wait(1);
  if (!lrTx.status) {
    throw Error(`failed to setLiquidationRatio: `);
  }

  tx = await equitoXCoreFactory.setFeesInPercentagePer30Days("1");
  const feesTx = await tx.wait(1);

  if (!feesTx.status) {
    throw Error(`failed to setFeesInPercentagePer30Days: `);
  }

  let token0 = usdAddress.target;
  let nativeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  let chainSelectors = ["1", "1"];
  let tokens = [token0, nativeToken];

  let prices = ["1", "2500"];
  let chainSelectorsforPeers = ["1"];
  let peers = [equitoXCore.target];

  tx = await equitoXCoreFactory.setLendingAddress(
    chainSelectorsforPeers,
    peers,
  );
  const setLendingAddressTx = await tx.wait(1);

  if (!setLendingAddressTx.status) {
    throw Error(`failed to setLendingAddress: `);
  }
  tx = await equitoXCoreFactory.setTokenPrice(chainSelectors, tokens, prices);
  const setPriceTx = await tx.wait(1);
  if (!setPriceTx.status) {
    throw Error(`failed to setTokenPrice: `);
  }

  let contracts = [
    { name: "USDC", address: usdAddress.target },
    { name: "EquitoXCore", address: equitoXCore.target },
    { name: "Router", address: networkConfig[networkName].routerContract },
    // { name: "DiamondCutFacet", address: diamondCutFacet.target },
    // { name: "DiamondLoupeFacet", address: diamondLoupeFacet.target },
    // { name: "OwnershipFacet", address: ownershipFacet.target },
    // { name: "DiamondInit", address: diamondInit.target },
    // { name: "Diamond", address: diamond.target },
    { name: "StartBlock", address: startBlock.number },
    { name: "ChainID", address:   network.config.chainId},
  ];

  updateContractsJson(contracts);
  console.table(contracts);

  if (
    testNetworkChains.includes(networkName) &&
    process.env.ETHERSCAN_API_KEY &&
    process.env.VERIFY_CONTRACTS === "true"
  ) {
    console.log("Verifying...");
    await verify(usdAddress.target.toString(), []);
    await verify(equitoXCore.target.toString(), []);
    // await verify(diamondLoupeFacet.target.toString(), [])
    // await verify(diamondCutFacet.target.toString(), [])
    // await verify(ownershipFacet.target.toString(), [])
    // await verify(diamondInit.target.toString(), [])
    // await verify(diamond.target.toString(), [owner, diamondCutFacet.target])
  }
  console.log("🚀🚀🚀 Deployment Successful 🚀🚀🚀");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
