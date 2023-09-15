import React from "react";
import { Outlet } from "react-router-dom";

import FeaturesSidebar from "../components/FeaturesSidebar";

const FeaturesLayout = () => {
  return (
    <div className="flex mt-5 gap-5 h-full">
      <div className="w-1/5 h-full">
        <FeaturesSidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default FeaturesLayout;
