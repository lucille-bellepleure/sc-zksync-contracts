import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
const { readFileSync } = require("fs");

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the contract(s)`);
  const getWallet = () => {
    const json = JSON.parse(readFileSync("./wallet.json"));
    return Wallet.fromMnemonic(json.phrase, json.path, json.locale);
  };

  // Initialize the wallet.
  const wallet = getWallet();

  console.log('got wallet. ', wallet.address)

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);

  console.log('got deployer', deployer)

  //const erc20 = await deployer.loadArtifact("ERC20zkSWT");
  const marketplaceList = await deployer.loadArtifact("MarketplaceList")

  console.log('got marketplaceList', marketplaceList)

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });

  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();
  //console.log('got deposit', deposit.transactionHash)

  // Deploy the contracts. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
   //  const erc20instance = await deployer.deploy(erc20, []);
  const marketplaceListInstance = await deployer.deploy(marketplaceList, []);

  // Show the contract info.
  const contractAddress = marketplaceListInstance.address;
  console.log(`${marketplaceListInstance.contractName} was deployed to ${contractAddress}`);

}