'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MessageBody from "./MessageBody";
import ReportUserModal from "@/components/reusable/ReportUserModal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AdditionalActions from "./AdditionalActions";

type PropType = {
    id: string;
}

export default function Messages({ id }: PropType) {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
                    <MessageBody />
                </div>
                <AdditionalActions
                    onReportUser={() => setIsReportModalOpen(true)}
                />
            </div>

            {/* Report User Modal */}
            <ReportUserModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                userName={"User"}
                userId={id}
                onReportSubmit={handleReportUser}
            />
        </div>
    )
}