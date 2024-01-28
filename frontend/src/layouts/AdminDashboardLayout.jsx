import React from "react";
import { Outlet } from "react-router-dom";

import AdminDashboardTabs from "../components/adminDashboardTabs";

const AdminDashboardLayout = () => {
  return (
    <div className="mt-5 h-full">
      <AdminDashboardTabs />
      <Outlet />
    </div>
  );
};

export default AdminDashboardLayout;
