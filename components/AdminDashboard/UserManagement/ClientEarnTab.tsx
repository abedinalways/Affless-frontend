"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import { LuDownload } from "react-icons/lu";

interface BillingRow {
  date: string;
  invoice: string;
  orderWith: string;
  service: string;
  price: number;
}

const PAGE_SIZE = 10;

const billingHistory: BillingRow[] = [
  { date: "05/31/2025", invoice: "#51251585", orderWith: "Alex Kim", service: "Crystal Clear Audio...", price: 400 },
  { date: "07/01/2025", invoice: "#51251587", orderWith: "Savannah Nguyen", service: "Premium Sound...", price: 250 },
  { date: "08/10/2025", invoice: "#51251588", orderWith: "Marvin McKinney", service: "High quality sound...", price: 320 },
  { date: "09/20/2025", invoice: "#51251589", orderWith: "Cameron Williamson", service: "Superior Audio Re...", price: 600 },
  { date: "10/05/2025", invoice: "#51251590", orderWith: "Bessie Cooper", service: "Crystal Clear Audio...", price: 500 },
  { date: "11/12/2025", invoice: "#51251591", orderWith: "Ronald Richards", service: "Premium Sound...", price: 350 },
  { date: "12/18/2025", invoice: "#51251592", orderWith: "Esther Howard", service: "High quality sound...", price: 450 },
];

export default function BillingHistoryPage() {
  const [page, setPage] = useState(1);

  const total = billingHistory.length;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return billingHistory.slice(start, start + PAGE_SIZE);
  }, [page]);

  const columns: ColumnDef<BillingRow>[] = [
    {
      id: "select",
      header: () => <input type="checkbox" />,
      cell: () => <input type="checkbox" />,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => row.original.date,
    },
    {
      accessorKey: "invoice",
      header: "Invoice",
      cell: ({ row }) => (
        <span className="font-semibold text-[#2E3135]">
          {row.original.invoice}
        </span>
      ),
    },
    {
      accessorKey: "orderWith",
      header: "Order With",
      cell: ({ row }) => row.original.orderWith,
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => row.original.service,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-semibold">${row.original.price}</span>
      ),
    },
    {
      id: "details",
      header: "Details",
      cell: () => (
        <button className="flex items-center gap-1 text-gray-600">
          <span className="text-lg"><LuDownload /></span> PDF
        </button>
      ),
    },
  ];

  return (
    <div className="flex gap-6">
      {/* LEFT SIDE - TABLE */}
      <div className="w-3/4 space-y-6">
        {/* Top Bar */}
        <div className="bg-white p-5 rounded-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Billing history</h2>

          <div className="flex items-center gap-4">
            <input
              className="border rounded-lg px-4 py-2 w-72"
              placeholder="Search by invoice or order number"
            />
            <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
              Date range 📅
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-xl">
          <DataTable
            columns={columns}
            data={paginatedData}
            page={page}
            pageSize={PAGE_SIZE}
            total={total}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* RIGHT SIDE - PROFILE CARD */}
      <div className="w-1/4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Profile Image */}
      <div className="relative mx-auto w-24 h-24 mb-4">
        <Image
          src="/images/musicArt.png"
          alt="profile"
          fill
          className="rounded-full object-cover fill w-full h-full "
         
        />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </div>

      {/* Name + Email */}
      <h3 className="text-center font-semibold text-lg">MusicArt</h3>
      <p className="text-center text-gray-500 text-sm">musicart@gamil.com</p>

      {/* Rating */}
      <div className="flex items-center justify-center mt-2 gap-1 text-yellow-500">
        ⭐⭐⭐⭐⭐ <span className="text-gray-800">4.7 (950+)</span>
      </div>

      <hr className="my-4" />

      {/* Info Rows */}
     <div className="space-y-2 text-sm">
  <div className="flex justify-between">
    <span>From</span>
    <span>Mexican</span>
  </div>

  <div className="flex justify-between">
    <span>Member since</span>
    <span>May 2025</span>
  </div>

  <div className="flex justify-between">
    <span>Language</span>
    <span>English</span>
  </div>

  <div className="flex justify-between">
    <span>Rating</span>
    <span>⭐ 4.7</span>
  </div>
</div>

    </div>
      </div>
    </div>
  );
}
