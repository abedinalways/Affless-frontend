"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export interface ProposalRow {
  id: number;
  service: string;
  amount: string;
  time: string;
  status: "Pending Client Decision" | "Pending" | "Cancellation";
  thumbnail: string;
}

const PAGE_SIZE = 8;

export const Proposal: ProposalRow[] = [
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "Pending",
  },
  {
    id: 3,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft backlinks.",
    amount: "$60",
    time: "5 Days",
    status: "Pending",
  },
  {
    id: 4,
    thumbnail: "/images/mnagejob1.jpg",
    service: "I will create backlinks.",
    amount: "$70",
    time: "7 Days",
    status: "Pending Client Decision",
  },
  {
    id: 5,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft backlinks.",
    amount: "$80",
    time: "5 Days",
    status: "Pending Client Decision",
  },
  {
    id: 1,
    thumbnail: "/images/mnagejob3.jpg",
    service: "I will craft quality backlinks.",
    amount: "$55",
    time: "5 Days",
    status: "Pending Client Decision",
  },
  {
    id: 6,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "Cancellation",
  },
  {
    id: 7,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "Pending",
  },
  {
    id: 8,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$90",
    time: "7 Days",
    status: "Pending",
  },
];

const statusBadgeClasses: Record<ProposalRow["status"], string> = {
  "Pending Client Decision": "bg-yellow-200 text-orange-500",
  Pending: "bg-[#FFF7E8] text-[#FAAD14]",
  Cancellation: "bg-[#FEE9EA] text-[#F5222D]",
};

export default function MyProposal() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"ALL" | ProposalRow["status"]>(
    "Pending Client Decision"
  );
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const filteredData = useMemo(() => {
    return Proposal.filter(
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
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setStatusFilter("Pending Client Decision")}
            className={`w-fit px-4 py-2 rounded-lg text-center font-medium cursor-pointer bg-white ${statusFilter === "Pending Client Decision" ? "shadow-md" : ""
              }`}
          >
            Active Job Proposals Awaiting Client Acceptance
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          columns={[
            {
              accessorKey: "service",
              header: "Active Job Proposals Awaiting Client Acceptance",
              cell: ({ row }: any) => (
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  {/* Thumbnail box */}
                  <div className="h-14 w-20 rounded-lg overflow-hidden bg-[#F8F8F8] border border-[#EDEDED] shadow-sm">
                    <img
                      src={row.original.thumbnail}
                      alt={row.original.service}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <span className="text-[15px] font-normal text-[#1D1F2C] leading-5 max-w-[260px] line-clamp-2">
                    {row.original.service}
                  </span>
                </div>
              ),
            },
            {
              accessorKey: "amount",
              header: "Amount",
              cell: ({ row }: any) => (
                <div className="flex justify-center">
                  <span className="text-[#1D1F2C] text-center">{row.original.amount}</span>
                </div>
              ),
            },
            {
              accessorKey: "time",
              header: "Days Awaiting Client Acceptance",
              cell: ({ row }: any) => (
                <div className="flex justify-center">
                  <span>{row.original.time}</span>
                </div>
              ),
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ row }: any) => {
                const status = row.original.status as ProposalRow["status"];
                return (
                  <div className="flex justify-center">
                    <span
                      className={`inline-block w-fit px-4 py-1 rounded-md text-[14px] text-center font-medium ${statusBadgeClasses[status]}`}
                    >
                      {status}
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
          // ⭐ FULL ROW CLICK
          onRowClick={(row: ProposalRow) =>
            router.push(`/editor/hire-request/${row.id}?redirect=${redirectUrl ? redirectUrl + "_" : ''}myjobproposals&status=${row.status}`)
          }



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
