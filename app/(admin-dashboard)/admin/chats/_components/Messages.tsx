'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MessageBody from "./MessageBody";
import { useSearchParams } from "next/navigation";
import { conversationDirectory } from "@/public/demodata";
import { useParams } from "next/navigation";


export default function Messages() {
    const params = useParams();
    const id = params.id?.[0] || "";
    const [deletedConversationIds, setDeletedConversationIds] = useState<string[]>([]);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const router = useRouter();


    const availableConversationDirectory = conversationDirectory.filter(
        (item) => !deletedConversationIds.includes(item.id)
    );

    return (
        <div className="bg-[#f9f9f9] w-full h-full grid ">
            <div className="grid grid-rows-1 lg:grid-cols-[1fr_auto] min-h-0 gap-3 xm:gap-6 w-full h-full">
                <div className={`w-full grid min-h-0 ${id === "" ? "hidden xl:block" : ""} h-[calc(100vh-174px)] sm:h-[calc(100vh-218px)]`}>
                    <MessageBody />
                </div>
            </div>
        </div>
    )
}