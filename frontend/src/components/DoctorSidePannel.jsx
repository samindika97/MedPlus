import React from "react";
import { NavLink } from "react-router-dom";
import DoctorIMG from "../assets/SidePannelImg.png";

const DoctorSidePannel = () => {
  return (
    <div className="rounded-md p-3 shadow-lg lg:p-5">
      <div>
        <img src={DoctorIMG} alt="doctor" />
      </div>

      <NavLink className="h-5" to="/user-chat">
        <div>
          <button className="mt-3 w-full rounded-lg h-[40px] bg-teal px-10 py-1">
            <p className="font-[500] uppercase text-white">Contact</p>
          </button>
        </div>
      </NavLink>
    </div>
  );
};

export default DoctorSidePannel;
