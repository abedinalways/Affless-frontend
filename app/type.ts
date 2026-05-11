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
  deleted?: boolean;
  country?: string;
  memberSince?: string;
  isMuted?: boolean;
  isBlocked?: boolean;
}


export type MessageContextType = {
  conversationDirectory: Conversation[];
  deleteConversation: (id: string) => void;
  selectedConversationId: string;
  onSelectConversation: (id: string) => void;
  onBlockConversation: (id: string) => void;
  onMuteConversation: (id: string) => void;
  onReportConversation: () => void;
}


export type EditorJobProposalType = {
  id: number;
  job: {
    title: string;
    imageUrl: string;
  },
  amount: number;
  timeLeft: number;
  status: "pending" | "canceled";
}


export type InboxItem = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string; // image path
  online?: boolean;
  href?: string;
  isRead: boolean;
};