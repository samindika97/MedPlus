import React, { useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage(" ");
  };
  return (
    <form className="my-3 px-4" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <input
          type="text"
          className="block w-full rounded-lg border p-2.5 text-sm"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className=" bg-mintGreen">
          send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
