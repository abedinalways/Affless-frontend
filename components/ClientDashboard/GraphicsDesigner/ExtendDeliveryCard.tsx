"use client";

import { ArrowRight } from "lucide-react";

export default function ExtendDeliveryCard() {
  return (
    <div className="w-full max-w-[560px] bg-white rounded-2xl">
      {/* Title */}
      <h2 className="text-[26px] font-semibold text-[#1f2937]">
        Extend Delivery Date
      </h2>

      {/* Current -> Proposed */}
      <div className="mt-6 flex items-center justify-center gap-10">
        {/* Current */}
        <div className="text-center">
          <p className="text-[14px] text-gray-500">Current</p>
          <p className="mt-2 text-[16px] font-medium text-[#374151]">
            Jan 05, 2026
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <ArrowRight className="text-[#ff4b4b]" size={22} />
        </div>

        {/* Proposed */}
        <div className="text-center">
          <p className="text-[14px] text-[#ff4b4b]">Proposed</p>
          <p className="mt-2 text-[16px] font-medium text-[#ff4b4b]">
            Jan 12, 2026
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="mt-8">
        <h4 className="text-[16px] font-semibold text-[#111827] mb-3">
          Message
        </h4>
        <p className="text-[15px] leading-6 text-gray-500">
          Hi! Since we added the extra 30-second motion graphics segment
          yesterday, I’ll need a few more days to ensure the rendering and color
          grading are up to standard. Hope you understand!"
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex items-center gap-5">
        <button
          type="button"
          className="flex-1 h-[56px] rounded-full bg-[#ff4b4b] text-white font-medium text-[16px] cursor-pointer hover:opacity-90 transition"
        >
          Accept Extension
        </button>

        <button
          type="button"
          className="flex-1 h-[56px] rounded-full border border-[#ff4b4b] text-[#374151] font-medium text-[16px] cursor-pointer hover:bg-red-50 transition"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
