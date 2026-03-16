'use client'
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function EditorLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const msg = searchParams.get('msg');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(user === "editor"){
            setLoading(false);
        }else if(user === "client"){
            toast.error(`Please switch to an editor account ${msg || 'to access the editor dashboard'}.`);
            router.push('/client');
        }else{
            toast.error(`Please login as an editor ${msg || 'to access the editor dashboard'}`);
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
    )
}