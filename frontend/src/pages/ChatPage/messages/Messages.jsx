import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
 // console.log("Messages:",messages)
  return (
    <div className="flex-1 overflow-hidden px-4">
      {
        messages.length>0 && messages.map((message)=>(
          <Message key={message._id} message={message}/>
        ))
      }

      {messages.length === 0 && (
        <p className="text-center">Send message to start conversation</p>
      )}
    </div>
  );
};

export default Messages;
