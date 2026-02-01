"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProposalRow {
  id: number;
  service: string;
  amount: string;
  time: string;
  status: "accept" | "in_progress" | "pending";
  thumbnail: string;
}

const PAGE_SIZE = 8;

const Proposal: ProposalRow[] = [
  {
    id: 1,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks.",
    amount: "$55",
    time: "5 Days",
    status: "in_progress",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "pending",
  },
  {
    id: 3,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft backlinks.",
    amount: "$60",
    time: "5 Days",
    status: "pending",
  },
  {
    id: 4,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$70",
    time: "7 Days",
    status: "in_progress",
  },
  {
    id: 5,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft backlinks.",
    amount: "$80",
    time: "5 Days",
    status: "in_progress",
  },
  {
    id: 6,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "accept",
  },
  {
    id: 7,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "pending",
  },
  {
    id: 8,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$90",
    time: "7 Days",
    status: "pending",
  },
];

const statusBadgeClasses: Record<ProposalRow["status"], string> = {
  accept: "bg-[#E8FFDA] text-[#52C41A]",
  in_progress: "bg-[#E3F2FF] text-[#1677FF]",
  pending: "bg-[#FFF7E8] text-[#FAAD14]",
};

export default function MyProposal() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"ALL" | ProposalRow["status"]>(
    "ALL"
  );

  const handleFilterClick = (status: ProposalRow["status"]) => {
    setPage(1);
    setStatusFilter((prev) => (prev === status ? "ALL" : status));
  };

  const filteredData = useMemo(() => {
    return Proposal.filter((p) => statusFilter === "ALL" || p.status === statusFilter);
  }, [statusFilter]);

  const total = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  return (
    <div className="containers py-8">
      {/* DESKTOP VIEW */}
      <div className="">
        <h2 className="text-xl font-semibold mb-4">My Job Proposals</h2>

        {/* FILTER BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleFilterClick("accept")}
            className={`
              w-[150px] py-2 rounded-lg text-center font-medium bg-white cursor-pointer
              ${statusFilter === "accept" ? "shadow-md" : ""}
            `}
          >
            Accept
          </button>

          <button
            onClick={() => handleFilterClick("pending")}
            className={`
              w-[150px] py-2 rounded-lg text-center font-medium bg-white cursor-pointer
              ${statusFilter === "pending" ? "shadow-md" : ""}
            `}
          >
            Pending
          </button>

          <button
            onClick={() => handleFilterClick("in_progress")}
            className={`
              w-[150px] py-2 rounded-lg text-center font-medium bg-white cursor-pointer
              ${statusFilter === "in_progress" ? "shadow-md" : ""}
            `}
          >
            In Progress
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          columns={[
            {
              accessorKey: "service",
              header: "Job title",
              cell: ({ row }: any) => (
                <div className="flex items-center gap-4">
                  <img
                    src={row.original.thumbnail}
                    className="h-12 w-16 rounded-md object-cover"
                    alt="thumb"
                  />
                  <span className="text-sm font-medium">{row.original.service}</span>
                </div>
              ),
            },
            { accessorKey: "amount", header: "Amount",cell: ({row}: any)=>{
              return(
                <div className="text-center">
                  {row.original.amount}
                </div>
              )
            } },
            { accessorKey: "time", header: "Delivery Time",cell: ({row}: any)=>{
              return(
                <div className="text-center">
                  {row.original.time}
                </div>
              )
            } },
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
                      ${statusBadgeClasses[status]}
                    `}
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
          onRowClick={(row: any) => {
            const id = row?.original?.id ?? row?.id;
            if (!id) return;
            router.push(`/editor/myproposal/${id}`);
          }}


        />
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
  );
}
