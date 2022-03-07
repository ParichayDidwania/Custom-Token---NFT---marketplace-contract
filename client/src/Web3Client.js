import Web3 from "web3";
import NFTcontractBuild from '../../build/contracts/newNft.json';
import TokenContractBuild from '../../build/contracts/Token.json';

const providerURL = "http://localhost:7545"; // Change the provider link here
let ntfContract;
let tokenContract;
let provider;

let initialized = false;

export const init = async () => {
    const web3 = new Web3(providerURL);

    // If linking with metamask you can use window.etherium here instead.
    // Here i will be using a custom wallet which will be added soon

    provider = '0xB80D091C9bb60EFBdF369C4734da8BA1d0BC6474'; // Will be replaced with custom address based on login account using custom wallet contract

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