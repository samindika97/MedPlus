import React from "react";
import socialmediaicon from "../assets/social media.png";

const Footer = () => {
  return (
    <div className="mt-5 bg-teal">
      <div className="flex flex-row items-center ">
        <div className="flex flex-1 flex-col items-center p-8">
          <p className="text-xl">LEGAL</p>
          <p>Privacy policy</p>
          <p>Terms and conditions</p>
          <p>Copyright</p>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <p className="p-2 text-xl">Social Media</p>
          <img src={socialmediaicon} alt="social media icons" />
        </div>
      </div>
      <div className="border-t-2 border-white p-2 ">
        <p className="text-center">
          Copyright © 2010-2023 All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
