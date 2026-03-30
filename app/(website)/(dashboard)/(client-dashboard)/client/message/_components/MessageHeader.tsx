import { IoMdNotificationsOff } from "react-icons/io"
import { MdBlock } from "react-icons/md"
import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react";
import { ThreeDotsIcon } from "@/public/svgIcons/svgIcons";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PropsType = {
    otherUserId: string;
    activeConversation?: {
        name: string;
        status: 'online' | 'offline';
    };
    activeConversationMeta: {
        muted?: boolean | undefined;
        blocked?: boolean | undefined;
        reported?: boolean | undefined;
        deleted?: boolean | undefined;
    };
    handleMenuAction: (action: 'mute' | 'block' | 'report' | 'delete') => void;
}

export default function MessageHeader({ otherUserId, activeConversation, activeConversationMeta, handleMenuAction }: PropsType) {

    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-b border-gray-200 p-2 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => router.push(`/editor-profile/${otherUserId}`)}
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
                        onClick={() => router.push(`/editor-profile/${otherUserId}`)}
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
                <div className="relative" ref={menuRef}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <ThreeDotsIcon className="w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="space-y-0">
                            <DropdownMenuItem className="p-0">
                                <button
                                    onClick={() => handleMenuAction('mute')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm first:rounded-t-lg cursor-pointer"
                                >
                                    {activeConversationMeta.muted ? 'Unmute Notifications' : 'Mute Notifications'}
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                                <button
                                    onClick={() => handleMenuAction('block')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm cursor-pointer"
                                >
                                    {activeConversationMeta.blocked ? 'Unblock User' : 'Block User'}
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                                <button
                                    onClick={() => handleMenuAction('report')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm cursor-pointer"
                                >
                                    Report Conversation
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                                <button
                                    onClick={() => handleMenuAction('delete')}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm last:rounded-b-lg cursor-pointer"
                                >
                                    Delete Conversation
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}