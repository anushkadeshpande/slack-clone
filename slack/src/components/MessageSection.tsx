import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Person from "../assets/Person";
import { selectUser } from "../features/userSlice";
import { selectChannel } from "../features/currentChannelSlice";
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

const SOCKET_URL = "https://slack-backend.up.railway.app/ws-message";
const MessageSection = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const user = useSelector(selectUser);
  const channel = useSelector(selectChannel);
  const [messagesData, setMessagesData] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<Map<string, UserData>>(new Map());
  // console.log(channel)
  useEffect(() => {
    fetch("https://slack-backend.up.railway.app/getAllUserProfiles")
      .then((data) => data.json())
      .then((data) => {
        const u = new Map();

        data.map((d: UserData) => u.set(d.userName, d));

        setAllUsers(u);
      });
  }, [user]);

  useEffect(() => {
    fetch("https://slack-backend.up.railway.app/" + channel + "/getAllMessages")
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
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
  }, [user, channel]);

  let onMessageReceived = (msg: any) => {
    if (messagesData.length == 0)
      setMessagesData([[msg.timestamp.split(",")[0], [msg]]]);
    else {
      setMessagesData((prevState) => {
        const updatedState = prevState.map((stateObj) => {
          if (stateObj[0] === msg.timestamp.split(",")[0]) {
            return [stateObj[0], [...stateObj[1], msg]];
          }
          return stateObj;
        });
        // console.log(updatedState);
        return updatedState;
      });
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  const getFormattedDate = (date: string) => {
    let dateParams = date.split("/");
    let dateString = "";
    // sorting out the date
    if (dateParams[1] === "1") dateString += "1st";
    else if (dateParams[1] === "2") dateString += "2nd";
    else if (dateParams[1] === "3") dateString += "3rd";
    else dateString += dateParams[1] + "th";

    // sorting out month
    switch (dateParams[0]) {
      case "1":
        dateString += " Jan";
        break;
      case "2":
        dateString += " Feb";
        break;
      case "3":
        dateString += " Mar";
        break;
      case "4":
        dateString += " Apr";
        break;
      case "5":
        dateString += " May";
        break;
      case "6":
        dateString += " Jun";
        break;
      case "7":
        dateString += " Jul";
        break;
      case "8":
        dateString += " Aug";
        break;
      case "9":
        dateString += " Sep";
        break;
      case "10":
        dateString += " Oct";
        break;
      case "11":
        dateString += " Nov";
        break;
      case "12":
        dateString += " Dec";
        break;
    }

    // year

    dateString += " " + dateParams[2];

    return dateString;
  };

  // console.log(messagesData);
  return (
    <div className="MessageSection" ref={messagesRef}>
      <div className="MessageSection__header" style={{position: "fixed", height: "25px", backgroundColor: "#1A1D21", width: "100%", marginBottom: "30px", display: "flex", alignItems: "center"}}>
        <h3>{channel}</h3>
      </div>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/" + channel]}
        onMessage={(msg: any) => onMessageReceived(msg)}
        debug={false}
      />
      <div style={{height: "30px"}}></div>
      {messagesData.map((data) => (
        <>
          <div className="messages__date__section">
            <span />
            <p className="messages__date">{getFormattedDate(data[0])}</p>
            <span id="right-side-line" />
          </div>
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
