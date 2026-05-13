"use client";
import MessageHeader from "@/components/message/MessageHeader";
import MessageFooter from "@/components/message//MessageFooter";
import MessageContent from "@/components/message//MessageContent";
import { useEffect, useRef, useState } from "react";
import { chatActons } from "@/public/staticData";
import { AttachmentItem, Message } from "@/app/type";
import { useMessageContext } from "@/components/message/MessageContext";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";

export default function MessageBody() {
  const { messages, activeConversation, onStatusUpdateUser } =
    useMessageContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
    <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[1fr_auto] overflow-hidden rounded-lg bg-white lg:shadow-md">
      <div className="grid h-full min-h-0 w-full grid-rows-[auto_1fr]">
        <MessageHeader
          chatActons={chatActons?.filter(
            (action) => action?.action !== "report",
          )}
        />
        <div
          ref={messagesEndRef}
          className="grid h-full min-h-0 w-full grid-cols-1 grid-rows-[1fr_auto] overflow-y-auto"
        >
          <MessageContent messages={messages} />
          {/* <div className="w-0 h-0" ref={messagesEndRef}></div> */}
        </div>
      </div>
      {activeConversation?.isBlocked ? (
        <div className="px-4 py-2 text-center text-sm text-gray-400">
          <button
            onClick={() => setIsConfirmationOpen(true)}
            type="button"
            className="cursor-pointer text-blue-500 transition-all duration-300 hover:text-blue-700 hover:underline"
          >
            Unblock
          </button>{" "}
          the user to send messages.
        </div>
      ) : (
        <MessageFooter
          attachments={attachments}
          setAttachments={setAttachments}
        />
      )}

      {/* Confirmation Popup for Unblock user */}
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onConfirm={() => {
          onStatusUpdateUser(false);
          setIsConfirmationOpen(false);
        }}
        onCancel={() => setIsConfirmationOpen(false)}
        description={`Do you want to unblock this ${activeConversation?.name}?`}
        confirmText="Unblock"
      />
    </div>
  );
}
