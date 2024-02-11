import React, { useState,useEffect } from "react";
import useCoversation from "../../../zustand/useConversation";
import BASE_URL from "../../../config/ApiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

const useSendMessage = () => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useCoversation();
  const [socket, setSocket] = useState(null);

  const [room, setRoom] = useState("");

  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts
    const socket = io("http://localhost:8080", {
				query: {
					userId: selectedConversation._id,
				},
			});
    setSocket(socket);

    console.log("Socket connected:", socket);


    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [BASE_URL]);


  useEffect(() => {
    if (socket) {
      // Listen for 'private_message' events from the server
      socket.on('private_message', (data) => {
        // Update the local state with the received message
        const new_message = Object.create(null);
          new_message.senderId = selectedConversation._id;
          new_message.message = data.message;
        
        //console.log(messages);
        const new_messages_arr = messages;
        new_messages_arr.push(new_message);

        setMessages(new_messages_arr);
        console.log(messages);
      });

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off('private_message');
      };
    }
  }, [socket]);

  

  const sendMessage = (message) => {
    socket.emit("join_room", room);
    setLoading(true);
    
    if (socket) {
      socket.emit('private_message', {
        to: socket.id, // Assuming _id is the unique identifier of the recipient
        message,
      });
    } 

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
