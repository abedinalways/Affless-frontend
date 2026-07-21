"use client";

import { useState, useCallback } from "react";
import { useGetConversationsQuery, useGetMessagesQuery, useSendMessageMutation } from "@/lib/redux/features/messages/messagesApi";
import { Conversation, Message } from "@/types/message.types";
import toast from "react-hot-toast";

export const useMessages = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null);

  const { data: conversationsData, isLoading: isLoadingConversations, refetch: refetchConversations } = useGetConversationsQuery();
  const { data: messagesData, isLoading: isLoadingMessages, refetch: refetchMessages } = useGetMessagesQuery(
    selectedConversationId!,
    { skip: !selectedConversationId },
  );

  const [sendMessageMutation] = useSendMessageMutation();

  const conversations = conversationsData?.data || [];
  const messages = messagesData?.data || [];

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedConversationId(id);
  }, []);

  const handleSendMessage = useCallback(
    async (conversationId: string, content: string, attachments?: string[]) => {
      try {
        await sendMessageMutation({ conversationId, content, attachments }).unwrap();
        toast.success("Message sent successfully");
        refetchMessages();
      } catch (err) {
        toast.error("Failed to send message");
      }
    },
    [sendMessageMutation, refetchMessages]
  );

  const handleBlockUser = useCallback((userId: string) => {
    // Block user logic
  }, []);

  const handleMuteConversation = useCallback((conversationId: string) => {
    // Mute conversation logic
  }, []);

  return {
    conversations,
    messages,
    selectedConversationId,
    isLoadingConversations,
    isLoadingMessages,
    handleSelectConversation,
    handleSendMessage,
    handleBlockUser,
    handleMuteConversation,
    refetchConversations,
    refetchMessages,
  };
};
