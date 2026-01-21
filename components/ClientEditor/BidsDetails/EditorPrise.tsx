"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function EditorPrise() {
  const [status, setStatus] = useState<"accept" | "reject" | null>(null);

  return (
    <div className="grid sm:grid-cols-[1fr_1fr] lg:grid-cols-1 w-full lg:max-w-[380px] bg-white rounded-2xl overflow-hidden">
      {/* Top Section */}
      <div className="p-6">
        <p className="text-[18px] font-bold text-[#4A4C56] leading-150% py-2.5">Editor price</p>
        <h2 className="text-[40px] font-bold text-[#333] leading-120%">
          $340.00
        </h2>

        {/* Delivery Date */}
        <div className="">
          <p className="text-[16px] font-medium text-black pt-8 pb-4">
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
            onClick={() => setStatus("reject")}
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
      <div className="bg-[#F8F8F8]">
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">
            About Editor
          </h2>

          {/* Buyer Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border">
              <Link href="/client-profile/1">
                <Image
                  src="/images/jerome.png"
                  alt="Buyer"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </Link>
            </div>

            <Link href="/client-profile/1" className="text-lg font-semibold">Bessie Cooper</Link>

            {/* Small Badge Icons */}
            <div className="flex items-center gap-2 mt-2">
              <Image src="/images/coper1.png" alt="img" width={30} height={30}></Image>
              {/* <Image src="/images/coper2.png" alt="img" width={30} height={30}></Image>
              <Image src="/images/coper3.png" alt="img" width={30} height={30}></Image> */}
            </div>
          </div>

          {/* Buyer Info */}
          <div className="bg-gray-50 border rounded-2xl p-4 mt-4">
            <InfoRow label="Total Jobs Completed:" value="50" />
            <InfoRow label="Project Completion Rate (%):" value="80%" />
            <InfoRow label="Average Response Time:" value="30 mins" />
            <InfoRow label="Member Since:" value="Jan, 2020" />
          </div>
        </div>

        {/* Contact */}
        <Link href="/client/message?id=2">
          <button className="mt-6 w-full py-3 rounded-xl bg-[#FF4D4F] text-white font-medium text-[16px] cursor-pointer hover:opacity-90 transition">
            Chat With Editor
          </button></Link>
      </div>
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