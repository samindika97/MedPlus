import React, { useEffect, useState } from "react";
import useCoversation from "../../../zustand/useConversation";
import BASE_URL from "../../../config/ApiConfig";
import axios from "axios";
import { useSelector } from "react-redux";

/*const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useCoversation();
  const token = useSelector((state) => state.auth.token);

  const fetchMessage = () => {
    setLoading(true);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}chatMessage/${selectedConversation._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
        // handle error if needed
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedConversation?._id) fetchMessage();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};*/


const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useCoversation();
  const token = useSelector((state) => state.auth.token);

  const fetchMessage = () => {
    // setLoading(true);
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
  };

  useEffect(() => {
    if (selectedConversation?._id) fetchMessage();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
