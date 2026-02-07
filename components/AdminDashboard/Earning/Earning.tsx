"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import toast from "react-hot-toast";
type Earning = {
  date: string;
  name: string;
  amount: number;
  commission: number;
  transactionType: "client" | "editor";
  status: "pending" | "completed";
};

const earningsData: Earning[] = [
  { date: "06/05/2025", name: "Omar Faruq", amount: 250, commission: 30, transactionType: "client", status: "pending" },
  { date: "06/05/2025", name: "Faruq", amount: 250, commission: 30, transactionType: "editor", status: "completed" },
  { date: "06/05/2025", name: "Faruq", amount: 250, commission: 30, transactionType: "client", status: "completed" },
  { date: "06/05/2025", name: "Omar Faruq", amount: 250, commission: 30, transactionType: "editor", status: "pending" },
  { date: "06/05/2025", name: "Faruq", amount: 250, commission: 30, transactionType: "client", status: "completed" },
  { date: "06/05/2025", name: "Omar Faruq", amount: 250, commission: 30, transactionType: "editor", status: "pending" },
];

export default function EarningPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [withdrawPopup, setWithdrawPopup] = useState(false);

  const pageSize = 5;

  // Filtering
  const filtered = earningsData.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.date.includes(search);

    const statusMatch = status === "all" || item.status === status;

    return searchMatch && statusMatch;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Columns for DataTable
  const columns: ColumnDef<Earning>[] = [
    {
      accessorKey: "date", header: "Date",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.date}
        </div>
      ),
    },
    {
      accessorKey: "name", header: "Name",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="flex justify-center">
          ${row.original.amount.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "commission",
      header: "Platform Fee",
      cell: ({ row }) => <div className="flex justify-center">
        ${(row.original.amount / 100) * (row.original.transactionType === "client" ? 20 : 10)} {row?.original.transactionType === "client" ? "(20%)" : "(10%)"}
      </div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span
            className={`px-3 py-1 text-sm rounded-lg capitalize ${row.original.status === "completed"
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-600"
              }`}
          >
            {row.original.status}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-white space-y-10">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-6">
        <SummaryCard amount={6712.00} label="Available for Withdrawal" button onWithdraw={() => setWithdrawPopup(true)}/>
        <SummaryCard amount={4250.00} label="Pending Earnings" />
        <SummaryCard amount={35800.00} label="Total Earnings" />
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
                placeholder="Search Here..."
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
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {/* Date Button */}
            {/* <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
              Date 📅
            </button> */}
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
      {/* Withdraw Confirmation Popup */}
      <ConfirmationPopup
        isOpen={withdrawPopup}
        title="Withdrawals coming soon"
        description="Withdrawal is not available at the moment. This feature will be available in future updates."
        onConfirm={() => {
          setWithdrawPopup(false);
          toast.success("Thank you for your interest! Withdrawal feature will be available soon.");
        }}
        onCancel={() => setWithdrawPopup(false)}
      />
    </div>
  );
}

function SummaryCard({
  amount,
  label,
  button,
  onWithdraw
}: {
  amount: number;
  label: string;
  button?: boolean;
  onWithdraw?: () => void;
}) {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-4xl font-bold">${amount.toFixed(2)}</h2>
      <p className="text-gray-600 mt-1">{label}</p>

      {button && (
        <button
          className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
          onClick={onWithdraw}
        >
          Withdraw →
        </button>
      )}
    </div>
  );
}
