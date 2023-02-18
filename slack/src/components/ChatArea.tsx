import { useState } from "react";
import "./ChatArea.css";
import ChatAreaInput from "./ChatAreaInput";

const ChatArea = () => {
  return (
    <div className="ChatArea">
      {/* Message bubbles */}

      <ChatAreaInput />
    </div>
  );
};

export default ChatArea;
