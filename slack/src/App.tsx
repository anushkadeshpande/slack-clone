import {useState, useEffect} from 'react';
import Home from './screens/Home';

import './App.css';
import Login from './screens/Login';

function App() {

  return (
    <div className="App">
      {/* check login
      ifUserLoggedIn? goto homepage 
      : loginScreen || signUpScreen */}
      {/* <Home /> */}
      <Login />
    </div>
  );
}

export default App;
