import { api } from "../../api/apiSlice";
import { User, ApiResponse } from "@/types/api.types";

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; type: "CLIENT" | "EDITOR"; }
export interface VerifyEmailPayload { email: string; token: string; }

/** The actual login response from the backend */
export interface LoginResponse {
  success: boolean;
  message: string;
  authorization: {
    type: "bearer";
    access_token: string;
    refresh_token: string;
  };
  type: "CLIENT" | "EDITOR" | "ADMIN";
}

/** The actual refresh response from the backend (inferred similar structure) */
export interface RefreshResponse {
  success: boolean;
  message: string;
  authorization: {
    type: "bearer";
    access_token: string;
    refresh_token: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      LoginPayload
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<
      ApiResponse<{ message: string }>,
      RegisterPayload
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
          type: data.type,
        },
      }),
    }),
    verifyEmail: builder.mutation<
      ApiResponse<{ message: string }>,
      VerifyEmailPayload
    >({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
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
    verifyOTP: builder.mutation<ApiResponse<{ token: string }>, { email: string; token: string }>({
      query: (data) => ({
        url: "/auth/verify-token",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<void>, { email: string; token: string; password: string }>({
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
  useVerifyEmailMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApi;