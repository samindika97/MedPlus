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
    <form className="my-3 px-4 " onSubmit={handleSubmit}>
      <div className="flex w-full gap-2 ">
        <input
          type="text"
          className="block w-full rounded-lg border p-2.5 text-sm"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className=" bg-mintGreen px-2 mx-2rounded-md">
          {loading ? <div>sending</div> : <div>SEND</div>}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
