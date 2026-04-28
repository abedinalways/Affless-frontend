'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportUserModal from '@/components/reusable/ReportUserModal';
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import { mockMessageThreads } from '@/public/demodata';
import { Message, AttachmentItem } from '@/app/type';
import MessageFooter from './MessageFooter';
import MessageContent from './MessageContent';
import MessageHeader from './MessageHeader';
import { useMessageContext } from './MessageLayout';

type MessageBodyProps = {
    conversationId?: string;
    onReportUser: () => void;
};

type ConversationState = Record<string, { muted?: boolean; blocked?: boolean; reported?: boolean; deleted?: boolean }>;

export default function MessageBody({ conversationId, onReportUser }: MessageBodyProps) {
    const {
        conversationDirectory,
        deleteConversation,
        onSelectConversation,
        selectedConversationId,
        onBlockConversation,
        onMuteConversation
    } = useMessageContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "";
    const [conversationMessages, setConversationMessages] = useState<Record<string, Message[]>>(mockMessageThreads);
    const [conversationState, setConversationState] = useState<ConversationState>({});
    const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<'mute' | 'block' | 'unblock' | 'delete' | null>(null);

    const attachmentsRef = useRef<AttachmentItem[]>([]);
    const messagesRef = useRef<Record<string, Message[]>>({});
    const prevMessageCount = useRef(0);

    const [soundsEnabled] = useState(true);
    const availableConversations = useMemo(
        () => conversationDirectory.filter((conv) => !conversationState[conv.id]?.deleted),
        [conversationDirectory, conversationState]
    );
    const activeConversationId = conversationId || selectedConversationId || '';
    const activeConversation = availableConversations.find((conv) => conv.id === activeConversationId);
    const activeConversationMeta = conversationState[activeConversationId] || {};
    const otherUserId = activeConversation?.id || activeConversationId || '1';
    const isConversationOpen = Boolean(activeConversationId);
    const messages = conversationMessages[activeConversationId] || [];

    const persistConversationState = (nextState: ConversationState) => {
        setConversationState(nextState);
    };

    useEffect(() => {
        attachmentsRef.current = attachments;
        // console.log("Current attachments:", attachments);
    }, [attachments]);

    useEffect(() => {
        messagesRef.current = conversationMessages;
    }, [conversationMessages]);

    useEffect(() => {
        return () => {
            attachmentsRef.current.forEach((item) => URL.revokeObjectURL(item.url));
            Object.values(messagesRef.current)
                .flat()
                .forEach((message) => {
                    message.attachments?.forEach((attachment) => {
                        if (attachment.url.startsWith('blob:')) {
                            URL.revokeObjectURL(attachment.url);
                        }
                    });
                });
        };
    }, []);

    // useEffect(() => {
    //     // console.log("Available conversations:", conversationId);
    //     if (!conversationId && !selectedConversationId && availableConversations.length > 0) {
    //         onSelectConversation?.(availableConversations[0].id);
    //     }
    // }, [conversationId, selectedConversationId, availableConversations, onSelectConversation]);

    // useEffect(() => {
    //     if (activeConversationId && !activeConversation && availableConversations.length > 0) {
    //         onSelectConversation?.(availableConversations[0].id);
    //     }
    // }, [activeConversationId, activeConversation, availableConversations, onSelectConversation]);


    const performMenuAction = (action: 'mute' | 'block' | 'unblock' | 'report' | 'delete') => {
        //console.log(`Menu action: ${action}`);
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
                deleteConversation?.(activeConversationId);
                if (availableConversations.length > 0) {
                    const nextConversation = availableConversations.find((conv) => conv.id !== activeConversationId);
                    //console.log("Next conversation selected:", nextConversation?.id);
                    router.push(`/client/message${nextConversation?.id ? `/${nextConversation.id}` : ''}?redirect=${redirectUrl}`);
                } else {
                    onSelectConversation?.('');
                }
                break;
            default:
                break;
        }
    };

    const handleMenuAction = (action: 'mute' | 'block' | 'report' | 'delete') => {
        if (!activeConversationId) return;

        if (action === 'report') {
            onReportUser();
            return;
        }

        if (action === 'block' && activeConversationMeta.blocked) {
            setPendingAction('unblock');
        } else {
            setPendingAction(action);
        }
        setIsConfirmOpen(true);
    };

    const handleReportUser = async (reportData: any) => {
        if (!activeConversationId) return;
        performMenuAction('report');
        setIsReportModalOpen(false);
    };

    const handleConfirmAction = () => {
        if (!pendingAction) return;
        performMenuAction(pendingAction);
        setIsConfirmOpen(false);
        if (pendingAction === 'block' && !activeConversationMeta.blocked) {
            onBlockConversation(activeConversationId);
            return;
        } else if (pendingAction === 'mute') {
            onMuteConversation(activeConversationId);
            return;
        }
        setPendingAction(null);
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

        prevMessageCount.current = messages.length;
    }, [messages, soundsEnabled, isConversationOpen, activeConversationId]);

    const lastUserMessageId = useMemo(() => {
        const msgList = conversationMessages[activeConversationId] || [];
        const lastUserMsg = [...msgList].reverse().find(m => m.sender === 'user');
        return lastUserMsg?.id;
    }, [conversationMessages, activeConversationId]);

    useEffect(() => {
        if (!isConversationOpen || !lastUserMessageId) return;

        // Set deliveredAt (only once) – using functional update to avoid stale closure
        setConversationMessages(prev => {
            const msgs = prev[activeConversationId] || [];
            const targetMsg = msgs.find(m => m.id === lastUserMessageId);
            if (!targetMsg || targetMsg.readAt || targetMsg.deliveredAt) return prev;

            const newMsgs = msgs.map(m =>
                m.id === lastUserMessageId ? { ...m, deliveredAt: new Date().toISOString() } : m
            );
            return { ...prev, [activeConversationId]: newMsgs };
        });

        const timeoutId = setTimeout(() => {
            setConversationMessages(prev => {
                const msgs = prev[activeConversationId] || [];
                const targetMsg = msgs.find(m => m.id === lastUserMessageId);
                if (!targetMsg || targetMsg.readAt) return prev;

                const newMsgs = msgs.map(m =>
                    m.id === lastUserMessageId ? { ...m, readAt: new Date().toISOString() } : m
                );
                return { ...prev, [activeConversationId]: newMsgs };
            });
        }, 1400);

        return () => clearTimeout(timeoutId);
    }, [lastUserMessageId, isConversationOpen, activeConversationId]);

    useEffect(()=>{},[conversationDirectory])


    return (
        <div className="h-full grid grid-cols-1 min-h-0 bg-white rounded-lg lg:shadow-md overflow-hidden">
            {/* Header */}
            <div className='grid grid-rows-[auto_1fr_auto] min-h-0 w-full h-full'>
                <MessageHeader
                    otherUserId={otherUserId}
                    activeConversation={activeConversation}
                    activeConversationMeta={activeConversationMeta}
                    handleMenuAction={handleMenuAction}
                />

                {/* Messages Area */}
                <div className='grid w-full h-full min-h-0 overflow-y-auto'>
                    <MessageContent
                        messages={messages}
                        activeConversationMeta={activeConversationMeta}
                    />
                </div>

                {/* Input Area */}
                <MessageFooter
                    activeConversationMeta={activeConversationMeta}
                    activeConversationId={activeConversationId}
                    onConversationMessagesChange={(newMessage: Message) => {
                        //console.log("New message added:", newMessage);
                        setConversationMessages((prev) => ({
                            ...prev,
                            [activeConversationId]: [...messages, newMessage],
                        }))
                    }
                    }
                    attachments={attachments}
                    setAttachments={setAttachments}
                />
            </div>

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