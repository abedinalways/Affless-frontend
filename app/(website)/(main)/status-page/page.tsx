/** @format */

"use client";

import PageBanner from "@/components/reusable/Bgbanner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function StatusPage() {
  const router = useRouter();

  const handleContactSupport = () => {
    router.push("/contactus");
  };

  return (
    <div>
      <PageBanner
        title='Status Page'
        bgImage='/findEditor.jpg'
        links={[{ label: "Home", href: "/" }, { label: "Status Page" }]}
      />

      <div className='containers mx-auto py-12 lg:py-20'>
        <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-100'>
          <h2 className='text-[#333] font-poppins text-[28px] md:text-[32px] font-semibold leading-[120%] mb-4'>
            Status Page
          </h2>

          <p className='text-green-600 font-poppins text-[18px] md:text-[20px] font-medium leading-[150%] mb-8'>
            All Systems are Operational.
          </p>

          <div className='mb-8'>
            <h3 className='text-[#333] font-poppins text-[20px] md:text-[22px] font-semibold leading-[120%] mb-3'>
              Recent Updates
            </h3>
            <p className='text-[#4A4C56] font-poppins text-[16px] font-normal leading-[150%]'>
              No incidents reported.
            </p>
          </div>

          <p className='text-[#4A4C56] font-poppins text-[16px] font-normal leading-[150%] mb-6'>
            If you experience an issue, please contact support.
          </p>

          <Button
            onClick={handleContactSupport}
            size='lg'
            className='h-12 text-[16px] font-semibold w-full sm:w-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white'>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
