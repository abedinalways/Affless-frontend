import { api } from "../../api/apiSlice";
import { ApiResponse } from "@/types/api.types";
import { Conversation, Message } from "@/app/type";

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<ApiResponse<Conversation[]>, void>({
      query: () => "/messages/conversations",
      providesTags: ["Messages"],
    }),
    getMessages: builder.query<ApiResponse<Message[]>, string>({
      query: (conversationId) => `/messages/conversations/${conversationId}`,
      providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),
    sendMessage: builder.mutation<ApiResponse<Message>, { conversationId: string; content: string; attachments?: string[] }>({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { conversationId }) => ["Messages", { type: "Messages", id: conversationId }],
    }),
    blockUser: builder.mutation<ApiResponse<void>, string>({
      query: (userId) => ({
        url: `/users/${userId}/block`,
        method: "POST",
      }),
      invalidatesTags: ["Messages"],
    }),
    muteConversation: builder.mutation<ApiResponse<void>, string>({
      query: (conversationId) => ({
        url: `/messages/conversations/${conversationId}/mute`,
        method: "POST",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useBlockUserMutation,
  useMuteConversationMutation,
} = messagesApi;
