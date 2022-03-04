// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./newPersonalNFT.sol";
import "./newToken.sol";

contract MyContact {
    address private nftContract;
    address private tokenContract;
    constructor(address nftAddress,address tokenAddress) {
        nftContract = nftAddress;
        tokenContract = tokenAddress;
    }

    enum Status { ACTIVE, INACTIVE, SOLD }

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
        // User needs to approve this contract address from Token Contract
        n.safeTransferFrom(msg.sender, address(this), nftId, amount, "");
    }

    function unlistNft(uint listingId, uint amount) public {
        newNft n = newNft(nftContract);
        Listing memory list = _listing[listingId];
        require(list.owner == msg.sender, "You are not the owner of this NFT");
        uint amount_available = list.amount;
        require(amount_available >= amount, "Specified Amount not available");

        // transfer NFT back to owner
        n.setApprovalForAll(msg.sender, true);
        n.safeTransferFrom(address(this), msg.sender, list.id, amount, "");

        // updating old listing
        bool newListingRequired = false;
        uint remaining_amount = 0;
        list.status = Status.INACTIVE;
        if(amount_available > amount) {
            newListingRequired = true;
            remaining_amount = amount_available - amount;
            list.amount = amount;
        }
        _listing[listingId] = list;

        // creating new listing
        if(newListingRequired == true) {
            Listing memory newList = Listing(list.id, remaining_amount, list.owner, list.price, Status.ACTIVE);
            _listingId ++;
            _listing[_listingId] = newList;
        }
    }

    function buyNFT(uint listingId, uint amount) public {
        Token t = Token(tokenContract);
        newNft n = newNft(nftContract);
        uint balance = t.balanceOf(msg.sender);
        Listing memory list = _listing[listingId];
        uint amount_available = list.amount;
        require(amount_available >= amount, "Specified Amount not available");
        uint total_cost = amount * list.price;
        require(balance >= total_cost, "You dont have enough tokens");
        address nft_owner = list.owner;

        // Sending NFT to buyer
        n.setApprovalForAll(msg.sender, true);
        n.safeTransferFrom(address(this), msg.sender, list.id, amount, "");

        // Sending Tokens to seller
        // User needs to increase the allowance of the contract for the total cost amount
        t.transferFrom(msg.sender, nft_owner, total_cost);

        // updating old listing
        bool newListingRequired = false;
        uint remaining_amount = 0;
        list.status = Status.SOLD;
        if(amount_available > amount) {
            newListingRequired = true;
            remaining_amount = amount_available - amount;
            list.amount = amount;
        }
        _listing[listingId] = list;

        // creating new listing
        if(newListingRequired == true) {
            Listing memory newList = Listing(list.id, remaining_amount, list.owner, list.price, Status.ACTIVE);
            _listingId ++;
            _listing[_listingId] = newList;
        }
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