export const JOB_STATUS_DEFINITIONS = {
  pending: {
    label: "Pending",
    colorClass: "bg-[#FACC15] text-black",
    description: "Job posted, awaiting action",
  },
  in_progress: {
    label: "In Progress",
    colorClass: "bg-[#00648A] text-white",
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
  cancelled: {
    label: "Cancelled",
    colorClass: "bg-[#FF4D4F] text-white",
    description: "Job cancelled by either party",
  },
  late: {
    label: "Late",
    colorClass: "bg-[#991B1B] text-white",
    description: "Work is past the deadline",
  },
} as const;

export type JobStatus = keyof typeof JOB_STATUS_DEFINITIONS;

export const getJobStatusDefinition = (status: JobStatus) =>
  JOB_STATUS_DEFINITIONS[status];
