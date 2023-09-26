import React from "react";
import { NavLink } from "react-router-dom";

import MedPlusLogo from "../assets/MedPlusLogo.png";
import { navbarTabs } from "../data/data";

const Navbar = () => {
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
        <button className="rounded-3xl bg-teal px-10 py-1">
          <p className="font-semibold uppercase text-white">sign in</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
