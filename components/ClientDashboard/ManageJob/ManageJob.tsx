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
import { getJobStatusDefinition } from "@/lib/job-status";
import PageBanner from "@/components/reusable/Bgbanner";
import { useSearchParams } from "next/navigation";
import { ALL_JOBS } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import { JobRow } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import { PlusIcon } from "@/public/svgIcons/svgIcons";

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
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [page, filteredJobs]);

  const goToDetail = (id: string) =>
    router.push(
      `/client/manage-job/${id}?redirect=${redirect ? redirect + "_" : ""}managejobs`,
    );

  useEffect(() => {
    const isCustomDateFilter = dateFilter === "custom_date";
    const hasFullDateRange = Boolean(startDate && endDate);
    const shouldTriggerLoading = !isCustomDateFilter || hasFullDateRange;

    if (shouldTriggerLoading) {
      setLoading(true);
    }

    const timeoutId = shouldTriggerLoading
      ? setTimeout(() => {
          setLoading(false);
        }, 1000)
      : undefined;
    let data = ALL_JOBS;

    if (activeTab !== "all") {
      data = data.filter((job) => job.status === activeTab);
    }

    if (dateFilter === "custom_date") {
      if (startDate && endDate) {
        data = data.filter((job) => {
          const jobDate = job.deliveryDate;
          const endOfDay = new Date(endDate);
          endOfDay.setHours(23, 59, 59, 999);
          return jobDate >= startDate && jobDate <= endOfDay;
        });
      }
    } else {
      if (startDate || endDate) {
        setStartDate(undefined);
        setEndDate(undefined);
      }

      if (dateFilter === "today") {
        const today = new Date();
        data = data.filter(
          (job) => job.dueOn.toDateString() === today.toDateString(),
        );
      } else if (dateFilter === "this_week") {
        const today = new Date();
        const firstDayOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay()),
        );
        const lastDayOfWeek = new Date(
          today.setDate(firstDayOfWeek.getDate() + 6),
        );
        data = data.filter(
          (job) => job.dueOn >= firstDayOfWeek && job.dueOn <= lastDayOfWeek,
        );
      } else if (dateFilter === "this_month") {
        const today = new Date();
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
        );
        data = data.filter(
          (job) => job.dueOn >= firstDayOfMonth && job.dueOn <= lastDayOfMonth,
        );
      }
    }

    setFilteredJobs(data);

    if (!shouldTriggerLoading) {
      setLoading(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeTab, dateFilter, startDate, endDate]);

  const columns: ColumnDef<JobRow>[] = [
    {
      accessorKey: "service",
      header: "Job Title",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex cursor-pointer items-center gap-4 rounded-md p-2">
            <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-200">
              <img
                src={data.thumbnail}
                alt={data.service}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-800 capitalize">
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
          <div className="cursor-pointer rounded-md p-2 text-center">
            ${d.total.toFixed(2)}
          </div>
        );
      },
    },

    {
      accessorKey: "dueOn",
      header: "Days Left",
      cell: ({ row }) => {
        const d = row.original;
        const time = Math.ceil(
          (d.dueOn.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        );
        return (
          <>
            {d.status === "in_progress" ||
            d.status === "late" ||
            d.status === "in_revision" ||
            d.status === "delivered" ? (
              <div className="cursor-pointer rounded-md p-2 text-center">
                {Math.abs(d.timeLeft.days)}{" "}
                {d.timeLeft.days > 1
                  ? "days left"
                  : d.timeLeft.days < 0
                    ? d.status === "late"
                      ? "days overdue"
                      : "days left"
                    : "day left"}
              </div>
            ) : (
              <div className="text-center">Not available</div>
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
        return (
          <div className="flex justify-center">
            <span
              title={getJobStatusDefinition(d.status).description}
              className={`inline-block w-40 rounded-md px-4 py-1 text-center text-[14px] font-medium capitalize ${getJobStatusDefinition(d.status).colorClass ?? "bg-[#F3F4F6] text-[#374151]"} `}
            >
              {d.status.split("_").join(" ")}
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
    );
  }

  return (
    <div>
      <div>
        <PageBanner
          title="Manage Jobs"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Dashboard", href: "/client" },
            { label: "Manage Jobs" },
          ]}
        />
      </div>
      <div className="containers py-8">
        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          <h2 className="mb-4 text-xl font-semibold">Manage Jobs</h2>
          {/* TABS */}
          <div className="mb-6 flex items-center justify-between">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium">
              {[
                "all",
                "in_progress",
                "pending",
                "in_revision",
                "late",
                "delivered",
                "completed",
                "canceled",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer rounded-md bg-white px-3 py-2 capitalize ${
                    activeTab === tab
                      ? "font-semibold text-black shadow"
                      : "text-gray-500"
                  }`}
                >
                  {tab?.split("_").join(" ")}
                </button>
              ))}
            </div>

            <Link
              href={`/client/post-job?redirect=${redirect ? redirect + "_" : ""}managejobs`}
              className="flex items-center gap-1 rounded-lg bg-[#FF4D4F] px-4 py-3 text-white duration-300 hover:bg-[#fc4447]"
            >
              <PlusIcon className="w-5" /> Post a New Job
            </Link>
          </div>

          {/* HEADER */}
          <div className="">
            <div className="mt-4 flex items-center justify-between rounded-lg bg-white p-4">
              <h2 className="text-lg font-semibold">
                <span className="capitalize">
                  {activeTab?.split("_").join(" ") === "in progress" ||
                  activeTab?.split("_").join(" ") === "pending" ||
                  activeTab?.split("_").join(" ") === "in revision"
                    ? "Jobs " + activeTab?.split("_").join(" ")
                    : activeTab?.split("_").join(" ") + " Jobs"}
                </span>
              </h2>
              {dateFilter === "custom_date" && (
                <div>
                  <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => {
                      setStartDate(date[0]);
                      setEndDate(date[1]);
                      console.log("Selected date range:", date);
                    }}
                  />
                </div>
              )}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="cursor-pointer rounded-lg border border-gray-300 p-2 text-sm"
              >
                <option value="today" className="cursor-pointer">
                  Today
                </option>
                <option value="this_week" className="cursor-pointer">
                  This week
                </option>
                <option value="this_month" className="cursor-pointer">
                  This month
                </option>
                <option value="lifetime" className="cursor-pointer">
                  Lifetime
                </option>
                <option value="custom_date" className="cursor-pointer">
                  Custom Date
                </option>
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
              onRowClick={(data) => goToDetail(data.id)}
            />
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="">
          <div className="space-y-4 md:hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold">Manage Job</h3>

              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm"
              >
                {activeTab} orders <SlidersHorizontal size={18} />
              </button>
            </div>

            {/* Dropdown */}
            {mobileMenuOpen && (
              <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                <div className="grid grid-cols-2 gap-3 text-sm font-medium">
                  {["Active", "Late", "Delivered", "Completed", "Canceled"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setMobileMenuOpen(false);
                        }}
                        className={`cursor-pointer rounded-lg border px-4 py-3 transition ${
                          activeTab === tab
                            ? "border-[#FF4D4F] bg-[#FF4D4F] text-white"
                            : "border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <div className="w-full">
                <Link
                  href="/client/post-job"
                  className="block rounded-lg bg-[#FF4D4F] py-3 text-center font-medium text-white"
                >
                  + Create a new Job
                </Link>
              </div>
              <div className="w-full">
                <select className="h-full w-full rounded-lg border border-gray-300 p-2 text-sm">
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
                timeLeft={job.timeLeft.days}
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
