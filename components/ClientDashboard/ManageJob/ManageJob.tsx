"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import { useRouter } from "next/navigation";
import JobProposalCard from "@/components/reusable/TableCard";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export interface JobRow {
  id: number;
  service: string;
  thumbnail: string;
  total: string;
  dueOn: string;
  status: "Accept" | "In Progress" | "In Revision";

  customer: string;
  deliveryDate: string;
  price: number;
  orderId: string;
 
}

export const ALL_JOBS: JobRow[] = [
  {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
    customer: "Bessie Cooper",
    deliveryDate: "NOV 6, 7:24 AM",
    price: 654,
    orderId: "#EM78373A0",
    
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$743",
    dueOn: "Jun 21",
    status: "In Progress",
    customer: "Cameron Williamson",
    deliveryDate: "NOV 9, 3:30 PM",
    price: 743,
    orderId: "#EM78373A1",

  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$512",
    dueOn: "Jun 21",
    status: "In Revision",
    customer: "Devon Lane",
    deliveryDate: "NOV 4, 9:15 AM",
    price: 512,
    orderId: "#EM78373A2",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
    customer: "Bessie Cooper",
    deliveryDate: "NOV 6, 7:24 AM",
    price: 654,
    orderId: "#EM78373A0",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$743",
    dueOn: "Jun 21",
    status: "In Progress",
    customer: "Cameron Williamson",
    deliveryDate: "NOV 9, 3:30 PM",
    price: 743,
    orderId: "#EM78373A1",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$512",
    dueOn: "Jun 21",
    status: "In Revision",
    customer: "Devon Lane",
    deliveryDate: "NOV 4, 9:15 AM",
    price: 512,
    orderId: "#EM78373A2",
  },
   {
    id: 1,
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "$654",
    dueOn: "Jun 21",
    status: "In Progress",
    customer: "Bessie Cooper",
    deliveryDate: "NOV 6, 7:24 AM",
    price: 654,
    orderId: "#EM78373A0",
  },
  {
    id: 2,
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "$743",
    dueOn: "Jun 21",
    status: "In Progress",
    customer: "Cameron Williamson",
    deliveryDate: "NOV 9, 3:30 PM",
    price: 743,
    orderId: "#EM78373A1",
  },
  {
    id: 3,
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "$512",
    dueOn: "Jun 21",
    status: "In Revision",
    customer: "Devon Lane",
    deliveryDate: "NOV 4, 9:15 AM",
    price: 512,
    orderId: "#EM78373A2",
  },
];

const PAGE_SIZE = 8;

export default function ManageJobsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Active");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ALL_JOBS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goToDetail = (id: number) => router.push(`/client/manage-job/${id}`);

  const columns: ColumnDef<JobRow>[] = [
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div
            onClick={() => goToDetail(data.id)}
            className="flex items-center gap-4 cursor-pointer  p-2 rounded-md"
          >
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
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div
            onClick={() => goToDetail(d.id)}
            className="cursor-pointer p-2 rounded-md"
          >
            {d.total}
          </div>
        );
      },
    },

    {
      accessorKey: "dueOn",
      header: "DUE ON",
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div
            onClick={() => goToDetail(d.id)}
            className="cursor-pointer  p-2 rounded-md"
          >
            {d.dueOn}
          </div>
        );
      },
    },
   

    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div
            onClick={() => goToDetail(d.id)}
            className="cursor-pointer  p-2 rounded-md"
          >
            <span
              className={`px-3 text-[16px] w-full py-1.5 text-white rounded-md ${
                d.status === "In Revision"
                  ? "bg-[#FF4D4F]"
                  : d.status === "In Progress"
                  ? "bg-[#00648A]"
                  : "bg-[#FF4D4F]"
              }`}
            >
              {d.status}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="containers py-8">

      {/* DESKTOP VIEW */}
      <div className="hidden md:block">

        {/* TABS */}
        <div className="flex justify-between mb-6">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium">
            {["Active", "Late", "Delivered", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-md ${
                  activeTab === tab ? "text-black font-semibold" : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link
            href="/client/post-job"
            className="bg-[#FF4D4F] text-white py-3 px-4 rounded-lg"
          >
            Create a new Job
          </Link>
        </div>

        {/* HEADER */}
       <div className="">
         <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Active Orders</h2>

          <select className="rounded-lg p-2 border border-gray-300 text-sm">
            <option>20 DAYS</option>
            <option>25 DAYS</option>
          </select>
        </div>

        {/* TABLE */}
        <DataTable<JobRow, any>
          columns={columns}
          data={pageData}
          page={page}
          pageSize={PAGE_SIZE}
          total={ALL_JOBS.length}
          onPageChange={setPage}
        />
       </div>
      </div>

      {/* MOBILE VIEW */}
    <div className="">
       <div className="md:hidden space-y-4">
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-[18px]">Manage Job</h3>

    <button
      onClick={() => setMobileMenuOpen((v) => !v)}
      className="border border-gray-300 px-4 py-3 rounded-lg flex gap-2 items-center text-sm"
    >
      {activeTab} orders <SlidersHorizontal size={18} />
    </button>
  </div>

  {/* Dropdown */}
  {mobileMenuOpen && (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm font-medium">
        {["Active", "Late", "Delivered", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setMobileMenuOpen(false);
            }}
            className={`px-4 py-3 rounded-lg border transition
              ${
                activeTab === tab
                  ? "bg-[#FF4D4F] text-white border-[#FF4D4F]"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

   
    </div>
    
  )}
<div className="flex justify-between gap-3">
  <div className="w-full">
    <Link
        href="/client/post-job"
        className="block text-center bg-[#FF4D4F] text-white py-3 rounded-lg font-medium"
      >
        Create a new Job
      </Link>
</div>
  <div className="w-full">
    <select className="rounded-lg p-2 border border-gray-300 text-sm w-full h-full">
            <option>20 DAYS</option>
            <option>25 DAYS</option>
          </select>
  </div>
</div>
  {/* Cards */}
  {pageData.map((job) => (
    <JobProposalCard
      key={job.id}
      image={job.thumbnail}
      title={job.service}
      total={job.total}
      status={job.status}
      id={job.id}
      onAction={() => goToDetail(job.id)}
    />
  ))}
</div>


    </div>
 
    </div>
  );
}
