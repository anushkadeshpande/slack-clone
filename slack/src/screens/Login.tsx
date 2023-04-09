import {useState, useEffect} from 'react'
import './Login.css'
import { useDispatch , useSelector } from "react-redux";
import { logout, login, selectUser } from '../features/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null)
  const [ redirect, setRedirect ] = useState(-1)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  // if user is already logged in, go to home
  useEffect(()=> {
    if(user)
     navigate('/home')
    else
      navigate("/")
  }, [])

  const checkUser = () => {
    fetch('http://192.168.1.37:8080/checkUser', {  
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        "userName" : userName.toLowerCase()
    })

  }).then(response => response.json())
  .then(response => {
    if(response.userId != null) {
      setUserDetails(response)
      // console.log(response)
      response.isUserAuthenticated = false
      dispatch(login(response))
      setRedirect(0)
    }
    else {
      setUserDetails(response)
      setRedirect(1)
    }
})
  }

  return (
    
    <div className="Login">
      <div className="Login__banner">
        <div className="Login__banner__header">
      <img src="https://1000logos.net/wp-content/uploads/2021/06/Slack-logo.png"/>
      </div>
      <div className="Login__banner__text">
        <p>First, enter your username</p>
      </div>

      </div>

      <div className="Login__form">
        <input onChange={(e) => setUsername(e.target.value)} value={userName}/>
      </div>

      <button className="Login__continue" onClick={() => {checkUser()}}>Continue</button>

  {
    redirect === 0?
      <Navigate to='/auth' /> :
      redirect === 1?
      <Navigate to='/signup' /> : ""
  }
    </div>
  )
}

export default Login