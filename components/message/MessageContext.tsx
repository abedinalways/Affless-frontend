"use client";

import { Conversation, Message } from "@/app/type";
import { mockMessageThreads, conversationDirectory } from "@/public/demodata";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MessageContextType = {
  messages: Message[];
  onMessageUpdate: (updatedMessage: Message) => void;
  onStatusUpdateUser: (isBlocked: boolean) => void;
  onToggleMute: (isMuted: boolean) => void;
  onDeleteConversation: (redirect: string) => void;
  conversations: Conversation[];
  activeConversation?: Conversation;
};

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(
      "useMessageContext must be used within a MessageContextProvider",
    );
  }
  return context;
};

export default function MessageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const paramas = useParams();
  const { id } = paramas;
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(
    mockMessageThreads[(id as string) || ""] || [],
  );
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationDirectory,
  );
  const [activeConversation, setActiveConversation] = useState<
    Conversation | undefined
  >(conversations.find((conv) => conv.id === id));
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const onMessageUpdate = (updatedMessage: Message) => {
    console.log("Updating message:", updatedMessage);
    setMessages((prev) => [...prev, updatedMessage]);
  };

  useEffect(() => {
    const threadId = (id as string) || "";
    setActiveConversation(conversations.find((conv) => conv.id === threadId));
    console.log("Active conversation set to:", id);
    const newMessages = mockMessageThreads[threadId] || [];
    setMessages(newMessages);
  }, [id]);

  const onStatusUpdateUser = (isBlocked: boolean) => {
    // console.log("Updating block status:", isBlocked);
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, isBlocked: isBlocked } : conv,
      ),
    );
    // console.log("Updated conversations:", conversations);
    setActiveConversation((prev) =>
      prev ? { ...prev, isBlocked: isBlocked } : undefined,
    );
  };

  const onToggleMute = (isMuted: boolean) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, isMuted: isMuted } : conv,
      ),
    );
    setActiveConversation((prev) =>
      prev ? { ...prev, isMuted: isMuted } : undefined,
    );
  };

  const onDeleteConversation = (redirect: string) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, deleted: true } : conv)),
    );
    setActiveConversation(
      conversations?.find((conv) => conv?.id !== id && !conv?.deleted),
    );
    if (conversations?.find((conv) => conv?.id !== id && !conv?.deleted)) {
      router.push(
        `${redirect}/${conversations?.find((conv) => conv?.id !== id && !conv?.deleted)?.id}${redirectUrl ? `?redirect=${redirectUrl}` : ''}`,
      );
    } else {
      router.push(redirect);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        onMessageUpdate,
        onStatusUpdateUser,
        onToggleMute,
        onDeleteConversation,
        conversations,
        activeConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
