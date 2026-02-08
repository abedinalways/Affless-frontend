"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Earning from "../../earning/page";
import EditorDetails from "@/components/AdminDashboard/UserManagement/EditorDetails";
import EditorJobDetails from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import { data } from "@/components/ClientEditor/BrowseJob/BrowseJob";
import EarningPage from "@/app/(website)/(dashboard)/(editor-dashboard)/editor/earning/page";
import EarningsPage from "@/components/AdminDashboard/UserManagement/EditorEarningTab";
import JobHistoryPage from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">("details");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="border px-4 py-0.5 rounded-lg bg-[#FF4D4F] text-white hover:bg-[#e2413c] transition cursor-pointer"
      >
        Back
      </button>
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500">Successfully Completed Jobs</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <div>
            <h2 className="text-3xl font-bold">$500.00</h2>
          </div>
          <p className="text-gray-500">Total Earnings</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <div className="text-3xl font-bold flex items-center justify-center gap-1">
            <span>4.7</span>
            <FaStar className="text-2xl inline text-yellow-400" />
          </div>
          <p className="text-gray-500">Average Rating</p>
        </div>
      </div>
      <Tabs defaultValue="editor" className="w-full space-y-6">
        <div className=" mb-6 border border-[#DCDDDD] rounded-lg p-3">
          <div>
            <TabsList className="flex gap-9">
              <TabsTrigger value="editor" className="cursor-pointer">Details</TabsTrigger>
              <TabsTrigger value="client" className="cursor-pointer">Jobs</TabsTrigger>
              <TabsTrigger value="earning" className="cursor-pointer">Earnings</TabsTrigger>
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
