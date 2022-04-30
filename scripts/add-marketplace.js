//const { ethers } = require('ethers')
const hre = require("hardhat");
const {Provider} = require("zksync-web3");
const { HardhatRuntimeEnvironment } = require("hardhat/types");

// scripts/index.js
async function main () {

const provider = new Provider("https://zksync2-testnet.zksync.dev");

const TX_HASH = "0xc176e4d0f3d80e1b37ca5f4b13f2c74b07ef3bc97609d0dc8f694cd83a373f48";
console.log(await provider.getTransactionStatus(TX_HASH));
  // const network = await hre.ethers.providers
  // console.log(network)
  // Our code will go here
  
  //const marketplaceList = await hre.ethers.getContractFactory("MarketplaceList")

  //const contractAddress = "0x100205C8BC182222299f95c7cD42D53ab133f72a"
  //const marketplaceListInstance = await marketplaceList.attach(contractAddress)

  //const addMarketplace = await marketplaceListInstance.addMarketplace("Dan", "swarmIpfs", "0x100205C8BC182222299f95c7cD42D53ab133f72a")
  //console.log(addMarketplace)
 // console.log(marketplaceListInstance)
 
 //const numOfMarketplaces = await marketplaceListInstance.readMarketplace(1)   
  //console.log('num of marketplaces: ', numOfMarketplaces)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });