import React, { useState } from "react";
import useCoversation from "../../../zustand/useConversation";
import BASE_URL from "../../../config/ApiConfig";
import axios from "axios";
import { useSelector } from "react-redux";

const useSendMessage = () => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useCoversation();

  const sendMessage = (message) => {
    setLoading(true);
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}chatMessage/send/${selectedConversation._id}`,
      data: { message },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(axiosConfig)
      .then((response) => {
        const axiosConfig = {
          method: "get",
          url: `${BASE_URL}chatMessage/${selectedConversation._id}`,
    
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        };
        axios(axiosConfig)
          .then((response) => {
            setLoading(true);
            setMessages(response.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
             setLoading(false);
          });
      })
      .catch((error) => {
        //toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendMessage, loading };
};

export default useSendMessage;

/*const useSendMessage = () => {
  // Access the token from the Redux state
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  
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
        setLoading(true);
        setMessages((prev) => [response.data.result, ...prev]);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { sendMessage, loading };
};

export default useSendMessage;*/
