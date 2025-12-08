"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import JobProposalCard from "@/components/reusable/TableCard";
import { SlidersHorizontal } from "lucide-react";

interface ProposalRow {
  id: number;
  service: string;
  amount: string;
  time: string;
  status:
  
  | "In Progress"

  | "Pending"

  | "Cancellation";
  thumbnail: string;
}

const PAGE_SIZE = 8;

const Proposal: ProposalRow[] = [
  {
    id: 1,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "In Progress",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$55",
    time: "3 Days",
    status: "Pending",
  },
  {
    id: 3,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$60",
    time: "5 Days",
    status: "Pending",
  },
  {
    id: 4,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$70",
    time: "7 Days",
    status: "In Progress",
  },
  {
    id: 5,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$80",
    time: "5 Days",
    status: "In Progress",
  },
  {
    id: 6,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$55",
    time: "3 Days",
    status: "Cancellation",
  },
  {
    id: 7,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$55",
    time: "3 Days",
    status: "Pending",
  },
  {
    id: 8,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$90",
    time: "7 Days",
    status: "Pending",
  },
];

const statusBadgeClasses: Record<ProposalRow["status"], string> = {

  "In Progress": "bg-[#EEFAE9] text-[#52C41A]",
  Cancellation: "bg-[#FEE9EA] text-[#F5222D] ",
  Pending: "bg-[#FFF7E8] text-[#FAAD14]",
};

export default function MyJob() {
  const [page, setPage] = useState(1);

  const [timeFilter, setTimeFilter] = useState<
    "ALL" | "5 Days" | "7 Days" | "3 Days"
  >("ALL");

  const [statusFilter, setStatusFilter] = useState<
    | "ALL"
    | "Accept"
    | "In Progress"
    | "Decline"
    | "Pending"
    | "In Revision"
    | "Cancellation"
  >("ALL");

  // Filtered proposals based on time + status
  const filteredData = useMemo(() => {
    return Proposal.filter((p) => {
      const timeMatch = timeFilter === "ALL" || p.time === timeFilter;
      const statusMatch = statusFilter === "ALL" || p.status === statusFilter;
      return timeMatch && statusMatch;
    });
  }, [timeFilter, statusFilter]);

  const total = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  // Action handlers (for future backend integration)
  const handleAccept = (id: number) => {
    console.log(`Proposal ${id} accepted`);
  };

  const handleInProgress = (id: number) => {
    console.log(`Proposal ${id} set to in progress`);
  };

  const handleRevision = (id: number) => {
    console.log(`Proposal ${id} in revision`);
  };

  const handlePending = (id: number) => {
    console.log(`Proposal ${id} pending`);
  };

  const handleCancellation = (id: number) => {
    console.log(`Proposal ${id} cancelled`);
  };

  const handleDecline = (id: number) => {
    console.log(`Proposal ${id} declined`);
  };

  const handleCardAction = (status: ProposalRow["status"], id: number) => {
    switch (status) {
     
      case "In Progress":
        handleInProgress(id);
        break;
   
      case "Pending":
        handlePending(id);
        break;
      case "Cancellation":
        handleCancellation(id);
        break;
    
      default:
        break;
    }
  };

  return (
    <div className="containers py-8">
      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Job Proposals
        </h2>

        {/* Filter and Buttons */}
        <div className="flex justify-between items-center mb-6 text-[18px] font-normal">
          <div className="flex gap-4">

            <button
              onClick={() => setStatusFilter("Pending")}
              className="p-2.5  hover:text-black hover:bg-[#FFFFFF] rounded-md text-[#1D1F2C]"
            >
              Pending
            </button>

            <button
              onClick={() => setStatusFilter("In Progress")}
              className="p-2.5  hover:text-black hover:bg-[#FFFFFF] rounded-md text-[#1D1F2C]"
            >
              In Progress
            </button>

            <button
              onClick={() => setStatusFilter("Cancellation")}
              className="p-2.5  hover:text-black hover:bg-[#FFFFFF] rounded-md text-[#1D1F2C]"
            >
              Cancellation
            </button>

          </div>


          <select
            className="rounded-lg p-2.5 border border-gray-300 text-sm"
            value={timeFilter}
            onChange={(e) =>
              setTimeFilter(e.target.value as "ALL" | "5 Days" | "7 Days" | "3 Days")
            }
          >
            <option value="ALL">CAST 30 DAYS</option>
            <option value="5 Days">5 Days</option>
            <option value="7 Days">7 Days</option>
            <option value="3 Days">3 Days</option>
          </select>
        </div>

        {/* TABLE */}
        <DataTable
          columns={[
            {
              accessorKey: "service",
              header: "Service",
              cell: ({ row }: any) => (
                <div className="flex items-center gap-4 cursor-pointer">
                  <div className="h-12 w-16 rounded-md overflow-hidden bg-gray-200">
                    <img
                      src={row.original.thumbnail}
                      alt={row.original.service}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {row.original.service}
                  </span>
                </div>
              ),
            },
            {
              accessorKey: "amount",
              header: "AMOUNT",
              cell: ({ row }: any) => (
                <span className="text-gray-700">{row.original.amount}</span>
              ),
            },
            {
              accessorKey: "time",
              header: "DELIVERY TIME",
              cell: ({ row }: any) => (
                <span className="text-gray-700">{row.original.time}</span>
              ),
            },
            {
              accessorKey: "status",
              header: "STATUS",
              cell: ({ row }: any) => (
                <span
                  className={`px-4 w-[178px] py-1 rounded-md text-[14px] font-medium ${statusBadgeClasses[row.original.status as ProposalRow["status"]]}`}
                >
                  {row.original.status}
                </span>
              ),
            }

          ]}
          data={paginatedData}
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={setPage}
        />
      </div>

      {/* MOBILE VIEW */}
      <div className="block md:hidden">
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-[16px] font-semibold">Job Proposals</p>
            <button className="border border-gray-300 p-3 rounded-lg flex gap-3 items-center text-sm">
              Proposals <SlidersHorizontal size={16} />
            </button>
          </div>

          {/* Mobile: cards view */}
          {paginatedData.map((proposal) => (
            <JobProposalCard
              key={proposal.id}
              image={proposal.thumbnail}
              title={proposal.service}
              total={proposal.amount}
              status={proposal.status}
              onAction={(id) => handleCardAction(proposal.status, id)}
              id={proposal.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
