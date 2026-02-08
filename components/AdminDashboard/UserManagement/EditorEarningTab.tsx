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

interface EarningRow {
  date: string;
  order: string;
  status: "Cancelled " | "Pending" | "Withdrawal Requested";
  amount: number;
  tooltip: string;
}

const PAGE_SIZE = 8;

const earningData: EarningRow[] = [
  { date: "06/05/2025", order: "#41527541", status: "Withdrawal Requested", amount: 400,tooltip: "The editor has requested a payout. Processing is in progress." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/05/2025", order: "#41527541", status: "Withdrawal Requested", amount: 400,tooltip: "The editor has requested a payout. Processing is in progress." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/05/2025", order: "#41527541", status: "Withdrawal Requested", amount: 400,tooltip: "The editor has requested a payout. Processing is in progress." },
  { date: "06/03/2025", order: "#41526398", status: "Pending", amount: 250, tooltip: "Funds are being processed and will be available for the editor soon." },
  { date: "06/03/2025", order: "#41526398", status: "Cancelled ", amount: 250, tooltip: "This payout was cancelled and will not be processed." },
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
      header: "Order Number",
      cell: ({ row }) => (
        <span className="text-gray-900 font-medium">{row.original.order}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${row.original.status === "Withdrawal Requested"
            ? "bg-green-100 text-green-700"
            : row.original.status === "Pending"
              ? "bg-orange-100 text-orange-600"
              : "bg-red-100 text-red-600"
            }`}
          title={row.original.tooltip}
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
          ${row.original.amount.toFixed(2)}
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
            <p className="text-gray-600 mb-1">Available Funds for Withdrawal</p>
            <h2 className="text-3xl font-semibold">$900.00</h2>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Payments Being Cleared</p>
            <h2 className="text-3xl font-semibold">$250.00</h2>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-1">Payments for Active Orders</p>
            <h2 className="text-3xl font-semibold">$115.00</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          {/* TABLE TITLE */}
          <div className="flex flex-wrap gap-3 justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Earning History</h2>
            <DatePickerWithRange />
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
              <p className="text-center">musicart@gmail.com</p>
            </div>
          </div>
          <div className="w-full  p-6 rounded-xl  h-fit">
            <h3 className="text-[20px] font-medium leading-150% pb-6">Lifetime Stats</h3>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Lifetime Earnings</span>
              <span>$12,480</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Taxes & Other Fees</span>
              <span>$1,320</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Platform Fee Rate</span>
              <span>20%</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Projects Completed</span>
              <span>46</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Total Paid Out</span>
              <span>$11,160</span>
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

function DatePickerWithRange() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  return (
    <Field className="w-[260px]">
      <FieldLabel htmlFor="date-picker-range">Date range</FieldLabel>
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <Button
            variant="outline"
            id="date-picker-range"
            className="w-full justify-start gap-2 px-2.5 py-5 font-normal"
          >
            <CalendarIcon className="h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
