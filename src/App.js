import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import TransactionDetails from "./components/TransactionDetails"
import Transfer from "./components/Transfer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />    
            <Route path='/login' element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path='/dashboard' element={<Dashboard />} />   
            <Route path='/transactiondetails' element={<TransactionDetails />} />   
            <Route path='/transfer' element={<Transfer />} />     
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
