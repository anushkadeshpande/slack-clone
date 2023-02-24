import ChatArea from "../components/ChatArea"
import HeaderBar from "../components/HeaderBar"
import SideBar from "../components/SideBar"

import './Home.css'

const Home = () => {
  return (
    <div className="Home">
        <HeaderBar />
        <div className="Home__content">

        <SideBar view="desktop" />
        <ChatArea />
        </div>
    </div>
  )
}

export default Home