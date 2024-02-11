import React, { useEffect, useState } from "react";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import useCoversation from "../../../zustand/useConversation";

const Message = ({ message }) => {
  const token = useSelector((state) => state.auth.token);
  const [authUserId, setAuthUserId] = useState(null);
  const { selectedConversation } = useCoversation;

  useEffect(() => {
    if (token) {
      // Decode the token to extract user ID
      const decodedToken = jwtDecode(token);
      //console.log("Decoded Token:", decodedToken);
      // Extract user ID from decoded token's payload
      const userId = decodedToken.userId;
      // Set the user ID state
      setAuthUserId(userId);
    }
  }, [token]);

  const fromMe = message.senderId === authUserId;
 // console.log("sender Id:" ,fromMe);
  const chatColor = fromMe ? 'bg-teal' : 'bg-mintGreen';
  const mar = fromMe ? 'ml-[350px]' : '';
  //console.log("User Id:", authUserId);
  //console.log("user role:", authUserId.role)

  return (
    <div className={`my-2  w-1/2 rounded-md p-2 ${chatColor} ${mar}`}>
      {message.message} {/* You can use authUserId here if needed */}
    </div>
  );
};

export default Message;
