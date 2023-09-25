import React from "react";
import { NavLink } from "react-router-dom";

import { adminDashboardTabs } from "../data/data";

const AdminDashboardTabs = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl mb-5">
      <h3 className="text-3xl font-semibold uppercase text-blue my-3">
        Admin Dashboard
      </h3>
      <div className="flex items-center justify-between gap-3 h-full">
        {adminDashboardTabs.map((tab) => (
          <NavLink key={tab.link} to={tab.link}>
            <div className="bg-lightGrey p-3 rounded-xl w-full h-full">
              <p className="text-blue font-semibold uppercase ">{tab.name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardTabs;
