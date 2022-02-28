// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    string private constant tokenName = "Gold";
    string private constant tokenSymbol = "GLD";

    address owner;

    constructor() ERC20(tokenName, tokenSymbol) {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function mint (uint amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function customTransfer (address caller, address to, uint amount) public {
        _transfer(caller, to, amount);
    }
}