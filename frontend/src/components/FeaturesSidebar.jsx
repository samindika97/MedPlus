import React from "react";
import { NavLink } from "react-router-dom";

import { featuresTabs } from "../data/data";

const FeaturesSidebar = () => {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl bg-lightGrey p-3">
      {featuresTabs.map((tab) => (
        <NavLink
          to={tab.link}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "rounded-xl bg-teal text-white"
              : "rounded-xl bg-mintGreen text-blue"
          }
          key={tab.link}
        >
          <div className="w-full rounded-xl p-3">
            <p className="font-bold uppercase ">{tab.name}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default FeaturesSidebar;
