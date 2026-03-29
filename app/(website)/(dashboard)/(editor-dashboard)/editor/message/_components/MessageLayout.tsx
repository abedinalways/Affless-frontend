"use client"

import Sidebar from "./Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { getRouteConfig, getRouteHref } from "@/helper/routes";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

export default function MessageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "";
    const redirectKeys = redirectUrl.split("_").filter(Boolean);
    const lastRedirectKey = redirectKeys[redirectKeys.length - 1];
    const redirectRoute = getRouteConfig(lastRedirectKey);
    const redirectHref = lastRedirectKey ? getRouteHref(lastRedirectKey) : "";
    const previousRedirect = redirectKeys.slice(0, -1).join("_");
    const router = useRouter();
    const [deletedConversationIds, setDeletedConversationIds] = useState<string[]>([]);

    return (
        <div className="w-full h-full p-4 containers bg-[#f9f9f9] grid grid-rows-[auto_1fr] gap-4" style={{
            minHeight: 'calc(100vh - 66px)'
        }}>
            <div className={`${redirectUrl ? "flex" : "hidden"} items-center gap-4`}>
                {redirectUrl && (
                    <button
                        type="button"
                        onClick={() => {
                            if (!redirectHref) {
                                return;
                            }

                            const nextHref = previousRedirect
                                ? `${redirectHref}?redirect=${previousRedirect}`
                                : redirectHref;

                            router.push(nextHref);
                        }}
                        className="w-fit flex items-center gap-2 font-medium bg-[#FF4D4F] text-white px-4 py-1 rounded-lg cursor-pointer"
                    >
                        <FaArrowLeft /> <span>Back to {redirectRoute?.label?.toString()}</span>
                    </button>
                )}
            </div>
            <div className="w-full h-full grid grid-cols-1 gap-6 relative overflow-hidden">
                <div className="w-full h-full grid grid-cols-[auto_1fr] gap-3 xl:gap-6">
                    <div className={`p-2 sm:p-4 bg-white w-fit h-full rounded-lg overflow-y-auto xl:w-full`}>
                        <Sidebar
                            hiddenConversationIds={deletedConversationIds}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}