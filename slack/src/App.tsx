import {useState, useEffect} from 'react';
import Home from './screens/Home';

import './App.css';

function App() {

  return (
    <div className="App">
      {/* check login
      ifUserLoggedIn? goto homepage 
      : loginScreen || signUpScreen */}
      <Home />
    </div>
  );
}

export default App;
