'use client'

import CheckCircelIcon from '@/components/Icons/CheckCircelIcon';
import PageBanner from '@/components/reusable/Bgbanner'
import { CheckCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { SidebarDataType } from '@/app/(admin-dashboard)/admin/_components/Dashboard-sidebar';
import { useUser } from '@/context/UserContext';

const pricingPlans = [
  {
    title: "Free",
    price: "$0/month",
    description:
      "Get started with standard visibility and explore the core features.",
    features: [
      "Standard visibility in search and Quick-Match results",
      "No profile or job boosting",
    ],
    buttonLabel: "Get Started",
  },
  {
    title: "Starter",
    price: "$19/month",
    description:
      "Gain higher visibility and stand out from standard listings.",
    features: [
      "+25% visibility in search and Quick-Match results",
      "Higher matching priority in Quick-Match",
    ],
    buttonLabel: "Subscribe",
  },
  {
    title: "Growth",
    price: "$49/month",
    description:
      "Reach more clients with significantly enhanced exposure.",
    features: [
      "+75% visibility in search and Quick-Match results",
      "Boosted badge displayed on profile and job posts",
      "High-priority placement in Quick-Match",
    ],
    buttonLabel: "Subscribe",
  },
  {
    title: "Pro",
    price: "$99/month",
    description:
      "Dominate the marketplace and maximize your visibility with top-tier placement.",
    features: [
      "Top-tier visibility (+150%) across search and Quick-Match results",
      "Priority badge displayed on profile and job posts",
      "Always appear in the top search placements",
      "Highest-priority placement in Quick-Match",
    ],
    buttonLabel: "Subscribe",
  },
];


export default function Pricing() {
  const router = useRouter();
  const { user } = useUser();
  const handleClick = (label: string) => {
    if (user) {
      if(label === 'Get Started'){
        router.push(`/${user}`)
      }else{
        toast('Subscription feature coming soon!');
      }
    }else{
      router.push('/singup');
    }
  };

  return (
    <div>
      <div>
        <PageBanner

          title="Pricing"
          bgImage="/findEditor.jpg"
          links={[
            { label: user?"Dashboard":"Home", href: user ? `/${user}` : "/" },
            { label: "Pricing" }
          ]}
        />
      </div>

      <div className="containers mx-auto py-8 lg:py-20">

        <div className='text-center mb-10'>
          {/* <Toaster position="top-right" /> */}
          <h3 className="text-[#333] text-center font-poppins text-[40px] md:text-[45px] lg:text-[56px] font-medium leading-[120%]">Pricing Plans</h3>
          <p className="text-[#4A4C56] text-center font-poppins text-[24px] font-normal leading-[150%] mt-6">Choose the plan that fits your needs and increase your visibility in the <br /> marketplace</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-[0_5px_30px_rgba(0,0,0,0.1)] rounded-3xl px-6 py-4 flex flex-col justify-between"
            >
              {/* Title & Price */}
              <div>
                <h2 className=" text-[#333] text-center font-poppins text-[20px] lg:text-[28px] font-medium leading-[130%]">
                  {plan.title}
                </h2>

                <p className="text-center text-red-500 text-xl font-medium mt-1">
                  {plan.price}
                </p>

                <p className="text-center text-gray-600 mt-3 text-sm leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3 text-gray-800">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircelIcon

                        className="text-red-500 shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Button */}
              <button
              type='button'
              onClick={() => handleClick(plan.buttonLabel)}
                className="
                w-full mt-8 p-2.5 rounded-xl font-medium border border-red-400 text-black 
                hover:bg-red-500  hover:text-white transition-all duration-300 cursor-pointer
              "
              >
                {plan.buttonLabel}
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
