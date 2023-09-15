import React from "react";

import HeroImage from "../assets/HeroImage.png";

import { featuresTabs } from "../data/data";

const Home = () => {
  return (
    <div className="h-full">
      <div className="my-10 flex h-96 justify-between">
        <div className="flex w-1/2 flex-col items-start justify-center">
          <p className="text-5xl font-bold text-blue">
            Lorem ipsum dolor sit amet,{" "}
            <span className="text-teal">consectetur adipiscing</span> elit.
          </p>
          <p className="mt-3 w-4/5 text-sm text-blue">
            Mauris lectus justo, tincidunt non ante nec, bibendum lobortis odio.
            Maecenas iaculis auctor neque eget elementum. Proin pulvinar ex est,
            eget convallis mi malesuada ac.
          </p>
          <button className="bg-teal mt-3 rounded-3xl px-10 py-1">
            <p className="font-semibold uppercase text-white">sign in</p>
          </button>
        </div>
        <div className="h-full">
          <img
            src={HeroImage}
            alt="Hero Image"
            className="h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {featuresTabs.map((tab) => (
          <div
            className="bg-teal relative h-24 w-full rounded-xl p-5"
            key={tab.name}
          >
            <img
              src={tab.img}
              alt="symptom checker tab image"
              className="absolute bottom-0 left-0 h-32"
            />
            <div className="flex h-full w-full items-center justify-end">
              <p className="w-1/2 text-right text-xl font-bold uppercase text-white">
                {tab.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
