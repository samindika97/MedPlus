import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const navbarHeight = 42;

const screenHeight = window.innerHeight;

const bodyHeight = screenHeight - 116;

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div
        className={`container mx-auto h-full`}
        style={{ minHeight: `${bodyHeight}px` }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
