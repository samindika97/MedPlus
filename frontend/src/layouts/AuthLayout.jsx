import React from "react";
import { Outlet } from "react-router";

import doctorVector from "../assets/SignInPageVector.png";
import medPlusLogo from "../assets/MedPlusLogo.png";

const AuthLayout = () => {
  return (
    <div className="bg-babyBlue flex h-screen w-screen">
      <div className="flex w-full items-center justify-center p-3 lg:w-1/2">
        <div className="z-10 flex h-full w-full max-w-md flex-col justify-between rounded-3xl bg-white p-6">
          <div className="">
            <img src={medPlusLogo} alt="MedPlus Logo" className="h-6" />
          </div>
          <Outlet />
          <p className="text-xs capitalize">
            MedPlus&copy; - sample MERN stack project
          </p>
        </div>
      </div>
      <div className="hidden w-1/2 items-center justify-center py-3 lg:flex">
        <div className="bg-babyBlue h-full w-2/3 rounded-3xl"></div>
        <img
          src={doctorVector}
          alt="doctor vector"
          className="absolute right-0 top-1/2 h-5/6 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
