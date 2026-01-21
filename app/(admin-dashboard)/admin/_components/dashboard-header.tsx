import { SettingsIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiNotification } from 'react-icons/bi';
import { MdOutlineNotificationsActive } from 'react-icons/md';

const DashboardHeader = () => {
    return (
         <div className='w-full bg-[#FF4D4F] h-[106px] p-[19px] rounded-xl'>
            {/* <div id="header-title"></div> */}
            <div className='flex justify-between text-white'>
                <div>
                <h3 className='text-[24px] font-semibold leading-150%'>Welcome,hedset</h3>
                <p className='text-[16px] font-normal leading-150% pt-2'>Have a nice day</p>
            </div>
            <div className='flex  gap-2.5 justify-center items-center'>
                <div className='flex gap-8'>
                  <Link href="/admin/notification">
                    <MdOutlineNotificationsActive className='flex justify-center items-center mt-4 w-6 h-6'/></Link>
                <Image src="/images/headset.svg" alt='profile' height={53} width={53}></Image>
                </div>
                <p className='text-[16px] font-normal leading-150%'>Hedset</p>
            </div>

            </div>
         </div>
    );
};

export default DashboardHeader;