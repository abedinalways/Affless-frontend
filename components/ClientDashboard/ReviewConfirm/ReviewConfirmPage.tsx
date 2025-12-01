"use client";

import { useState } from "react";
import PaymentMethodPage from "../PaymentMethod/PaymentMethodPage";

export default function ReviewConfirmPage() {
  // ---- All data stored inside component ----
  const data = {
    projectTitle: "YouTube Travel Edit",
    videoCategory: "Animation",
    videoDuration: "40 min",
    software: ["After Effects"],
    notes: "",
    budget: 50,
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
      <h1 className="text-3xl font-semibold mb-2">Review & Confirm</h1>
      <p className="text-gray-600 mb-7">
        Please review your project details before sending the hire request.
      </p>

      {/* Editor Info */}
      <div className="p-6 bg-[#FF4D4F] text-white rounded-xl mb-8">
        <h2 className="text-xl font-semibold">Selected Editor</h2>
        <p className="text-sm opacity-90">Professional Video Editor</p>
      </div>

      {/* Project Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Project Details</h3>

        <div className="space-y-5 text-sm">
          <div>
            <p className="text-gray-500">📄 Project Title</p>
            <p className="font-medium">{data.projectTitle}</p>
          </div>

          <div>
            <p className="text-gray-500">🎞 Video Category</p>
            <p className="font-medium">{data.videoCategory}</p>
          </div>

          <div>
            <p className="text-gray-500">⏱ Video Duration</p>
            <p className="font-medium">{data.videoDuration}</p>
          </div>

          <div>
            <p className="text-gray-500">🖥 Software Preference</p>
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
        <h3 className="text-lg font-semibold mb-4">Budget & Payment</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-600">Project Budget</p>
            <p className="font-medium">${data.budget}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Project Duration</p>
            <p className="font-medium">{data.duration}</p>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg">
            <p className="font-medium">Estimated Total</p>
            <p className="font-bold">${data.budget}</p>
          </div>

          <button
            type="button"
            className="mt-3 text-sm text-left"
          >
            Payment Method: Credit Card
          </button>
        </div>
      </div>

      {/* Note */}
      <div className="p-4 bg-blue-50 rounded-xl text-sm mb-10">
        <strong>Note:</strong> The editor will receive your request and can accept,
        decline, or message you.
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-5">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-800"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() => setShowPayment(true)}
          className="flex-1 py-3 rounded-xl bg-[#FF4D4F] text-white"
        >
          Confirm & Send Request
        </button>
      </div>
    </div>
  );
}
