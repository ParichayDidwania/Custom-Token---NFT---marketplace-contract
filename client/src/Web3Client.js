import Web3 from "web3";
import NFTcontractBuild from '../../build/contracts/newNft.json';
import TokenContractBuild from '../../build/contracts/Token.json';

const providerURL = "http://localhost:7545"; // Change the provider link here
let ntfContract;
let tokenContract;
let provider;

let initialized = false;
const web3 = new Web3(providerURL);

export const init = async (account) => {
    // If linking with metamask you can use window.etherium here instead.
    // Here i will be using a custom wallet which will be added soon

    provider = account; // Will be replaced with custom address based on login account using custom wallet contract

    const networkId = await web3.eth.net.getId();
    ntfContract = new web3.eth.Contract(NFTcontractBuild.abi, NFTcontractBuild.networks[networkId].address);
    tokenContract = new web3.eth.Contract(TokenContractBuild.abi, TokenContractBuild.networks[networkId].address);
    initialized = true;
}

export const mintToken = async() => {
    if(!initialized) {
        await init();
    }
    return await tokenContract.methods.mint(100).send({ from: provider });
}

export const createWallet = async(password) => {
    var account = await web3.eth.personal.newAccount(password);
    web3.eth.personal.unlockAccount(account,password,15000);

    return account;
}

export const getTokenBalance = async() => {
    return await tokenContract.methods.balanceOf(provider).call({ from: provider });
}