import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useCoversation from "../../../zustand/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useCoversation();
  return (
    <div className="m-5 h-full rounded-[20px] border-2 border-gray-300">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="   mb-2 px-4 py-2">
          <span className="label-text"> To:</span>{" "}
          <span className="font-bold text-gray-500">
            {" "}
            {selectedConversation.userName}
          </span>
          <Messages />
          <MessageInput />
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className=" items-center">
      <p className=" font-bold ">Pick up where you left off</p>
      <p className=" font-light">Select a conversation and chat away.</p>
    </div>
  );
};
