'use client';

import { useUser } from "@/context/UserContext";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

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


    useEffect(()=>{
        if(user === "client"){
            setLoading(false);
        }else if(user === "editor"){
            toast.error(`Please switch to a Client account ${msg || 'to access client dashboard'}.`);
            router.push('/editor');
        }else{
            toast.error(`Please login as client ${msg || 'to access client dashboard'}.`);
            router.push('/login?redirect=' + (redirect || '/'));
        }
    },[])

    if(loading){
        return(
            <div>
                <Loading />
            </div>
        )
    }
  return (
    <div>
        {children}
    </div>
  );
}