'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MdBlock } from "react-icons/md";
import { IoMdNotificationsOff } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

interface Conversation {
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
}

const mockConversations: Conversation[] = [
    {
        id: '1',
        name: 'John Designer',
        avatar: 'JD',
        lastMessage: 'That looks great! Can you adjust...',
        timestamp: '2 min ago',
        unread: false,
        status: 'online',
    },
    {
        id: '2',
        name: 'Sarah Editor',
        avatar: 'SE',
        lastMessage: 'Delivered the final version',
        timestamp: '1 hour ago',
        unread: false,
        status: 'offline',
    },
    {
        id: '3',
        name: 'Mike Graphic',
        avatar: 'MG',
        lastMessage: 'When can you start?',
        timestamp: '3 hours ago',
        unread: true,
        status: 'online',
    },
    {
        id: '4',
        name: 'Emma Video',
        avatar: 'EV',
        lastMessage: 'Thank you for the quick turnaround',
        timestamp: 'Yesterday',
        unread: false,
        status: 'offline',
    },
];

type SidebarProps = {
    selectedConversationId?: string;
    onSelectConversation?: (id: string) => void;
};

type ConversationState = Record<string, { muted?: boolean; blocked?: boolean; reported?: boolean; deleted?: boolean }>;

const getConversationState = (): ConversationState => {
    if (typeof window === 'undefined') return {};
    try {
        const raw = window.localStorage.getItem('conversationState');
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

const applyConversationState = (base: Conversation[], state: ConversationState) =>
    base
        .map((conv) => ({
            ...conv,
            ...state[conv.id],
        }))
        .filter((conv) => !conv.deleted);

export default function Sidebar({ selectedConversationId, onSelectConversation }: SidebarProps) {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedId, setSelectedId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement | null>(null);
    const searchParams = useSearchParams();
    const searchId = searchParams.get('id') || '';

    useEffect(() => {
        const syncConversations = () => {
            setConversations(applyConversationState(mockConversations, getConversationState()));
        };

        syncConversations();

        const handleUpdate = () => syncConversations();
        window.addEventListener('conversation:update', handleUpdate as EventListener);
        window.addEventListener('storage', handleUpdate);
        return () => {
            window.removeEventListener('conversation:update', handleUpdate as EventListener);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    useEffect(() => {
        if (selectedConversationId) {
            setSelectedId(selectedConversationId);
        }
    }, [selectedConversationId]);

    useEffect(() => {
        if (searchId) {
            setSelectedId(searchId);
            onSelectConversation?.(searchId);
        }
    }, [searchId, onSelectConversation]);

    useEffect(() => {
        if (!selectedConversationId && !searchId && conversations.length > 0) {
            const latestId = conversations[0].id;
            setSelectedId(latestId);
            onSelectConversation?.(latestId);
        }
    }, [selectedConversationId, searchId, conversations, onSelectConversation]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedQuery(searchQuery.trim());
        }, 300);

        return () => window.clearTimeout(timer);
    }, [searchQuery]);

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

    const filteredConversations = conversations.filter((conv) =>
        conv.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Search Bar */}
            <div className='xl:hidden w-full flex items-center justify-center py-2 mb-2'>
                <button
                    type="button"
                    onClick={() => setShowSearch((prev) => !prev)}
                    aria-expanded={showSearch}
                    aria-controls="conversation-search"
                    className='p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all'
                >
                    <IoSearch className='text-xl'/>
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
            <div className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => {
                                setSelectedId(conversation.id);
                                onSelectConversation && onSelectConversation(conversation.id);
                            }}
                            className={`w-12 h-12 sm:w-[60px] sm:h-[60px] xl:w-full xl:h-fit flex xl:block items-center  justify-center xl:p-3 rounded-lg cursor-pointer transition-all ${(selectedConversationId || searchId || selectedId) === conversation.id
                                ? 'xl:border-l-4 hover:bg-gray-100'
                                : 'hover:bg-gray-100'
                                }`}
                            style={(selectedConversationId || searchId || selectedId) === conversation.id ? { borderLeftColor: '#e74c4c', backgroundColor: '#ffe6e6' } : {}}
                        >
                            <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)' }}>
                                        {conversation.avatar}
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
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                                            {conversation.name}
                                        </h3>
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