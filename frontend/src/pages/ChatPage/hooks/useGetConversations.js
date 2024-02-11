import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../config/ApiConfig";
import { useSelector } from "react-redux";

const useGetConversations = () => {
  const token = useSelector((state) => state.auth.token);
  const [searchUser, setSearchUser] = useState("");
  const [users, setUser] = useState([]);
  const [role, setRole] = useState(null);

  const fetchRole = async () => {
    // setLoading(true);

    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}user/getRole`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    await axios(axiosConfig)
      .then((response) => {
        setRole(response.data.role);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  console.log(role);

  const fetchUser = async() => {
    let axiosConfig;
    // setLoading(true);
    if (role === "user") {
      axiosConfig = {
        method: "get",
        url: `${BASE_URL}user/getDoctors`,
      };
    } else if(role === "doctor"){
      axiosConfig = {
        method: "get",
        url: `${BASE_URL}user/getUsers`,
      };
    }
    await axios(axiosConfig)
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
    fetchRole().then(() => {
      fetchUser();
    });
  },[role]);

  console.log("user:", users);

  const filteredUsers = users.filter((user) => {
    return user && user.name && user.name.includes(searchUser);
  });

  return { users, filteredUsers };
};

export default useGetConversations;
