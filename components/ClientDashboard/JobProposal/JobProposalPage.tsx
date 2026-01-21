"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/reusable/DataTable";
import JobProposalCard from "@/components/reusable/TableCard";
import { SlidersHorizontal } from "lucide-react";

export interface ProposalRow {
  id: string;
  service: string;
  amount: string;
  time: "3 Days" | "5 Days" | "7 Days";
  status: "in_progress" | "pending" | "in_revision" | "late" | "delivered" | "completed" | "cancelled";
  thumbnail: string;
}

const PAGE_SIZE = 8;

// ✅ IMPORTANT: unique IDs (ডুপ্লিকেট id দিলে React key collision হয়)
export const ProposalData: ProposalRow[] = [
  { id: "1", thumbnail: "/images/mnagejob1.jpg", service: "I will craft quality backlinks for your website's SEO.", amount: "$55", time: "5 Days", status: "in_progress" },
  { id: "2", thumbnail: "/images/mnagejob2.jpg", service: "I will create backlinks to improve your rankings.", amount: "$55", time: "3 Days", status: "in_progress" },
  { id: "3", thumbnail: "/images/mnagejob2.jpg", service: "I will craft quality backlinks for your website's SEO.", amount: "$55", time: "7 Days", status: "delivered" },
  { id: "4", thumbnail: "/images/mnagejob2.jpg", service: "I will create backlinks to improve your rankings.", amount: "$55", time: "5 Days", status: "in_revision" },
  { id: "5", thumbnail: "/images/mnagejob2.jpg", service: "I will craft quality backlinks for your website's SEO.", amount: "$55", time: "3 Days", status: "in_revision" },
  { id: "6", thumbnail: "/images/mnagejob2.jpg", service: "I will create backlinks to improve your rankings.", amount: "$55", time: "7 Days", status: "late" },
  { id: "7", thumbnail: "/images/mnagejob2.jpg", service: "I will craft quality backlinks for your website's SEO.", amount: "$55", time: "5 Days", status: "delivered" },
  { id: "8", thumbnail: "/images/mnagejob2.jpg", service: "I will create backlinks to improve your rankings.", amount: "$55", time: "3 Days", status: "completed" },
  { id: "9", thumbnail: "/images/mnagejob2.jpg", service: "I will craft quality backlinks for your website's SEO.", amount: "$55", time: "7 Days", status: "cancelled" },
  { id: "10", thumbnail: "/images/mnagejob2.jpg", service: "I will create backlinks to improve your rankings.", amount: "$55", time: "5 Days", status: "late" },
];

export default function JobProposalPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const [timeFilter, setTimeFilter] = useState<"ALL" | "5 Days" | "7 Days" | "3 Days">("ALL");

  // ✅ filter toggle only Accepted/Declined for your UI
  const [statusFilter, setStatusFilter] = useState<"in_progress" | "pending" | "in_revision" | "late" | "delivered" | "completed" | "cancelled">("in_progress");

  // ✅ filtered data
  const filteredData = useMemo(() => {
    let data = ProposalData;

    // ✅ status filter
    data = data.filter((p) => p.status === statusFilter);

    // ✅ time filter
    if (timeFilter !== "ALL") {
      data = data.filter((p) => p.time === timeFilter);
    }

    return data;
  }, [timeFilter, statusFilter]);

  const total = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  useEffect(() => {
    setPage(1);
  }, [timeFilter, statusFilter]);

  // ✅ Mobile action handlers
  const handleAccept = (id: string) => console.log(`Proposal ${id} accepted`);
  const handleInProgress = (id: string) => console.log(`Proposal ${id} in progress`);
  const handleRevision = (id: string) => console.log(`Proposal ${id} in revision`);

  const goToDetail = (id: string, status: string) => {
    router.push(`/client/job-proposal/${id}?status=${encodeURIComponent(status)}&redirect=/client`);
  };

  return (
    <div className="containers py-8">
      {/* ===================== DESKTOP VIEW ===================== */}
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Proposals</h2>

        {/* Filter */}
        <div className="flex justify-between items-center mb-6 text-[18px] font-normal">
          <div className="flex gap-4">
            <button
              onClick={() => setStatusFilter("in_progress")}
              className={`p-2.5 rounded-md cursor-pointer ${statusFilter === "in_progress" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                }`}
            >
              Jobs Awaiting Your Editor Selection
            </button>

            <button
              onClick={() => setStatusFilter("cancelled")}
              className={`p-2.5 rounded-md cursor-pointer ${statusFilter === "cancelled" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                }`}
            >
              Canceled Jobs
            </button>
          </div>
        </div>

        <DataTable
          columns={[
            {
              accessorKey: "service",
              header: "Jobs",
              cell: ({ row }: any) => (
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 rounded-md overflow-hidden bg-gray-200">
                    <img
                      src={row.original.thumbnail}
                      alt={row.original.service}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{row.original.service}</span>
                </div>
              ),
            },
            {
              accessorKey: "amount",
              header: "Amount",
              cell: ({ row }: any) => <div className="text-gray-700 text-center">{row.original.amount}</div>,
            },
            {
              accessorKey: "time",
              header: "Time Awaiting Editor Approval",
              cell: ({ row }: any) => <div className="text-gray-700 text-center">{row.original.time}</div>,
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ row }: any) => {
                const s = row.original.status as ProposalRow["status"];
                const badge =
                  s === "in_progress"
                    ? "bg-yellow-500"
                    : s === "pending"
                      ? "bg-yellow-500"
                      : s === "in_revision"
                        ? "bg-orange-500"
                        : "bg-red-500";

                return (
                  <span className={`px-4 py-1 rounded-md text-[14px] font-medium uppercase text-white ${badge}`}>
                    {s}
                  </span>
                );
              },
            },
          ]}
          data={paginatedData}
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={setPage}
          onRowClick={(row: any) => goToDetail(row.id, row.status)}
        />
      </div>

      {/* ===================== MOBILE VIEW ===================== */}
      <div className="block md:hidden">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between py-4">
              <p className="font-medium">Job Proposals</p>
              <button type="button" className="border border-gray-300 p-3 rounded-lg flex gap-3 cursor-pointer">
                Proposals <SlidersHorizontal />
              </button>
            </div>

            <div className="flex justify-between items-center mb-6 text-[18px] font-normal">
              <div className="flex gap-4">
                <button
                  onClick={() => setStatusFilter("in_progress")}
                  className={`p-3.5 rounded-md cursor-pointer ${statusFilter === "in_progress" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                    }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => setStatusFilter("cancelled")}
                  className={`p-3.5 rounded-md cursor-pointer ${statusFilter === "cancelled" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                    }`}
                >
                  Declined
                </button>
              </div>

              <select
                className="rounded-lg p-2.5 border border-gray-300 text-sm"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as "ALL" | "5 Days" | "7 Days" | "3 Days")}
              >
                <option value="ALL">ALL</option>
                <option value="5 Days">5 Days</option>
                <option value="7 Days">7 Days</option>
                <option value="3 Days">3 Days</option>
              </select>
            </div>
          </div>

          {/* ✅ Mobile: Card click => route push */}
          {paginatedData.map((proposal) => (
            <JobProposalCard
              key={proposal.id}
              id={proposal.id}
              image={proposal.thumbnail}
              title={proposal.service}
              total={proposal.amount}
              status={proposal.status}
              onOpen={(id: string) => goToDetail(id, proposal.status)} // card click
              onAction={(id: string) => goToDetail(id, proposal.status)}
            />
          ))}


        </div>
      </div>
    </div>
  );
}
