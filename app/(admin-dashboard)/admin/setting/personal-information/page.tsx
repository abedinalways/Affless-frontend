'use client'

import { useRouter } from 'next/navigation';
import PersonalInformation from '@/components/AdminDashboard/settinng/PersonalInfo/PersonalInfo'
import React from 'react'

export default function PersonalInfoPage() {
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
        <PersonalInformation/>
    </div>
  )
}
