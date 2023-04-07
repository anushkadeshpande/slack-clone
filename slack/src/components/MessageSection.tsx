import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Person from "../assets/Person";
import { selectUser } from "../features/userSlice";
import "./MessageSection.css";

import SockJsClient from "react-stomp";

interface UserData {
  userName: string;
  userId: string;
  userDPCol: string;
}

interface messData {
  name: string;
  timestamp: string;
  message: string;
}

const SOCKET_URL = "http://192.168.1.37:8080/ws-message";
const MessageSection = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const user = useSelector(selectUser);
  const [messagesData, setMessagesData] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<Map<string, UserData>>(new Map());

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
        console.log(data);
        setMessagesData(
          Object.entries(
            data.reduce((acc: any, cur: any) => {
              const date = cur.timestamp.split(",")[0];
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push(cur);
              return acc;
            }, {})
          )
        );
      });
  }, []);

  let onMessageReceived = (msg: any) => {
    setMessagesData((prevState) => {
      const updatedState = prevState.map((stateObj) => {
        if (stateObj[0] === msg.timestamp.split(",")[0]) {
          return [stateObj[0], [...stateObj[1], msg]];
        }
        return stateObj;
      });
      console.log(updatedState);
      return updatedState;
    });
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  console.log(messagesData);
  return (
    <div className="MessageSection" ref={messagesRef}>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onMessage={(msg: any) => onMessageReceived(msg)}
        debug={false}
      />

      {messagesData.map((data) => (
        <>
          <p>{data[0]}</p>
          {data[1]?.map((messageData: any) => (
            <div
              className="MessageSection__message"
              key={messageData.timestamp}
            >
              <Person color={allUsers?.get(messageData.name)?.userDPCol} />

              <div style={{ width: "100%", marginRight: "20px" }}>
                <p>
                  <strong>{messageData.name}</strong>
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <p
                    style={{
                      whiteSpace: "pre-line",
                      marginTop: "7px",
                      lineHeight: 1.2,
                      fontSize: "15px",
                    }}
                  >
                    {" "}
                    {messageData.message}
                  </p>
                  <p
                    style={{
                      marginLeft: "20px",
                      fontSize: "11px",
                      marginTop: "auto",
                      color: "#555555",
                      fontWeight: "600",
                    }}
                  >
                    {messageData.timestamp.split(",")[1]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageSection;
