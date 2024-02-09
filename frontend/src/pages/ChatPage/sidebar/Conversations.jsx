import React, { useEffect, useState } from "react";
//import axios from "axios";
//import BASE_URL from "../../../config/ApiConfig";
import Conversation from "./Conversation";
//import DoctorImg from "../../../assets/Doctorr.jpg";
import useGetConversations from "../hooks/useGetConversations";

const Conversations = () => {
  const {loading, users } = useGetConversations();

  return(
    <div className="py-2 flex flex-col overflow-auto">
      { users.map((conversation) =>(<Conversation
        key = {conversation._id}
        conversation ={conversation}
      />))}

      {loading ?<span className="lading loading-spinner mx-auto"></span>:null} 
      
    </div>
  );
 
};

export default Conversations;
