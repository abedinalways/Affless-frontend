"use client";

import { Slider } from "@/components/ui/slider";
import React from "react";
import { IoClose } from "react-icons/io5";

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

type propType = {
  isMobile?: boolean;
  handleMenu?: () => void;
};


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
          className="w-5 h-5 accent-black cursor-pointer"
        />
        <span className="text-[#333] text-[16px]">{label}</span>
      </div>

      {count && (
        <span className="w-10 text-center py-1 rounded-md bg-red-100 text-red-500 text-sm font-medium">
          {count}
        </span>
      )}
    </label>
  );
}

/* ----------------------------------------
   FILTER SIDEBAR
-----------------------------------------*/
export default function FilterSidebar({isMobile, handleMenu}:propType) {
  // ✅ HOOK MUST BE INSIDE COMPONENT
  const [range, setRange] = React.useState([5, 35]);

  return (
    <div className={`w-[320px] sm:w-[400px] md:w-[320px] lg:w-full border p-6 bg-white shadow-sm ${isMobile ? 'h-full max-h-screen overflow-y-auto':'rounded-[20px] h-fit'}`} onClick={(e)=>e.stopPropagation()}>
      {/* Job Category */}
      <div className="flex items-start justify-between">
        <h2 className="text-[#333] font-semibold text-xl mb-4">Job Category</h2>
        <button type="button" disabled={!isMobile} className={`p-1 text-xl rounded-full hover:bg-red-50 cursor-pointer ${isMobile ? "block" : "hidden"}`} onClick={handleMenu}>
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        {jobCategories.map((item, idx) => (
          <CheckboxRow key={idx} {...item} />
        ))}
      </div>
      {/* defaultChecked={idx === 0} */}
      {/* Platform */}
      <h2 className="text-[#333] font-semibold text-xl mb-4">Platform</h2>
      <div className="flex flex-col gap-4 mb-8">
        {platforms.map((item, idx) => (
          <CheckboxRow key={idx} {...item} />
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
          <CheckboxRow key={idx} label={d} />
        ))}
      </div>
    </div>
  );
}
