"use client";

import { Clapperboard } from "lucide-react";

export default function LongFormContent() {
  const rows = [
    { id: 1, length: "1-5 minutes", payout: 5 },
    { id: 2, length: "5-10 minutes", payout: 8 },
    { id: 3, length: "10-15 minutes", payout: 12 },
    { id: 4, length: "15-20 minutes", payout: 16 },
    { id: 5, length: "20-30 minutes", payout: 20 },
    { id: 6, length: "30-40 minutes", payout: 25 },
    { id: 7, length: "40-50 minutes", payout: 30 },
    { id: 8, length: "50-60 minutes", payout: 40 },
    { id: 9, length: "60-120 minutes", payout: 50 },
    { id: 10, length: "120+ minutes", payout: 100 },
  ];

  return (
    <div className="w-full rounded-2xl bg-white p-3 lg:p-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-full bg-[#FFEDED] flex items-center justify-center">
          <Clapperboard className="h-5 w-5 text-[#FF4B4B]" />
        </div>

        <div>
          <h3 className="text-[22px] font-semibold text-[#111827]">
            Long-Form Content Minimums
          </h3>
          <p className="mt-1 text-[14px] text-[#6B7280]">
            YouTube Long-Form Videos and Extended Content
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
        {/* Head */}
        <div className="grid grid-cols-2 bg-[#F6F7F9] px-6 py-4">
          <p className="text-[14px] font-medium text-[#374151]">Content Length</p>
          <p className="text-right text-[14px] font-medium text-[#374151]">
            Minimum Payout
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200 bg-white">
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-2 items-center px-6 py-6">
              <p className="text-[15px] text-[#111827]">{r.length}</p>

              <div className="flex justify-end">
                <div className="min-w-[78px] rounded-lg bg-[#FFEDED] px-4 py-2 text-center">
                  <span className="text-[14px] font-semibold text-[#FF4B4B]">
                    ${r.payout}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-[#FFF5E6] px-6 py-4">
          <p className="text-[14px] text-[#B45309]">
            <span className="font-semibold">Important: </span>Pricing is based on final content length, not raw footage length. The minimum payout automatically adjusts based on the selected duration bracket.
          </p>
        </div>
      </div>
    </div>
  );
}
