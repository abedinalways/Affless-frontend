"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
type Earning = {
  date: string;
  name: string;
  amount: number;
  commission: number;
  status: "Pending" | "Completed";
};

const earningsData: Earning[] = [
  { date: "06/05/2025", name: "Omar Faruq", amount: 250, commission: 30, status: "Pending" },
  { date: "06/05/2025", name: "Faruq", amount: 250, commission: 30, status: "Completed" },
  { date: "06/05/2025", name: "Faruq", amount: 250, commission: 30, status: "Completed" },
  { date: "06/05/2025", name: "Omar Faruq", amount: 250, commission: 30, status: "Pending" },
  { date: "06/05/2025", name: "Faruq", amount: 250, commission: 30, status: "Completed" },
  { date: "06/05/2025", name: "Omar Faruq", amount: 250, commission: 30, status: "Pending" },
];

export default function EarningPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  // Filtering
  const filtered = earningsData.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.date.includes(search);

    const statusMatch = status === "All" || item.status === status;

    return searchMatch && statusMatch;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Columns for DataTable
  const columns: ColumnDef<Earning>[] = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
    },
    {
      accessorKey: "commission",
      header: "Commission",
      cell: ({ row }) => `$${row.original.commission} (20%)`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 text-sm rounded-lg ${
            row.original.status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  return (
    <div className=" bg-white space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard amount={6712} label="Available for Withdrawal" button />
        <SummaryCard amount={4250} label="Pending Earnings" />
        <SummaryCard amount={35800} label="Total Earnings" />
      </div>

      {/* Earnings Table */}
      <div className="p-6 rounded-xl shadow-md space-y-6">
       {/* Header + Filters Row */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4">

  {/* Left Title */}
  <h2 className="text-xl font-semibold">Earnings</h2>

  {/* Right Filters */}
  <div className="flex items-center gap-3">

    {/* Search Box + Search Icon */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border px-4 py-2 pr-10 rounded-lg w-56 md:w-72"
      />

      {/* Search Icon Button */}
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
        🔍
      </button>
    </div>

    {/* Status Dropdown */}
    <select
      value={status}
      onChange={(e) => {
        setStatus(e.target.value);
        setPage(1);
      }}
      className="border px-4 py-2 rounded-lg cursor-pointer"
    >
      <option value="All">All status</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>

    {/* Date Button */}
    <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
      Date 📅
    </button>
  </div>

</div>


        {/* DataTable with Pagination */}
        <DataTable
          columns={columns}
          data={paginated}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

function SummaryCard({
  amount,
  label,
  button,
}: {
  amount: number;
  label: string;
  button?: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-4xl font-bold">${amount.toLocaleString()}</h2>
      <p className="text-gray-600 mt-1">{label}</p>

      {button && (
        <button className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
          Withdraw →
        </button>
      )}
    </div>
  );
}
