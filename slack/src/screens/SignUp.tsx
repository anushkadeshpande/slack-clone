import { useState } from 'react'
import './SignUp.css'

const SignUp = () => {
  const [ userName, setUserName ] = useState("")
  const [ password, setPassword ] = useState("")

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
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Sign Up!</button>
      </div>
    </div>
  )
}

export default SignUp