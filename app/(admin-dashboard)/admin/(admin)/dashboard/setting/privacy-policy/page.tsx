'use client'
import PrivacyPolice from '@/components/AdminDashboard/settinng/PrivacyPolicy/PrivacyPolicy'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  return (
    <div className='space-y-6'>
      <button
        type="button"
        onClick={() => router.back()}
        className="border px-4 py-0.5 rounded-lg bg-[#FF4D4F] text-white hover:bg-[#e2413c] transition cursor-pointer"
      >
        Back
      </button>
      <PrivacyPolice />
    </div>
  )
}
