import { IoMdNotificationsOff } from "react-icons/io"
import { MdBlock } from "react-icons/md"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { ThreeDotsIcon } from "@/public/svgIcons/svgIcons";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { conversationDirectory } from "@/public/demodata";
import { chatActons } from "@/public/staticData";
import { useAdminMessageContext } from "./AdminMessageContext";

type PropsType = {
    id: string;
    activeConversation?: {
        name: string;
        status: 'online' | 'offline';
        isMuted?: boolean;
        isBlocked?: boolean;
    };
    activeConversationMeta: {
        muted?: boolean | undefined;
        blocked?: boolean | undefined;
        reported?: boolean | undefined;
        deleted?: boolean | undefined;
    };
}

export default function MessageHeader() {
    const { activeConversation, onToggleMute, onStatusUpdateUser, onDeleteConversation } = useAdminMessageContext();
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);


    const handleMenuAction = (action: string) => {
        switch (action) {
            case 'mute':
                onToggleMute(!activeConversation?.isMuted);
                break;
            case 'block':
                onStatusUpdateUser(!activeConversation?.isBlocked);
                break;
            case 'report':
                // Implement report logic here
                console.log('Report action triggered');
                break;
            case 'delete':
                onDeleteConversation();
                break;
            default:
                break;
        }
    }

    return (
        <div className="border-b border-gray-200 p-2 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => router.push(`/client-profile/${activeConversation?.id}`)}
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
                        onClick={() => router.push(`/client-profile/${activeConversation?.id}`)}
                        className="font-semibold text-gray-900 cursor-pointer hover:underline"
                    >
                        {activeConversation?.name || 'Select a conversation'}
                    </button>
                    <p className={`text-xs font-medium ${activeConversation?.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                        {activeConversation?.isBlocked && (
                            <MdBlock className="inline h-4 w-4" title="Blocked" aria-label="Blocked" />
                        )}
                        {activeConversation?.isMuted && (
                            <IoMdNotificationsOff className="inline h-4 w-4" title="Muted" aria-label="Muted" />
                        )}
                        {/* {activeConversationMeta.reported && !activeConversation?.isBlocked ? (
                            'Reported'
                        ) : activeConversation?.status === 'online' && !activeConversation?.isBlocked ? (
                            'Online'
                        ) : activeConversation && !activeConversation?.isBlocked ? (
                            'Offline'
                        ) : (
                            ''
                        )} */}
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
                            {chatActons?.filter(action => action?.action !== "report")?.map((action) => (
                                <DropdownMenuItem className="p-0" key={action.action}>
                                    <button
                                        onClick={() => handleMenuAction(action?.action)}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm first:rounded-t-lg cursor-pointer"
                                    >
                                        {action.label}
                                    </button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}