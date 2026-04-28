'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MessageBody from "./MessageBody";
import ReportUserModal from "@/components/reusable/ReportUserModal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AdditionalActions from "./AdditionalActions";
import { useMessageContext } from "./MessageLayout";
import { UserService } from "@/usersService/user.service";

type PropType = {
    id: string;
}

export default function Messages({ id }: PropType) {
    const { conversationDirectory, onReportConversation } = useMessageContext();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "";
    const [deletedConversationIds, setDeletedConversationIds] = useState<string[]>([]);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const router = useRouter();


    const availableConversationDirectory = conversationDirectory.filter(
        (item) => !deletedConversationIds.includes(item.id)
    );

    const activeConversation = availableConversationDirectory.find(
        (item) => item.id === id
    );

    const handleReportUser = async (reportData: any) => {
        try {
            onReportConversation();
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message || "Failed to submit report";
            throw new Error(errorMessage);
        }
    }

    return (
        <div className="bg-[#f9f9f9] w-full h-full grid ">
            <div className="grid grid-rows-1 lg:grid-cols-[1fr_auto] min-h-0 gap-3 xm:gap-6 w-full h-full">
                <div className={`w-full h-full grid min-h-0 ${id === "" ? "hidden xl:block" : ""}`} style={{
                    height: 'calc(100vh - 148px)'
                }}>
                    <MessageBody
                        conversationId={id}
                        onReportUser={() => setIsReportModalOpen(true)}
                    />
                </div>
                <AdditionalActions
                    activeConversation={activeConversation}
                    conversationId={id}
                    onReportUser={() => setIsReportModalOpen(true)}
                />
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
    )
}