"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MessageBody from "@/components/message/MessageBody";
import ReportUserModal from "@/components/reusable/ReportUserModal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AdditionalActions from "./AdditionalActions";
import { useMessageContext } from "@/components/message/MessageContext";
import { UserService } from "@/usersService/user.service";

type PropType = {
  id: string;
};

export default function Messages({ id }: PropType) {
  const { activeConversation } = useMessageContext();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const [deletedConversationIds, setDeletedConversationIds] = useState<
    string[]
  >([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const router = useRouter();

  const handleReportUser = async (reportData: any) => {
    try {
      // Implementation for reporting user
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to submit report";
      throw new Error(errorMessage);
    }
  };

  return (
    <div className="grid h-full w-full bg-[#f9f9f9]">
      <div className="xm:gap-6 grid h-full min-h-0 w-full grid-rows-1 gap-3 lg:grid-cols-[1fr_auto]">
        <div
          className={`grid h-full min-h-0 w-full ${id === "" ? "hidden xl:block" : ""}`}
          style={{
            height: "calc(100vh - 148px)",
          }}
        >
          <MessageBody />
        </div>
        <AdditionalActions onReportUser={() => setIsReportModalOpen(true)} />
      </div>

      {/* Report User Modal */}
      <ReportUserModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        userName={activeConversation?.name || "User"}
        userId={activeConversation?.id || id}
        onReportSubmit={handleReportUser}
      />
    </div>
  );
}
