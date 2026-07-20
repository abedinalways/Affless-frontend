import { api } from "../../api/apiSlice";
import { ApiResponse } from "@/types/api.types";

export interface EditorStats {
  totalJobs: number;
  completedJobs: number;
  inProgressJobs: number;
  earnings: number;
  rating: number;
}

export interface AvailabilitySlot {
  day: string;
  slots: { start: string; end: string }[];
}

export const editorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEditorStats: builder.query<ApiResponse<EditorStats>, void>({
      query: () => "/editor/stats",
      providesTags: ["Editor"],
    }),
    getAvailability: builder.query<ApiResponse<AvailabilitySlot[]>, void>({
      query: () => "/editor/availability",
      providesTags: ["Editor"],
    }),
    updateAvailability: builder.mutation<ApiResponse<void>, AvailabilitySlot[]>({
      query: (data) => ({
        url: "/editor/availability",
        method: "PUT",
        body: { availability: data },
      }),
      invalidatesTags: ["Editor"],
    }),
    withdrawEarnings: builder.mutation<ApiResponse<void>, { amount: number; paymentMethod: string }>({
      query: (data) => ({
        url: "/editor/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Editor"],
    }),
  }),
});

export const {
  useGetEditorStatsQuery,
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useWithdrawEarningsMutation,
} = editorApi;
