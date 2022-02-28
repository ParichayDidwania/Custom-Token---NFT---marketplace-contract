// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./newPersonalNFT.sol";
import "./newToken.sol";

contract MyContact {
    enum Status { ACTIVE, INACTIVE, SOLD }

    address private nftContract = 0x9d83e140330758a8fFD07F8Bd73e86ebcA8a5692;
    address private tokenContract = 0xaE036c65C649172b43ef7156b009c6221B596B8b;

    struct Listing {
        uint id;
        uint amount;
        address owner;
        uint price;
        Status status;
    }

    uint public _listingId = 0; 
    mapping(uint => Listing) public _listing;

    function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function listNft(uint nftId, uint amount, uint price) public {
        newNft n = newNft(nftContract);
        uint balance = n.balanceOf(msg.sender, nftId);
        require(balance >= amount, "Amount to be listed is more than amount owned");
        Listing memory list = Listing(nftId, amount, msg.sender, price, Status.ACTIVE);
        _listingId ++;
        _listing[_listingId] = list;
        n.customApprove(msg.sender, address(this), true);
        n.safeTransferFrom(msg.sender, address(this), nftId, amount, "");
    }

    function buyNFT(uint listingId, uint amount) public returns(uint){
        Token t = Token(tokenContract);
        uint balance = t.balanceOf(msg.sender);
        Listing memory list = _listing[listingId];
        uint amount_available = list.amount;
        require(amount_available >= amount, "Specified Amount not available");
        uint total_cost = amount * list.price;
        require(balance >= total_cost, "You dont have enough tokens");
        address nft_owner = list.owner;
        t.customTransfer(msg.sender, nft_owner, total_cost);
        return balance;        
    }

    function getListing() view public returns(Listing[] memory) {
        Listing[] memory list = new Listing[](_listingId + 1);
        list[0] = Listing(0,0,address(0),0,Status.INACTIVE);
        for (uint i = 1; i <= _listingId; i++ ) {  
            list[i] = _listing[i];
        }
        return list;
    }
}