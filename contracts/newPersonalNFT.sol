// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
contract newNft is ERC1155 {
    address public owner;
    uint public triggers = 0;
    uint[] public Ids; 
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
        addId(id);
    }

    function addId(uint id) private {
        uint i;    
        bool found = false;
        for(i = 0; i < Ids.length; i++)
        {
            if(Ids[i] == id)
            {
                found = true;
                break;
            }
        }

        if(found == false) {
            Ids.push(id);
        }
    }

    function getOverallNfts(address account) public view returns(uint){
        uint count = 0;
        uint i;
        for(i = 0; i < Ids.length; i++)
        {
            count = count + balanceOf(account, Ids[i]);
        }
        return count;
    }
}