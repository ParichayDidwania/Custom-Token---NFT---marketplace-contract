import './Styles.css';
import { useEffect, useState } from 'react';
// import { init, mintToken } from './Web3Client'
import AuthPage from './components/Auth';

function App() {

  let [auth_state, setAuthState] = useState(0)

  function changeAuthState() {
    if(auth_state == 0) {
      setAuthState(1);
    } else {
      setAuthState(0);
    }
  }
  
    return (
    <div className="root">
      {auth_state == 0 ? <AuthPage.login clickMethod = { changeAuthState }/> : <AuthPage.signup clickMethod = { changeAuthState }/>}
    </div>
  );
}

export default App;
