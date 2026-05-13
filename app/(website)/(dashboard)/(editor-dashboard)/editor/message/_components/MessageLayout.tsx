"use client";

import Sidebar from "./Sidebar";
import MessageContextProvider from "@/components/message/MessageContext";
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
    <div
      className={`containers grid min-h-0 w-full border bg-[#f9f9f9] p-4 ${redirectUrl ? "grid-rows-[auto_1fr]" : "grid-rows-1"} gap-4`}
    >
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
            className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#FF4D4F] px-4 py-1 font-medium text-white"
          >
            <FaArrowLeft />{" "}
            <span>Back to {redirectRoute?.label?.toString()}</span>
          </button>
        )}
      </div>
      <div className="relative grid h-full min-h-0 w-full grid-cols-1 gap-6 overflow-hidden">
        <MessageContextProvider>
          <div className="grid h-full min-h-0 w-full grid-cols-[auto_1fr]">
            <div
              className={`h-[calc(100vh-174px)] min-h-0 w-full max-w-[280px] overflow-y-auto rounded-lg bg-white p-2 sm:h-[calc(100vh-218px)] sm:p-4 xl:w-full`}
            >
              <Sidebar />
            </div>
            <div className="h-full min-h-0 w-full">{children}</div>
          </div>
        </MessageContextProvider>
      </div>
    </div>
  );
}
