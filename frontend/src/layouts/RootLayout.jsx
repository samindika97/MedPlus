import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";

const navbarHeight = 42;

const screenHeight = window.innerHeight;

const bodyHeight = screenHeight - 116;

const RootLayout = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className={`h-[calc(100vh-50px)] overflow-auto`}>
        <div className="container mx-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
