import { api } from "../../api/apiSlice";
import { ApiResponse } from "@/types/api.types";

export interface ClientStats {
  totalSpent: number;
  activeJobs: number;
  postedJobs: number;
  balance: number;
}

export interface DepositPayload {
  amount: number;
  paymentMethod: string;
  transactionId?: string;
}

export const clientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClientStats: builder.query<ApiResponse<ClientStats>, void>({
      query: () => "/client/stats",
      providesTags: ["Client"],
    }),
    depositMoney: builder.mutation<ApiResponse<{ redirectUrl?: string; transactionId?: string }>, DepositPayload>({
      query: (data) => ({
        url: "/client/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    getPaymentHistory: builder.query<ApiResponse<unknown[]>, void>({
      query: () => "/client/payments",
      providesTags: ["Client"],
    }),
  }),
});

export const {
  useGetClientStatsQuery,
  useDepositMoneyMutation,
  useGetPaymentHistoryQuery,
} = clientApi;
