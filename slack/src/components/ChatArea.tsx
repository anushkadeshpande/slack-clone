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
  // useEffect(() => {
  //   const socket = io("http://192.168.1.37:8080"); // Replace with your server URL

  //   // Register the user on connection
  //   socket.on("connect", () => {
  //     socket.emit("register", user); // Replace with your user ID
  //   });

  //   // Handle incoming messages
  //   socket.on("new_message", (message) => {
  //     console.log("New message received:", message);
  //     // Update the UI with the new message
  //   });

  //   return () => {
  //     socket.disconnect(); // Clean up the socket connection on unmount
  //   };
  // }, []);
//   const [connected, setConnected] = useState(false);
//   function connect() {
//     var socket = new SockJS('/tutorialspoint-websocket');
//     const stompClient = Stomp.over(socket);
//     stompClient.connect({}, function (frame: any) {
//        setConnected(true);
//        console.log('Connected: ' + frame);
//        stompClient.subscribe('/topic/test', function (greeting) {
//           showGreeting(JSON.parse(greeting.body).content);
//        });
//     });
//  }

//  const showGreeting = (message: String) => {
//   console.log(message);
//   // Do something with the message
// }
// connected? console.log('connected') : console.log("Not connected")
  return (
    <div className="ChatArea">
      <MessageSection />
      <ChatAreaInput />
    </div>
  );
};

export default ChatArea;
