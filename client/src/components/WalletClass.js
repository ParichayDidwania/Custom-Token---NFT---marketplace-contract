import React from "react";
import withMyHook from "./ClassWrapper";
import { getTokenBalance, getEtherBalance, getEtherFromOwner, getNftBalance } from '../Web3Client';

class WalletClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPrivateKey: false,
            ethers: undefined, 
            tokens: undefined,
            nfts: undefined
        }        

        this.initiateAndGetData = this.initiateAndGetData.bind(this);
        this.getEtherFromOwner = this.getEtherFromOwner.bind(this);
    }

    componentDidMount() {
        this.initiateAndGetData();
    }

    async initiateAndGetData() {
        let ethers = await getEtherBalance();
        let tokens = await getTokenBalance();
        let nfts = await getNftBalance();
        this.setState({ tokens: tokens, ethers: ethers, nfts: nfts });
    }

    async getEtherFromOwner() {
        await getEtherFromOwner();
        let ethers = await getEtherBalance();
        this.setState({ ethers: ethers });
    } 

    render() {
        if(this.state.tokens != undefined && this.state.ethers != undefined && this.state.nfts != undefined) {
            return (
                <div className="card">
                    <p className="para" style={{fontWeight: 'bold', fontSize: '30px'}}>YOUR WALLET</p>
                    <p className="para"> address : {this.props.location.state.address}</p>
                    <p className="para"> Ethers : {this.state.ethers}</p>
                    <p className="para"> Tokens : {this.state.tokens} GLD</p>
                    <p className="para"> NFTs held : {this.state.nfts} </p>
                    <button className="button"> CONTINUE </button>
                    <button className="button" style={{ marginLeft: '10px' }} onClick={this.initiateAndGetData}> REFRESH </button>
                    <button className="button" style={{ float: 'right', backgroundColor: 'orange' }} onClick={this.getEtherFromOwner}> GET 0.5 ETHER (testing) </button>
                </div>
            )
        } else {
            return(
                <p className="para">LOADING ...</p>
            )
        }        
    }
}

export default withMyHook(WalletClass);
