"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  status?: "Accept" | "Declined" | null;
};

export default function BudgetPage({ status = "Accept" }: Props) {
  return (
    <div className="mx-auto space-y-6">
      {/* Budget Box */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 text-center space-y-4">
        <h2 className="text-lg font-bold text-[#4A4C56]">Budget</h2>

        <p className="text-[30px] log:text-[40px] font-bold text-[#333]">
          $350.00
        </p>

        {/* <button
          className={`w-full py-4 rounded-full text-lg font-medium transition ${
            status === "Accept"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Accept
        </button>

        <button
          className={`w-full py-4 rounded-full text-lg font-normal text-[16px] transition ${
            status === "Declined"
              ? "bg-[#FF4D4F] text-white hover:opacity-90"
              : "border border-red-300 text-red-500 bg-red-50 hover:bg-red-100"
          }`}
        >
          Reject
        </button> */}

        {/* Info */}
        {/* <div className="bg-gray-50 rounded-2xl p-4 mt-4">
          <InfoRow label="Project Level:" value="Expensive" />
          <InfoRow label="Languages:" value="French" />
          <InfoRow label="English Level:" value="Native" />
        </div> */}
      
      </div>
  <div className="bg-white text-center p-6 rounded-2xl">
           <h2 className="text-[#4A4C56]">Time</h2>

        <p className=" text-[#333] font-medium text-[24px] leading-150%">
          5 Days
        </p>
        </div>
      {/* About Buyer */}
      <div className="bg-white rounded-2xl shadow p-6 border">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">
          About Buyer
        </h2>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            <Image
              src="/images/jerome.png"
              alt="Buyer"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>

          <p className="text-lg font-semibold">Bessie Cooper</p>

          <div className="flex items-center gap-2 mt-2">
            <Image src="/images/coper1.png" alt="img" width={30} height={30} />
            <Image src="/images/coper2.png" alt="img" width={30} height={30} />
            <Image src="/images/coper3.png" alt="img" width={30} height={30} />
          </div>
        </div>

        <div className="bg-gray-50 border rounded-2xl p-4 mt-4">
          <InfoRow label="Gender:" value="Male" />
          <InfoRow label="Location:" value="Australia" />
          <InfoRow label="Languages:" value="Arabic" />
          <InfoRow label="English Level:" value="Fluent" />
        </div>
      </div>

      {/* Chat Button */}
      <Link
        href="/client/message"
        className="w-full block text-center bg-red-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition"
      >
        Chat with Editor
      </Link>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-[#4A6375] font-medium text-[16px] leading-150%">
        {value}
      </span>
    </div>
  );
}
