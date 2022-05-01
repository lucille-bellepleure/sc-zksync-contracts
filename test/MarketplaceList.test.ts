import { expect } from "chai";
import { Wallet, Provider, Contract } from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
const { readFileSync } = require("fs");


async function deployMarketplaceList(deployer: Deployer): Promise<Contract> {
  const artifact = await deployer.loadArtifact("MarketplaceList");
  return await deployer.deploy(artifact, []);
}

const getWallet = () => {
    const json = JSON.parse(readFileSync("./wallet.json"));
    return Wallet.fromMnemonic(json.phrase, json.path, json.locale);
  };

  // Initialize the wallet.
  const wallet = getWallet();

describe("MarketplaceList", function () {
  it("Should deploy a marketplace", async function () {

    console.log('hi ', wallet.privateKey)

    const deployer = new Deployer(hre, wallet);

    const marketplaceList = await deployMarketplaceList(deployer);

    //expect(await greeter.greet()).to.eq("Hi");
    console.log(marketplaceList)

    const addMarketplace = await marketplaceList.addMarketplace("Dan", "swarmIpfs", "0x100205C8BC182222299f95c7cD42D53ab133f72a")
    // wait until the transaction is mined
    await addMarketplace.wait();

    expect(await marketplaceList.readMarketplace(0)).to.equal("Hola, mundo!");
  });
});