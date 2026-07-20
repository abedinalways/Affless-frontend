import { api } from "../../api/apiSlice";
import { User, ApiResponse } from "@/types/api.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
      Record<string, unknown>
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<
      ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
      Record<string, unknown>
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation<ApiResponse<void>, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation<ApiResponse<{ token: string }>, { email: string; otp: string }>({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<void>, Record<string, unknown>>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApi;
