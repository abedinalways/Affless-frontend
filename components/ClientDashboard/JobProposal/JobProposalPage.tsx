"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import Link from "next/link";

interface ProposalRow {
  id: number;
  service: string;
  amount: string;
  time: string;
  status: string;
  thumbnail: string;
}

const Proposal: ProposalRow[] = [
  {
    id: 1,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 3,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 4,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "7 Days",
    status: "Accept",
  },
  {
    id: 5,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "3 Days",
    status: "Accept",
  },
  {
    id: 6,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 7,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 8,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "7 Days",
    status: "Accept",
  },
  {
    id: 9,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "3 Days",
    status: "Accept",
  },
  {
    id: 10,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
];

const PAGE_SIZE = 8;

export default function JobProposalPage() {
  const [page, setPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState<"ALL" | "5 Days" | "7 Days" | "3 Days">("ALL");

  // 1️⃣ Filter by time first
  const filteredData = useMemo(() => {
    if (timeFilter === "ALL") return Proposal;
    return Proposal.filter((p) => p.time === timeFilter);
  }, [timeFilter]);

  const total = filteredData.length;

  // 2️⃣ Then paginate the filtered data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  const columns: ColumnDef<ProposalRow>[] = [
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex items-center gap-4">
            <div className="h-12 w-16 rounded-md overflow-hidden bg-gray-200">
              <img
                src={data.thumbnail}
                alt={data.service}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-800">
              {data.service}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "AMOUNT",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.amount}</span>
      ),
    },
    {
      accessorKey: "time",
      header: "DELIVERY TIME",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.time}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
       <Link href="/job-details">
        <div className="">
          <span className="px-4 py-1 rounded-md text-xs font-semibold uppercase text-white bg-green-600">
            {row.original.status}
          </span>
        </div></Link>
      ),
    },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "ALL" | "5 Days" | "7 Days" | "3 Days";
    setTimeFilter(value);
    setPage(1); // reset to first page when filter changes
  };

  return (
    <div className="containers py-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Proposals
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Proposals
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700">
            Declined
          </button>
        </div>

        <div>
          <select
            className="rounded-lg p-2.5 border border-gray-300 text-sm"
            value={timeFilter}
            onChange={handleFilterChange}
          >
            <option value="ALL">CAST 30 DAYS</option>
            <option value="5 Days">5 Days</option>
            <option value="7 Days">7 Days</option>
            <option value="3 Days">3 Days</option>
          </select>
        </div>
      </div>

      <DataTable<ProposalRow, any>
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
