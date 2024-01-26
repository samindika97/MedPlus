import React from "react";
import { NavLink } from "react-router-dom";

import HeroImage from "../assets/HeroImage.png";

import { featuresTabs } from "../data/data";

const Home = () => {
  return (
    <div className="flex h-full flex-col justify-between gap-10">
      <div className="flex h-96 justify-between">
        <div className="flex w-1/2 flex-col items-start justify-center">
          <p className="text-5xl font-bold text-blue">
            Unlocking Wellness:
            <br />
            Your Gateway to <span className="text-teal">Better Health</span>
          </p>
          <p className="mt-3 w-4/5 text-justify text-sm text-blue">
            <br />
            Welcome to MedPlus, where your well-being takes center stage.
            Discover accurate health information, find nearby healthcare
            facilities, and take control of your health journey. It's time to
            prioritize your health with MedPlus.
          </p>
          <button className="mt-3 rounded-3xl bg-teal px-10 py-1">
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
          <NavLink to={tab.link} key={tab.name}>
            <div className="relative h-24 w-full rounded-xl bg-teal p-5">
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
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
