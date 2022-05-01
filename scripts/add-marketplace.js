//const { ethers } = require('ethers')
const { HardhatRuntimeEnvironment } = require("hardhat/types");
const { readFileSync } = require("fs");
const { networkInterfaces } = require("os");
const { getWallet } = require("./get-wallet");
const { getDefaultProvider } = require("ethers");
const { Wallet, Provider, Signer } = require("zksync-web3");
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

  const MarketplaceListInstance = await hre.ethers.getContractAt("MarketplaceList", "0x4541495681fB2d8430c15B9F3b7f07711B25C33a", wallet);
  console.log(await MarketplaceListInstance.owner())

  const getTotalTx = await MarketplaceListInstance.numberOfMarketplaces()   
  console.log('num of marketplaces: ', getTotalTx.toNumber())

  const setNameTx = await MarketplaceListInstance.setName("I am a marketplaceList contract")
  await setNameTx.wait();
  console.log(setNameTx.hash)

  const getNameTx = await MarketplaceListInstance.getName()
  console.log(getNameTx)

  const addMarketplaceTX = await MarketplaceListInstance.addMarketplace("Settler", "SettlerHash", "0x1b9c03675A5a1096b349deB3C69726c4edf8bc33")
  await addMarketplaceTX.wait();
  console.log(addMarketplaceTX.hash)

  const getNewTotalTx = await MarketplaceListInstance.numberOfMarketplaces()   
  console.log('num of marketplaces: ', getNewTotalTx.toNumber())
} 

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });