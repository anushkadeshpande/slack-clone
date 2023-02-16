import {useState, useEffect} from 'react';
import Home from './screens/Home';

import './App.css';

function App() {
useEffect(
  () => {
  const getData = () => {
  fetch('http://localhost:8080/test').then(data => data.json()).then(data => console.log(data))
  }

  getData()
}, [])

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
