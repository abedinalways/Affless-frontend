"use client";

import PayoutSettingsModal from "@/components/reusable/PaymentSettingModal";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// ---------- Job row type ----------
type JobRow = {
  id: number;
  title: string;
  price: string;
  days: string;
  status: "Withdrawal Request" | "Pending" | "Cancel";
};

// ---------- Dummy data ----------
const jobs: JobRow[] = [
  { id: 1, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Withdrawal Request" },
  { id: 2, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Pending" },
  { id: 3, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Cancel" },
  { id: 4, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Withdrawal Request" },
  { id: 5, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Withdrawal Request" },
  { id: 6, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Pending" },
  { id: 7, title: "I will craft quality backlinks for your website's SEO.", price: "$55", days: "5 Days", status: "Cancel" },
];

export default function Earnings() {
  const [openPayout, setOpenPayout] = useState(false);

  return (
    <div className="containers py-10">
      <h1 className="text-3xl font-semibold mb-6">Earnings</h1>

      {/* ------- Top Section ------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-4">Available funds</h2>
          <div className="text-4xl font-bold mb-4">$ 154.00</div>

          <Link href="/editor/withdrow-blance">
          <button className="bg-red-500 text-white rounded-lg px-5 py-2 mb-3 cursor-pointer">
            Withdraw Balance
          </button></Link>

          <button
            onClick={() => setOpenPayout(true)}
            className="bg-red-100 text-red-500 rounded-lg px-5 py-2 block cursor-pointer"
          >
            Payout Settings
          </button>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-4">Future payments</h2>
          <p className="text-gray-600 text-sm">Payments being cleared</p>
          <p className="text-3xl font-bold mb-4">$54.00</p>
          <hr className="my-4" />
          <p className="text-gray-600 text-sm">Payments for active orders</p>
          <p className="text-2xl font-bold">US$0.00</p>
        </div>
      </div>

      {/* ------- Job Section ------- */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full border-separate border-spacing-y-3">
          <tbody>
            {jobs.map((job) => {
              const statusColor =
                job.status === "Pending"
                  ? "bg-green-100 text-green-700"
                  : job.status === "Cancel"
                  ? "bg-red-100 text-red-600"
                  : "bg-red-100 text-red-500";

              return (
                <tr key={job.id} className="bg-white border rounded-xl shadow-sm">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/images/mnagejob1.jpg"
                        alt="job"
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-gray-700 w-[300px]">{job.title}</p>
                    </div>
                  </td>

                  <td className="p-4 text-center font-semibold w-[120px]">{job.price}</td>
                  <td className="p-4 text-center w-[120px]">{job.days}</td>

                  <td className="p-4">
                    <span
                      className={`px-5 w-[200px] text-center py-1 rounded-lg text-[15px] font-normal block ${statusColor}`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal component connected */}
      <PayoutSettingsModal open={openPayout} onClose={() => setOpenPayout(false)} />
    </div>
  );
}
