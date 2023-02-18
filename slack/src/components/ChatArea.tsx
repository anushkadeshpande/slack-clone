import { useState } from "react";
import "./ChatArea.css";
import ChatAreaInput from "./ChatAreaInput";
import MessageSection from "./MessageSection";

const ChatArea = () => {
  return (
    <div className="ChatArea">
      <MessageSection />
      <ChatAreaInput />
    </div>
  );
};

export default ChatArea;
