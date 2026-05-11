"use client"

import Sidebar from "./Sidebar";
import MessageContextProvider from "./AdminMessageContext";
import { useRouter, useSearchParams } from "next/navigation";
import { getRouteConfig, getRouteHref } from "@/helper/routes";
import { FaArrowLeft } from "react-icons/fa6";



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
    return (
        <div className={`w-full border min-h-0 p-4 containers bg-[#f9f9f9] grid ${redirectUrl ? "grid-rows-[auto_1fr]" : "grid-rows-1"} gap-4`}>
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
            <div className="w-full h-full min-h-0 grid grid-cols-1 gap-6 relative overflow-hidden">
                <MessageContextProvider>
                    <div className="w-full h-full min-h-0 grid grid-cols-[auto_1fr]">
                        <div className={`p-2 sm:p-4 bg-white w-fit max-w-[290px] min-h-0 rounded-lg overflow-y-auto xl:w-full h-[calc(100vh-174px)] sm:h-[calc(100vh-218px)]`}>
                            <Sidebar />
                        </div>
                        <div className="h-full min-h-0 w-full">{children}</div>
                    </div>
                </MessageContextProvider>
            </div>
        </div>
    );
}