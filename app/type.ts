export type ExposureTier = {
  label: string;
  exposure: string;
  quickMatch: string;
  zone: "benefit" | "neutral" | "penalty";
  minHours: number;
  maxHours: number;
};

type OrderStatus = "pending" | "in_progress" | "canceled" | "completed" | "delivered" | "late" | "in_revision";

export type Order = {
  id: number;
  title: string;
  price: number;
  days?: number;
  status: OrderStatus;
  img: string;
}

export type AttachmentItem = {
    id: string;
    file?: File;
    url: string;
    type: 'file' | 'link';
    name?: string;
};
export interface Message {
    id: string;
    sender: 'user' | 'other';
    content: string;
    createdAt: string;
    deliveredAt?: string;
    readAt?: string;
    attachments?: AttachmentItem[];
}

export interface ClientQuickMatchResult {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  hireRate?: number;
  jobsPosted?: number;
  editorsWorkedWith?: number;
  match: number;
  image: string;
}

export interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    status: 'online' | 'offline';
    muted?: boolean;
    blocked?: boolean;
    reported?: boolean;
    deleted?: boolean;
    country?: string;
    memberSince?: string;
}


export type MessageContextType = {
    conversationDirectory: Conversation[];
    deleteConversation: (id: string) => void;
    selectedConversationId: string;
    onSelectConversation: (id: string) => void;
}