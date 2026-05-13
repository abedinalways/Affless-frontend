import { AttachmentItem, Message } from "@/app/type";
import { SendIcon } from "@/public/svgIcons/svgIcons";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddLinkModal from "./AddLinkModal";
import { useMessageContext } from "./MessageContext";
import { useParams } from "next/navigation";
import AddFiles from "./AddFiles";
import RenderFilePreview from "./RenderFilePreview";

type PropType = {
  attachments: AttachmentItem[];
  setAttachments: React.Dispatch<React.SetStateAction<AttachmentItem[]>>;
};

export default function MessageFooter({
  attachments,
  setAttachments,
}: PropType) {
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const activeConversationId = params?.id as string | undefined;
  const { onMessageUpdate } = useMessageContext();
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileAccept, setFileAccept] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);

  const handleToggleAddLinkModal = () => {
    setShowAddLinkModal((prev) => !prev);
    setIsAttachmentMenuOpen(false);
  };
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

  const handleAttachmentsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file) => ({
      id: uuidv4(),
      file,
      url: URL.createObjectURL(file),
      type: "file" as const,
      name: file.name,
    }));

    setAttachments((prev) => [...prev, ...newItems]);
    event.target.value = "";
  };

  const handleSendMessage = () => {
    if (
      (inputValue.trim() === "" && attachments.length === 0) ||
      !activeConversationId
    )
      return;

    const attachmentsToSend = attachments.map(({ id, url, type, name }) => ({
      id,
      url,
      type,
      name,
    }));

    const newMessage: Message = {
      id: uuidv4(),
      sender: "user",
      content: inputValue,
      createdAt: new Date().toISOString(),
      deliveredAt: new Date().toISOString(),
      // readAt: new Date().toISOString(),
      attachments: attachmentsToSend.length > 0 ? attachmentsToSend : undefined,
    };

    //console.log("Sending message with attachments:", newMessage);

    onMessageUpdate(newMessage);
    setInputValue("");
    setAttachments([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target as Node)
      ) {
        setIsAttachmentMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`border-t border-gray-200 bg-white px-4 pb-4 ${attachments.length > 0 ? "" : "pt-4"}`}
    >
      <RenderFilePreview
        attachments={attachments}
        handleRemoveAttachment={handleRemoveAttachment}
      />
      <div className="grid grid-cols-[auto_1fr_auto] gap-1 sm:gap-3">
        <AddFiles
          attachmentMenuRef={attachmentMenuRef}
          isAttachmentMenuOpen={isAttachmentMenuOpen}
          setIsAttachmentMenuOpen={setIsAttachmentMenuOpen}
          openFilePicker={openFilePicker}
          handleToggleAddLinkModal={handleToggleAddLinkModal}
          handleAttachmentsChange={handleAttachmentsChange}
          fileInputRef={fileInputRef}
          fileAccept={fileAccept}
        />
        <input
          type="text"
          placeholder={"Type your message..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!activeConversationId}
          className="min-w-[130px] flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-[#e74c4c] focus:outline-none sm:min-w-[250px] sm:px-4 sm:py-2"
        />
        <button
          onClick={handleSendMessage}
          disabled={
            (inputValue.trim() === "" && attachments.length === 0) ||
            !activeConversationId
          }
          className="shrink-0 cursor-pointer rounded-lg bg-[#e74c4c] p-1.5 text-white transition-colors hover:bg-[#c23b3b] disabled:cursor-not-allowed disabled:opacity-50 sm:p-2"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </div>
      {showAddLinkModal && (
        <AddLinkModal
          onAddLinks={(links: string[]) => {
            setAttachments((prev) => [
              ...prev,
              ...links.map((trimmed) => ({
                id: uuidv4(),
                url: trimmed,
                type: "link" as const,
              })),
            ]);
            setIsAttachmentMenuOpen(false);
            setShowAddLinkModal(false);
          }}
          onClose={() => setShowAddLinkModal(false)}
        />
      )}
    </div>
  );
}
