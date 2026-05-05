"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import Image from "next/image";
import { LuDownload } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import DatePicker from "@/components/ClientDashboard/ManageJob/DatePicker";
import { getJobStatusDefinition } from "@/lib/job-status";

interface EarningRow {
  date: string;
  order: string;
  status: "Canceled " | "Pending" | "Withdrawal Requested";
  amount: number;
  tooltip: string;
}

const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const usFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const PAGE_SIZE = 8;

const earningData: EarningRow[] = [
  { date: "06/05/2025", order: "#41527541", status: "Withdrawal Requested", amount: 400, tooltip: "The editor has requested a payout. Processing is in progress." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/05/2025", order: "#41527541", status: "Withdrawal Requested", amount: 400, tooltip: "The editor has requested a payout. Processing is in progress." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/05/2025", order: "#41527541", status: "Withdrawal Requested", amount: 400, tooltip: "The editor has requested a payout. Processing is in progress." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/03/2025", order: "#41526398", status: "Canceled ", amount: 250, tooltip: "This payout was canceled and will not be processed." },
];

export default function EarningsPage() {
  const [page, setPage] = useState(1);
  const [isLifeTimeActive, setIsLifeTimeActive] = useState(false);
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
        <div className="text-gray-700 text-[16px] text-center">{row.original.date}</div>
      ),
    },
    {
      accessorKey: "order",
      header: "Order Number",
      cell: ({ row }) => (
        <div className="text-gray-900 font-medium text-center">{row.original.order}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${row.original.status === "Withdrawal Requested"
            ? getJobStatusDefinition("canceled").colorClass
            : row.original.status === "Pending"
              ? getJobStatusDefinition("completed").colorClass
              : "bg-red-300 text-red-700"
            }`}
          title={row.original.tooltip}
        >
          {row.original.status}
        </span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="text-gray-800 font-semibold text-center">
          ${usFormatWithDecimals.format(row.original.amount)}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col-reverse xl:grid xl:grid-cols-[1fr_auto] gap-6">
      {/* TOP CARDS */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Available Funds for Withdrawal</p>
            <h2 className="text-3xl font-semibold">${usFormatWithDecimals.format(900)}</h2>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Payments Being Cleared</p>
            <h2 className="text-3xl font-semibold">${usFormatWithDecimals.format(250)}</h2>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Payments for Active Orders</p>
            <h2 className="text-3xl font-semibold">${usFormatWithDecimals.format(115)}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          {/* TABLE TITLE */}
          <div className="flex flex-wrap gap-3 justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Earning History</h2>
            <div className="flex items-end">
              <DatePickerWithRange 
                isActive={isLifeTimeActive}
                setIsActive={() => setIsLifeTimeActive(false)}
                onDateChange={(startDate, endDate) => {
                  console.log("Selected date range:", startDate, endDate);
                }}
              />
              <div>
                <input
                  type="checkbox"
                  name="lifetime"
                  id="lifetime"
                  className="cursor-pointer"
                  checked={isLifeTimeActive}
                  onChange={(e) => setIsLifeTimeActive(e.target.checked)}
                />
                <label htmlFor="lifetime" className="ml-2 text-sm text-gray-600 select-none cursor-pointer">Lifetime</label>
              </div>
            </div>
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
      <div className="w-full xl:max-w-[400px]">
        <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row items-center xl:flex-col xl:justify-center">
          {/* <div className="space-y-4">
            <Image src="/images/robatfox.png" alt="img" width={100} height={100} className="flex justify-center items-center mx-auto rounded-lg xl:rounded-full"></Image>
            <div>
              <h3 className="text-center">Jane Cooper</h3>
              <p className="text-center">musicart@gmail.com</p>
            </div>
          </div> */}
          <div className="w-full  p-4 rounded-xl  h-fit">
            <h3 className="text-[20px] font-medium leading-150% pb-4">Lifetime Stats</h3>
            <div className="flex justify-between text-gray-700 mb-4 gap-3 whitespace-nowrap">
              <span>Lifetime Earnings</span>
              <span>${usFormatWithDecimals.format(12480)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4 gap-3 whitespace-nowrap">
              <span>Taxes & Other Fees</span>
              <span>${usFormatWithDecimals.format(1320)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4 gap-3 whitespace-nowrap">
              <span>Editor Marketplace’s 20% Cut</span>
              <span>${usFormatWithDecimals.format(2496)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4 gap-3 whitespace-nowrap">
              <span>Total Withdrawals Made</span>
              <span>{usFormat.format(11)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4 gap-3 whitespace-nowrap">
              <span>Total Jobs Completed</span>
              <span>{usFormat.format(46)}</span>
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

type DatePickerType = {
  isActive: boolean;
  setIsActive: () => void;
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

function DatePickerWithRange({ isActive, setIsActive, onDateChange }: DatePickerType) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  return (
    <div className="w-[260px] space-y-0.5">
      <p>Select Date Range</p>
      <DatePicker
        startDate={date?.from}
        endDate={date?.to}
        onChange={(date) => {
          setDate({ from: date[0], to: date[1] });
          console.log("Selected date range:", date);
        }}
        isActive={isActive}
        onActiveChange={()=>{
          setIsActive();
        }}
      />
    </div>
  );
}
