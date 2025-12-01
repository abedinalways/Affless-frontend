"use client";

import { Slider } from "@/components/ui/slider";
import React from "react";

/* ----------------------------------------
   JSON DATA
-----------------------------------------*/
export const jobCategories = [
  { label: "Long-Form Video", count: "54" },
  { label: "Shorts/Reels/TikToks", count: "9+" },
  { label: "Photo", count: "36+" },
  { label: "Audio", count: "28+" },
];

export const platforms = [
  { label: "YouTube", count: "372+" },
  { label: "TikTok", count: "36+" },
  { label: "Instagram", count: "36+" },
  { label: "X (Twitter)", count: "36+" },
  { label: "Facebook", count: "36+" },
  { label: "Snapchat", count: "36+" },
];

export const deliveryTimes = [
  "Express 24H",
  "Up to 3 days",
  "Up to 7 days",
  "Anytime",
];

/* ----------------------------------------
   Checkbox Component
-----------------------------------------*/
type CheckboxProps = {
  label: string;
  count?: string;
  defaultChecked?: boolean;
};

function CheckboxRow({ label, count, defaultChecked }: CheckboxProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="w-5 h-5 accent-black"
        />
        <span className="text-[#333] text-[16px]">{label}</span>
      </div>

      {count && (
        <span className="w-[40px] text-center py-1 rounded-md bg-red-100 text-red-500 text-sm font-medium">
          {count}
        </span>
      )}
    </label>
  );
}

/* ----------------------------------------
   FILTER SIDEBAR
-----------------------------------------*/
export default function FilterSidebar() {
  // ✅ HOOK MUST BE INSIDE COMPONENT
  const [range, setRange] = React.useState([5, 35]);

  return (
    <div className="w-[320px] border p-6 rounded-[20px] bg-white shadow-sm h-fit sticky top-5">
      
      {/* Job Category */}
      <h2 className="text-[#333] font-semibold text-xl mb-4">Job Category</h2>
      <div className="flex flex-col gap-4 mb-8">
        {jobCategories.map((item, idx) => (
          <CheckboxRow key={idx} {...item} defaultChecked={idx === 0} />
        ))}
      </div>

      {/* Platform */}
      <h2 className="text-[#333] font-semibold text-xl mb-4">Platform</h2>
      <div className="flex flex-col gap-4 mb-8">
        {platforms.map((item, idx) => (
          <CheckboxRow key={idx} {...item} defaultChecked={idx === 0} />
        ))}
      </div>

      {/* Price Range */}
      <div className="w-full flex flex-col items-center gap-3 mb-8">
        <div className="w-full flex justify-between px-2 text-gray-500 text-sm font-medium">
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>

        <Slider
          defaultValue={[5, 35]}
          max={100}
          min={0}
          step={1}
          value={range}
          onValueChange={setRange}
          className="w-full"
        />
      </div>

      {/* Delivery Time */}
      <h2 className="text-[#333] font-semibold text-xl mb-4">Delivery Time</h2>
      <div className="flex flex-col gap-4">
        {deliveryTimes.map((d, idx) => (
          <CheckboxRow key={idx} label={d} defaultChecked={idx === 0} />
        ))}
      </div>
    </div>
  );
}
