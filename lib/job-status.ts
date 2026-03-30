export const JOB_STATUS_DEFINITIONS = {
  "in_progress": {
    label: "In Progress",
    colorClass: "bg-[#E3F2FF] text-[#1677FF]",
    description: "Work has started.",
  },
  in_revision: {
    label: "In Revision",
    colorClass: "bg-[#F3E8FF] text-[#7C3AED]",
    description: "Work is in revision.",
  },
  delivered: {
    label: "Delivered",
    colorClass: "bg-[#DCFCE7] text-[#16A34A]",
    description: "Work submitted by editor.",
  },
  completed: {
    label: "Completed",
    colorClass: "bg-green-300 text-green-900",
    description: "Client accepted delivery.",
  },
  cancelled: {
    label: "Cancelled",
    colorClass: "bg-red-100 text-red-600",
    description: "Job cancelled by either party.",
  },
  late: {
    label: "Late",
    colorClass: "bg-red-300 text-red-900",
    description: "Work is past the deadline.",
  },
  pending:{
    label: "Pending",
    colorClass: "bg-[#FFF7E8] text-[#FAAD14]",
    description: "Job posted, awaiting action.",
  }
} as const;

export type JobStatus = keyof typeof JOB_STATUS_DEFINITIONS;

export const getJobStatusDefinition = (status: JobStatus) =>
  JOB_STATUS_DEFINITIONS[status];
