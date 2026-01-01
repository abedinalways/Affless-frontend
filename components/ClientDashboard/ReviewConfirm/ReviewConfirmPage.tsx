"use client";

import { useState } from "react";
import PaymentMethodPage from "../PaymentMethod/PaymentMethodPage";
import { RxDashboard } from "react-icons/rx";
import ProjectTitleIcon from "@/components/Icons/ProjectTitle";
import { LuClock } from "react-icons/lu";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export default function ReviewConfirmPage() {
  // ---- All data stored inside component ----
  const data = {
    projectTitle: "YouTube Travel Edit",
    videoCategory: "Animation",
    videoDuration: "40 min",
    software: ["After Effects"],
    notes: "",
    budget: 50,
    taxes:"$6",
    platfrom:"20%",
    duration: "3 Days",
    payment: "card",
  };

  // ---- To switch between Review → Payment ----
  const [showPayment, setShowPayment] = useState(false);

  // If user moves to Payment page
  if (showPayment) {
    return <PaymentMethodPage />;
  }

  return (
    <div className="containers mx-auto py-10 px-5">
      <h1 className="text-[30px] md:text-[35px] lg:text-[40px] font-medium text-[#333] pb-3">Review & Confirm</h1>
      <p className="text-[#4A4C56] text-[16px]">
        Please review your project details before sending the hire request.
      </p>

      {/* Editor Info */}
      <div className="py-6">
        <div className="p-8 bg-[#F6E5E5] text-white rounded-lg border border-[#FF4D4F]">
          <h2 className="text-xl text-[#333] font-medium">Jerome Bell</h2>
          <p className="text-sm pt-[18px] text-[#4A4C56]">Professional Video Editor</p>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-lg font-medium mb-4 text-[#333]">Project Details</h3>

        <div className="space-y-6 text-sm">
          <div>
            <p className="text-[#777980] flex gap-2 text-sm pb-3"><ProjectTitleIcon /> Project Title</p>
            <p className="font-medium">{data.projectTitle}</p>
          </div>

          <div>
            <p className="text-[#777980] flex gap-2 text-sm pb-3"><RxDashboard /> Video Category</p>
            <p className="font-medium">{data.videoCategory}</p>
          </div>

          <div>
            <p className="text-[#777980] flex gap-2 text-sm pb-3"><LuClock /> Video Duration</p>
            <p className="font-medium">{data.videoDuration}</p>
          </div>

          <div>
            <p className="text-[#777980] flex gap-2 text-sm pb-3"> Software Preference</p>
            <p className="font-medium">{data.software.join(", ")}</p>
          </div>

          {data.notes && (
            <div>
              <p className="text-gray-500">Description / Notes</p>
              <p className="font-medium whitespace-pre-line">{data.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Budget & Payment */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-xl font-medium leading-150% mb-6">Budget & Payment</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <p className="text-[#333] text-[16px] font-normal leading-150%">Project Budget</p>
            <p className="font-medium">${data.budget}</p>
          </div>
 <div className="flex justify-between">
            <p className="text-[#333] text-[16px] font-normal leading-150%">Taxes & Other Frees</p>
            <p className="font-medium">${data.taxes}</p>
          </div>
           <div className="flex justify-between">
            <p className="text-[#333] text-[16px] font-normal leading-150%">Platfrom Free 20%</p>
            <p className="font-medium">${data.platfrom}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#333] text-[16px] font-normal leading-150%">Project Duration</p>
            <p className="font-medium">{data.duration}</p>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg">
            <p className="font-normal text-[14px]">Estimated Total</p>
            <p className="font-bold">${data.budget}</p>
          </div>

          <button
            type="button"
            className="mt-3 text-sm text-left leading-150% text-[#4A4C56] flex gap-3"
          >
            <CreditCard />  Payment Method: Credit Card
          </button>
        </div>
      </div>

      {/* Note */}
      <div className="p-4 bg-[#EFF6FF] border border-[#0070FF] px-8 py-6 rounded-xl text-sm mb-10">
        <strong>Note:</strong> The editor will receive your request and can accept,
        decline, or message you.
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-800"
        >
          Back
        </button>
        <button type="button"
          onClick={() => setShowPayment(true)}
          className="flex-1 py-3 rounded-xl bg-[#FF4D4F] text-white cupointer cursor-pointer"
        >
       
            Confirm & Send Request
        
        </button>
      </div>
    </div>
  );
}
