"use client";

import React from "react";
import Image from "next/image";

interface JobProposalCardProps {
  image: string;
  title: string;
  total: string;
  status:
    | "Accept"
    | "Progress"
    | "In Revision"
    | "Decline"
    | "Pending"
    | "Cancellation";
  onAction: (id: number) => void;
  id: number;
}

const statusColors: Record<JobProposalCardProps["status"], string> = {
  Accept: "bg-green-500 text-white",
  "Progress": "bg-[#EEFAE9] text-[#52C41A]",
  "In Revision": "bg-yellow-400 text-black",
  Decline: "bg-[#FDD3D5] text-[#F5222D] ",
  Cancellation: "bg-[#FEE9EA] text-[#F5222D] ",
  Pending: "bg-[#FFF7E8] text-[#FAAD14]",
};

const JobProposalCard: React.FC<JobProposalCardProps> = ({
  image,
  title,
  total,
  status,
  onAction,
  id,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt="Job Proposal"
          width={100}
          height={100}
          className="rounded-lg object-cover w-[100px] h-[80px]"
        />
        <div>
          <p className="text-[16px] font-medium text-[#333]">{title}</p>
        </div>
      </div>

      <div className="flex justify-between pt-7">
        <p className="text-sm text-gray-500">Total: {total}</p>

        <button
          onClick={() => onAction(id)}
          className={`px-4 py-2  rounded-lg text-sm font-medium ${statusColors[status]}`}
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default JobProposalCard;
