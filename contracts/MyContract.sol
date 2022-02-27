// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./newPersonalNFT.sol";

contract MyContact {
    enum Status { ACTIVE, INACTIVE, SOLD }

    address private nftContract = 0xd9145CCE52D386f254917e481eB44e9943F39138;

    struct Listing {
        uint id;
        uint amount;
        address owner;
        Status status;
    }

    uint _listingId = 0; 
    mapping(uint => Listing) public _listing;

    function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function listNft(uint nftId, uint amount) public {
        newNft n = newNft(nftContract);
        uint balance = n.balanceOf(msg.sender, nftId);
        require(balance >= amount, "Amount to be listed is more than amount owned");
        Listing memory list = Listing(nftId, amount, msg.sender, Status.ACTIVE);
        _listingId ++;
        _listing[_listingId] = list;
        n.customApprove(msg.sender, address(this), true);
        n.safeTransferFrom(msg.sender, address(this), nftId, amount, "");
    }
}