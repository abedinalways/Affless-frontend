"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";

type Props = {
  isMobile?: boolean;
};

export default function FindFilterCategory({ isMobile = false }: Props) {
  const [range, setRange] = React.useState([20, 9000]);
  const [duration, setDuration] = React.useState([1]);

  return (
    <aside
      className={`
        bg-white p-6 shadow-sm space-y-6
        ${isMobile ? "w-full h-fit rounded-none" : "hidden lg:block w-[330px] xl:w-1/4 rounded-xl sticky top-6 "}
      `}
    >
      {/* Job Category */}
      <div>
        <h3 className="font-bold text-[20px] mb-3">Job Category</h3>
        <div className="space-y-4">
          {[
            ["YouTube Long-form", "54"],
            ["Shorts/Reels/TikToks", "9+"],
            ["Thumbnails", "36+"],
            ["Ads/UGC", "28+"],
            ["Podcasts", "28+"],
            ["Weddings/Events", "28+"],
            ["Captions/Subtitles", "28+"],
            ["Color & Audio", "28+"],
          ].map(([label, count], i) => (
            <label key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px]">{label}</span>
              </div>
              <span className="bg-red-100 text-[#FF4D4F] px-3 py-1 rounded-md">
                {count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div>
        <h3 className="font-bold text-[20px] mb-3">Platform</h3>
        <div className="space-y-4">
          {[
            ["YouTube", "372+"],
            ["TikTok", "36+"],
            ["Instagram", "36+"],
            ["X (Twitter)", "36+"],
            ["Facebook", "36+"],
            ["Snapchat", "36+"],
          ].map(([name, count], i) => (
            <label key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px]">{name}</span>
              </div>
              <span className="bg-red-100 text-[#FF4D4F] px-3 py-1 rounded-md">
                {count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <h3 className="font-bold text-[20px] mb-3">Budget</h3>
        <div className="w-full flex flex-col items-center gap-3 mb-8">
          <div className="w-full flex justify-between px-2 text-gray-500 text-sm font-medium">
            <span>${range[0]}</span>
            <span>${range[1]}</span>
          </div>

          <Slider
            defaultValue={[200, 500]}
            max={10000}
            min={2}
            step={1}
            value={range}
            onValueChange={setRange}
            className="w-full"
          />
        </div>
      </div>

      {/* Project duration */}
      <div>
        <h3 className="font-bold text-[20px] mb-3">Project Duration</h3>
        <div className="w-full flex flex-col items-center gap-3 mb-8">
          <div className="w-full flex justify-between px-2 text-gray-500 text-sm font-medium">
            <span>{duration[0]} days</span>
          </div>

          <Slider
            defaultValue={[1]}
            max={50}
            min={1}
            step={1}
            value={duration}
            onValueChange={setDuration}
            className="w-full"
          />
        </div>
      </div>

      {/* Project Duration */}
      {/* <div>
        <h3 className="font-bold text-[20px] mb-3">Project Duration</h3>
        <div className="space-y-3">
          {["Express 24H", "Up to 3 days", "Up to 7 days", "Anytime"].map(
            (label, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px]">{label}</span>
              </label>
            )
          )}
        </div>
      </div> */}
    </aside>
  );
}
