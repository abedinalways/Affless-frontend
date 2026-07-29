'use client'

import React from "react";
import NavbarWithoutLogin from "@/components/shared/Navbar/NavbarWithoutLogin";
import ClientDashboardHeader from "@/components/shared/ClientDashboardHeader/ClinetDashboardHeaader";
import EditorDashboardHeader from "@/components/shared/EditorDashboardHeader/EditorDashboardHeader";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loading from "./Loading";
import { Toaster } from "react-hot-toast";

const RootMainLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    const pathname = usePathname();

    return (
        <div>
            <Toaster position="top-right" />
            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div className="w-full h-screen grid grid-rows-[auto_1fr]">
                    <div className={`sticky top-0 w-full z-49 ${pathname === '/login' || pathname === '/singup' || pathname === '/forgetpassword' || pathname === '/otp' || pathname === '/resetPassword' ? 'hidden' : ''}`}>
                        {user === "client" ?
                            <ClientDashboardHeader />
                            : user === "editor" ?
                                <EditorDashboardHeader />
                                :
                                <NavbarWithoutLogin />
                        }
                    </div>
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RootMainLayout;