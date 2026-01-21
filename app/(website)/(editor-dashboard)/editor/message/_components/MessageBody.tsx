'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

interface Message {
    id: string;
    sender: 'user' | 'other';
    content: string;
    createdAt: string;
    deliveredAt?: string;
    readAt?: string;
}

const mockMessages: Message[] = [
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
];

type MessageBodyProps = {
    selectedConversationId?: string;
    onSelectConversation?: (id: string) => void;
};

export default function MessageBody({ selectedConversationId, onSelectConversation }: MessageBodyProps) {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const prevMessageCount = useRef(messages.length);
    const [soundsEnabled] = useState(true);
    const otherUserId = '1';
    const isConversationOpen = Boolean(selectedConversationId);

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
        if (inputValue.trim() === '') return;

        const newMessage: Message = {
            id: String(messages.length + 1),
            sender: 'user',
            content: inputValue,
            createdAt: new Date().toISOString(),
        };

        setMessages([...messages, newMessage]);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleMenuAction = (action: string) => {
        console.log(`Menu action: ${action}`);
        switch (action) {
            case 'mute':
                console.log('Muting conversation');
                break;
            case 'block':
                console.log('Blocking user');
                break;
            case 'report':
                console.log('Reporting conversation');
                break;
            case 'delete':
                console.log('Deleting conversation');
                break;
            default:
                break;
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
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
    }, [messages, soundsEnabled, isConversationOpen]);

    useEffect(() => {
        if (!isConversationOpen) return;

        const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user');
        if (!lastUserMessage || lastUserMessage.readAt) return;

        const deliveryTimeoutId = setTimeout(() => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === lastUserMessage.id
                        ? { ...msg, deliveredAt: msg.deliveredAt || new Date().toISOString() }
                        : msg
                )
            );
        }, 600);

        const timeoutId = setTimeout(() => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === lastUserMessage.id
                        ? { ...msg, readAt: new Date().toISOString() }
                        : msg
                )
            );
        }, 1400);

        return () => {
            clearTimeout(deliveryTimeoutId);
            clearTimeout(timeoutId);
        };
    }, [messages, isConversationOpen]);

    const getStatusIcon = (message: Message) => {
        if (!message.deliveredAt) {
            return <IoCheckmarkOutline />;
        }
        if (!message.readAt) {
            return <IoCheckmarkDoneOutline />;
        }
        return <IoCheckmarkDoneSharp />;
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => onSelectConversation && onSelectConversation("")} type="button" className='p-1 cursor-pointer xl:hidden'>
                        <FaArrowLeft />
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/client-profile/${otherUserId}`)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)' }}
                    >
                        JD
                    </button>
                    <div>
                        <button
                            type="button"
                            onClick={() => router.push(`/client-profile/${otherUserId}`)}
                            className="font-semibold text-gray-900 cursor-pointer hover:underline"
                        >
                            John Designer
                        </button>
                        <p className="text-xs text-green-600 font-medium">Online</p>
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
                                    Mute Notifications
                                </button>
                                <button
                                    onClick={() => handleMenuAction('block')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm border-t border-gray-100 cursor-pointer"
                                >
                                    Block User
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
            <div className="flex-1 overflow-y-auto p-4 pt-14 space-y-4 bg-gray-50 relative">
                <button
                    type="button"
                    onClick={() => router.push('/client/post-job?assign=john_designer')}
                    className="absolute right-4 top-3 px-4 py-2 rounded-full bg-[#e74c4c] text-white text-xs sm:text-sm font-medium shadow-lg hover:bg-[#c23b3b] transition-colors animate-floating cursor-pointer"
                >
                    Request a job from John Designer
                </button>
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
                <div className="flex items-end gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
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
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c4c] text-sm"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === ''}
                        className="p-2 bg-[#e74c4c] hover:bg-[#c23b3b] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shrink-0 cursor-pointer"
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
        </div>
    );
}