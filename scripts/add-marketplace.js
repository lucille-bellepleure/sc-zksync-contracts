//const { ethers } = require('ethers')
const { HardhatRuntimeEnvironment } = require("hardhat/types");
const { readFileSync } = require("fs");
const { networkInterfaces } = require("os");
const { getWallet } = require("./get-wallet");
const { getDefaultProvider } = require("ethers");
const { Wallet, Provider } = require("zksync-web3");
const hre = require("hardhat");

// scripts/index.js
async function main () {

const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");

const ethereumProvider = getDefaultProvider("goerli");
const wallet = new Wallet(
  getWallet().privateKey,
  zkSyncProvider,
  ethereumProvider
);

  const MarketplaceListInstance = await hre.ethers.getContractAt("MarketplaceList", "0x9D619a62Eae798fB7b0c651efbcF49c2B5304a06", wallet);
  console.log(await MarketplaceListInstance.owner())

  const getTotal = await MarketplaceListInstance.numberOfMarketplaces()   
  console.log('num of marketplaces: ', getTotal.toNumber())

  const addMarketplace = await MarketplaceListInstance.addMarketplace("Dan", "swarmIpfs", "0x100205C8BC182222299f95c7cD42D53ab133f72a")
    await addMarketplace.wait();
  console.log(addMarketplace)

} 

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });