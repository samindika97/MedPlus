import React from "react";
import socialmediaicon from "../assets/social media.png";

const Footer = () => {
  return (
    <div className="bg-blue ">
      <div className="flex gap-3 p-3 text-white">
        <div className="flex flex-1 flex-col">
          <p className="mb-3 text-lg font-semibold">Social Media</p>
          <div className="flex gap-3">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V6.6a.6.6 0 0 1 .6-.6h.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.8 10.5 20.7 2h-3l-5.3 6.5L7.7 2H1l7.8 11-7.3 9h3l5.7-7 5.1 7H22l-8.2-11.5Zm-2.4 3-1.4-2-5.6-7.9h2.3l4.5 6.3 1.4 2 6 8.5h-2.3l-4.9-7Z"
              />
            </svg>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M21.7 8c0-.7-.4-1.3-.8-2-.5-.5-1.2-.8-2-.8C16.2 5 12 5 12 5s-4.2 0-7 .2c-.7 0-1.4.3-2 .9-.3.6-.6 1.2-.7 2l-.2 3.1v1.5c0 1.1 0 2.2.2 3.3 0 .7.4 1.3.8 2 .6.5 1.4.8 2.2.8l6.7.2s4.2 0 7-.2c.7 0 1.4-.3 2-.9.3-.5.6-1.2.7-2l.2-3.1v-1.6c0-1 0-2.1-.2-3.2ZM10 14.6V9l5.4 2.8-5.4 2.8Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="mb-3 text-lg font-semibold">Address</p>
          <p className="text-sm font-medium">
            MedPlus Pvt Ltd
            <br />
            No 123, Bauddhaloka Mawatha,
            <br />
            Colombo
            <br />
            Sri Lanka
          </p>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="mb-3 text-lg font-semibold">Legal</p>
          <p className="text-sm">Privacy policy</p>
          <p className="text-sm">Terms and conditions</p>
        </div>
      </div>
      <div className="border-t border-white p-1">
        <p className="text-center text-sm text-white">
          Copyright © 2010-2023 All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
