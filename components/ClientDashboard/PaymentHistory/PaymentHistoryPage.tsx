"use client";

import Image from "next/image";

export default function PaymentHistoryPage() {
  const payments = [
    { id: 1, status: "Revision" },
    { id: 2, status: "Cancel" },
    { id: 3, status: "Cancel" },
    { id: 4, status: "Revision" },
    { id: 5, status: "Revision" },
    { id: 6, status: "Revision" },
  ];

  return (
    <div className="p-6 containers">
      {/* ---------- TITLE ---------- */}
      <h1 className="text-2xl font-semibold mb-2">Payment History</h1>
      <p className="text-gray-400 mb-6">Total Amount Paid</p>

      {/* ---------- TOP CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Left Card */}
        <div className="bg-white rounded-xl h-[220px] flex items-center justify-center shadow-sm">
          <p className="text-3xl font-semibold">US$323.00</p>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm mb-2">Payments Held by Admin</p>
          <p className="text-xl font-semibold mb-4">US$0.00</p>

          <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

          <p className="text-gray-600 text-sm mb-2">Delivery Payment</p>
          <p className="text-xl font-semibold">US$0.00</p>
        </div>

      </div>

      {/* ---------- PAYMENT ROWS (Figma Style) ---------- */}
      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl flex items-center justify-between shadow-sm py-4 px-4"
          >
            {/* Left: Image + Title */}
            <div className="flex items-center gap-3">
              <Image
                src="/service.jpg"
                width={45}
                height={45}
                alt="service"
                className="rounded-md"
              />

              <p className="text-sm font-medium max-w-[260px]">
                I will craft quality backlinks for your website's SEO.
              </p>
            </div>

            {/* Amount */}
            <p className="font-semibold">$55</p>

            {/* Days */}
            <p className="text-gray-500">5 Days</p>

            {/* Status */}
            {p.status === "Revision" ? (
              <span className="px-4 py-1 rounded-lg bg-yellow-100 text-yellow-600 text-sm font-medium">
                Revision
              </span>
            ) : (
              <span className="px-4 py-1 rounded-lg bg-red-100 text-red-500 text-sm font-medium">
                Cancel
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
