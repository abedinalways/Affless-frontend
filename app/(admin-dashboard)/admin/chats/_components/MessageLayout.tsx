"use client"

import Sidebar from "./Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { getRouteConfig, getRouteHref } from "@/helper/routes";
import { FaArrowLeft } from "react-icons/fa";
import { conversationDirectory } from "@/public/demodata";



export default function MessageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className={`w-full min-h-0 grid gap-4`}>
            <div className="w-full h-full min-h-0 grid grid-cols-1 gap-6 relative overflow-hidden">
                <div className="w-full h-full min-h-0 grid grid-cols-[auto_1fr]">
                    <div className={`p-2 sm:p-4 bg-white w-fit max-w-[290px] min-h-0 rounded-lg overflow-y-auto xl:w-full h-[calc(100vh-174px)] sm:h-[calc(100vh-218px)]`}>
                        <Sidebar />
                    </div>
                    <div className="h-full min-h-0 w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}