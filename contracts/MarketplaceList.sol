pragma solidity >=0.7.0 <0.9.0;

/**
*  @title Marketplace List
*  @dev Created in Swarm City anno 2022,
*  for the world, with love.
*  description Marketplace List Contract
*  description This is the Marketplace List contract for Swarm City marketplaces.
*  In it, "allowed" marketplaces that are advertised in the app are being stored.
*/

import "./Ownable.sol";

contract MarketplaceList is Ownable {

    struct mpListItem {
        string mpName;
        string mpMetaHash;
        address mpAddress;
        bool mpShown;
    } 

    mpListItem[] mpListArray;

    uint public defaultTTL;
    
    event MarketplaceAdded(string mpName, string mpMetaHash, address mpAddress);
    
    function addMarketplace(string memory _mpName, string memory _mpMetaHash, address _mpAddress) onlyOwner external {
        require(bytes(_mpName).length != 0);
        uint indexMarketplace = mpListArray.length;
        mpListItem storage c = mpListArray[indexMarketplace++];
        c.mpName = _mpName;
        c.mpMetaHash = _mpMetaHash;
        c.mpAddress = _mpAddress;
        c.mpShown = true; 
        emit MarketplaceAdded(_mpName, _mpMetaHash, _mpAddress);
    }

    function readMarketplace(uint _index) view public returns (
        string memory mpName,
        string memory mpMetaHash,
        address mpAddress,
        bool mpShown) {
        mpListItem storage c = mpListArray[_index];
        return (c.mpName, c.mpMetaHash, c.mpAddress, c.mpShown);
    }

    function numberOfMarketplaces() view public returns (uint) {
        return mpListArray.length;
    }
}