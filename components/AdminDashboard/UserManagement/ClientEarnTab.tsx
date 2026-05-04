"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
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
import Link from "next/link";
import toast from "react-hot-toast";
import DatePicker from "@/components/ClientDashboard/ManageJob/DatePicker";

interface BillingRow {
  date: string;
  invoice: string;
  orderWith: string;
  service: string;
  price: number;
}

const PAGE_SIZE = 10;

const billingHistory: BillingRow[] = [
  { date: "05/31/2025", invoice: "#51251585", orderWith: "Alex Kim", service: "Crystal Clear Audio", price: 400 },
  { date: "07/01/2025", invoice: "#51251587", orderWith: "Savannah Nguyen", service: "Premium Sound", price: 250 },
  { date: "08/10/2025", invoice: "#51251588", orderWith: "Marvin McKinney", service: "High quality sound", price: 320 },
  { date: "09/20/2025", invoice: "#51251589", orderWith: "Cameron Williamson", service: "Superior Audio Recording", price: 600 },
  { date: "10/05/2025", invoice: "#51251590", orderWith: "Bessie Cooper", service: "Crystal Clear Audio", price: 500 },
  { date: "11/12/2025", invoice: "#51251591", orderWith: "Ronald Richards", service: "Premium Sound", price: 350 },
  { date: "12/18/2025", invoice: "#51251592", orderWith: "Esther Howard", service: "High quality sound", price: 450 },
];


const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


export default function BillingHistoryPage() {
  const [page, setPage] = useState(1);
  const rating = 4.7;
  const ratingCount = 950;
  const [isLifeTimeActive, setIsLifeTimeActive] = useState(false);
  const [search, setSearch] = useState("");

  const renderStars = (value: number) =>
    Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(1, value - index));
      const width = `${Math.round(fill * 100)}%`;

      return (
        <span key={index} className="relative inline-block text-gray-300">
          <FaStar className="h-4 w-4" />
          <span
            className="absolute left-0 top-0 overflow-hidden text-yellow-500"
            style={{ width }}
          >
            <FaStar className="h-4 w-4" />
          </span>
        </span>
      );
    });

  const total = billingHistory.length;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const filtered = billingHistory.filter((row) => {
      const searchTerm = search.toLowerCase();
      return (row.invoice.toLowerCase().includes(searchTerm) ||
        row.orderWith.toLowerCase().includes(searchTerm) ||
        row.service.toLowerCase().includes(searchTerm)) ||
        row.price.toString().includes(searchTerm) ||
        row.date.toLowerCase().includes(searchTerm);
    });
    return filtered.slice(start, start + PAGE_SIZE);
  }, [page, search, isLifeTimeActive]);

  const columns: ColumnDef<BillingRow>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.date}
        </div>
      ),
    },
    {
      accessorKey: "invoice",
      header: "Invoice",
      cell: ({ row }) => (
        <p className="font-semibold text-[#2E3135] text-center">
          {row.original.invoice}
        </p>
      ),
    },
    {
      accessorKey: "orderWith",
      header: "Editor Worked With",
      cell: ({ row }) => (
        <Link href="/editor-profile/1" className="text-center block">
          {row.original.orderWith}
        </Link>
      ),
    },
    {
      accessorKey: "service",
      header: "Job Title",
      cell: ({ row }) => (
        <div className="w-full text-center">
          {row.original.service}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <p className="font-semibold text-center">${usFormatWithDecimals.format(row.original.price)}</p>
      ),
    },
    {
      id: "details",
      header: "Details",
      cell: () => (
        <div className="flex items-center justify-center">
          <button onClick={() => toast.success("Coming soon!")} className="flex items-center gap-1 text-gray-600 cursor-pointer">
            <span className="text-lg"><LuDownload /></span> PDF
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-6">
      {/* LEFT SIDE - TABLE */}
      <div className="w-full space-y-6">
        {/* Top Bar */}
        <div className="bg-white p-5 rounded-xl flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-semibold">Billing History</h2>

          <div className="flex items-end flex-wrap gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 w-72 text-base placeholder:text-xs cursor-pointer focus:cursor-text outline-none"
              placeholder="Search by invoice or order number"
            />
            <DatePickerWithRange isActive={isLifeTimeActive} setIsActive={() => setIsLifeTimeActive(false)} onDateChange={(startDate, endDate) => {
              console.log("Selected date range:", startDate, endDate);
            }} />
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
      <div className="w-full">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Profile Image */}
          <div className="relative mx-auto w-24 h-24 mb-4">
            <Link href={`/client-profile/${1}`}>
              <Image
                src="/images/musicArt.png"
                alt="profile"
                fill
                className="rounded-full object-cover fill w-full h-full "
              />
            </Link>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          {/* Name + Email */}
          <Link href={`/client-profile/${1}`} className="block text-center font-semibold text-lg">MusicArt</Link>
          <p className="text-center text-gray-500 text-sm">musicart@gmail.com</p>

          {/* Rating */}
          <div className="flex items-center justify-center mt-2 gap-1">
            <div className="flex items-center gap-0.5">
              {renderStars(rating)}
            </div>
            <span className="text-gray-800">{rating} ({ratingCount})</span>
          </div>

          <hr className="my-4" />

          {/* Info Rows */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <span>From</span>
              <span>Mexico</span>
            </div>

            <div className="flex justify-between gap-2">
              <span>Member since</span>
              <span>{new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}</span>
            </div>

            <div className="flex justify-between gap-2">
              <span>Unique Editors Worked With</span>
              <span>5</span>
            </div>

            <div className="flex justify-between gap-2">
              <span>Rating</span>
              <span>⭐ 4.7</span>
            </div>
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

  useEffect(() => {
    if (date) {
      onDateChange(date.from, date.to);
    }
  }, [date, onDateChange]);

  return (
    <div className="w-[260px] space-y-0.5" onClick={setIsActive}>
      <p >Select Date Range</p>
      <DatePicker
        startDate={date?.from}
        endDate={date?.to}
        onChange={(date) => {
          setDate({ from: date[0], to: date[1] });
          console.log("Selected date range:", date);
        }}
        isActive={isActive}
      />
    </div>
  );
}
