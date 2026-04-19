"use client"

import AdditionalPlatform from '@/components/MainPage/PaymentRules/AdditionPlatFrom'
import LongFormContent from '@/components/MainPage/PaymentRules/LongFromContent'
import PlatFromWide from '@/components/MainPage/PaymentRules/PlatFromWide'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import { useSearchParams } from 'next/navigation'
import { routes } from '@/helper/routes'

export default function PaymentRulesPage() {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect');
    return (
        <div className='containers'>
            <div className="space-y-10 my-8">
                {(redirectUrl?.split("_")?.slice(-1)[0] === "postajob" || redirectUrl?.split("_")?.slice(-1)[0] === "hireaneditor") && <div className="grid items-center my-4">
                    <Link
                        href={`${routes[redirectUrl?.split("_")?.slice(-1)[0]].href}?redirect=${redirectUrl ? redirectUrl?.split("_").slice(0, -1).join("_") : ""}`}
                        className="w-fit flex items-center gap-2 border px-5 py-3 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
                    >
                        <FaArrowLeft />
                        <span>Back to {routes[redirectUrl?.split("_")?.slice(-1)[0]].label.toString()}</span>
                    </Link>
                </div>}
                <div className="">
                    <PlatFromWide />
                </div>
                <div className="">
                    <LongFormContent />
                </div>
                <div className="">
                    <AdditionalPlatform />
                </div>
            </div>
        </div>
    )
}
