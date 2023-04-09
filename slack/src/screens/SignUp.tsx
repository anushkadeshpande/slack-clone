import { useState, useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { logout, login, selectUser } from '../features/userSlice';
import colors from '../assets/colorsRepo';

import './SignUp.css'

const SignUp = () => {
  const dispatch = useDispatch()
  const [ userName, setUserName ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ redirect, setRedirect ] = useState(-1)
  const colForThisUser = colors[Math.floor(Math.random() * colors.length)];
  const user = useSelector(selectUser)
  const navigate = useNavigate()
    // if user is already logged in, go to home
    useEffect(()=> {
      if(user)
       navigate('/home')
    }, [])

  const registerUser = () => {
    fetch('http://192.168.1.37:8080/registerUser', {  
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        "userName" : userName.toLowerCase(),
        "password" : password,
        "userDPCol":  colForThisUser
    })

  }).then(response => response.text())
  .then(response => {
    // console.log(response)
    if(response == "") {
      setRedirect(0)

        fetch('http://192.168.1.37:8080/addUserProfile', {  
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "userName" : userName.toLowerCase(),
            "userDPCol":  colForThisUser
        })}).then(response => response.text())
        .then(response => {
      // if(response == "")
      dispatch(login({
        "userName": userName,
        "userDPCol": colForThisUser
        }))})
    }
  })
  }

  return (
    <div className="SignUp">
   
      <div className="SignUp__banner">
        <div className="SignUp__banner__logo">
      <img src="https://1000logos.net/wp-content/uploads/2021/06/Slack-logo.png"/>
      </div>
      <div className="SignUp__banner__header">
        Oh! Looks like you are new here!
        <p>Sign up today and start chatting!</p>
      </div>
      </div>

      <div className="SignUp__form">
        <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button onClick={() => registerUser()}>Sign Up!</button>
      </div>

      {
        redirect === 0?
        <Navigate to='/home' />:
        ""
      }
    </div>
  )
}

export default SignUp