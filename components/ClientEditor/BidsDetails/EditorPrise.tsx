"use client";

import Image from "next/image";
import { useState } from "react";

export default function EditorPrise() {
    const [status, setStatus] = useState<"accept" | "reject" | null>(null);

  return (
    <div className="w-full max-w-[380px] bg-white rounded-2xl overflow-hidden">
      {/* Top Section */}
      <div className="p-6">
        <p className="text-[18px] font-bold text-[#4A4C56] leading-150% py-2.5">Editor price</p>
        <h2 className="text-[40px] font-bold text-[#333] leading-120%">
          $340.00
        </h2>

        {/* Delivery Date */}
        <div className="">
          <p className="text-[16px] font-medium text-[#000] pt-8 pb-4">
            Delivery Date
          </p>

          <div className="grid grid-cols-4 text-center rounded-xl overflow-hidden">
            <div className="py-3">
              <p className="text-[16px] font-semibold text-[#333] ">06</p>
              <p className="text-[12px] text-[#777980]">Days</p>
            </div>

            <div className="py-3 border-l">
              <p className="text-[16px] font-semibold text-[#333] leading-180%">00</p>
              <p className="text-[12px] text-[#4A4C56] font-normal leading-150%">Hours</p>
            </div>

            <div className="py-3 border-l">
              <p className="text-[16px] font-semibold text-[#333] leading-180%">00</p>
              <p className="text-[12px] text-[#4A4C56] font-normal leading-150%">Minutes</p>
            </div>

            <div className="py-3 border-l">
              <p className="text-[16px] font-semibold text-[#333] leading-180%">00</p>
              <p className="text-[12px] text-[#4A4C56] font-normal leading-150%">Second</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
  {/* Accept */}
  <button
    type="button"
    onClick={() => setStatus("accept")}
    className={`w-full py-3 rounded-xl font-medium text-[16px] transition
      ${
        status === "accept"
          ? "bg-[#FF4D4F] text-white hover:opacity-90"
          : "border border-[#FF4D4F] text-[#FF4D4F] hover:bg-[#FFECEC]"
      } cursor-pointer`}
  >
    Accept
  </button>

  {/* Reject */}
  <button
    type="button"
    onClick={() => setStatus("reject")}
    className={`w-full py-3 rounded-xl font-medium text-[16px] transition
      ${
        status === "reject"
          ? "bg-[#FF4D4F] text-white hover:opacity-90"
          : "border border-[#FF4D4F] text-[#FF4D4F] hover:bg-[#FFECEC]"
      } cursor-pointer`}
  >
    Reject
  </button>
</div>
      </div>

      {/* About Editor */}
      <div className="bg-[#F8F8F8] p-6">
        <h3 className="text-center text-[24px] font-semibold text-[#333] mb-4">
          About Editor
        </h3>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center">
          <div className="w-[90px] h-[90px] rounded-full overflow-hidden border">
            <Image
              src="/images/devon.png"
              alt="Editor"
              width={90}
              height={90}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="pt-4 text-[16px] font-medium text-[#333]">
            Bessie Cooper
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 bg-white rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-[#777980] font-normal leading-150%">Gender:</span>
            <span className="text-[#4A6375] text-[16px] font-medium">Male</span>
          </div>

          <div className="flex justify-between text-[14px]">
            <span className="text-[#777980] font-normal leading-150%">Location:</span>
            <span className="text-[#4A6375] text-[16px] font-medium">Australia</span>
          </div>

          <div className="flex justify-between text-[14px]">
            <span className="text-[#777980] font-normal leading-150%">Languages:</span>
            <span className="text-[#4A6375] text-[16px] font-medium">Arabic</span>
          </div>
        </div>

        {/* Contact */}
        <button className="mt-6 w-full py-3 rounded-xl bg-[#FF4D4F] text-white font-medium text-[16px] cursor-pointer hover:opacity-90 transition">
          Contact Editor
        </button>
      </div>
    </div>
  );
}
