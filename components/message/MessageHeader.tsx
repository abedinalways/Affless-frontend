"use client";

import { IoMdNotificationsOff } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ThreeDotsIcon } from "@/public/svgIcons/svgIcons";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMessageContext } from "./MessageContext";
import ReportUserModal from "./ReportUserModal";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import { usePathname } from "next/navigation";

type MenuAction =
  | "block"
  | "mute"
  | "report"
  | "delete"
  | "unblock"
  | "unmute"
  | "";

type ChatAction = {
  label: string;
  action: string;
  unDoneLabel?: string;
};

type Props = {
  chatActons: ChatAction[];
};

export default function MessageHeader({ chatActons }: Props) {
  const {
    activeConversation,
    onToggleMute,
    onStatusUpdateUser,
    onDeleteConversation,
  } = useMessageContext();
  const router = useRouter();
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<MenuAction>("");
  const params = useParams();
  const id = params?.id as string;

  const handleMenuAction = (action: MenuAction) => {
    switch (action) {
      case "unmute":
      case "mute":
        onToggleMute(!activeConversation?.isMuted);
        break;
      case "unblock":
      case "block":
        onStatusUpdateUser(!activeConversation?.isBlocked);
        break;
      case "report":
        setIsReportModalOpen(true);
        break;
      case "delete":
        onDeleteConversation(
          path.includes("/admin/")
            ? "/admin/chats"
            : path.includes("/editor/")
              ? "/editor/message"
              : "/client/message",
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-2 sm:p-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            router.push(`/client-profile/${activeConversation?.id}`)
          }
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)",
          }}
        >
          {(activeConversation?.name || "User")
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </button>
        <div>
          <button
            type="button"
            onClick={() =>
              router.push(`/client-profile/${activeConversation?.id}`)
            }
            className="cursor-pointer font-semibold text-gray-900 hover:underline"
          >
            {activeConversation?.name || "Select a conversation"}
          </button>
          <p
            className={`text-xs font-medium ${activeConversation?.status === "online" ? "text-green-600" : "text-gray-500"}`}
          >
            {activeConversation?.isBlocked && (
              <MdBlock
                className="inline h-3.5 w-3.5"
                title="Blocked"
                aria-label="Blocked"
              />
            )}
            {activeConversation?.isMuted && (
              <IoMdNotificationsOff
                className="inline h-3.5 w-3.5"
                title="Muted"
                aria-label="Muted"
              />
            )}
            {activeConversation?.status === "online" &&
            !activeConversation?.isBlocked
              ? "Online"
              : activeConversation && !activeConversation?.isBlocked
                ? "Offline"
                : ""}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative" ref={menuRef}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100">
                <ThreeDotsIcon className="w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-0">
              {chatActons?.map((action) => (
                <DropdownMenuItem className="p-0" key={action.action}>
                  <button
                    onClick={() => {
                      if (action.action === "report") {
                        setIsReportModalOpen(true);
                        return;
                      }
                      if (
                        action.action === "block" &&
                        activeConversation?.isBlocked
                      ) {
                        setIsConfirmationOpen("unblock");
                        return;
                      }
                      if (
                        action.action === "mute" &&
                        activeConversation?.isMuted
                      ) {
                        setIsConfirmationOpen("unmute");
                        return;
                      }
                      setIsConfirmationOpen(action.action as MenuAction);
                    }}
                    className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-lg hover:bg-gray-50"
                  >
                    {(activeConversation?.isBlocked &&
                      action?.action === "block") ||
                    (activeConversation?.isMuted && action?.action === "mute")
                      ? action?.unDoneLabel || action.label
                      : action.label}
                  </button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ReportUserModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        userName={activeConversation?.name}
        userId={id}
        onReportSubmit={(reportData) => {}}
      />
      <ConfirmationPopup
        isOpen={!!isConfirmationOpen}
        onConfirm={() => {
          handleMenuAction(isConfirmationOpen);
          setIsConfirmationOpen("");
        }}
        onCancel={() => setIsConfirmationOpen("")}
        description={`Do you want to ${isConfirmationOpen} ${isConfirmationOpen === "delete" ? "this chat with" : ""} ${activeConversation?.name || "user"}?`}
        confirmText={isConfirmationOpen}
      />
    </div>
  );
}
