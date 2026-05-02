"use client";

import React, { useMemo, useState } from "react";
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
  { date: "09/20/2025", invoice: "#51251589", orderWith: "Cameron Williamson", service: "Superior Audio Re", price: 600 },
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
    return billingHistory.slice(start, start + PAGE_SIZE);
  }, [page]);

  const columns: ColumnDef<BillingRow>[] = [
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
      header: "Editor Worked With",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.orderWith}
        </div>
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
        <span className="font-semibold">${usFormatWithDecimals.format(row.original.price)}</span>
      ),
    },
    {
      id: "details",
      header: "Details",
      cell: () => (
        <button onClick={()=>toast.success("Coming soon!")} className="flex items-center gap-1 text-gray-600 cursor-pointer">
          <span className="text-lg"><LuDownload /></span> PDF
        </button>
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
              className="border rounded-lg px-4 py-2 w-72 text-base placeholder:text-xs cursor-pointer focus:cursor-text outline-none"
              placeholder="Search by invoice or order number"
            />
            <DatePickerWithRange isActive={isLifeTimeActive} setIsActive={()=>setIsLifeTimeActive(false)} />
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
              <span>{new Date().toLocaleDateString("en-US",{
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
}

function DatePickerWithRange({ isActive, setIsActive }: DatePickerType) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  return (
    <Field className="w-[260px]" onClick={setIsActive}>
      <FieldLabel htmlFor="date-picker-range">Date range</FieldLabel>
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer disabled:cursor-pointer" disabled={isActive}>
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
