"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Earning from "../../earning/page";
import EditorDetails from "@/components/AdminDashboard/UserManagement/EditorDetails";
import EditorJobDetails from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import { browseJobData as data } from "@/public/demodata";
import EarningPage from "@/app/(website)/(dashboard)/(editor-dashboard)/editor/earning/page";
import EarningsPage from "@/components/AdminDashboard/UserManagement/EditorEarningTab";
import JobHistoryPage from "@/components/AdminDashboard/UserManagement/EditorJobDetails";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import toast from "react-hot-toast";

const actionMeta = {
  ban: {
    title: "Ban User",
    description: "Are you sure you want to ban this user? This action cannot be undone.",
    confirmText: "Ban User",
    cancelText: "Cancel",
    confirmButtonClass: "bg-[#ff4d4f] hover:bg-[#fd4447] text-white px-4 py-1 rounded-lg cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff4d4f]",
  },
  suspend: {
    title: "Suspend User",
    description: "Are you sure you want to suspend this user? This action can be lifted later.",
    confirmText: "Suspend User",
    cancelText: "Cancel",
    confirmButtonClass: "bg-slate-600 hover:bg-slate-700 text-white px-4 py-1 rounded-lg cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-600",
  },
  warn: {
    title: "Issue Warning",
    description: "Are you sure you want to issue a warning to this user? This will be recorded on their profile.",
    confirmText: "Issue Warning",
    cancelText: "Cancel",
    confirmButtonClass: "bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 rounded-lg cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600",
  },
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">("details");
  const router = useRouter();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"ban" | "suspend" | "warn" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleActionClick = (action: "ban" | "suspend" | "warn") => {
    setConfirmationAction(action);
    setConfirmationOpen(true);
  }


  const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const usFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-fit flex items-center gap-2 border px-5 py-2 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
        >
          <FaArrowLeft />
          <span>Back to Editor List</span>
        </button>
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={()=>handleActionClick("warn")}
            className="w-fit flex items-center gap-2 border px-5 py-2 rounded-md text-amber-600 border-amber-600 bg-white font-medium cursor-pointer hover:bg-amber-50 hover:rounded transition-all duration-300"
          >
            Warning
          </button>

          <button
            type="button"
            onClick={()=>handleActionClick("suspend")}
            className="w-fit flex items-center gap-2 border px-5 py-2 rounded-md text-white border-slate-600 bg-slate-600 font-medium cursor-pointer hover:bg-slate-700 hover:rounded transition-all duration-300"
          >
            Suspend
          </button>

          <button
            type="button"
            onClick={()=>handleActionClick("ban")}
            className="w-fit flex items-center gap-2 border px-5 py-2 rounded-md text-white border-[#ff4d4f] bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:rounded transition-all duration-300 shadow-sm"
          >
            Ban User
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-4">
        <Image
          src="/images/Annette.jpg"
          alt="Editor Profile"
          width={500}
          height={500}
          className="w-full aspect-square object-cover max-w-[250px] rounded-lg"
        />
        <div>
          <div className="flex items-start gap-4 mb-2">
            <h1 className="text-3xl font-semibold text-[#1f2937]">Annette Black</h1>
            <p className="text-xs mt-1 bg-[#ff4d4f] text-white px-1 rounded">Active</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600">Active Projects: <span className="text-gray-900">5</span></p>
            <p className="text-gray-600">Worked With: <span className="text-gray-900">12 clients</span></p>
            <p className="text-gray-600">Average Response Time: <span className="text-gray-900">2 hours</span></p>
            <p className="text-gray-600">Job Completion Rate (%): <span className="text-gray-900">85%</span></p>
            <p className="text-gray-600">Warning: <span className="text-gray-900">1/3</span></p>
            <p className="text-gray-600">Suspended: <span className="text-gray-900">0/2</span></p>
          </div>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">{usFormat.format(12)}</h2>
          <p className="text-gray-500">Successfully Completed Jobs</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <div>
            <h2 className="text-3xl font-bold">${usFormatWithDecimals.format(500.00)}</h2>
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
      {confirmationOpen && <ConfirmationPopup 
        loading={loading}
        isOpen={confirmationOpen}
        title={confirmationAction ? actionMeta[confirmationAction].title : ""}
        description={confirmationAction ? actionMeta[confirmationAction].description : ""}
        confirmText={confirmationAction ? actionMeta[confirmationAction].confirmText : ""}
        cancelText={confirmationAction ? actionMeta[confirmationAction].cancelText : ""}
        confirmClassName={confirmationAction ? actionMeta[confirmationAction].confirmButtonClass : ""}
        reason={true}
        onConfirm={() => {
          console.log(`${confirmationAction} confirmed`);
          setLoading(true);
          setTimeout(() => {
            toast.success(`${confirmationAction === "ban" ? "User banned" : confirmationAction === "suspend" ? "User suspended" : "Warning issued"} successfully`);
            setConfirmationOpen(false);
            setLoading(false);
          }, 3000);
        }}
        onCancel={() => {
          setConfirmationOpen(false);
          console.log(`${confirmationAction} cancelled`);
        }}
      />}
    </div>
  );
}
