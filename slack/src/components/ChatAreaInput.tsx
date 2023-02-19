import { useState } from "react";
import "./ChatAreaInput.css";
const ChatAreaInput = () => {
  const [chatInput, setChatInput] = useState("");

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch('http://192.168.1.37:8080/send', {  
    method: 'POST', 
    // mode: 'cors', 
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        name: "Anna",
        message: chatInput
    })

  }).then(response => console.log(response))

  setChatInput("")
  }
  return (
    <div className="ChatAreaInput">
      {/* <input
        type="textarea"
        value={chatInput}
        onChange={(e) => {
          setChatInput(e.target.value);
          console.log(chatInput);
        }}
      /> */}

      <textarea 
      value={chatInput}
      onChange={(e) => {
        setChatInput(e.target.value);
        console.log(chatInput);
      }}
      />
      <button id="send" onClick={(e: React.MouseEvent<HTMLButtonElement>) => sendMessage(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatAreaInput;
