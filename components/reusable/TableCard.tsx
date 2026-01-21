"use client";

import React from "react";
import Image from "next/image";

interface JobProposalCardProps {
  image: string;
  title: string;
  total: string;
  status: "in_progress" | "pending" | "in_revision" | "late" | "delivered" | "completed" | "cancelled";
  id: string;

  // ✅ old behavior (keep)
  onAction: (id: string) => void;

  // ✅ new (optional) - only use where you need navigation
  onOpen?: (id: string) => void;
}

const statusColors: Record<JobProposalCardProps["status"], string> = {
  in_progress: "bg-green-500 text-white",
  delivered: "bg-[#EEFAE9] text-[#52C41A]",
  completed: "bg-[#EEFAE9] text-[#52C41A]",
  in_revision: "bg-red-500 text-white",
  late: "bg-[#FDD3D5] text-[#F5222D]",
  cancelled: "bg-[#FEE9EA] text-[#F5222D]",
  pending: "bg-[#FFF7E8] text-[#FAAD14]",
};

const JobProposalCard: React.FC<JobProposalCardProps> = ({
  image,
  title,
  total,
  status,
  onAction,
  onOpen,
  id,
}) => {
  // ✅ Card click: if onOpen exists -> navigate, else fallback to old onAction
  const handleCardClick = () => {
    if (onOpen) return onOpen(id);
    return onAction(id);
  };

  return (
    <div
      className="bg-white rounded-xl p-5 shadow-sm justify-between cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt="Job Proposal"
          width={100}
          height={100}
          className="rounded-lg object-cover w-[100px] h-20"
        />
        <div>
          <p className="text-[16px] font-medium text-[#333]">{title}</p>
        </div>
      </div>

      <div className="flex justify-between pt-7">
        <p className="text-sm text-gray-500">Total: {total}</p>

        {/* ✅ Button click: must NOT trigger card click */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // ✅ fixes double-call bug everywhere
            onAction(id);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${statusColors[status]}`}
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default JobProposalCard;
