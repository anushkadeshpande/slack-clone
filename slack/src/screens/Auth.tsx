import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "../features/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import "./Auth.css";
import CryptoJS from "crypto-js";
import salt from "../salt";

const Auth = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(0);
  const [ errMsg, setErrMsg ] = useState("") 
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isUserAuthenticated) navigate("/home");
  }, []);

  const checkUser = () => {
    if (CryptoJS.AES.decrypt(user?.password, salt).toString(CryptoJS.enc.Utf8) === password) {
      setRedirect(1);
      fetch("https://slack-backend.up.railway.app/getUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user.userName.toLowerCase(),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.userId != null) {
            response.isUserAuthenticated = true;
            dispatch(login(response));
          }
        });
        setErrMsg("")
    } else {
      setRedirect(2);
      setErrMsg("Yikes! Looks like you did not enter the correct password!")
    }
  };
  return (
    <div className="Auth">
      <div className="Auth__banner">
        <div className="Auth__banner__header">
          <img src="https://1000logos.net/wp-content/uploads/2021/06/Slack-logo.png" />
        </div>
        <div className="Auth__banner__text">
          <p>Now, enter your password</p>
        </div>
      </div>

      <div className="Auth__form">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </div>
    <p style={{color: '#000', fontWeight: "100", marginTop: "20px"}}>{errMsg}</p>
      <button
        className="Auth__submit"
        onClick={() => {
          checkUser();
        }}
      >
        Log in
      </button>

      {redirect === 1 ? <Navigate to="/home" /> : ""}
    </div>
  );
};

export default Auth;
