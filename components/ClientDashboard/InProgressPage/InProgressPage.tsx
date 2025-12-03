import React from 'react'
import JobDetailsPage from '../GraphicsDesigner/JobDetailsPa'
import PageBanner from '@/components/reusable/Bgbanner'
import Image from 'next/image';

interface Props {
  title: string;
  status: "In Progress" | "Completed" | "Cancelled";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  customer: string;
  deliveryDate: string;
  price: number;
  orderId: string;
}


export default function InProgressPage({
  title,
  status,
  days,
  hours,
  minutes,
  seconds,
  customer,
  deliveryDate,
  price,
  orderId,
}: Props) {
  return (
    <div className=''>

           <div>
                <PageBanner
          title="Graphic Designer for ongoing job"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/" },
            { label: "Manage Job", href:"/client/manage-job" },
            { label: "Graphic Designer for ongoing job", href:"/pricing" },

          ]}
        />
              </div>
   <div className='flex flex-col lg:flex-row  containers gap-6 py-20'>
      <div className=" order-1 lg:order-0 lg:w-2/3 w-full">
        <JobDetailsPage/>
     </div>
     <div className=''>
         <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border">
      <h2 className="text-xl font-semibold">Job Details</h2>

      <div className="flex gap-4 items-start">
        <Image
          src="/images/vedio.png.jpg" // replace with your image
          width={80}
          height={80}
          className="rounded-lg"
          alt="Job thumbnail"
        />

        <div className="flex-1">
          <p className="text-[16px] text-[#333]">{title}</p>

          <span
            className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
              status === "In Progress"
                ? "bg-green-100 text-green-700"
                : status === "Completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <hr />

      {/* Time Left */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Time left To Deliver</p>

        <div className="grid grid-cols-4 text-center">
  <div>
    <p className="text-lg font-semibold">
      {String(days ?? 0).padStart(2, "0")}
    </p>
    <p className="text-xs text-gray-500">Days</p>
  </div>

  <div>
    <p className="text-lg font-semibold">
      {String(hours ?? 0).padStart(2, "0")}
    </p>
    <p className="text-xs text-gray-500">Hours</p>
  </div>

  <div>
    <p className="text-lg font-semibold">
      {String(minutes ?? 0).padStart(2, "0")}
    </p>
    <p className="text-xs text-gray-500">Minutes</p>
  </div>

  <div>
    <p className="text-lg font-semibold">
      {String(seconds ?? 0).padStart(2, "0")}
    </p>
    <p className="text-xs text-gray-500">Second</p>
  </div>
</div>

      </div>

      {/* Message Button */}
      <button className="w-full py-3 text-center rounded-full bg-red-50 text-red-500 border border-red-300">
        Message
      </button>

      <p className="text-center text-xs text-gray-400">Extend delivery date</p>

      <hr />

      {/* Order Info */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Order by</span>
          <span className='text-[16px] font-medium leading-150%'>{customer}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery date:</span>
          <span className='text-[16px] font-medium leading-150%'>{deliveryDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Total Price</span>
          <span className='text-[16px] font-medium leading-150%'>${price}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Order Number</span>
          <span className='text-[16px] font-medium leading-150%'>{orderId}</span>
        </div>
      </div>
    </div>
     </div>
   </div>
    </div>
  )
}
