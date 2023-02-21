import {useState, useEffect} from 'react';
import Home from './screens/Home';
import { useDispatch , useSelector } from "react-redux";
import { logout, login, selectUser } from './features/userSlice';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import './App.css';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Auth from './screens/Auth';

function App() {
  const user = useSelector(selectUser);
  
  return (
    <div className="App">
      <Router>
        
        
      {/* check login
      ifUserLoggedIn? goto homepage 
      : loginScreen || signUpScreen */}
      {/* <Home /> */}
      {/* <Login />: */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/auth" element={<Auth />} />
      </Routes>

      
      
      </Router>
    </div>
  );
}

export default App;
