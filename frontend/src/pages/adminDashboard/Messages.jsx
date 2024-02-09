import React, { useEffect, useState } from "react";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";
import { SendIcon } from "../../icons/icon";

const Messages = () => {
  const [data, setData] = useState([]);
  const [displayMessage, setDisplayMessage] = useState();

  const date = displayMessage && new Date(displayMessage.createdAt);

  const fetchInfo = () => {
    return axios
      .get(`${BASE_URL}message`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="w-full">
      <p className="mb-4 text-2xl">
        Messsages Received through Contact Us form
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex h-96 flex-col gap-2 overflow-auto">
          {data.map((dataObj, index) => {
            return (
              <div
                className="flex cursor-pointer gap-6 rounded-lg bg-lightGrey p-4"
                key={index}
                onClick={() => setDisplayMessage(dataObj)}
              >
                <div className="w-full">
                  <p className="truncate text-base">{dataObj.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-span-2 flex h-96 w-full flex-col rounded-lg bg-mintGreen/50 p-3">
          {displayMessage ? (
            <div className="flex h-full flex-col justify-between gap-1">
              <div className="w-full">
                <div className="flex items-end gap-2">
                  <p className="w-1/5 text-lg font-semibold">From</p>
                  <p className="text-lg">{displayMessage.name}</p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="w-1/5 text-lg font-semibold">Email</p>
                  <p className="text-lg">{displayMessage.email}</p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="w-1/5 text-lg font-semibold">Submited on</p>
                  <p className="text-lg">
                    {date.toLocaleTimeString()} {date.toLocaleDateString()}
                  </p>
                </div>
                <p className="w-1/5 text-lg font-semibold">Message</p>
                <div className="mt-2 h-44 overflow-auto rounded-lg bg-white/75 p-2">
                  <p className="text-lg">{displayMessage.message}</p>
                </div>
              </div>
              <div className="flex w-full justify-end">
                <button className="flex gap-2 rounded-lg bg-teal px-4 py-2 font-semibold text-black">
                  <SendIcon />
                  <p className="">Reply through Email</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-center font-semibold text-black/80">
                Click on a message to view details!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
