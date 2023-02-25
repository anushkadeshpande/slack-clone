import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Person from "../assets/Person";
import { selectUser } from "../features/userSlice";
import "./MessageSection.css";

interface UserData {
  userName: string;
  userId: string;
  userDPCol: string;
}

const MessageSection = () => {
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState<Map<string, UserData>>(new Map());

  useEffect(() => {
    fetch("http://192.168.1.37:8080/getAllUserProfiles")
      .then((data) => data.json())
      .then((data) => {
        const u = new Map();

        data.map((d: UserData) => u.set(d.userName, d));

        setAllUsers(u);
      });
  });

  useEffect(() => {
    fetch("http://192.168.1.37:8080/getAllMessages")
      .then((data) => data.json())
      .then((data) => setMessages(data));
  }, [messages]);

  // console.log(messages)

  return (
    <div className="MessageSection">
      {messages.map(({ userId, name, message }) => (
        <div key={userId}>
          <div className="MessageSection__message">
            <Person color={allUsers?.get(name)?.userDPCol} />

            <div>
              
            <p><strong>{name}</strong></p>
              
              <p style={{ whiteSpace: "pre-line", marginTop: "7px", lineHeight: 1.2, fontSize:"15px" }}> {message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSection;
