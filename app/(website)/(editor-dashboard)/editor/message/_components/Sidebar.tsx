'use client';

import { useState } from 'react';

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    status: 'online' | 'offline';
}

const mockConversations: Conversation[] = [
    {
        id: '1',
        name: 'John Designer',
        avatar: 'JD',
        lastMessage: 'That looks great! Can you adjust...',
        timestamp: '2 min ago',
        unread: true,
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

export default function Sidebar({ selectedConversationId, onSelectConversation }: SidebarProps) {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedId, setSelectedId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full h-full">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search conversations..."
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
                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedId === conversation.id
                                ? 'border-l-4 hover:bg-gray-100'
                                : 'hover:bg-gray-100'
                                }`}
                            style={selectedId === conversation.id ? { borderLeftColor: '#e74c4c', backgroundColor: '#ffe6e6' } : {}}
                        >
                            <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)' }}>
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
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                                            {conversation.name}
                                        </h3>
                                        {conversation.unread && (
                                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#e74c4c' }} />
                                        )}
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