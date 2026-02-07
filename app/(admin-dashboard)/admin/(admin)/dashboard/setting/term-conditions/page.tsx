'use client'

import TermsCondition from '@/components/AdminDashboard/settinng/TermsConditon/TermsCondition'
import React from 'react';
import { useRouter } from 'next/navigation';

export default function TermsConditionPage() {
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
        <TermsCondition/>
    </div>
  )
}
