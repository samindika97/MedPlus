import React, { useState } from "react";
import useCoversation from "../../../zustand/useConversation";
import BASE_URL from "../../../config/ApiConfig";
import axios from "axios";
import { useSelector } from "react-redux";

const useSendMessage = () => {
  // Access the token from the Redux state
  const token = useSelector((state) => state.auth.token);

  const { messages, setMessages, selectedConversation } = useCoversation();
  const sendMessage = (message) => {
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}chatMessage/send/${selectedConversation._id}`,
      data: {
        message: message,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    };

    axios(axiosConfig)
      .then((response) => {
        setMessages((prev) => [response.data.result, ...prev]);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  };
  return { sendMessage };
};

export default useSendMessage;
