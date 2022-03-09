import React from "react";
import users from "../localDB";
import { addUser, checkIfUserExists, isUserValid } from "../localDbController";
import { createWallet } from '../Web3Client'
import withMyHook from "./ClassWrapper";
class AuthClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            type: props.type,
            error_message: ""
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.changeAuthPage = this.changeAuthPage.bind(this);
        this.verifyLogin = this.verifyLogin.bind(this);
        this.verifyRegister = this.verifyRegister.bind(this);
    }

    changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({ [name]: value });
    }

    changeAuthPage() {
        let newType = this.state.type == 0 ? 1 : 0;
        this.setState({ type: newType });
    }

    async verifyLogin() {
        await this.setState({ error_message: "" });

        let username = this.state.username;
        let password = this.state.password;

        let userObj = isUserValid(username, password)
        !userObj && await this.setState({ error_message: "Incorrect username or password!" });

        if(this.state.error_message == "") {
            this.props.navigate('/wallet', {state: {address: userObj.address}});
        }
    }

    async verifyRegister() {
        await this.setState({ error_message: "" });

        let username = this.state.username;
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;
        (username == "" || password == "" || confirm_password == "") && await this.setState({ error_message: "All fields are mandatory" });
        password != confirm_password && await this.setState({ error_message: "Confirm password should be same as password!" });

        checkIfUserExists(username) && await this.setState({ error_message: "This username already exists!" });
        if(this.state.error_message == "") {
            let address = await createWallet(password);
            let userObj = {
                username: username,
                password: password,
                address: address
            }

            addUser(userObj);
            this.props.navigate('/wallet', {state: {address: address}});
        }
    }

    render() {
        if(this.state.type == 0) {
            return (
                <div className="form">
                    <label>LOG IN</label><br></br><br></br>
                    {this.state.error_message.length > 0 && <p style={{ color: 'red' }}> {this.state.error_message} </p>}
                    <input className='inputField' type='text' name = "username" placeholder="Username" onChange={this.changeHandler}></input> <br></br><br></br>
                    <input className='inputField' type='password' name = "password" placeholder="Password"  onChange={this.changeHandler}></input><br></br><br></br>
                    <button className='button' style={{ backgroundColor: 'yellow', color: 'black' }} name='login' onClick={this.verifyLogin}>Login</button>
                    <button className='button' type='button' style={{ marginLeft: '10px' }} name='signup' onClick={this.changeAuthPage}>SIGN UP</button>
                </div>    
            )
        } else {
            return (
                <div className="form">
                    <label>SIGN UP</label><br></br><br></br>
                    {this.state.error_message.length > 0 && <p style={{ color: 'red' }}> {this.state.error_message} </p>}
                    <input className='inputField' type='text' placeholder="Username" name = "username" onChange={this.changeHandler}></input> <br></br><br></br>
                    <input className='inputField' type='password' placeholder="Password" name = "password" onChange={this.changeHandler}></input><br></br><br></br>
                    <input className='inputField' type='password' placeholder="Confirm password" name = "confirm_password" onChange={this.changeHandler}></input><br></br><br></br>
                    <button className='button' style={{ backgroundColor: 'yellow', color: 'black' }} name='signup' onClick={this.verifyRegister}>SIGN UP</button>
                    <button className='button' type='button' style={{ marginLeft: '10px' }} name='login' onClick={this.changeAuthPage}>LOG IN</button>
                </div>
            )
        }
        
    }
}

export default withMyHook(AuthClass);