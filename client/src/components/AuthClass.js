import React from "react";
class AuthClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            type: props.type
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.changeAuthPage = this.changeAuthPage.bind(this);
    }

    changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({ [name]: value });
        console.log(this.state);
    }

    changeAuthPage() {
        let newType = this.state.type == 0 ? 1 : 0;
        this.setState({ type: newType });
    }

    render() {
        if(this.state.type == 0) {
            return (
                <div className="form">
                    <label>LOG IN</label><br></br><br></br>
                    <input className='inputField' type='text' name = "username" placeholder="Username" onChange={this.changeHandler}></input> <br></br><br></br>
                    <input className='inputField' type='password' placeholder="Password"  onChange={this.changeHandler}></input><br></br><br></br>
                    <button className='button' style={{ backgroundColor: 'yellow', color: 'black' }} name='login'>Login</button>
                    <button className='button' type='button' style={{ marginLeft: '10px' }} name='signup' onClick={this.changeAuthPage}>SIGN UP</button>
                </div>    
            )
        } else {
            return (
                <div className="form">
                    <label>SIGN UP</label><br></br><br></br>
                    <input className='inputField' type='text' placeholder="Username" onChange={this.changeHandler}></input> <br></br><br></br>
                    <input className='inputField' type='password' placeholder="Password" onChange={this.changeHandler}></input><br></br><br></br>
                    <input className='inputField' type='password_confirm' placeholder="Confirm password" onChange={this.changeHandler}></input><br></br><br></br>
                    <button className='button' style={{ backgroundColor: 'yellow', color: 'black' }} name='signup'>SIGN UP</button>
                    <button className='button' type='button' style={{ marginLeft: '10px' }} name='login' onClick={this.changeAuthPage}>LOG IN</button>
                </div>
            )
        }
        
    }
}

export default AuthClass;