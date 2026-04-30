"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import toast from "react-hot-toast";
import DatePicker from "@/components/ClientDashboard/ManageJob/DatePicker";
type Earning = {
  date: string;
  name: string;
  amount: number;
  commission: number;
  transactionType: "client" | "editor";
  status: "pending" | "completed";
};

const earningsData: Earning[] = [
  { date: "2025-05-06T09:15:23-04:00", name: "Omar Faruq", amount: 250, commission: 30, transactionType: "client", status: "pending" },
  { date: "2025-05-06T14:42:07-04:00", name: "Faruq", amount: 220, commission: 30, transactionType: "editor", status: "completed" },
  { date: "2025-05-07T08:30:15-04:00", name: "Faruq", amount: 240, commission: 30, transactionType: "client", status: "completed" },
  { date: "2025-05-07T18:20:45-04:00", name: "Omar Faruq", amount: 250, commission: 30, transactionType: "editor", status: "pending" },
  { date: "2025-05-08T11:05:30-04:00", name: "Faruq", amount: 230, commission: 30, transactionType: "client", status: "completed" },
  { date: "2025-05-08T22:55:10-04:00", name: "Omar Faruq", amount: 250, commission: 30, transactionType: "editor", status: "pending" },
];

export default function EarningPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const pageSize = 5;

  // Filtering
  const filtered = earningsData.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.date.includes(search) ||
      item.status.includes(search) ||
      item.amount.toString().includes(search);

    const statusMatch = status === "all" || item.status === status;

    if(startDate && endDate) {
      console.log("Filtering with date range:", startDate, endDate);
      const itemDate = new Date(item.date);
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      const isWithinRange = itemDate >= startDate && itemDate <= endOfDay;
      return searchMatch && statusMatch && isWithinRange;
    }

    return searchMatch && statusMatch;
  });

  const paginated = filtered;

  const usFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Columns for DataTable
  const columns: ColumnDef<Earning>[] = [
    {
      accessorKey: "date", header: "Date",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.date ? new Date(row.original.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) : "N/A"}
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
          ${usFormatWithDecimals.format(row.original.amount)}
        </div>
      ),
    },
    {
      accessorKey: "commission",
      header: "Platform Fee",
      cell: ({ row }) => <div className="flex justify-center">
        ${usFormatWithDecimals.format((row.original.amount / 100) * (row.original.transactionType === "client" ? 20 : 20))} {row?.original.transactionType === "client" ? "(20%)" : "(20%)"}
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
        <SummaryCard amount={6712.00} label="Available for Withdrawal" button onWithdraw={() => setWithdrawPopup(true)} />
        <SummaryCard amount={4250.00} label="Pending Earnings" />
        <SummaryCard amount={35800.00} label="Total Earnings" />
      </div>
      <div className="p-4 sm:p-6 rounded-xl shadow-md space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <div className="grid md:grid-cols-[auto_auto] items-center md:justify-end gap-3">
            <div className="relative md:max-w-[260px] w-full min-w-0">
              <input
                type="text"
                placeholder="Search Here..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border px-4 py-1 pr-10 rounded-lg min-w-0! w-full"
              />
              {/* Search Icon Button */}
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                🔍
              </button>
            </div>
            {/* Status Dropdown */}
            <div className="grid sm:grid-cols-[1fr_auto] gap-4">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="border px-4 py-1 text-sm sm:text-base rounded-lg cursor-pointer sm:max-w-[150px] md:max-w-full w-full"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              {/* Date Button */}
              <div className="relative group">
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(date) => {
                    setStartDate(date[0]);
                    setEndDate(date[1]);
                    console.log("Selected date range:", date);
                  }}
                />
                <button type="button" onClick={()=>{setStartDate(undefined); setEndDate(undefined)}} className="bg-accent hover:bg-red-500 hover:text-white hidden group-hover:block border px-1 py-px text-[10px] rounded absolute -top-2.75 left-1 transition-all duration-300">Clear</button>
              </div>
            </div>
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
        title="Withdrawals are coming soon"
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

  const usFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-4xl font-bold">${usFormatWithDecimals.format(amount)}</h2>
      <p className="text-gray-600 mt-1">{label}</p>

      {button && (
        <button
          className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 hover:rounded transition-all duration-300 cursor-pointer"
          onClick={onWithdraw}
        >
          Withdraw →
        </button>
      )}
    </div>
  );
}
