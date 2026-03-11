"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import PageBanner from "@/components/reusable/Bgbanner";
import DatePicker from "@/components/ClientDashboard/ManageJob/DatePicker";
import Link from "next/link";
import { PROPOSAL_DEMO_DATA, ProposalRow } from "./proposal-demo-data";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";

const PAGE_SIZE = 8;

const Proposal = PROPOSAL_DEMO_DATA;

const statusBadgeClasses: Partial<Record<ProposalRow["status"], string>> = {
  completed: "bg-[#E8FFDA] text-[#52C41A]",
  in_progress: "bg-[#E3F2FF] text-[#1677FF]",
  pending: "bg-[#FFF7E8] text-[#FAAD14]",
  in_revision: "bg-[#F3E8FF] text-[#7C3AED]",
  delivered: "bg-[#DCFCE7] text-[#16A34A]",
  late: "bg-[#FEE2E2] text-[#DC2626]",
  cancelled: "bg-[#F3F4F6] text-[#4B5563]",
};

export default function MyProposal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || undefined;
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<ProposalRow[]>(Proposal);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"ALL" | ProposalRow["status"]>(
    "ALL"
  );
  const [activeTab, setActiveTab] = useState("all");
  const [dateFilter, setDateFilter] = useState("lifetime");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleFilterClick = (status: ProposalRow["status"]) => {
    setPage(1);
    setStatusFilter((prev) => (prev === status ? "ALL" : status));
  };

  const filteredData = useMemo(() => {
    return filteredJobs.filter((p) => statusFilter === "ALL" || p.status === statusFilter);
  }, [filteredJobs, statusFilter]);

  const total = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

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

    let data = Proposal;

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

    if (!shouldTriggerLoading) {
      setLoading(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeTab, dateFilter, startDate, endDate]);

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
    useEffect(() => {
        setBannerLinks(buildSourceBreadcrumbs(redirectUrl, {
          currentLabel: "My jobs",
          fallbackBase: [{ label: "Home", href: "/" }],
        }));
    }, [redirectUrl]);

  return (
    <div>
      <div>
        <PageBanner
          title="My Jobs"
          bgImage="/findEditor.jpg"
          links={bannerLinks}
        />
      </div>
      <div className="containers py-8">
        {/* DESKTOP VIEW */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">My Jobs</h2>

          {/* FILTER BUTTONS */}
          <div className="flex items-center justify-between mb-6">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium">
              {["all", "in_progress", "pending", "in_revision", "late", "delivered", "completed", "cancelled"].map((tab) => (
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
              href={`/browse-job?redirect=${redirectUrl ? `${redirectUrl}_` : ""}editorjobs`}
              className="bg-[#FF4D4F] text-white py-3 px-4 rounded-lg hover:bg-[#fc4447] duration-300"
            >
              Browse New Jobs
            </Link>
          </div>

          <div>
            <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg">
              <h2 className="text-lg font-semibold">
                <span className="capitalize">
                  {
                    (activeTab?.split("_").join(" ") === "in progress" || activeTab?.split("_").join(" ") === "pending" || activeTab?.split("_").join(" ") === "in revision")
                      ?
                      "Jobs " + activeTab?.split("_").join(" ")
                      :
                      activeTab?.split("_").join(" ") + " Jobs"}
                </span>
              </h2>
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
            <DataTable
              columns={[
                {
                  accessorKey: "service",
                  header: "Job title",
                  cell: ({ row }: any) => (
                    <div className="grid grid-cols-[48px_1fr] items-center gap-4">
                      <Image
                        src={row.original.thumbnail}
                        width={500}
                        height={500}
                        className="h-12 w-16 rounded-md object-cover"
                        alt="thumb"
                      />
                      <span className="text-sm font-medium">{row.original.service}</span>
                    </div>
                  ),
                },
                {
                  accessorKey: "total", header: "Amount", cell: ({ row }: any) => {
                    return (
                      <div className="text-center">
                        ${Number(row.original.total).toFixed(2)}
                      </div>
                    )
                  }
                },
                {
                  accessorKey: "dueOn", header: "Days Left", cell: ({ row }: any) => {
                    const d = row.original;
                    const time = Math.ceil((d.dueOn.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    return (
                      <div className="text-center">
                        {(row.original.status === "in_progress" || row.original.status === "late") && (
                          <div
                            className="cursor-pointer  p-2 rounded-md text-center"
                          >
                            {Math.abs(time)} {time > 1 ? "days left" : time < 0 ? d.status === "late" ? "days overdue" : "day left" : "day left"}
                          </div>
                        )}
                      </div>
                    )
                  }
                },
                {
                  accessorKey: "status",
                  header: "Status",
                  cell: ({ row }: any) => {
                    const status = row.original.status as ProposalRow["status"];
                    return (
                      <div className="flex justify-center">
                        <span
                          className={`
                      inline-block w-40 px-4 py-1 rounded-md
                      text-[14px] font-medium text-center capitalize
                      ${statusBadgeClasses[status] ?? "bg-[#F3F4F6] text-[#374151]"}
                    `}
                        >
                          {status.split("_").join(" ")}
                        </span>
                      </div>
                    );
                  },
                },
              ]}
              data={paginatedData}
              page={page}
              pageSize={PAGE_SIZE}
              total={total}
              onPageChange={setPage}
              onRowClick={(row: any) => {
                const id = row?.original?.id ?? row?.id;
                if (!id) return;
                router.push(`/editor/myproposal/${id}?redirect=${redirectUrl ? `${redirectUrl}_` : ""}editorjobs`);
              }}


            />
          </div>
        </div>

        {/* MOBILE VIEW */}
        {/* <div className="block md:hidden">
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-[16px] font-semibold">Job Proposals</p>
            <button className="border p-3 rounded-lg flex gap-3 items-center text-sm">
              Proposals <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
}

