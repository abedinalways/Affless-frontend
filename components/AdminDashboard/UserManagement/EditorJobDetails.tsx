"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import Image from "next/image";

interface JobRow {
  client: {
    name: string;
    avatar: string;
  };
  service: string;
  price: number;
  delivery: string;
  status: "Late" | "Active" | "Delivered" | "Completed" | "Cancelled";
}

const PAGE_SIZE = 8;

const jobHistory: JobRow[] = [
  {
    client: { name: "Arlene McCoy", avatar: "/images/profile.png" },
    service: "High quality sound recorded",
    price: 400,
    delivery: "Delivers in 3 Days",
    status: "Late",
  },
  {
    client: { name: "Jasper Kline", avatar: "/images/profile.png" },
    service: "Custom sound design",
    price: 750,
    delivery: "Delivers in 5 Days",
    status: "Active",
  },
  {
    client: { name: "Sophie Turner", avatar: "/images/profile.png" },
    service: "Voice over for commercials",
    price: 300,
    delivery: "Delivers in 2 Days",
    status: "Delivered",
  },
  {
    client: { name: "Derek Lee", avatar: "/images/profile.png" },
    service: "Podcast editing and mixing",
    price: 200,
    delivery: "Delivers in 4 Days",
    status: "Delivered",
  },
  {
    client: { name: "Maya Johnson", avatar: "/images/profile.png" },
    service: "Background music composition",
    price: 500,
    delivery: "Delivers in 6 Days",
    status: "Completed",
  },
  {
    client: { name: "Eliot Spencer", avatar: "/images/profile.png" },
    service: "Audio restoration services",
    price: 600,
    delivery: "Delivers in 7 Days",
    status: "Cancelled",
  },
];

export default function JobHistoryPage() {
  const [page, setPage] = useState(1);

  const total = jobHistory.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return jobHistory.slice(start, start + PAGE_SIZE);
  }, [page]);

  const columns: ColumnDef<JobRow>[] = [
    {
      accessorKey: "client",
      header: "Client",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.client.avatar}
            alt={row.original.client.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium text-gray-800">{row.original.client.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.service}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-900">
          ${row.original.price}
        </span>
      ),
    },
    {
      accessorKey: "delivery",
      header: "Delivery Time",
      cell: ({ row }) => (
        <span className="text-gray-600 text-sm">
          {row.original.delivery}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        const colors: Record<string, string> = {
          Late: "bg-pink-100 text-pink-600",
          Active: "bg-orange-100 text-orange-600",
          Delivered: "bg-green-100 text-green-700",
          Completed: "bg-blue-100 text-blue-600",
          Cancelled: "bg-red-100 text-red-600",
        };

        return (
          <span
            className={`px-3 py-1 text-sm rounded-md font-medium ${colors[status]}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT SIDE — TABLE AREA */}
      <div className="w-full lg:w-3/4">
        <div className="bg-white p-6 rounded-2xl mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Job History</h2>

            <select className="border px-3 py-2 rounded-lg text-sm text-gray-700">
              <option>All status</option>
              <option>Active</option>
              <option>Delivered</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl">
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

      {/* RIGHT SIDE — PROFILE CARD */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <Image
              src="/images/profile.png"
              alt="profile"
              fill
              className="rounded-full object-cover"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <h3 className="text-center font-semibold text-lg">MusicArt</h3>
          <p className="text-center text-gray-500 text-sm">musicart@gamil.com</p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">From</span>
              <span className="font-medium text-gray-800">Mexican</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Member since</span>
              <span className="font-medium text-gray-800">May 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Language</span>
              <span className="font-medium text-gray-800">English</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Rating</span>
              <span className="flex items-center gap-1 text-gray-800 font-medium">
                ⭐ 4.7
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
