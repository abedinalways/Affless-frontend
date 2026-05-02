"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import Image from "next/image";
import Link from "next/link";
import DynamicTable from "@/helper/DynamicTable";

interface JobRow {
  client: {
    name: string;
    avatar: string;
  };
  service: string;
  price: number;
  delivery: string;
  status: "Late" | "In Progress" | "Delivered" | "Completed" | "Canceled";
}

const PAGE_SIZE = 8;

const jobHistory: JobRow[] = [
  {
    client: { name: "Arlene McCoy", avatar: "/images/profile.png" },
    service: "High quality sound recorded",
    price: 400,
    delivery: "1/5/2026",
    status: "Late",
  },
  {
    client: { name: "Jasper Kline", avatar: "/images/profile.png" },
    service: "Custom sound design",
    price: 750,
    delivery: "1/6/2026",
    status: "In Progress",
  },
  {
    client: { name: "Sophie Turner", avatar: "/images/profile.png" },
    service: "Voice over for commercials",
    price: 300,
    delivery: "1/7/2026",
    status: "Delivered",
  },
  {
    client: { name: "Derek Lee", avatar: "/images/profile.png" },
    service: "Podcast editing and mixing",
    price: 200,
    delivery: "1/8/2026",
    status: "Delivered",
  },
  {
    client: { name: "Maya Johnson", avatar: "/images/profile.png" },
    service: "Background music composition",
    price: 500,
    delivery: "1/9/2026",
    status: "Completed",
  },
  {
    client: { name: "Eliot Spencer", avatar: "/images/profile.png" },
    service: "Audio restoration services",
    price: 600,
    delivery: "1/10/2026",
    status: "Canceled",
  },
];

export default function JobHistoryPage() {
  const [page, setPage] = useState(1);

  const total = jobHistory.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return jobHistory.slice(start, start + PAGE_SIZE);
  }, [page]);

  const usFormatsWithDecimal = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const columns = [
    {
      accessor: "client",
      label: "Client",
      width: "150px",
      formatter: (accessor: any, row: any) => (
        <div className=" w-full grid grid-cols-[40px_1fr] items-center gap-3 px-3 py-2">
          <Image
            src={row.client?.avatar}
            alt={row.client?.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-gray-800 whitespace-nowrap">{row?.client?.name}</span>
        </div>
      ),
    },
    {
      accessor: "service",
      label: "Job Title",
      width: "100px",
      formatter: (accessor: string) => (
        <div className="px-3 py-2 text-nowrap">
          <span className="text-gray-700">{accessor}</span>
        </div>
      ),
    },
    {
      accessor: "price",
      label: "Amount",
      width: "100px",
      formatter: (accessor: number) => (
        <div className="px-3 py-2 text-center">
          <span className="font-semibold text-gray-900">
            ${usFormatsWithDecimal.format(accessor)}
          </span>
        </div>
      ),
    },
    {
      accessor: "delivery",
      label: "Delivery Date",
      width: "100px",
      formatter: (accessor: string) => (
        <div className="px-3 py-2 text-center">
          <span className="text-gray-600 text-sm">
            {accessor}
          </span>
        </div>
      ),
    },
    {
      accessor: "status",
      label: "Status",
      width: "100px",
      formatter: (accessor: string) => {
        const status = accessor as JobRow["status"];

        const colors: Record<string, string> = {
          "In Progress": "bg-pink-100 text-pink-600",
          "In Revision": "bg-orange-100 text-orange-600",
          "Late": "bg-green-100 text-green-700",
          Delivered: "bg-green-100 text-green-700",
          Completed: "bg-blue-100 text-blue-600",
          Canceled: "bg-red-100 text-red-600",
        };

        return (
          <div className="px-3 py-2 text-center">
            <span
              className={`px-3 py-1 text-sm rounded-md font-medium ${colors[status]}`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
      {/* LEFT SIDE — TABLE AREA */}
      <div className="w-full">
        <div className="bg-white p-6 rounded-2xl mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Job History</h2>

            <select className="border px-3 py-2 rounded-lg text-sm text-gray-700">
              <option>All Statuses</option>
              <option>In Progress</option>
              <option>In Revision</option>
              <option>Late</option>
              <option>Delivered</option>
              <option>Completed</option>
              <option>Canceled</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl">
          <DynamicTable
            columns={columns}
            data={paginatedData}
            header={{
              padding: "8px 12px 8px 12px",
              bg: "#F9FAFB",
              position: "justify-center"
            }}
            rowStyle={{
              hover: true,
              hoverbg: "hover:bg-gray-100 cursor-default transition-colors duration-300"
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE — PROFILE CARD */}
      <div className="w-full lg:w-[300px]">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <Link href="/editor-profile/1">
              <Image
                src="/images/profile.png"
                alt="profile"
                fill
                className="rounded-full object-cover"
              />
            </Link>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <Link href="/editor-profile/1" className="block text-center font-semibold text-lg">MusicArt</Link>
          <p className="text-center text-gray-500 text-sm">musicart@gmail.com</p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">From</span>
              <span className="font-medium text-gray-800">Mexico</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Member since</span>
              <span className="font-medium text-gray-800"> May, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Unique Clients Worked With</span>
              <span className="font-medium text-gray-800">8</span>
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
