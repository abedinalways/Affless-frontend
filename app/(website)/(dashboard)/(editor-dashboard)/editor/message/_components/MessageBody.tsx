'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ReportUserModal from '@/components/reusable/ReportUserModal';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import { MdBlock } from "react-icons/md";
import { IoMdNotificationsOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

interface Message {
    id: string;
    sender: 'user' | 'other';
    content: string;
    createdAt: string;
    deliveredAt?: string;
    readAt?: string;
}

const mockConversations = [
    { id: '1', name: 'John Designer', status: 'online', profileId: 'john_designer' },
    { id: '2', name: 'Sarah Editor', status: 'offline', profileId: 'sarah_editor' },
    { id: '3', name: 'Mike Graphic', status: 'online', profileId: 'mike_graphic' },
    { id: '4', name: 'Emma Video', status: 'offline', profileId: 'emma_video' },
];

const mockMessageThreads: Record<string, Message[]> = {
    '1': [
        {
            id: '1',
            sender: 'other',
            content: 'Hey! I saw your project post. Are you still looking for an editor?',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        },
        {
            id: '2',
            sender: 'user',
            content: 'Yes! I need someone to edit a 30-minute video. Are you interested?',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            deliveredAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            readAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        },
        {
            id: '3',
            sender: 'other',
            content: 'Absolutely! I have experience with similar projects. Can you share more details?',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        },
        {
            id: '4',
            sender: 'user',
            content: 'Great! The video is about travel vlogging. I need color correction, sound mixing, and transitions.',
            createdAt: new Date().toISOString(),
            deliveredAt: new Date().toISOString(),
        },
        {
            id: '5',
            sender: 'other',
            content: 'That looks great! Can you adjust the intro to match the new branding?',
            createdAt: new Date().toISOString(),
        },
    ],
    '2': [
        {
            id: '1',
            sender: 'other',
            content: 'Delivered the final version. Please review when you can.',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        },
        {
            id: '2',
            sender: 'user',
            content: 'Looks solid. Can you export a 1080p version as well?',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            deliveredAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        },
        {
            id: '3',
            sender: 'other',
            content: 'Sure, I will upload it tonight.',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        },
    ],
    '3': [
        {
            id: '1',
            sender: 'other',
            content: 'When can you start on the graphics package?',
            createdAt: new Date(new Date().setHours(new Date().getHours() - 6)).toISOString(),
        },
        {
            id: '2',
            sender: 'user',
            content: 'I can start today. Do you have a brand guide?',
            createdAt: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString(),
            deliveredAt: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString(),
        },
    ],
    '4': [
        {
            id: '1',
            sender: 'other',
            content: 'Thank you for the quick turnaround!',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        },
        {
            id: '2',
            sender: 'user',
            content: 'Happy to help. Let me know if you need revisions.',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            deliveredAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            readAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        },
    ],
};

type MessageBodyProps = {
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

export default function MessageBody({ selectedConversationId, onSelectConversation }: MessageBodyProps) {
    const [conversationMessages, setConversationMessages] = useState<Record<string, Message[]>>(mockMessageThreads);
    const [conversationState, setConversationState] = useState<ConversationState>({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<'mute' | 'block' | 'unblock' | 'delete' | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const prevMessageCount = useRef(0);
    const [soundsEnabled] = useState(true);
    const searchId = searchParams.get('id') || '';
    const availableConversations = mockConversations.filter((conv) => !conversationState[conv.id]?.deleted);
    const activeConversationId = selectedConversationId || searchId || '';
    const activeConversation = availableConversations.find((conv) => conv.id === activeConversationId);
    const activeConversationMeta = conversationState[activeConversationId] || {};
    const otherUserId = activeConversation?.profileId || activeConversationId || '1';
    const isConversationOpen = Boolean(activeConversationId);
    const messages = conversationMessages[activeConversationId] || [];

    const persistConversationState = (nextState: ConversationState) => {
        setConversationState(nextState);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('conversationState', JSON.stringify(nextState));
            window.dispatchEvent(new CustomEvent('conversation:update'));
        }
    };

    useEffect(() => {
        setConversationState(getConversationState());
        const handleUpdate = () => setConversationState(getConversationState());
        window.addEventListener('conversation:update', handleUpdate as EventListener);
        window.addEventListener('storage', handleUpdate);
        return () => {
            window.removeEventListener('conversation:update', handleUpdate as EventListener);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    useEffect(() => {
        if (!selectedConversationId && !searchId && availableConversations.length > 0) {
            onSelectConversation?.(availableConversations[0].id);
        }
    }, [selectedConversationId, searchId, availableConversations, onSelectConversation]);

    useEffect(() => {
        if (activeConversationId && !activeConversation && availableConversations.length > 0) {
            onSelectConversation?.(availableConversations[0].id);
        }
    }, [activeConversationId, activeConversation, availableConversations, onSelectConversation]);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const getDayLabel = (date: Date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (isSameDay(date, today)) return 'Today';
        if (isSameDay(date, yesterday)) return 'Yesterday';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const playNotificationSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            oscillator.onended = () => audioContext.close();
        } catch (error) {
            console.error('Unable to play notification sound', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !activeConversationId || activeConversationMeta.blocked || activeConversationMeta.deleted) return;

        const newMessage: Message = {
            id: String(messages.length + 1),
            sender: 'user',
            content: inputValue,
            createdAt: new Date().toISOString(),
        };

        setConversationMessages((prev) => ({
            ...prev,
            [activeConversationId]: [...messages, newMessage],
        }));
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const performMenuAction = (action: 'mute' | 'block' | 'unblock' | 'report' | 'delete') => {
        console.log(`Menu action: ${action}`);
        switch (action) {
            case 'mute':
                persistConversationState({
                    ...conversationState,
                    [activeConversationId]: {
                        ...conversationState[activeConversationId],
                        muted: !conversationState[activeConversationId]?.muted,
                    },
                });
                break;
            case 'block':
                persistConversationState({
                    ...conversationState,
                    [activeConversationId]: {
                        ...conversationState[activeConversationId],
                        blocked: true,
                    },
                });
                break;
            case 'unblock':
                persistConversationState({
                    ...conversationState,
                    [activeConversationId]: {
                        ...conversationState[activeConversationId],
                        blocked: false,
                    },
                });
                break;
            case 'report':
                persistConversationState({
                    ...conversationState,
                    [activeConversationId]: {
                        ...conversationState[activeConversationId],
                        reported: true,
                    },
                });
                break;
            case 'delete':
                persistConversationState({
                    ...conversationState,
                    [activeConversationId]: {
                        ...conversationState[activeConversationId],
                        deleted: true,
                    },
                });
                setConversationMessages((prev) => {
                    const { [activeConversationId]: _removed, ...rest } = prev;
                    return rest;
                });
                if (availableConversations.length > 0) {
                    const nextConversation = availableConversations.find((conv) => conv.id !== activeConversationId);
                    onSelectConversation?.(nextConversation?.id || '');
                } else {
                    onSelectConversation?.('');
                }
                break;
            default:
                break;
        }
        setIsMenuOpen(false);
    };

    const handleMenuAction = (action: 'mute' | 'block' | 'report' | 'delete') => {
        if (!activeConversationId) return;

        if (action === 'report') {
            setIsReportModalOpen(true);
            setIsMenuOpen(false);
            return;
        }

        if (action === 'block' && activeConversationMeta.blocked) {
            setPendingAction('unblock');
        } else {
            setPendingAction(action);
        }
        setIsConfirmOpen(true);
        setIsMenuOpen(false);
    };

    const handleReportUser = async(reportData: any) => {
        if (!activeConversationId) return;
        performMenuAction('report');
        setIsReportModalOpen(false);
    };

    const handleConfirmAction = () => {
        if (!pendingAction) return;
        performMenuAction(pendingAction);
        setPendingAction(null);
        setIsConfirmOpen(false);
    };

    const isMuted = Boolean(activeConversationMeta.muted);
    const confirmTitle = pendingAction === 'mute'
        ? (isMuted ? 'Unmute Conversation' : 'Mute Conversation')
        : pendingAction === 'block'
            ? 'Block User'
            : pendingAction === 'unblock'
                ? 'Unblock User'
            : 'Delete Conversation';

    const confirmDescription = pendingAction === 'mute'
        ? (isMuted
            ? 'Are you sure you want to unmute this conversation?'
            : 'Are you sure you want to mute this conversation? You can unmute it later.')
        : pendingAction === 'block'
            ? 'Are you sure you want to block this user? You will not receive messages from them.'
            : pendingAction === 'unblock'
                ? 'Are you sure you want to unblock this user?'
            : 'Are you sure you want to delete this conversation? This action cannot be undone.';

    useEffect(() => {
        if (!activeConversationId) {
            prevMessageCount.current = 0;
            return;
        }

        const lastMessage = messages[messages.length - 1];
        const hasNewMessage = messages.length > prevMessageCount.current;

        if (
            hasNewMessage &&
            lastMessage?.sender === 'other' &&
            soundsEnabled &&
            !isConversationOpen
        ) {
            playNotificationSound();
        }

        prevMessageCount.current = messages.length;
    }, [messages, soundsEnabled, isConversationOpen, activeConversationId]);

    useEffect(() => {
        if (!isConversationOpen) return;

        const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user');
        if (!lastUserMessage || lastUserMessage.readAt) return;

        const deliveryTimeoutId = setTimeout(() => {
            setConversationMessages((prev) => ({
                ...prev,
                [activeConversationId]: (prev[activeConversationId] || []).map((msg) =>
                    msg.id === lastUserMessage.id
                        ? { ...msg, deliveredAt: msg.deliveredAt || new Date().toISOString() }
                        : msg
                ),
            }));
        }, 600);

        const timeoutId = setTimeout(() => {
            setConversationMessages((prev) => ({
                ...prev,
                [activeConversationId]: (prev[activeConversationId] || []).map((msg) =>
                    msg.id === lastUserMessage.id
                        ? { ...msg, readAt: new Date().toISOString() }
                        : msg
                ),
            }));
        }, 1400);

        return () => {
            clearTimeout(deliveryTimeoutId);
            clearTimeout(timeoutId);
        };
    }, [messages, isConversationOpen, activeConversationId]);

    const getStatusIcon = (message: Message) => {
        if (!message.deliveredAt) {
            return <IoCheckmarkOutline />;
        }
        if (!message.readAt) {
            return <IoCheckmarkDoneOutline />;
        }
        return <IoIosEye />;
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 p-2 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.push(`/client-profile/${otherUserId}`)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)' }}
                    >
                        {(activeConversation?.name || 'User')
                            .split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('')}
                    </button>
                    <div>
                        <button
                            type="button"
                            onClick={() => router.push(`/client-profile/${otherUserId}`)}
                            className="font-semibold text-gray-900 cursor-pointer hover:underline"
                        >
                            {activeConversation?.name || 'Select a conversation'}
                        </button>
                        <p className={`text-xs font-medium ${activeConversation?.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                            {activeConversationMeta.blocked ? (
                                <MdBlock className="inline h-4 w-4" title="Blocked" aria-label="Blocked" />
                            ) : activeConversationMeta.muted ? (
                                <IoMdNotificationsOff className="inline h-4 w-4" title="Muted" aria-label="Muted" />
                            ) : activeConversationMeta.reported ? (
                                'Reported'
                            ) : activeConversation?.status === 'online' ? (
                                'Online'
                            ) : activeConversation ? (
                                'Offline'
                            ) : (
                                ''
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                    </button> */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                    onClick={() => handleMenuAction('mute')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm first:rounded-t-lg cursor-pointer"
                                >
                                    {activeConversationMeta.muted ? 'Unmute Notifications' : 'Mute Notifications'}
                                </button>
                                <button
                                    onClick={() => handleMenuAction('block')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm border-t border-gray-100 cursor-pointer"
                                >
                                    {activeConversationMeta.blocked ? 'Unblock User' : 'Block User'}
                                </button>
                                <button
                                    onClick={() => handleMenuAction('report')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm border-t border-gray-100 cursor-pointer"
                                >
                                    Report Conversation
                                </button>
                                <button
                                    onClick={() => handleMenuAction('delete')}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm border-t border-gray-100 last:rounded-b-lg cursor-pointer"
                                >
                                    Delete Conversation
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
                {activeConversationMeta.blocked && (
                    <div className="text-center py-6 text-gray-500 text-sm">
                        You blocked this conversation.
                    </div>
                )}
                {messages.map((message, index) => {
                    const messageDate = new Date(message.createdAt);
                    const prevMessage = messages[index - 1];
                    const shouldShowDayDivider =
                        !prevMessage ||
                        !isSameDay(messageDate, new Date(prevMessage.createdAt));

                    return (
                        <div key={message.id}>
                            {shouldShowDayDivider && (
                                <div className="flex items-center justify-center my-4">
                                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {getDayLabel(messageDate)}
                                    </span>
                                </div>
                            )}
                            <div
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${message.sender === 'user'
                                        ? 'rounded-br-none text-white'
                                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                                        }`}
                                    style={message.sender === 'user' ? { backgroundColor: '#e74c4c' } : {}}
                                >
                                    <p className="text-sm wrap-break-word">{message.content}</p>
                                    <div className='w-full flex items-center justify-between'>
                                        <p
                                            className={`text-xs mt-1 ${message.sender === 'user'
                                                ? 'text-blue-100'
                                                : 'text-gray-500 text-end'
                                                }`}
                                        >
                                            {formatTime(messageDate)}
                                        </p>
                                        {message.sender === 'user' && (
                                            <p
                                                className={`text-sm font-semibold mt-1 ${message.readAt ? 'text-blue-100' : 'text-gray-300'} cursor-default select-none`}
                                                title={message.readAt ? `Read ${formatTime(new Date(message.readAt))}` : message.deliveredAt ? `Delivered ${formatTime(new Date(message.deliveredAt))}` : `Sent ${formatTime(new Date(message.createdAt))}`}
                                            >
                                                {getStatusIcon(message)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
                <div className="grid grid-cols-[auto_1fr_auto] gap-1 sm:gap-3">
                    <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder={activeConversationMeta.blocked ? 'You blocked this user' : 'Type your message...'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!activeConversationId || activeConversationMeta.blocked || activeConversationMeta.deleted}
                        className="flex-1 px-2 min-w-[130px] sm:min-w-[250px] sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c4c] text-sm"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === '' || !activeConversationId || activeConversationMeta.blocked || activeConversationMeta.deleted}
                        className="p-1.5 sm:p-2 bg-[#e74c4c] hover:bg-[#c23b3b] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <ReportUserModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                userName={activeConversation?.name || 'User'}
                userId={otherUserId}
                onReportSubmit={handleReportUser}
            />
            <ConfirmationPopup
                isOpen={isConfirmOpen}
                onCancel={() => {
                    setIsConfirmOpen(false);
                    setPendingAction(null);
                }}
                title={confirmTitle}
                description={confirmDescription}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
}