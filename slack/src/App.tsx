import {useState, useEffect} from 'react';
import Home from './screens/Home';
import { useDispatch , useSelector } from "react-redux";
import { logout, login, selectUser } from './features/userSlice';

import './App.css';
import Login from './screens/Login';

function App() {
  const user = useSelector(selectUser);
  
  return (
    <div className="App">
      {/* check login
      ifUserLoggedIn? goto homepage 
      : loginScreen || signUpScreen */}
      {/* <Home /> */}
      {!user?
      <Login />:
      <Home />
      }
    </div>
  );
}

export default App;
