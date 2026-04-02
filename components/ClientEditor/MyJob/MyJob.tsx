"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import JobProposalTable from "@/app/(website)/(dashboard)/(editor-dashboard)/editor/hire-request/_components/JobProposalTable";
import type { EditorJobProposalType } from "@/app/type";
import { editorJobProposals } from "@/public/demodata";

const PAGE_SIZE = 8;

export default function MyProposal() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"ALL" | EditorJobProposalType["status"]>(
    "pending"
  );
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const filteredData = useMemo(() => {
    return editorJobProposals.filter(
      (p) => statusFilter === "ALL" || p.status === statusFilter
    );
  }, [statusFilter]);

  const total = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  return (
    <div className="containers py-8">
      {/* DESKTOP */}
      <div className="">
        <h2 className="text-xl font-semibold mb-4">My Job Proposals</h2>

        {/* FILTER BUTTONS */}
        <div className="flex justify-between items-center mb-6 text-[18px] font-normal">
          <div className="flex gap-4">
            <button
              onClick={() => setStatusFilter("pending")}
              className={`p-2.5 rounded-md cursor-pointer ${statusFilter === "pending" ? "bg-[#FF4D4F] text-white" : "bg-[#FFEDED] text-[#FF4D4F]"
                }`}
            >
              Active Job Proposals Awaiting Client Acceptance
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
        <JobProposalTable 
          data={paginatedData || []}
        />
      </div>

      {/* MOBILE */}
      <div className="hidden">
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-[16px] font-semibold">Hire Request</p>
            <button className="border p-3 rounded-lg flex gap-3 items-center text-sm">
              Filter <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
