"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import { useRouter } from "next/navigation";
import JobProposalCard from "@/components/reusable/TableCard"; // Reusable card component
import { SlidersHorizontal } from "lucide-react"; // Icon for mobile filters
import Link from "next/link";

interface JobRow {
  id: number;
  service: string;
  thumbnail: string;
  total: string;
  dueOn: string;
  status: "Accept" | "In Progress" | "In Revision";
}

const PAGE_SIZE = 8;

const ALL_JOBS: JobRow[] = [
  {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Revision",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Revision",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Revision",
  },
  // Add more proposals as needed
];

export default function ManageJobsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Active");

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ALL_JOBS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const handleAccept = (id: number) => {
    console.log(`Proposal ${id} accepted`);
  };

  const handleInProgress = (id: number) => {
    console.log(`Proposal ${id} is in progress`);
  };

  const handleRevision = (id: number) => {
    console.log(`Proposal ${id} is in revision`);
  };

  const columns: ColumnDef<JobRow>[] = [
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
            <span className="text-sm font-medium text-gray-800">{data.service}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "TOTAL",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.total}</span>
      ),
    },
    {
      accessorKey: "dueOn",
      header: "DUE ON",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.dueOn}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const data = row.original;
        const isInProgress = data.status === "In Progress";
        const isRevision = data.status === "In Revision";

        return (
          <span
            className={`px-4 py-1 rounded-md text-[16px] font-medium uppercase text-white ${
              isRevision ? "bg-red-500" : isInProgress ? "bg-[#00648A]" : "bg-green-600"
            }`}
          >
            {data.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="containers py-8">
   <div className="hidden md:block">
       {/* Tabs */}
      <div className="flex justify-between mb-6 ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-3 md:gap-6 text-sm font-medium">
          {["Active", "Late", "Delivered", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-md transition ${
                activeTab === tab ? "text-black font-semibold" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Link href="/client/post-job">
          <div className="bg-[#FF4D4F] py-3 px-4 h-fit top-5 text-white rounded-lg cursor-pointer">
            Create a new Job
          </div>
        </Link>
      </div>

      {/* Title */}
      <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">Active Orders</h2>

        <select className="rounded-lg p-2.5 border border-gray-300 text-sm">
          <option>20 DAYS</option>
          <option>25 DAYS</option>
          <option>28 DAYS</option>
        </select>
      </div>

      {/* Table */}
      <DataTable<JobRow, any>
        columns={columns}
        data={pageData}
        page={page}
        pageSize={PAGE_SIZE}
        total={ALL_JOBS.length}
        onPageChange={setPage}
      />
   </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="space-y-3">
          <div className="flex justify-between">
            <p>Manage Job</p>
            <button className="border border-gray-300 p-3 rounded-lg flex gap-3">
              Proposals <SlidersHorizontal />
            </button>
          </div>

          {pageData.map((proposal) => (
            <JobProposalCard
              key={proposal.id}
              image={proposal.thumbnail}
              title={proposal.service}
              total={proposal.total}
              status={proposal.status}
              onAction={
                proposal.status === "Accept"
                  ? handleAccept
                  : proposal.status === "In Progress"
                  ? handleInProgress
                  : handleRevision
              }
              id={proposal.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
