// Job type is defined in jobsApi.ts - re-export for convenience
export type { Job } from "@/lib/redux/features/jobs/jobsApi";

export interface Proposal {
  id: string;
  jobId: string;
  editorId: string;
  amount: number;
  deliveryTime: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface ReviewType {
  id: string;
  jobId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
