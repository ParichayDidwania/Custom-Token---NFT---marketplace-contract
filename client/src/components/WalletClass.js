import React from "react";
import withMyHook from "./ClassWrapper";
import { init, getTokenBalance } from '../Web3Client';

class WalletClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPrivateKey: false,
            tokens: undefined,
            nfts: 0
        }        

        this.initiateAndGetData = this.initiateAndGetData.bind(this);
    }

    componentDidMount() {
        this.initiateAndGetData();
    }

    async initiateAndGetData() {
        await init(this.props.location.state.address.toString(), true);
        let tokens = await getTokenBalance();
        this.setState({ tokens: tokens });
    }

    render() {
        if(this.state.tokens != undefined) {
            return (
                <div className="card">
                    <p className="para" style={{fontWeight: 'bold', fontSize: '30px'}}>YOUR WALLET</p>
                    <p className="para"> address : {this.props.location.state.address}</p>
                    <p className="para"> Tokens : {this.state.tokens} GLD</p>
                    <p className="para"> NFTs held : 0</p>
                    <button className="button"> CONTINUE </button>
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
