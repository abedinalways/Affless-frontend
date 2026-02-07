'use client'

import { SettingsIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiNotification } from 'react-icons/bi';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ConfirmationPopup from '@/components/shared/ConfirmationPopup';
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
    const [showLogoutPopup, setShowLogoutPopup] = React.useState(false);
    const router = useRouter();
    const handleLogout = () => {
        setShowLogoutPopup(false);
        router.push('/login?redirect=admin');
    };

    return (
        <div className='w-full bg-[#FF4D4F] h-[106px] p-[19px] rounded-xl'>
            {/* <div id="header-title"></div> */}
            <div className='flex justify-between text-white'>
                <div>
                    <h3 className='text-lg sm:text-[24px] font-semibold leading-150%'>Welcome, Admin</h3>
                    <p className='text-sm sm:text-[16px] font-normal leading-150% pt-2'>Have a nice day</p>
                </div>
                <DropdownMenu>
                    <div className='flex gap-2.5 justify-center items-center cursor-pointer'>
                        <Link href="/admin/notification">
                            <MdOutlineNotificationsActive className='flex justify-center items-center w-6 h-6' />
                        </Link>
                        <DropdownMenuTrigger asChild>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-2.5'>
                                <div className='flex gap-8'>
                                    <Image src="/images/headset.svg" alt='profile' height={53} width={53}></Image>
                                </div>
                                <p className='text-[16px] font-normal leading-150% text-center'>Headset</p>
                            </div>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/admin/setting/personal-information" className='w-full cursor-pointer'>Admin Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/admin/setting" className='w-full cursor-pointer'>Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setShowLogoutPopup(true)}>
                            <button type="button" className='cursor-pointer w-full text-start'>Logout</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {showLogoutPopup && <ConfirmationPopup isOpen={showLogoutPopup} title="Are you sure?" description="You want to logout?" onCancel={() => setShowLogoutPopup(false)} onConfirm={handleLogout} cancelText="Cancel" confirmText="Logout" />}
        </div>
    );
};

export default DashboardHeader;