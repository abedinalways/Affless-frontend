import { AttachmentItem, Message } from "@/app/type";
import { SendIcon } from "@/public/svgIcons/svgIcons";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddLinkModal from "./AddLinkModal";

type PropType = {
    activeConversationMeta: {
        muted?: boolean; blocked?: boolean; reported?: boolean; deleted?: boolean
    };
    activeConversationId: string | null;
    onConversationMessagesChange: (newMessage: Message) => void;
    attachments: AttachmentItem[];
    setAttachments: React.Dispatch<React.SetStateAction<AttachmentItem[]>>;
}


export default function MessageFooter({ activeConversationMeta, activeConversationId, onConversationMessagesChange, attachments, setAttachments }: PropType) {
    const attachmentMenuRef = useRef<HTMLDivElement>(null);
    const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileAccept, setFileAccept] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [showAddLinkModal, setShowAddLinkModal] = useState(false);

    const handleToggleAddLinkModal = () => {
        setShowAddLinkModal((prev) => !prev);
        setIsAttachmentMenuOpen(false);
    }
    const handleRemoveAttachment = (id: string) => {
        setAttachments((prev) => {
            const item = prev.find((entry) => entry.id === id);
            if (item?.file) {
                URL.revokeObjectURL(item.url);
            }
            return prev.filter((entry) => entry.id !== id);
        });
    };

    const openFilePicker = (accept: string) => {
        setFileAccept(accept);
        setIsAttachmentMenuOpen(false);
        requestAnimationFrame(() => fileInputRef.current?.click());
    };


    const handleAttachmentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        const newItems = files.map((file) => ({
            id: uuidv4(),
            file,
            url: URL.createObjectURL(file),
            type: 'file' as const,
            name: file.name,
        }));

        setAttachments((prev) => [...prev, ...newItems]);
        event.target.value = '';
    };

    const handleSendMessage = () => {
        if ((inputValue.trim() === '' && attachments.length === 0) || !activeConversationId || activeConversationMeta.blocked || activeConversationMeta.deleted) return;

        const attachmentsToSend = attachments.map(({ id, url, type, name }) => ({
            id,
            url,
            type,
            name,
        }));

        const newMessage: Message = {
            id: uuidv4(),
            sender: 'user',
            content: inputValue,
            createdAt: new Date().toISOString(),
            attachments: attachmentsToSend.length > 0 ? attachmentsToSend : undefined,
        };

        console.log("Sending message with attachments:", newMessage);

        onConversationMessagesChange(newMessage);
        setInputValue('');
        setAttachments([]);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(event.target as Node)) {
                setIsAttachmentMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`border-t border-gray-200 px-4 pb-4 bg-white ${attachments.length > 0 ? '' : 'pt-4'}`}>
            {attachments.length > 0 && (
                <div className="mb-3 flex gap-2 overflow-x-auto">
                    {attachments.map((item) => (
                        <div className='relative pt-4' key={item.id}>
                            <div
                                className="relative h-16 w-16 rounded-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden"
                            >
                                {item.type === 'link' ? (
                                    <span className="text-[10px] text-gray-600 px-1 text-center">
                                        Link
                                    </span>
                                ) : item.file?.type.startsWith('image/') ? (
                                    <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                                ) : item?.name?.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
                                    <video width={64} className="h-full w-full object-cover">
                                        <source src={item.url} type={`video/${item.name.split('.').pop()?.toLowerCase()}`} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <span className="text-[10px] text-gray-600 px-1 text-center">
                                        {item.name}
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveAttachment(item.id)}
                                className="cursor-pointer absolute top-2 -right-2 h-5 w-5 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center"
                                aria-label="Remove attachment"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="grid grid-cols-[auto_1fr_auto] gap-1 sm:gap-3">
                <div className="relative" ref={attachmentMenuRef}>
                    <button
                        type="button"
                        onClick={() => setIsAttachmentMenuOpen((prev) => !prev)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    {isAttachmentMenuOpen && (
                        <div className="absolute bottom-12 left-0 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                                type="button"
                                onClick={() => openFilePicker('image/*')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm first:rounded-t-lg cursor-pointer"
                            >
                                Images
                            </button>
                            <button
                                type="button"
                                onClick={() => openFilePicker('video/*')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm border-t border-gray-100 cursor-pointer"
                            >
                                Video
                            </button>
                            <button
                                type="button"
                                onClick={handleToggleAddLinkModal}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm border-t border-gray-100 cursor-pointer"
                            >
                                Links
                            </button>
                            <button
                                type="button"
                                onClick={() => openFilePicker('.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm border-t border-gray-100 last:rounded-b-lg cursor-pointer"
                            >
                                Documents
                            </button>
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    id="attachments"
                    className="hidden"
                    multiple
                    accept={fileAccept}
                    ref={fileInputRef}
                    onChange={handleAttachmentsChange}
                />
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
                    disabled={(inputValue.trim() === '' && attachments.length === 0) || !activeConversationId || activeConversationMeta.blocked || activeConversationMeta.deleted}
                    className="p-1.5 sm:p-2 bg-[#e74c4c] hover:bg-[#c23b3b] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                    <SendIcon className='w-5 h-5' />
                </button>
            </div>
            {showAddLinkModal &&
                <AddLinkModal
                    onAddLinks={(links: string[]) => {
                        setAttachments((prev) => [
                            ...prev,
                            ...links.map((trimmed) => ({
                                id: uuidv4(),
                                url: trimmed,
                                type: "link" as const,
                            }))
                        ]);
                        console.log("Added links from modal:", links.map((trimmed) => ({
                            id: uuidv4(),
                            url: trimmed,
                            type: "link" as const,
                        })));
                        setIsAttachmentMenuOpen(false);
                        setShowAddLinkModal(false);
                    }}
                    onClose={() => setShowAddLinkModal(false)}
                />
            }
        </div>

    )
}