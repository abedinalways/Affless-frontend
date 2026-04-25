"use client"

import AddMoney from '@/components/ClientDashboard/AddMoney/AddMoney'
import PageBanner from '@/components/reusable/Bgbanner'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react'

type Step = "BALANCE" | "ADD_MONEY" | "PAYMENT";

export default function AddMoneyPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const [step, setStep] = useState<Step>("BALANCE");
  return (
    <div>
      <div>
        <PageBanner
          title="Add Money"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Dashboard", href: "/client" },
            { label: "Add Money", href: "#" },
          ]}
        />
      </div>
      {(redirectUrl.includes("dashboardclient") && step === "BALANCE") && <div className="grid items-center justify-start px-6 pt-6 containers">
        <Link
          href={`${redirectUrl.includes("dashboardclient") ? "/client" : ""}?redirect=${redirectUrl ? redirectUrl?.split("_").slice(0, -1).join("_") : ""}`}
          className="flex items-center gap-2 border px-5 py-3 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </Link>
      </div>}
      <AddMoney currentStep={step} setStep={setStep} />
    </div>
  )
}
