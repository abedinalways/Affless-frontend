'use client'

import { useAppSelector } from "@/lib/redux/hooks";
import React, { createContext, useContext, useEffect, ReactNode } from 'react';

interface UserContextType {
    user: string;
    setUser: (userType: string) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const authUser = useAppSelector((state) => state.auth.user);
    const user = authUser?.role || '';
    const loading = false;

    useEffect(() => {
        // Sync legacy call if needed
    }, []);

    const setUser = (_userType: string) => {
        // No-op: User type is now derived from Redux auth state
        // Actual user type changes only through login/auth actions
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
