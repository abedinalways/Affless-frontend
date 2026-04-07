"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/reusable/DataTable";
import JobProposalCard from "@/components/reusable/TableCard";
import { SlidersHorizontal } from "lucide-react";
import { JOB_STATUS_DEFINITIONS } from "@/lib/job-status";
import { useSearchParams } from "next/navigation";
import JobProposalTable from "@/app/(website)/(dashboard)/(client-dashboard)/client/job-proposal/_component/JobProposalTable";
import type { EditorJobProposalType } from "@/app/type";
import { editorJobProposals } from "@/public/demodata";

const PAGE_SIZE = 8;

const StatusBadge = {
  "in_progress": {
    label: "Pending Your Approval of Editor",
    colorClass: "bg-[#FFF7E8] text-[#FAAD14]",
    description: "Work has started",
  },
  in_revision: {
    label: "In Revision",
    colorClass: "bg-[#7C3AED] text-white",
    description: "Work is in revision",
  },
  delivered: {
    label: "Delivered",
    colorClass: "bg-[#22C55E] text-white",
    description: "Work submitted by editor",
  },
  completed: {
    label: "Completed",
    colorClass: "bg-[#166534] text-white",
    description: "Client accepted delivery",
  },
  canceled: {
    label: "Canceled",
    colorClass: "bg-[#FF4D4F] text-white",
    description: "Job canceled by either party",
  },
  late: {
    label: "Late",
    colorClass: "bg-[#991B1B] text-white",
    description: "Work is past the deadline",
  },
  pending: {
    label: "Pending Your Approval of Editor",
    colorClass: "bg-[#FFF7E8] text-[#FAAD14]",
    description: "Job is pending",
  }
}

export default function JobProposalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const [page, setPage] = useState(1);

  const [timeFilter, setTimeFilter] = useState<"ALL" | "5" | "7" | "3">("ALL");

  // ✅ filter toggle only Accepted/Declined for your UI
  const [statusFilter, setStatusFilter] = useState<"in_progress" | "pending" | "in_revision" | "late" | "delivered" | "completed" | "canceled">("pending");

  // ✅ filtered data
  const filteredData = useMemo(() => {
    let data = editorJobProposals;

    // ✅ status filter
    data = data.filter((p) => p.status === statusFilter);

    // ✅ time filter
    if (timeFilter !== "ALL") {
      data = data.filter((p) => p.timeLeft === Number(timeFilter));
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
    router.push(`/client/job-proposal/${id}?status=${encodeURIComponent(status)}&redirect=${redirectUrl ? redirectUrl + "_" : ""}jobproposal`);
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
              onClick={() => setStatusFilter("pending")}
              className={`p-2.5 rounded-md cursor-pointer ${statusFilter === "pending" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                }`}
            >
              Jobs Awaiting Your Editor Selection
            </button>

            <button
              onClick={() => setStatusFilter("canceled")}
              className={`p-2.5 rounded-md cursor-pointer ${statusFilter === "canceled" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                }`}
            >
              Canceled Jobs
            </button>
          </div>
        </div>

        <JobProposalTable data={paginatedData} />
      </div>

      {/* ===================== MOBILE VIEW ===================== */}
      <div className="block md:hidden">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between py-4">
              <p className="font-medium">Job Proposals</p>
              {/* <button type="button" className="border border-gray-300 p-3 rounded-lg flex gap-3 cursor-pointer">
                Proposals <SlidersHorizontal />
              </button> */}
            </div>

            <div className="flex justify-between items-center mb-6 text-[18px] font-normal">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`p-1.5 sm:p-3.5 text-xs sm:text-base rounded-md cursor-pointer whitespace-nowrap ${statusFilter === "pending" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                    }`}
                >
                  Jobs Awaiting Your Editor Selection
                </button>

                <button
                  onClick={() => setStatusFilter("canceled")}
                  className={`p-1.5 sm:p-3.5 text-xs sm:text-base rounded-md cursor-pointer whitespace-nowrap ${statusFilter === "canceled" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                    }`}
                >
                  Canceled Jobs
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Mobile: Card click => route push */}
          {paginatedData.map((proposal) => (
            <JobProposalCard
              key={proposal.id}
              id={proposal.id.toString()}
              image={proposal.job.imageUrl}
              title={proposal.job.title}
              total={proposal.amount}
              status={proposal.status}
              timeLeft={proposal.timeLeft}
              onOpen={(id: string) => goToDetail(id, proposal.status)} // card click
              onAction={(id: string) => goToDetail(id, proposal.status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
