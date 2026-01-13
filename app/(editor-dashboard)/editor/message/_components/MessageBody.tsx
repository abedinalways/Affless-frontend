'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa6";

interface Message {
    id: string;
    sender: 'user' | 'other';
    content: string;
    timestamp: string;
}

const mockMessages: Message[] = [
    {
        id: '1',
        sender: 'other',
        content: 'Hey! I saw your project post. Are you still looking for an editor?',
        timestamp: '10:30 AM',
    },
    {
        id: '2',
        sender: 'user',
        content: 'Yes! I need someone to edit a 30-minute video. Are you interested?',
        timestamp: '10:32 AM',
    },
    {
        id: '3',
        sender: 'other',
        content: 'Absolutely! I have experience with similar projects. Can you share more details?',
        timestamp: '10:35 AM',
    },
    {
        id: '4',
        sender: 'user',
        content: 'Great! The video is about travel vlogging. I need color correction, sound mixing, and transitions.',
        timestamp: '10:37 AM',
    },
    {
        id: '5',
        sender: 'other',
        content: 'That looks great! Can you adjust the intro to match the new branding?',
        timestamp: '2 min ago',
    },
];

type MessageBodyProps = {
    selectedConversationId?: string;
    onSelectConversation?: (id: string) => void;
};

export default function MessageBody({ selectedConversationId, onSelectConversation }: MessageBodyProps) {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputValue, setInputValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
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

    return (
        <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={()=>onSelectConversation && onSelectConversation("")} type="button" className='p-1 cursor-pointer xl:hidden'>
                        <FaArrowLeft />
                    </button>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)' }}>
                        JD
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">John Designer</h2>
                        <p className="text-xs text-green-600 font-medium">Online</p>
                    </div>
                </div>
                <div className="flex gap-2">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
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
                            <p
                                className={`text-xs mt-1 ${message.sender === 'user'
                                    ? 'text-blue-100'
                                    : 'text-gray-500 text-end'
                                    }`}
                            >
                                {message.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
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