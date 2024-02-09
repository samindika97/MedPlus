import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../config/ApiConfig";


const useGetConversations = () => {
    const [searchUser, setSearchUser] = useState("");
    const [users, setUser] = useState([]);
  
    const fetchUser = () => {
      // setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}user/`,
      };
      axios(axiosConfig)
        .then((response) => {
          setUser(response.data.result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setLoading(false);
        });
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    console.log("user:", users);
  
    const filteredUsers = users.filter((user) => {
      return user && user.name && user.name.includes(searchUser);
    });

    return {users, filteredUsers}
};

export default useGetConversations;

