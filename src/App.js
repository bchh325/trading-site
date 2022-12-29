import './App.css';
import awsconfig from './aws-exports';

import { Amplify } from 'aws-amplify';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import StockContent from './components/StockContent';

Amplify.configure(awsconfig);

function App() {
  const CognitoUser = null;

  return (
    <div className="App">
      <div className="trading-container">
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stocks" element={<StockContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
