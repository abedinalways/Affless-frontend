"use client";

import { useState } from "react";
import { Video } from "lucide-react";

export default function PlatFromWide() {
  const [baseMinimum] = useState(2);

  const [shortFormMinimums] = useState([
    { id: "sf-1", label: "0-59 seconds", minimum: 2 },
    { id: "sf-2", label: "0-59 seconds", minimum: 3 },
  ]);

  return (
    <div className="w-full rounded-2xl bg-white p-8">
      <h2 className="text-[26px] font-semibold text-[#111827]">
        Platform-Wide Base Rule
      </h2>

      <p className="mt-2 text-[14px] leading-6 text-[#6B7280]">
        This applies to all categories related to photo and audio editing. No job
        can be posted below this amount
      </p>

      <div className="mt-5 rounded-xl border border-[#FFB4B4] bg-[#FFF4EE] px-6 py-5 flex items-center gap-2">
        <span className="text-[#FF4B4B] text-[18px] font-semibold">$</span>
        <span className="text-[#FF4B4B] text-[18px] font-semibold">
          {baseMinimum}
        </span>
        <span className="text-[15px] text-[#374151]">
          Absolute Minimum Payout
        </span>
      </div>

      <div className="mt-10 flex items-start gap-4">
        <div className="h-11 w-11 rounded-full bg-[#E9FBEE] flex items-center justify-center">
          <Video className="h-5 w-5 text-[#22C55E]" />
        </div>

        <div>
          <h3 className="text-[24px] font-semibold text-[#111827]">
            Short-Form Content Minimums
          </h3>
          <p className="mt-2 text-[14px] text-[#6B7280]">
            YouTube Shorts, TikTok, Reels, Instagram Reels, etc
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {shortFormMinimums.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-[#7BD99A] bg-[#EEFCF3] px-6 py-6 flex items-center justify-between"
          >
            <p className="text-[16px] text-[#111827]">{row.label}</p>

            <div className="flex items-center gap-2">
              <span className="text-[#111827] text-[18px] font-semibold">
                ${row.minimum}
              </span>
              <span className="text-[14px] text-[#374151]">minimum</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
