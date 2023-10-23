import React from "react";
import { NavLink } from "react-router-dom";

import HeroImage from "../assets/HeroImage.png";

import { featuresTabs } from "../data/data";

const Home = () => {
  return (
    <div className="h-full">
      <div className="my-10 flex h-96 justify-between">
        <div className="flex w-1/2 flex-col items-start justify-center">
          <p className="text-5xl font-bold text-blue">
            Unlocking Wellness:
            <br />
            Your Gateway to <span className="text-teal">Better Health</span>
          </p>
          <p className="mt-3 w-4/5 text-sm text-blue text-justify">
            <br/>Welcome to MedPlus, your trusted companion on the journey to
            well-being. Our comprehensive platform is designed to empower you
            with accurate health information, seamless access to medical
            resources, and expert guidance, all in one place. Whether you're
            exploring preventive measures, searching for answers to health
            concerns, or seeking the nearest healthcare facility, MedPlus is
            your gateway to better health. We believe that informed decisions
            and proactive care lead to a healthier, happier life. Start your
            wellness journey with MedPlus today. Your health, your control!
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
