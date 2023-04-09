import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import ChatArea from "../components/ChatArea";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";

import "./Home.css";

const Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="Home">
      <HeaderBar />
      <div className="Home__content">
        <SideBar view="desktop" />
        <ChatArea />
      </div>
    </div>
  );
};

export default Home;
