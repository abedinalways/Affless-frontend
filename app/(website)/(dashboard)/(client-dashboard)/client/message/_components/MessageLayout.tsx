"use client"

import Sidebar from "./Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { getRouteConfig, getRouteHref } from "@/helper/routes";
import { FaArrowLeft } from "react-icons/fa";
import { conversationDirectory } from "@/public/demodata";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MessageContextType } from "@/app/type";


const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }
    return context;
};


// Create a provider component
export function MessageProvider({ children }: { children: ReactNode }) {
    const [allConversationDirectory, setAllConversationDirectory] = useState(conversationDirectory);
    const [selectedConversationId, setSelectedConversationId] = useState<string>("");

    const value: MessageContextType = {
        conversationDirectory: allConversationDirectory,
        deleteConversation: (id: string) => {
            setAllConversationDirectory((prev) => prev.filter((conv) => conv.id !== id));
        },
        selectedConversationId: selectedConversationId,
        onSelectConversation: (id: string) => {
            setSelectedConversationId(id);
            setAllConversationDirectory((prevConversations) =>
                prevConversations.map((conv) =>
                    conv.id === id ? { ...conv, unread: false } : conv
                )
            );
        },
        onBlockConversation: (id: string) => {
            setAllConversationDirectory((prev) =>
                prev.map((conv) =>
                    conv.id === id ? { ...conv, isBlocked: !conv.isBlocked || true } : conv
                )
            );
        },
        onMuteConversation: (id: string) => {
            setAllConversationDirectory((prev) =>
                prev.map((conv) =>
                    conv.id === id ? { ...conv, isMuted: !conv.isMuted || true } : conv
                )
            );
        },
        onReportConversation: () => {
            // setAllConversationDirectory((prev) =>
            //     prev.map((conv) =>
            //         conv.id === selectedConversationId ? { ...conv, reported: !conv.reported || true } : conv
            //     )
            // );
        }
    };

    useEffect(()=>{
        console.log("Conversation directory updated:", allConversationDirectory);
    },[allConversationDirectory])

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
}

export default function MessageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "";
    const redirectKeys = redirectUrl.split("_").filter(Boolean);
    const lastRedirectKey = redirectKeys[redirectKeys.length - 1];
    const redirectRoute = getRouteConfig(lastRedirectKey);
    const redirectHref = lastRedirectKey ? getRouteHref(lastRedirectKey) : "";
    const previousRedirect = redirectKeys.slice(0, -1).join("_");
    const router = useRouter();

    return (
        <MessageProvider>
            <div className={`w-full border min-h-0 p-4 containers bg-[#f9f9f9] grid ${redirectUrl ? "grid-rows-[auto_1fr]" : "grid-rows-1"} gap-4`}>
                <div className={`${redirectUrl ? "flex" : "hidden"} items-center gap-4`}>
                    {redirectUrl && (
                        <button
                            type="button"
                            onClick={() => {
                                if (!redirectHref) {
                                    return;
                                }

                                const nextHref = previousRedirect
                                    ? `${redirectHref}?redirect=${previousRedirect}`
                                    : redirectHref;

                                router.push(nextHref);
                            }}
                            className="w-fit flex items-center gap-2 font-medium bg-[#FF4D4F] text-white px-4 py-1 rounded-lg cursor-pointer"
                        >
                            <FaArrowLeft /> <span>Back to {redirectRoute?.label?.toString()}</span>
                        </button>
                    )}
                </div>
                <div className="w-full h-full min-h-0 grid grid-cols-1 gap-6 relative overflow-hidden">
                    <div className="w-full h-full min-h-0 grid grid-cols-[auto_1fr]">
                        <div className={`p-2 sm:p-4 bg-white w-fit max-w-[290px] h-full min-h-0 rounded-lg overflow-y-auto xl:w-full`} style={{
                            height: 'calc(100vh - 147px)'
                        }}>
                            <Sidebar />
                        </div>
                        <div className="h-full min-h-0 w-full">{children}</div>
                    </div>
                </div>
            </div>
        </MessageProvider>
    );
}