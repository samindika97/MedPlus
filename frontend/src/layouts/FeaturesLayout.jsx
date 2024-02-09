import React from "react";
import { Outlet } from "react-router-dom";

import FeaturesSidebar from "../components/FeaturesSidebar";

const FeaturesLayout = () => {
  return (
    <div className="grid h-[calc(100vh-50px)] grid-cols-5 gap-5 py-5">
      <div className="h-full">
        <FeaturesSidebar />
      </div>
      <div className="col-span-4 h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default FeaturesLayout;
