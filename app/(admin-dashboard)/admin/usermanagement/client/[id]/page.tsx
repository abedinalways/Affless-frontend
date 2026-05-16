"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingHistoryPage from "@/components/AdminDashboard/UserManagement/ClientEarnTab";
import ClientJob from "@/components/AdminDashboard/UserManagement/ClientJobTab";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import BanModal from "../../_components/BanModal";
import SuspendModal from "../../_components/SuspendModal";
import WarningModal from "../../_components/WarningModal";
import toast from "react-hot-toast";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">(
    "details",
  );
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "ban" | "suspend" | "warn" | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleActionClick = (action: "ban" | "suspend" | "warn") => {
    setConfirmationAction(action);
    setConfirmationOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-white bg-[#ff4d4f] px-5 py-2 font-medium text-white duration-300 hover:bg-[#fd4447] hover:text-white"
        >
          <FaArrowLeft />
          <span>Back to Client List</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleActionClick("warn")}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-amber-600 bg-white px-5 py-2 font-medium text-amber-600 transition-all duration-300 hover:rounded hover:bg-amber-50"
          >
            Warning
          </button>

          <button
            type="button"
            onClick={() => handleActionClick("suspend")}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-slate-600 bg-slate-600 px-5 py-2 font-medium text-white transition-all duration-300 hover:rounded hover:bg-slate-700"
          >
            Suspend
          </button>

          <button
            type="button"
            onClick={() => handleActionClick("ban")}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-[#ff4d4f] bg-[#ff4d4f] px-5 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:rounded hover:bg-[#fd4447]"
          >
            Ban User
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[auto_1fr]">
        <Link href="/client-profile/1">
          <Image
            src="/images/Courtney.jpg"
            alt="Editor Profile"
            width={500}
            height={500}
            className="aspect-square w-full max-w-[250px] rounded-lg object-cover"
          />
        </Link>
        <div>
          <div className="mb-2 flex items-start gap-4">
            <Link
              href="/client-profile/1"
              className="text-3xl font-semibold text-[#1f2937]"
            >
              Annette Black
            </Link>
            <p className="mt-1 rounded bg-gray-500 px-1 text-xs text-white">
              Inactive
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600">
              Active Jobs: <span className="text-gray-900">5</span>
            </p>
            <p className="text-gray-600">
              Total Jobs Posted: <span className="text-gray-900">12 jobs</span>
            </p>
            <p className="text-gray-600">
              Hire Rate (%): <span className="text-gray-900">85%</span>
            </p>
            <p className="text-gray-600">
              Average Response Time:{" "}
              <span className="text-gray-900">2 hours</span>
            </p>
            <p className="text-gray-600">
              Common Warnings Count (Everything Except Violation of Off-Platform
              Rules): <span className="text-gray-900">1/3</span>
            </p>
            <p className="text-gray-600">
              Suspensions Count: <span className="text-gray-900">0/2</span>
            </p>
            <p className="text-gray-600">
              Violation of Off-Platform Safety Rules Policy Warnings Count:{" "}
              <span className="text-gray-900">0/2</span>
            </p>
          </div>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 text-center shadow">
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500">Successfully Completed Jobs</p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          <h2 className="text-3xl font-bold">$500.00</h2>
          <p className="text-gray-500">Amount Spent</p>
        </div>

        <div className="rounded-xl bg-white p-6 text-center shadow">
          <div className="flex items-center justify-center gap-1 text-3xl font-bold">
            <span>4.7</span>
            <FaStar className="inline text-2xl text-yellow-400" />
          </div>
          <p className="text-gray-500">Average Rating</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b pb-2">
        <Tabs defaultValue="Jobs" className="w-full">
          <TabsList>
            <TabsTrigger value="Jobs" className="cursor-pointer">
              Jobs
            </TabsTrigger>
            <TabsTrigger value="Earning" className="cursor-pointer">
              Payments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Jobs">
            <ClientJob />
          </TabsContent>
          <TabsContent value="Earning">
            <BillingHistoryPage />
          </TabsContent>
        </Tabs>
      </div>
      {confirmationOpen && confirmationAction === "warn" && (
        <WarningModal
          loading={loading}
          isOpen={confirmationOpen}
          onConfirm={() => {
            setLoading(true);
            setTimeout(() => {
              setConfirmationOpen(false);
              setLoading(false);
              toast.success(
                "Warning has been issued to the user successfully.",
              );
            }, 3000);
          }}
          onCancel={() => {
            setConfirmationOpen(false);
          }}
        />
      )}
      {confirmationOpen && confirmationAction === "suspend" && (
        <SuspendModal
          loading={loading}
          isOpen={confirmationOpen}
          onConfirm={() => {
            console.log(`${confirmationAction} confirmed`);
            setLoading(true);
            setTimeout(() => {
              setConfirmationOpen(false);
              setLoading(false);
              toast.success("User has been suspended successfully.");
            }, 3000);
          }}
          onCancel={() => {
            setConfirmationOpen(false);
          }}
        />
      )}
      {confirmationOpen && confirmationAction === "ban" && (
        <BanModal
          loading={loading}
          isOpen={confirmationOpen}
          onConfirm={() => {
            setLoading(true);
            setTimeout(() => {
              setConfirmationOpen(false);
              setLoading(false);
              toast.success("User has been banned successfully.");
            }, 3000);
          }}
          onCancel={() => {
            setConfirmationOpen(false);
          }}
        />
      )}
    </div>
  );
}
