import './Styles.css';
import AuthClass from './components/AuthClass';
import WalletClass from './components/WalletClass';
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
    <div className="root">      
      <Routes>
        <Route path = '/login' element={<AuthClass type = {0} />} />
        <Route path = '/wallet' element={<WalletClass/>} />
      </Routes>      
    </div>
  );
}

export default App;
