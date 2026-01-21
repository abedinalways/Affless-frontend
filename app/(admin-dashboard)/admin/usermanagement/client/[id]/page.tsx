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
export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">("details");

  return (
    <div className="">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500">Job completed</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">$500.00</h2>
          <p className="text-gray-500">Earnings</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">4.7</h2>
          <p className="text-gray-500">Average rating</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mt-6 border-b pb-2">

     

        <Tabs defaultValue="Jobs" className="w-full">
  <TabsList>
    <TabsTrigger value="Jobs">Job</TabsTrigger>
    <TabsTrigger value="Earning">Earning</TabsTrigger>
  </TabsList>
  <TabsContent value="Jobs">
<ClientJob/>
  </TabsContent>
  <TabsContent value="Earning">
  <BillingHistoryPage/>
  </TabsContent>
</Tabs>

      </div>


    </div>
  );
}
