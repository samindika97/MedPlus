import React from "react";
import { NavLink } from "react-router-dom";

import { adminDashboardTabs } from "../../data/data";

const AdminDashboardTabs = () => {
  return (
    <div className="mb-5 flex w-full items-center justify-between rounded-xl">
      <h3 className="my-3 text-3xl font-semibold uppercase text-blue">
        Admin Dashboard
      </h3>
      <div className="flex h-full items-center justify-between gap-3">
        {adminDashboardTabs.map((tab) => (
          <NavLink
            key={tab.link}
            to={tab.link}
            className={({ isActive, isPending }) =>
              `rounded-lg px-4 py-2 ${
                isPending
                  ? "bg-teal/50"
                  : isActive
                  ? "bg-teal text-white"
                  : "bg-lightGrey"
              }`
            }
          >
            <p className="font-semibold uppercase">{tab.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardTabs;
