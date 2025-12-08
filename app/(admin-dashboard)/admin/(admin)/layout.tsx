import React from "react";
import Sidebar from "./dashboard/_components/sidebar";
import DashboardHeader from "./dashboard/_components/dashboard-header";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
   
      <div className="w-full flex ">
        <div>
          <div>
            
          </div>
          <div className="sticky top-0">
          <Sidebar />
        </div>
        </div>
      <div className="w-full px-8 lg:px-12.5 py-10">
           <div className="w-full">
            <DashboardHeader/>
           </div>
          <div className="py-8">
            <main>{children}</main>
          </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;