import '../Styles.css';


function login(props) {
    return (
      <form className='form'>
          <label>LOG IN</label><br></br><br></br>
          <input className='inputField' type='text' placeholder="Username"></input> <br></br><br></br>
          <input className='inputField' type='password' placeholder="Password"></input><br></br><br></br>
          <button className='button' style={{ backgroundColor: 'yellow', color: 'black' }} type='submit' value='Submit'>Login</button>
          <button className='button' type='button' style={{ marginLeft: '10px' }} value='SIGN UP' onClick={props.clickMethod}>SIGN UP</button>
      </form>  
    );
}

function signup(props) {
  return (
    <form className='form'>
        <label>SIGN UP</label><br></br><br></br>
        <input className='inputField' type='text' placeholder="Username"></input> <br></br><br></br>
        <input className='inputField' type='password' placeholder="Password"></input><br></br><br></br>
        <input className='inputField' type='password_confirm' placeholder="Confirm password"></input><br></br><br></br>
        <button className='button' style={{ backgroundColor: 'yellow', color: 'black' }} type='submit' value='Submit'>SIGN UP</button>
        <button className='button' type='button' style={{ marginLeft: '10px' }} value='LOG IN' onClick={props.clickMethod}>LOG IN</button>
    </form>  
  );
}

export default { login, signup };