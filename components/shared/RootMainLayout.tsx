'use client'

import React from "react";
import NavbarWithoutLogin from "@/components/shared/Navbar/NavbarWithoutLogin";
import ClientDashboardHeader from "@/components/shared/ClientDashboardHeader/ClinetDashboardHeaader";
import EditorDashboardHeader from "@/components/shared/EditorDashboardHeader/EditorDashboardHeader";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loading from "./Loading";

const RootMainLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    const pathname = usePathname();

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <div className={`fixed w-full z-999 ${pathname === '/login' || pathname === '/singup' ? 'hidden' : ''}`}>
                {user === "client" ?
                    <ClientDashboardHeader />
                    : user === "editor" ?
                        <EditorDashboardHeader />
                        :
                        <NavbarWithoutLogin />
                }
            </div>
            <div className="">
                {children}
            </div>
        </div>
    );
};

export default RootMainLayout;