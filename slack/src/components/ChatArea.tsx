import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import io from "socket.io-client";
import "./ChatArea.css";
import ChatAreaInput from "./ChatAreaInput";
import MessageSection from "./MessageSection";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatArea = () => {
  const user = useSelector(selectUser)

  return (
    <div className="ChatArea">
      <MessageSection />
      <ChatAreaInput />
    </div>
  );
};

export default ChatArea;
