'use client'
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditorLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if(user === "client"){
            toast.error("Switch to editor account to access editor dashboard");
            router.push('/client')
        }else if(user === "editor"){
            setLoading(false);
        }else{
            toast.error("Please login to access editor dashboard");
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
    )
}