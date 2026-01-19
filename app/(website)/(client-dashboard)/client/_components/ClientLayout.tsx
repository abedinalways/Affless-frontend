'use client';

import { useUser } from "@/context/UserContext";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ClientLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user } = useUser();


    useEffect(()=>{
        if(user === "client"){
            setLoading(false);
        }else if(user === "editor"){
            toast.error("Switch to client account to access this page");
            router.push('/editor');
        }else{
            toast.error("You must be logged in to access this page");
            router.push('/login');
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