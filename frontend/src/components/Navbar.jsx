import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  loginUser,
  clearError,
  userSelector,
} from "../features/user/userSlice";
import { useSelector } from "react-redux";

import MedPlusLogo from "../assets/MedPlusLogo.png";
import { navbarTabs } from "../data/data";

const Navbar = () => {
  const { username, loggedIn } = useSelector((state) => state.userReducer);

  return (
    <nav className="flex items-center justify-between border-b-2 border-grey p-2">
      <NavLink className="h-5" to="/">
        <img
          src={MedPlusLogo}
          alt="Med Plus Logo"
          className="h-full object-cover"
        />
      </NavLink>
      <div className="flex gap-10">
        <div className="flex items-center justify-between gap-10">
          {navbarTabs.map((tab) => (
            <NavLink
              to={tab.link}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-teal" : "text-blue"
              }
              key={tab.link}
            >
              <p className="font-semibold uppercase">{tab.name}</p>
            </NavLink>
          ))}
        </div>
        {loggedIn ? (
          <div className="rounded-3xl bg-blue px-10 py-1">
            <p className="font-semibold uppercase text-white">{username}</p>
          </div>
        ) : (
          <NavLink className="rounded-3xl bg-teal px-10 py-1" to="/sign-in">
            <p className="font-semibold uppercase text-white">sign in</p>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
