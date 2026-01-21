"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import Image from "next/image";

interface EarningRow {
  date: string;
  order: string;
  status: "Paid" | "Pending";
  amount: number;
}

const PAGE_SIZE = 8;

const earningData: EarningRow[] = [
  { date: "06/05/2025", order: "#41527541", status: "Paid", amount: 400 },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250 },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250 },
  { date: "06/05/2025", order: "#41527541", status: "Paid", amount: 400 },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250 },
  { date: "06/05/2025", order: "#41527541", status: "Paid", amount: 400 },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250 },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250 },
];

export default function EarningsPage() {
  const [page, setPage] = useState(1);

  const total = earningData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return earningData.slice(start, start + PAGE_SIZE);
  }, [page]);

  const columns: ColumnDef<EarningRow>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-gray-700 text-[16px]">{row.original.date}</span>
      ),
    },
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => (
        <span className="text-gray-900 font-medium">{row.original.order}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${row.original.status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-600"
            }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-gray-800 font-semibold">
          ${row.original.amount}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col-reverse xl:grid xl:grid-cols-[1fr_auto] gap-6">
      {/* TOP CARDS */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Available for Withdrawal</p>
            <h2 className="text-3xl font-semibold">$900</h2>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Pending Clearance</p>
            <h2 className="text-3xl font-semibold">$250</h2>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">In Progress</p>
            <h2 className="text-3xl font-semibold">$115</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          {/* TABLE TITLE */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Earning history</h2>

            <button
              className="
      flex items-center gap-2 
      border border-gray-300 
      px-4 py-2 rounded-lg 
      text-gray-700 text-sm 
      hover:bg-gray-100 transition
    "
            >
              Date range <span>📅</span>
            </button>
          </div>


          {/* TABLE */}
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
      <div className="w-full xl:max-w-[300px]">
        <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center xl:flex-col xl:justify-center">
          <div className="space-y-4">
            <Image src="/images/robatfox.png" alt="img" width={100} height={100} className="flex justify-center items-center mx-auto rounded-lg xl:rounded-full"></Image>
            <div>
              <h3 className="text-center">Jane Cooper</h3>
              <p className="text-center">musicart@gamil.com</p>
            </div>
          </div>
          <div className="w-full  p-6 rounded-xl  h-fit">
            <h3 className="text-[20px] font-medium leading-150% pb-6">Budget & Payment</h3>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Project Budget</span>
              <span>$20</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Taxes & Other Frees</span>
              <span>$6</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Platfrom Free 20%</span>
              <span>20%</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Project Duration</span>
              <span>5 Days</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Total Payment</span>
              <span>$40</span>
            </div>



            {/* <div className="flex justify-between font-semibold text-gray-900">
              <span>Total Payment</span>
              <span>$654.00</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
