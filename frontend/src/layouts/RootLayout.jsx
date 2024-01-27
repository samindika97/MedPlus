import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const navbarHeight = 42;

const screenHeight = window.innerHeight;

const bodyHeight = screenHeight - 116;

const RootLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className={`container mx-auto h-[calc(100vh-42px)]`}>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
