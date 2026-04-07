"use client";

import { JOB_STATUS_DEFINITIONS } from "@/lib/job-status";
import React from "react";
import Image from "next/image";

interface JobProposalCardProps {
  image: string;
  title: string;
  total: number;
  status: "in_progress" | "in_revision" | "late" | "delivered" | "completed" | "canceled" | "pending";
  id: string;
  timeLeft: number; // New prop for hours/days left

  // ✅ old behavior (keep)
  onAction: (id: string) => void;

  // ✅ new (optional) - only use where you need navigation
  onOpen?: (id: string) => void;
}

const JobProposalCard: React.FC<JobProposalCardProps> = ({
  image,
  title,
  total,
  status,
  timeLeft,
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

      <div className="flex flex-col items-center pt-7 gap-3">
        <p className="text-sm font-medium">Total: ${total.toFixed(2)}</p>
        <div className="flex flex-col items-center gap-5">
          <p className="text-xs text-end">Awaiting Client Acceptance for {timeLeft} Hours</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction(id);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${JOB_STATUS_DEFINITIONS[status].colorClass}`}
          >
            {JOB_STATUS_DEFINITIONS[status].label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobProposalCard;
