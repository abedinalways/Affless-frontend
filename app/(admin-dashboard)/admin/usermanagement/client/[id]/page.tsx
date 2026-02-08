"use client";

import EarningTab from "@/components/AdminDashboard/UserManagement/EditorEarningTab";
import UserProfile from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import UserDetails from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import JobPage from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BillingHistoryPage from "@/components/AdminDashboard/UserManagement/ClientEarnTab";
import ClientJob from "@/components/AdminDashboard/UserManagement/ClientJobTab";
import { FaStar } from "react-icons/fa";
export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">("details");

  return (
    <div className="">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500">Successfully Completed Jobs</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">$500.00</h2>
          <p className="text-gray-500">Amount Spent</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <div className="text-3xl font-bold flex items-center justify-center gap-1">
            <span>4.7</span>
            <FaStar className="text-2xl inline text-yellow-400" />
          </div>
          <p className="text-gray-500">Average Rating</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mt-6 border-b pb-2">



        <Tabs defaultValue="Jobs" className="w-full">
          <TabsList>
            <TabsTrigger value="Jobs" className="cursor-pointer">Jobs</TabsTrigger>
            <TabsTrigger value="Earning" className="cursor-pointer">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="Jobs">
            <ClientJob />
          </TabsContent>
          <TabsContent value="Earning">
            <BillingHistoryPage />
          </TabsContent>
        </Tabs>

      </div>


    </div>
  );
}
