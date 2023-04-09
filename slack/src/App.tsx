import { useState, useEffect } from "react";
import Home from "./screens/Home";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Auth from "./screens/Auth";

function App() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="App">
        {/* <>{(user === null || user.isUserAuthenticated == false)? navigate("/") : navigate("/home")}</> */}


        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
     
    </div>
  );
}

export default App;
