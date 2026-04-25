'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MdBlock } from "react-icons/md";
import { IoMdNotificationsOff } from "react-icons/io";
import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Conversation } from '@/app/type';
import { useMessageContext } from './MessageLayout';


export default function Sidebar() {
    const { conversationDirectory, selectedConversationId, onSelectConversation } = useMessageContext();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "";
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            onSelectConversation(pathname.split("/").slice(-1)[0]);
        }
    }, [pathname])

    useEffect(() => {
        setConversations(conversationDirectory);
    }, [conversationDirectory])

    useEffect(() => {
        if (!showSearch) return;

        const handleOutsideClick = (event: MouseEvent) => {
            if (!searchContainerRef.current) return;
            if (!searchContainerRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [showSearch]);

    return (
        <div className="h-full">
            {/* Search Bar */}
            <div className='xl:hidden w-full flex items-center justify-center py-2 mb-2'>
                <button
                    type="button"
                    onClick={() => setShowSearch((prev) => !prev)}
                    aria-expanded={showSearch}
                    aria-controls="conversation-search"
                    className='p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all'
                >
                    <IoSearch className='text-xl' />
                </button>
            </div>
            <div
                ref={searchContainerRef}
                className={`mb-4 absolute xl:static top-4 bg-white z-9 p-2 xl:p-0 shadow-md xl:shadow-none rounded-lg ${showSearch ? 'block' : 'hidden'} xl:block`}
            >
                <input
                    id="conversation-search"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
            </div>

            {/* Conversations List */}
            <div className="space-y-2">
                {conversations.length > 0 ? (
                    conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => {
                                router.push(`/client/message/${conversation.id}?redirect=${redirect}`);
                                setConversations((prevConversations) =>
                                    prevConversations.map((conv) =>
                                        conv.id === conversation.id ? { ...conv, unread: false } : conv
                                    )
                                );
                                router.push(`/client/message/${conversation.id}?redirect=${redirect}`);
                            }}
                            className={`w-12 h-12 sm:w-[60px] sm:h-[60px] xl:w-full xl:h-fit flex xl:block items-center  justify-center xl:p-3 rounded-lg cursor-pointer transition-all ${(selectedConversationId) === conversation.id
                                ? 'xl:border-l-4 hover:bg-gray-100'
                                : 'hover:bg-gray-100'
                                }`}
                            style={(selectedConversationId) === conversation.id ? { borderLeftColor: '#e74c4c', backgroundColor: '#ffe6e6' } : {}}
                        >
                            <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)' }}>
                                        {conversation.avatar?.includes("http") ? conversation?.avatar : conversation?.name?.split(" ")?.map((n: string) => n[0]).join("") || "U"}
                                    </div>
                                    {/* Status Indicator */}
                                    <div
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conversation.status === 'online'
                                            ? 'bg-green-500'
                                            : 'bg-gray-400'
                                            }`}
                                    />
                                </div>

                                {/* Conversation Info */}
                                <div className="flex-1 min-w-0 hidden xl:block">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className='flex items-center gap-1'>
                                            <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                {conversation.name}
                                            </h3>
                                            <div className='flex items-center gap-px'>
                                                {conversation.isMuted && <IoMdNotificationsOff className="h-3.5 w-3.5" title="Muted" aria-label="Muted" />}
                                                {conversation.isBlocked && <MdBlock className="h-3.5 w-3.5" title="Blocked" aria-label="Blocked" />}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            {(conversation.muted || conversation.blocked || conversation.reported) && (
                                                <span className="ml-2 flex items-center text-gray-500">
                                                    {conversation.blocked ? (
                                                        <MdBlock className="h-3.5 w-3.5" title="Blocked" aria-label="Blocked" />
                                                    ) : conversation.muted ? (
                                                        <IoMdNotificationsOff className="h-3.5 w-3.5" title="Muted" aria-label="Muted" />
                                                    ) : (
                                                        <span className="text-[10px]">Reported</span>
                                                    )}
                                                </span>
                                            )}
                                            {conversation.unread && (
                                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#e74c4c' }} />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 truncate">
                                        {conversation.lastMessage}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {conversation.timestamp}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No conversations found</p>
                    </div>
                )}
            </div>
        </div>
    );
}