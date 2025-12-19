"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Earning from "../../earning/page";
import EditorDetails from "@/components/AdminDashboard/UserManagement/EditorDetails";
import EditorJobDetails from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import { data } from "@/components/ClientEditor/BrowseJob/BrowseJob";
import EarningPage from "@/app/(editor-dashboard)/editor/earning/page";
import EarningsPage from "@/components/AdminDashboard/UserManagement/EditorEarningTab";
import JobHistoryPage from "@/components/AdminDashboard/UserManagement/EditorJobDetails";

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">("details");

  return (
    <div className="space-y-6">

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
      <Tabs defaultValue="editor" className="w-full space-y-6">
        <div className=" mb-6 border border-[#DCDDDD] rounded-lg p-3">
          <div>
            <TabsList className="flex gap-9">
              <TabsTrigger value="editor">Details</TabsTrigger>
              <TabsTrigger value="client">Job</TabsTrigger>
              <TabsTrigger value="earning">Earning</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="editor">
          <EditorDetails />
        </TabsContent>
        <TabsContent value="client">
          <JobHistoryPage />
        </TabsContent>
        <TabsContent value="earning">
          <EarningsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
