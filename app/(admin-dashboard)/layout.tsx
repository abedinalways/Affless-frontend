import React from "react";
import Sidebar from "./admin/_components/sidebar";
import DashboardHeader from "./admin/_components/dashboard-header";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="w-full h-screen grid grid-cols-[auto_1fr]">
        <div className="w-full h-full ">
          <Sidebar />
        </div>
        <div className="w-full px-2 sm:px-8 py-4 sm:py-10 h-screen overflow-y-auto space-y-8">
          <div className="w-full">
            <DashboardHeader />
          </div>
          <div className="">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;