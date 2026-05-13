"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import MessageBody from "@/components/message/MessageBody";
import AdditionalActions from "./AdditionalActions";
import ReportUserModal from "@/components/message/ReportUserModal";
import { useMessageContext } from "@/components/message/MessageContext";

export default function Messages() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const params = useParams();
  const id = params?.id as string;
  const { activeConversation } = useMessageContext();

  const handleReportUser = async (reportData: any) => {
    try {
      // const response = await UserService.reportUser(reportData);
      // if (response.status === 201 || response.status === 200) {
      //     // Report submitted successfully
      //     console.log("Report submitted successfully", response);
      // } else {
      //     throw new Error("Failed to submit report");
      // }
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
          className={`grid min-h-0 w-full ${(id as string) === "" ? "hidden xl:block" : ""} h-[calc(100vh-174px)] sm:h-[calc(100vh-218px)]`}
        >
          <MessageBody />
        </div>
        <AdditionalActions onReportUser={() => setIsReportModalOpen(true)} />
      </div>
      <ReportUserModal
        isOpen={isReportModalOpen}
        userId={id}
        userName={activeConversation?.name || ""}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmit={handleReportUser}
      />
    </div>
  );
}
