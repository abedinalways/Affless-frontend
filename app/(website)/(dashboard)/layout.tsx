
'use client';

// External libraries
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// Internal components & hooks
import { useUser } from "@/context/UserContext";
import Loading from "@/components/shared/Loading";
import Footer from "@/components/shared/Footer/Footer";


export default function ClientLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    // Hooks
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const [loading, setLoading] = useState(true);

    // Query params
    const redirect = searchParams.get('redirect');
    const msg = searchParams.get('msg');

    useEffect(() => {
        if (user) {
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
            "as an Editor to create an editor profile"
        ];

        if (signupMsgs.includes(msg || "")) {
            toast.error(`Please sign up ${msg || 'to access the dashboard'}.`);
        } else {
            toast.error(`Please login ${msg || 'to access the dashboard'}.`);
        }

        if (signupMsgs.includes(msg || "")) {
            // Further split between client/editor
            const clientMsgs = [
                "as a client to post a job",
                "as a Client to browse for and find editors",
                "as a Client to browse for and hire editors",
                "as a Client to post a job",
                "as a Client to send messages to editors",
            ];
            if (clientMsgs.includes(msg || "")) {
                router.push(`/singup?redirect=${redirect || '/'}&type=client`);
                return;
            }
            router.push(`/singup?redirect=${redirect || '/'}&type=editor`);
        } else {
            router.push(`/login?redirect=${redirect || '/'}`);
        }
    }, []);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="w-full h-full grid grid-rows-[1fr_auto]">
            <Toaster position="top-right" />
            {children}
            <Footer />
        </div>
    );
}