// JobProposalPage.tsx
"use client";
import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/DataTable"; // Assuming you've implemented a DataTable component
import { useRouter } from "next/navigation";
import JobProposalCard from "@/components/reusable/TableCard";
import { SlidersHorizontal } from "lucide-react";

interface ProposalRow {
  id: number;
  service: string;
  amount: string;
  time: string;
  status: string;
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
    status: "Accept",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$55",
    time: "3 Days",
    status: "Accept",
  },
    {
    id: 1,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$55",
    time: "3 Days",
    status: "Accept",
  },
    {
    id: 1,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks for your website's SEO.",
    amount: "$55",
    time: "5 Days",
    status: "Accept",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks to improve your rankings.",
    amount: "$55",
    time: "3 Days",
    status: "Accept",
  },

];

export default function JobProposalPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState<"ALL" | "5 Days" | "7 Days" | "3 Days">("ALL");

  const filteredData = useMemo(() => {
    if (timeFilter === "ALL") return Proposal;
    return Proposal.filter((p) => p.time === timeFilter);
  }, [timeFilter]);

  const total = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  const handleAccept = (id: number) => {
    console.log(`Proposal ${id} accepted`);
  };

  const columns = [
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
          <span className="text-sm font-medium text-gray-800">{row.original.service}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "AMOUNT",
      cell: ({ row }: any) => <span className="text-gray-700">{row.original.amount}</span>,
    },
    {
      accessorKey: "time",
      header: "DELIVERY TIME",
      cell: ({ row }: any) => <span className="text-gray-700">{row.original.time}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }: any) => (
        <span className="px-4 py-1 rounded-md text-[18px] font-normal uppercase text-white bg-green-600 cursor-pointer">
          {row.original.status}
        </span>
      ),
    },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "ALL" | "5 Days" | "7 Days" | "3 Days";
    setTimeFilter(value);
    setPage(1);
  };

  return (
    <div className="containers py-8">
     <div className="hidden md:block">
       <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Proposals</h2>

      {/* Filter and Buttons */}
      <div className="flex justify-between items-center mb-6 text-[18px] font-normal">
        <div className="flex gap-4">
          <button className="p-2.5 hover:bg-[#FF4D4F] hover:text-white bg-[#FFEDED] rounded-md text-[#FF4D4F]">
            Proposals
          </button>
          <button className="p-2.5 hover:text-white hover:bg-[#FF4D4F] bg-[#FFEDED] rounded-md text-[#FF4D4F]">
            Declined
          </button>
        </div>

        <select
          className="rounded-lg p-2.5 border border-gray-300 text-sm"
          value={timeFilter}
          onChange={handleFilterChange}
        >
          <option value="ALL">ALL</option>
          <option value="5 Days">5 Days</option>
          <option value="7 Days">7 Days</option>
          <option value="3 Days">3 Days</option>
        </select>
      </div>

      {/* TABLE or CARD DISPLAY */}
     

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={setPage}
        onRowClick={(row) => router.push(`/client/job-details?id=${row.id}`)}
      />
     </div>

      <div className="block md:hidden">
         <div className=" space-y-3 ">
          <div className="flex justify-between"><p>Job Proposals</p>
          <button className="border border-gray-300 p-3 rounded-lg flex gap-3">Proposals <SlidersHorizontal /></button>
          </div>
        {paginatedData.map((proposal) => (
         
          <JobProposalCard
            key={proposal.id}
            image={proposal.thumbnail}
            title={proposal.service}
            total={proposal.amount}
            onAccept={() => handleAccept(proposal.id)}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
