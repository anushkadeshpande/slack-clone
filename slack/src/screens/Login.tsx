import {useState} from 'react'
import './Login.css'

const Login = () => {

  const [userName, setUsername] = useState("");

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

      <button className="Login__continue">Continue</button>
    </div>
  )
}

export default Login