import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileDropDown from "../profileDropdown";

import MedPlusLogo from "../../assets/MedPlusLogo.png";
import { navbarTabs } from "../../data/data";
import { MenuIcon } from "../../icons/icon";
import { logOut } from "../../store/slices/auth.slice";
import { authServiceApi } from "../../services/authService";

const Navbar = () => {
  const dispatch = useDispatch();
  const [navBarView, setNavBarView] = useState(false);
  const username = useSelector((state) => state.auth.username);

  const toggleNavBar = () => {
    setNavBarView((prev) => !prev);
  };

  const handleLogOut = useCallback(() => {
    dispatch(authServiceApi.util.resetApiState());
    dispatch(logOut());
  }, [dispatch]);

  return (
    <nav className="flex flex-col items-center justify-between border-b-2 border-grey p-2 lg:flex-row lg:gap-10">
      <div className="flex w-full items-center justify-between lg:w-max lg:justify-start">
        <NavLink className="h-5" to="/">
          <img
            src={MedPlusLogo}
            alt="Med Plus Logo"
            className="h-full object-cover"
          />
        </NavLink>
        <div className="flex cursor-pointer lg:hidden" onClick={toggleNavBar}>
          <MenuIcon />
        </div>
      </div>
      <div
        className={`hidden items-center justify-center gap-2 lg:flex lg:justify-between
        lg:gap-10`}
      >
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
      <div
        className={`flex  items-center justify-center gap-2 lg:flex-row lg:justify-between lg:gap-10 ${
          navBarView ? "flex-col" : "hidden"
        }`}
      >
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
        {username ? (
          <div
            className="cursor-pointer rounded-3xl bg-blue px-10 py-1"
            onClick={handleLogOut}
          >
            <p className="font-semibold uppercase text-white">log out</p>
          </div>
        ) : (
          <NavLink className="rounded-3xl bg-teal px-10 py-1" to="/sign-in">
            <p className="font-semibold uppercase text-white">sign in</p>
          </NavLink>
        )}
      </div>
      <div className="hidden gap-10 lg:flex">
        {username ? (
          <ProfileDropDown username={username} />
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
