"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import BudgetPage from "../BrowseJob/Budget";

type proposal = {
  id: string;
  redirect?: string;
}

export default function EditorPrise({ id, redirect }: proposal) {
  const [status, setStatus] = useState<"accept" | "reject" | null>(null);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || redirect || "";

  return (
    <div className="grid sm:grid-cols-[1fr_1fr] lg:grid-cols-1 w-full lg:max-w-[380px] bg-white rounded-2xl overflow-hidden">
      {/* Top Section */}
      <div className="p-6">
        <p className="text-[18px] font-bold text-[#4A4C56] leading-150% py-2.5">Editor's Price</p>
        <h2 className="text-[40px] font-bold text-[#333] leading-120%">
          $340.00
        </h2>

        {/* Delivery Date */}
        <div className="">
          <p className="text-[16px] font-medium text-black pt-8 pb-4">
            Editor's Chosen Delivery Date: March 12, 2026
          </p>

          <div className="grid grid-cols-3 text-center rounded-xl overflow-hidden">
            <div className="py-3">
              <p className="text-[16px] font-semibold text-[#333] ">6</p>
              <p className="text-[12px] text-[#777980]">Days</p>
            </div>

            <div className="py-3 border-l">
              <p className="text-[16px] font-semibold text-[#333] leading-180%">0</p>
              <p className="text-[12px] text-[#4A4C56] font-normal leading-150%">Hours</p>
            </div>

            <div className="py-3 border-l">
              <p className="text-[16px] font-semibold text-[#333] leading-180%">0</p>
              <p className="text-[12px] text-[#4A4C56] font-normal leading-150%">Minutes</p>
            </div>
            {/* 
            <div className="py-3 border-l">
              <p className="text-[16px] font-semibold text-[#333] leading-180%">00</p>
              <p className="text-[12px] text-[#4A4C56] font-normal leading-150%">Second</p>
            </div> */}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          {/* Accept */}
          <button
            type="button"
            onClick={() => {
              setStatus("accept");
              toast.error("Awaiting backend completion.")
            }}
            className={`w-full py-3 rounded-xl font-medium text-[16px] transition
      ${status === "accept"
                ? "bg-[#FF4D4F] text-white hover:opacity-90"
                : "border border-[#FF4D4F] text-[#FF4D4F] hover:bg-[#FFECEC]"
              } cursor-pointer`}
          >
            Accept
          </button>

          {/* Reject */}
          <button
            type="button"
            onClick={() => {
              setStatus("reject")
              toast.error("Awaiting backend completion.")
            }}
            className={`w-full py-3 rounded-xl font-medium text-[16px] transition
      ${status === "reject"
                ? "bg-[#FF4D4F] text-white hover:opacity-90"
                : "border border-[#FF4D4F] text-[#FF4D4F] hover:bg-[#FFECEC]"
              } cursor-pointer`}
          >
            Reject
          </button>
        </div>
      </div>

      {/* About Editor */}
      <BudgetPage
        btnText="Chat With Client"
        returnLink={`${redirectUrl ? `${redirectUrl}_` : ""}browsejobdetails:${id}`}
        showBudget={true}
        data={{
          id: `${new Date()?.getDate?.toString()}`,
          name: "Jane Smith",
          type: "editor",
          totalJobsPosted: 50,
          hireRate: 90,
          averageResponseTime: "1 hour",
          memberSince: "January, 2020",
          location: "Australia",
        }}
      />
    </div>
  );
}


/* Reusable row */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-[#4A6375] font-medium text-[16px] leading-150% text-end">{value}</span>
    </div>
  );
}