"use client";

export const dynamic = 'force-dynamic'

// External libraries
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// Internal components & hooks
import { CookieHelper } from "@/helper/cookie.helper";
import { COOKIE_KEYS } from "@/config/app.config";
import Loading from "@/components/shared/Loading";
import Footer from "@/components/shared/Footer/Footer";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const checkedRef = useRef(false);

  // Query params
  const redirect = searchParams.get("redirect");
  const msg = searchParams.get("msg");
  const currentPath = redirect || pathname;

  useEffect(() => {
    // Only run once
    if (checkedRef.current) return;
    checkedRef.current = true;

    // Check cookie directly
    const token = CookieHelper.get({ key: COOKIE_KEYS.ACCESS_TOKEN });
    const userCookie = CookieHelper.get({ key: COOKIE_KEYS.USER });

    if (token && userCookie) {
      setLoading(false);
      return;
    }

    // List of messages that require signup
    const signupMsgs = [
      "as editor to create profile",
      "as an Editor to browse and apply for jobs",
      "as a Client to browse for and find editors",
      "as a Client to browse for and hire editors",
      "as a Client to post a job",
      "as a Client to send messages to editors",
      "as an Editor to create an editor profile",
    ];

    if (signupMsgs.includes(msg || "")) {
      toast.error(`Please sign up ${msg || "to access the dashboard"}.`);
    } else {
      toast.error(`Please login ${msg || "to access the dashboard"}.`);
    }

    if (signupMsgs.includes(msg || "")) {
      const clientMsgs = [
        "as a client to post a job",
        "as a Client to browse for and find editors",
        "as a Client to browse for and hire editors",
        "as a Client to post a job",
        "as a Client to send messages to editors",
      ];
      if (clientMsgs.includes(msg || "")) {
        router.push(`/singup?redirect=${currentPath}&type=client`);
        return;
      }
      router.push(`/singup?redirect=${currentPath}&type=editor`);
    } else {
      router.push(`/login?redirect=${currentPath}`);
    }
  }, []); // Empty deps - only run once on mount

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-rows-[1fr_auto]">
      <Toaster position="top-right" />
      {children}
      <Footer />
    </div>
  );
}
