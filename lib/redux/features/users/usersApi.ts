import { api } from "../../api/apiSlice";
import { ApiResponse, User } from "@/types/api.types";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<User[]>, Record<string, unknown>>({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
      providesTags: ["Users"],
    }),
    getUserDetails: builder.query<ApiResponse<User>, string>({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    updateUserProfile: builder.mutation<ApiResponse<User>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Auth", "Users", { type: "Users", id }],
    }),
    banUser: builder.mutation<ApiResponse<void>, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `/admin/users/${id}/ban`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Users"],
    }),
    suspendUser: builder.mutation<ApiResponse<void>, { id: string; duration: number; reason: string }>({
      query: ({ id, duration, reason }) => ({
        url: `/admin/users/${id}/suspend`,
        method: "POST",
        body: { duration, reason },
      }),
      invalidatesTags: ["Users"],
    }),
    unbanUser: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/admin/users/${id}/unban`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
  useBanUserMutation,
  useSuspendUserMutation,
  useUnbanUserMutation,
} = usersApi;
