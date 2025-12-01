"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import Link from "next/link";

type JobStatus = "IN_PROGRESS" | "IN_REVISION";

interface JobRow {
  id: number;
  service: string;
  thumbnail: string;
  total: string;
  dueOn: string;
  status: JobStatus;
}

const ALL_JOBS: JobRow[] = [
  {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_REVISION",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_REVISION",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_REVISION",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "IN_REVISION",
  },

];

const PAGE_SIZE = 8;

export default function ManageJobsPage() {
  const [page, setPage] = useState(1);
  const total = ALL_JOBS.length;
  const [activeTab, setActiveTab] = useState("Active");


  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ALL_JOBS.slice(start, start + PAGE_SIZE);
  }, [page]);

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
            <span className="text-sm font-medium text-gray-800">
              {data.service}
            </span>
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

    const isRevision = data.status === "IN_REVISION";

    // create dynamic URL
    const route =
      data.status === "IN_PROGRESS"
        ? `/inprogress?id=${data.id}&title=${encodeURIComponent(data.service)}`
        : `/inrevision?id=${data.id}&title=${encodeURIComponent(data.service)}`;

    return (
      <Link href={route}>
        <div className="cursor-pointer">
          <span
            className={`px-4 py-1 rounded-md text-xs font-semibold uppercase text-white
            ${isRevision ? "bg-red-500" : "bg-sky-700"}`}
          >
            {isRevision ? "IN REVISION" : "IN PROGRESS"}
          </span>
        </div>
      </Link>
    );
  },
}



  ];

  return (
    <div className="containers py-8">

      {/* Tabs */}
      <div className="flex justify-between">
       <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-3 md:gap-6 text-sm font-medium">

  {["Active", "Late", "Delivered", "Completed", "Cancelled"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`
        px-3 py-2 rounded-md transition
        ${activeTab === tab ? "text-black font-semibold" : "text-gray-500"}
      `}
    >
      {tab}
    </button>
  ))}

</div>


        <div className="bg-[#FF4D4F] py-3 px-4 h-fit top-5 text-white rounded-lg cursor-pointer">
          Create a new Job
        </div>
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
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
