// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
contract newNft is ERC1155 {
    address public owner;
    uint public triggers = 0;
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
       owner = msg.sender;
       triggers ++;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function mint (uint id ,uint amount) public onlyOwner {
        _mint(msg.sender, id, amount, "");
    }

    function customApprove(address caller, address reciever, bool approve) public {
        _setApprovalForAll(caller, reciever, approve);
    }
}