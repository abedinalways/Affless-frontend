'use client';
import MessageHeader from "./MessageHeader";
import MessageFooter from "./MessageFooter";
import MessageContent from "./MessageContent";
import { useEffect, useRef, useState } from "react";
import { mockMessageThreads } from "@/public/demodata";
import { useParams } from "next/navigation";
import { AttachmentItem, Message } from "@/app/type";
import { useAdminMessageContext } from "./AdminMessageContext";


export default function MessageBody() {
    const { messages, activeConversation, onStatusUpdateUser } = useAdminMessageContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [attachments, setAttachments] = useState<AttachmentItem[]>([]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo({
                top: messagesEndRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <div className="h-full grid grid-cols-1 grid-rows-[1fr_auto] min-h-0 bg-white rounded-lg lg:shadow-md overflow-hidden">
            <div className='grid grid-rows-[auto_1fr] min-h-0 w-full h-full'>
                <MessageHeader />
                <div ref={messagesEndRef} className="w-full h-full min-h-0 grid grid-cols-1 grid-rows-[1fr_auto] overflow-y-auto">
                    <MessageContent messages={messages} />
                    {/* <div className="w-0 h-0" ref={messagesEndRef}></div> */}
                </div>
            </div>
            {activeConversation?.isBlocked ? (
                <div className="px-4 py-2 text-center text-sm text-gray-400">
                    <button onClick={() => onStatusUpdateUser(false)} type="button" className="text-blue-500 hover:text-blue-700 cursor-pointer hover:underline transition-all duration-300">
                        Unblock
                    </button> the user to send messages.
                </div>
            ) : (
                <MessageFooter
                    attachments={attachments}
                    setAttachments={setAttachments}
                />
            )}
        </div>
    );
}