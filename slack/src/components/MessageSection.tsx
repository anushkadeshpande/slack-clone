import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Person from "../assets/Person";
import { selectUser } from "../features/userSlice";
import "./MessageSection.css";
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
import SockJsClient from 'react-stomp';

interface UserData {
  userName: string;
  userId: string;
  userDPCol: string;
}

const SOCKET_URL = 'http://192.168.1.37:8080/ws-message';
const MessageSection = () => {

  const messagesRef = useRef<HTMLDivElement>(null);
  const user = useSelector(selectUser);
  const [messagesData, setMessagesData] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<Map<string, UserData>>(new Map());
 


//   useEffect(() => {
//     if (messagesRef.current) {
//         messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//       }
//   });
  useEffect(() => {
    fetch("http://192.168.1.37:8080/getAllUserProfiles")
      .then((data) => data.json())
      .then((data) => {
        const u = new Map();

        data.map((d: UserData) => u.set(d.userName, d));

        setAllUsers(u);
      });
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.37:8080/getAllMessages")
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        setMessagesData(data)
      });
  }, []);
  // const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const [ connected, setConnected ] = useState(false) 
  useEffect(() => {

  }, []);

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg: any) => {
    // setMessagesData(prevState => [...prevState, msg])
  }

  // const messagesEndRef = useRef(null)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messagesData]);
  return (
    <div className="MessageSection" ref={messagesRef}>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg :any) => onMessageReceived(msg)}
        debug={false}
      />

      {messagesData.map(({ channelId, messages }) => (
        <div key={channelId}>
          <h5>{channelId.day}/{channelId.month}/{channelId.year}</h5>
          {messages.map(({userId, name, message} : any) => (
          <div className="MessageSection__message" key={userId}>
            <Person color={allUsers?.get(name)?.userDPCol} />

            <div>
              
            <p><strong>{name}</strong></p>
              
              <p style={{ whiteSpace: "pre-line", marginTop: "7px", lineHeight: 1.2, fontSize:"15px" }}> {message}</p>
            </div>
          </div>
        
        ))}
        </div>
      ))}
       <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageSection;
