'use client';

import { useUser } from "@/context/UserContext";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/shared/Footer/Footer";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const msg = searchParams.get('msg');
    const [loading, setLoading] = useState(true);
    const { user } = useUser();


    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            if(msg === "as a client to post a job" || msg === "as editor to create profile"){
                toast.error(`Please sign up ${msg || 'to access the dashboard'}.`);
            }else{
                toast.error(`Please login ${msg || 'to access the dashboard'}.`);
            }
            if(msg === "as a client to post a job" || msg === "as editor to create profile"){
                if(msg === "as a client to post a job"){
                    router.push('/singup?redirect=' + (redirect || '/') + "&type=client");
                    return;
                }
                router.push('/singup?redirect=' + (redirect || '/') + "&type=editor");
            }else{
                router.push('/login?redirect=' + (redirect || '/'));
            }
        }
    }, [])

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }
    return (
        <div className="w-full h-full grid grid-rows-[1fr_auto]">
            <Toaster position="top-right"/>
            {children}
            <Footer />
        </div>
    );
}