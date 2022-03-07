# Custom-Token---NFT---marketplace-contract

Status: WIP

<h2> Contracts </h2>

Contents:
1. ERC20 Token contract
2. ERC1155 NFT contract
3. Marketplace contract

<h3> ERC20 Token contract </h3>
This is a simple ERC20 token contract which has all basic functionalities such as minting, balanceOf etc. This contract is called by the marketplace contract to handle transactions

<h3> ERC1166 NFT contract </h3>
This is a simple ERC1155 NFT contract which has all basic functionalities such as minting, balanceOf etc. This contract is called by the marketplace contract to handle transactions

<h3> Marketplace contract </h3>
This marketplace contract uses the addresses of ERC20 and ERC1155 contract to make transactions possible

Current features:
1. Listing ERC1155 NFT
2. Unlisting ERC1155 NFT
3. Buying ERC1155 NFT via ERC20 Tokens

<h2> Client </h2>

Client is in reactJs which uses Web3 library to interact with the smart contracts. This part is still under progress.

Working On:
1. Adding a custom wallet contract
2. Adding auth service and MongoDB support for storing user data
