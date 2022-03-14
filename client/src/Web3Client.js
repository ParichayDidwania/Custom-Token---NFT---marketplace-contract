import Web3 from "web3";
import NFTcontractBuild from '../../build/contracts/newNft.json';
import TokenContractBuild from '../../build/contracts/Token.json';
import crypto from "crypto";

const providerURL = "http://localhost:7545"; // Change the provider link here
let ntfContract;
let tokenContract;
let provider;

let initialized = false;
const web3 = new Web3(providerURL);

export const init = async () => {
    // If linking with metamask you can use window.etherium here instead.
    // Here i will be using a custom wallet which will be added soon

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

export const createWallet = async() => {
    if(!initialized) {
        await init();
    }
    const privateKey = "0x" + (crypto.randomBytes(32).toString("hex"));
    var account = web3.eth.accounts.privateKeyToAccount(privateKey);
    provider = account.address;
    return account;
}

export const getTokenBalance = async() => {
    if(provider) {
        return await tokenContract.methods.balanceOf(provider).call({ from: provider });
    } else {
        throw new Error('Auth invalidated!');
    }
}

export const getEtherBalance = async() => {
    if(provider) {
        let wei = await web3.eth.getBalance(provider);
        return (wei / 10**18);
    } else {
        throw new Error('Auth invalidated!');
    }
}

export const getEtherFromOwner = async() => {
    if(provider) {
        let owner = await tokenContract.methods.owner().call();
        await web3.eth.sendTransaction({to:provider, from:owner, value:web3.utils.toWei("0.5", "ether")})
    } else {
        throw new Error('Auth invalidated!');
    }
}

export const getNftBalance = async() => {
    if(provider) {
        return await ntfContract.methods.getOverallNfts(provider).call({ from: provider });
    } else {
        throw new Error('Auth invalidated!');
    }
}