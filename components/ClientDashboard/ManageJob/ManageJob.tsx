"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import { useRouter } from "next/navigation";
import JobProposalCard from "@/components/reusable/TableCard";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import DatePicker from "./DatePicker";
import Loading from "@/components/shared/Loading";
import { getJobStatusDefinition, type JobStatus } from "@/lib/job-status";
import PageBanner from "@/components/reusable/Bgbanner";

export interface JobRow {
  id: string;
  service: string;
  thumbnail: string;
  total: string;
  dueOn: Date;
  status: JobStatus;
  customer: string;
  deliveryDate: Date;
  price: number;
  orderId: string;
  category?: string;
  platform?: string;
  duration?: number;
  videoLength?: number;
}

export const ALL_JOBS: JobRow[] = [
  {
    id: "1",
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "654",
    dueOn: new Date("2025-06-21"),
    status: "completed",
    customer: "Bessie Cooper",
    deliveryDate: new Date("2025-11-06T07:24:00"),
    price: 654,
    orderId: "#EM78373A0",
    category: "long-form videos",
    platform: "YouTube",
    duration: 5,
    videoLength: 4,
  },
  {
    id: "2",
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "743",
    dueOn: new Date("2026-02-21"),
    status: "in_progress",
    customer: "Cameron Williamson",
    deliveryDate: new Date("2026-11-09T15:30:00"),
    price: 743,
    orderId: "#EM78373A1",
    category: "Shorts/Reels/TikToks",
    platform: "TikTok",
    duration: 3,
    videoLength: 39,
  },
  {
    id: "3",
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "512",
    dueOn: new Date("2025-06-21"),
    status: "in_revision",
    customer: "Devon Lane",
    deliveryDate: new Date("2025-11-04T09:15:00"),
    price: 512,
    orderId: "#EM78373A2",
    category: "caption/subtitles",
    platform: "Instagram",
    duration: 4,
  },
  {
    id: "4",
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "654",
    dueOn: new Date("2026-02-10"),
    status: "in_progress",
    customer: "Bessie Cooper",
    deliveryDate: new Date("2025-11-06T07:24:00"),
    price: 654,
    orderId: "#EM78373A0",
    category: "long-form videos",
    platform: "Facebook",
    duration: 5,
    videoLength: 2,
  },
  {
    id: "5",
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "743",
    dueOn: new Date("2025-06-21"),
    status: "delivered",
    customer: "Cameron Williamson",
    deliveryDate: new Date("2025-11-09T15:30:00"),
    price: 743,
    orderId: "#EM78373A1",
    category: "thumbnails",
    platform: "X (Twitter)",
    duration: 5,
  },
  {
    id: "6",
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "512",
    dueOn: new Date("2025-06-21"),
    status: "late",
    customer: "Devon Lane",
    deliveryDate: new Date("2025-11-04T09:15:00"),
    price: 512,
    orderId: "#EM78373A2",
    category: "ads/ugc",
    platform: "YouTube",
    duration: 2,
  },
  {
    id: "7",
    service: "I will do SEO backlinks with building",
    thumbnail: "/images/mnagejob1.jpg",
    total: "654",
    dueOn: new Date("2025-06-21"),
    status: "cancelled",
    customer: "Bessie Cooper",
    deliveryDate: new Date("2025-11-06T07:24:00"),
    price: 654,
    orderId: "#EM78373A0",
    category: "podcasts",
    platform: "YouTube",
    duration: 6,
    videoLength: 20,
  },
  {
    id: "8",
    service: "I will create backlinks to improve your SEO rankings.",
    thumbnail: "/images/mnagejob2.jpg",
    total: "743",
    dueOn: new Date("2025-06-21"),
    status: "delivered",
    customer: "Cameron Williamson",
    deliveryDate: new Date("2025-11-09T15:30:00"),
    price: 743,
    orderId: "#EM78373A1",
    category: "thumbnails",
    platform: "YouTube",
    duration: 7,
  },
  {
    id: "9",
    service: "I will craft quality backlinks for your website's SEO.",
    thumbnail: "/images/mnagejob3.jpg",
    total: "512",
    dueOn: new Date("2025-06-21"),
    status: "in_progress",
    customer: "Devon Lane",
    deliveryDate: new Date("2025-11-04T09:15:00"),
    price: 512,
    orderId: "#EM78373A2",
    category: "caption/subtitles",
    platform: "YouTube",
    duration: 4,
  },
];

const PAGE_SIZE = 8;

export default function ManageJobsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("lifetime");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<JobRow[]>(ALL_JOBS);


  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [page, filteredJobs]);

  const goToDetail = (id: string) => router.push(`/client/manage-job/${id}`);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    let data = ALL_JOBS;

    if (activeTab !== "all") {
      data = data.filter(job => job.status === activeTab);
    }

    if (dateFilter === "custom_date") {
      if (startDate && endDate) {
        data = data.filter(job => {
          const jobDate = job.deliveryDate;
          return jobDate >= startDate && jobDate <= endDate;
        });
      }
    } else {
      if (startDate || endDate) {
        setStartDate(undefined);
        setEndDate(undefined);
      }

      if (dateFilter === "today") {
        const today = new Date();
        data = data.filter(job => job.dueOn.toDateString() === today.toDateString());
      } else if (dateFilter === "this_week") {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
        data = data.filter(job => job.dueOn >= firstDayOfWeek && job.dueOn <= lastDayOfWeek);
      } else if (dateFilter === "this_month") {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        data = data.filter(job => job.dueOn >= firstDayOfMonth && job.dueOn <= lastDayOfMonth);
      }
    }

    setFilteredJobs(data);

    return () => clearTimeout(timeoutId);
  }, [activeTab, dateFilter, startDate, endDate]);


  const columns: ColumnDef<JobRow>[] = [
    {
      accessorKey: "service",
      header: "Jobs",
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
      header: "Amount",
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
      header: "Days Left",
      cell: ({ row }) => {
        const d = row.original;
        return (
          <>
            {(d.status === "in_progress" || d.status === "late") && (
              <div
                onClick={() => goToDetail(d.id)}
                className="cursor-pointer  p-2 rounded-md"
              >
                {Math.max(
                  0,
                  Math.ceil(
                    (d.dueOn.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  )
                )} Days Left
              </div>
            )}
          </>
        );
      },
    },


    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const d = row.original;
        const statusDefinition = getJobStatusDefinition(d.status);
        return (
          <div
            onClick={() => goToDetail(d.id)}
            className="cursor-pointer  p-2 rounded-md grid items-center justify-center"
          >
            <span
              title={statusDefinition.description}
              className={`px-3 text-[16px] w-full py-1.5 rounded-md ${statusDefinition.colorClass}`}
            >
              {statusDefinition.label}
            </span>
          </div>
        );
      },
    },
  ];


  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <div>
        <PageBanner
          title="Manage Jobs"
          bgImage="/findEditor.jpg"
          links={[{ label: "Dashboard", href: "/client" }, { label: "Manage Jobs" }]}
        />
      </div>
      <div className="containers py-8">
        {/* DESKTOP VIEW */}
        <div className="hidden md:block">

          {/* TABS */}
          <div className="flex items-center justify-between mb-6">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium">
              {["all", "in_progress", "in_revision", "late", "delivered", "completed", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md cursor-pointer bg-white capitalize ${activeTab === tab ? "text-black font-semibold shadow" : "text-gray-500"
                    }`}
                >
                  {tab?.split("_").join(" ")}
                </button>
              ))}
            </div>

            <Link
              href="/post-job?redirect=/client/manage-job"
              className="bg-[#FF4D4F] text-white py-3 px-4 rounded-lg hover:bg-[#fc4447] duration-300"
            >
              + Create a New Job
            </Link>
          </div>

          {/* HEADER */}
          <div className="">
            <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg">
              <h2 className="text-lg font-semibold"><span className="capitalize">{(activeTab?.split("_").join(" ") === "in progress" || activeTab?.split("_").join(" ") === "in revision") ? "Jobs " + activeTab?.split("_").join(" ") : activeTab?.split("_").join(" ") + " Jobs"}</span></h2>
              {dateFilter === "custom_date" && <div>
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(date) => {
                    setStartDate(date[0]);
                    setEndDate(date[1]);
                    console.log("Selected date range:", date);
                  }}
                />
              </div>}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-lg p-2 border border-gray-300 text-sm cursor-pointer"
              >
                <option value="today" className="cursor-pointer">Today</option>
                <option value="this_week" className="cursor-pointer">This week</option>
                <option value="this_month" className="cursor-pointer">This month</option>
                <option value="lifetime" className="cursor-pointer">Lifetime</option>
                <option value="custom_date" className="cursor-pointer">Custome Date</option>
              </select>
            </div>

            {/* TABLE */}
            <DataTable<JobRow, any>
              columns={columns}
              data={pageData}
              page={page}
              pageSize={PAGE_SIZE}
              total={pageData.length}
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
                className="border border-gray-300 px-4 py-3 rounded-lg flex gap-2 items-center text-sm cursor-pointer"
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
                      className={`px-4 py-3 rounded-lg cursor-pointer border transition
              ${activeTab === tab
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
                  + Create a new Job
                </Link>
              </div>
              <div className="w-full">
                <select className="rounded-lg p-2 border border-gray-300 text-sm w-full h-full">
                  <option>Today</option>
                  <option>This week</option>
                  <option>This month</option>
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
    </div>
  );
}
