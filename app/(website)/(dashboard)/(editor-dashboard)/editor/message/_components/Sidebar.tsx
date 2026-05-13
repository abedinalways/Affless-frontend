"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdBlock } from "react-icons/md";
import { IoMdNotificationsOff } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Conversation } from "@/app/type";
import { useMessageContext } from "@/components/message/MessageContext";
import { useParams } from "next/navigation";

export default function Sidebar() {
  const params = useParams();
  const selectedConversationId = params?.id;
  const { conversations } = useMessageContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  useEffect(() => {
    if (!showSearch) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!searchContainerRef.current) return;
      if (!searchContainerRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [showSearch]);

  return (
    <div className="h-full">
      <div className="mb-2 flex w-full items-center justify-center py-2 xl:hidden">
        <button
          type="button"
          onClick={() => setShowSearch((prev) => !prev)}
          aria-expanded={showSearch}
          aria-controls="conversation-search"
          className="cursor-pointer rounded-md p-2 transition-all hover:bg-gray-100"
        >
          <IoSearch className="text-xl" />
        </button>
      </div>
      <div
        ref={searchContainerRef}
        className={`absolute top-4 z-9 mb-4 rounded-lg bg-white p-2 shadow-md xl:static xl:p-0 xl:shadow-none ${showSearch ? "block" : "hidden"} xl:block`}
      >
        <input
          id="conversation-search"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        {conversations.length > 0 ? (
          conversations
            ?.filter((cnv) => !cnv?.deleted)
            .map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  router.push(
                    `/editor/message/${conversation.id}?redirect=${redirect}`,
                  );
                }}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-all sm:h-[60px] sm:w-[60px] xl:block xl:h-fit xl:w-full xl:p-3 ${
                  selectedConversationId === conversation.id
                    ? "hover:bg-gray-100 xl:border-l-4"
                    : "hover:bg-gray-100"
                }`}
                style={
                  selectedConversationId === conversation.id
                    ? { borderLeftColor: "#e74c4c", backgroundColor: "#ffe6e6" }
                    : {}
                }
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white sm:h-10 sm:w-10"
                      style={{
                        background:
                          "linear-gradient(135deg, #e74c4c 0%, #c23b3b 100%)",
                      }}
                    >
                      {conversation.avatar?.includes("http")
                        ? conversation?.avatar
                        : conversation?.name
                            ?.split(" ")
                            ?.map((n: string) => n[0])
                            .join("") || "U"}
                    </div>
                    <div
                      className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${
                        conversation.status === "online"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="hidden min-w-0 flex-1 xl:block">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {conversation.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        {(conversation.isMuted || conversation.isBlocked) && (
                          <span className="ml-2 flex items-center text-gray-500">
                            {conversation.isBlocked ? (
                              <MdBlock
                                className="h-3.5 w-3.5"
                                title="Blocked"
                                aria-label="Blocked"
                              />
                            ) : (
                              <IoMdNotificationsOff
                                className="h-3.5 w-3.5"
                                title="Muted"
                                aria-label="Muted"
                              />
                            )}
                          </span>
                        )}
                        {conversation.unread && (
                          <div
                            className="h-2! w-2! shrink-0 rounded-full"
                            style={{ backgroundColor: "#e74c4c" }}
                          />
                        )}
                      </div>
                    </div>
                    <p className="truncate text-xs text-gray-600">
                      {conversation.lastMessage}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(conversation.timestamp)?.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}
