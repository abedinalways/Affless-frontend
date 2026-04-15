"use client"

import ArrowLeftIcon from '@/components/Icons/arrowleftIcon'
import { CookieHelper } from '@/helper/cookie.helper'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function page() {
  const AccountType = CookieHelper.get({ key: "user" });
  const [userType, setUserType] = useState<{ status?: string; user_type?: string } | null>(null);
  useEffect(() => {
    if (AccountType) {
      setUserType(JSON.parse(AccountType));
    }
  }, [AccountType])
  return (
    <div>
      <div className="containers flex flex-col md:flex-row  justify-center items-center h-screen gap-10 pt-8">
        {/* Left Content */}
        <div className="space-y-4 max-w-lg order-1 md:order-0">
          <h3 className="text-black font-medium text-[48px] leading-[120%] font-poppins">
            Oops...
          </h3>

          <p className="text-black font-normal text-[24px] leading-[150%] font-poppins">
            Page Not Found
          </p>

          <p className="text-[#4B4B4B] font-normal text-[18px] leading-[150%] font-poppins">
            This page doesn't exist or was removed! <br /> We suggest you go back to the {userType?.user_type === "client" ? "Client Dashboard" : userType?.user_type === "editor" ? "Editor Dashboard" : userType?.user_type === "admin" ? "Admin Dashboard" : "Home page"}.
          </p>
          <Link href={userType?.user_type === "client" ? "/client" : userType?.user_type === "editor" ? "/editor" : userType?.user_type === "admin" ? "/admin-dashboard" : "/"}>
            <button className="text-white font-normal text-[16px] leading-[150%] font-poppins bg-[#FF4D4F] px-4 py-2.5 rounded-lg mt-[54px] flex items-center gap-1.5 cursor-pointer">
              <ArrowLeftIcon />
              Back to {userType?.status !== "logged_in" ? "Home" : "Dashboard"}
            </button>
          </Link>
        </div>

        {/* Image */}
        <div>
          <Image
            src="/images/errorPage.png"
            alt="error"
            width={431}
            height={500}
            className=''
          />
        </div>
      </div>
    </div>
  )
}
