import { api } from "../../api/apiSlice";
import { ApiResponse } from "@/types/api.types";

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  platform: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered' | 'canceled' | 'late' | 'in_revision';
  created_at: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  editor?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<ApiResponse<Job[]>, Record<string, unknown>>({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getJobDetails: builder.query<ApiResponse<Job>, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    postJob: builder.mutation<ApiResponse<Job>, Record<string, unknown>>({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation<ApiResponse<Job>, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Jobs", { type: "Jobs", id }],
    }),
    deleteJob: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobDetailsQuery,
  usePostJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
