import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { init, mintToken } from './Web3Client'

function App() {

  const [mint, setMint] = useState(false);

  function mintFun() {
    mintToken().then((tx) => {
      console.log(tx)
      setMint(true);
    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <div>
      {!mint ? <button onClick={() => mintFun()}> Mint! </button> : <p>Successfull</p>}
    </div>
  );
}

export default App;
