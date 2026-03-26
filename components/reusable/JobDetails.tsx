"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { getJobStatusDefinition } from "@/lib/job-status";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

type JobDetailsCardProps = {
  title: string;
  image: string;
  status: "in_progress" | "in_revision" | "delivered" | "completed" | "cancelled" | "late" | "pending";
  timeLeft: TimeLeft;

  orderBy: string;
  deliveryDate?: string;
  totalPrice: number;
  orderNumber: string;
  jobId?: string;

  showDeliverNow?: boolean;
  onDeliverNow?: () => void;
  onMessage?: () => void;
  onExtendDelivery?: () => void;
};

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({
  title,
  image,
  status,
  timeLeft,
  orderBy,
  deliveryDate,
  totalPrice,
  orderNumber,
  showDeliverNow = false,
  onDeliverNow,
  onMessage,
  onExtendDelivery,
  jobId
}) => {
  const pathname = usePathname();
  return (
    <div className="w-full rounded-2xl bg-white p-6">
      <div className="border border-red-400 p-2 rounded-lg mb-4 bg-red-50 text-red-600 text-center">
        <TbAlertTriangleFilled className="text-yellow-400 inline text-xl" />
        <p className="inline"> You have already requested extensions that have pushed the original delivery date back by 10 days.</p>
      </div>
      {/* HEADER */}
      <h2 className="text-xl font-semibold mb-4">Job Actions</h2>

      {/* JOB INFO */}
      <div className="">
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <Image
              src={image}
              alt="job"
              width={500}
              height={500}
              className="rounded-md object-cover min-w-30 lg:min-w-20 aspect-square"
            />

            <div>
              <p className="text-sm text-gray-700">{title}</p>

              <span
                className={`inline-block mt-2 rounded-md px-3 py-1 text-sm font-medium capitalize ${getJobStatusDefinition(
                  status
                ).colorClass}`}
              >
                {status?.split("_").join(" ")}
              </span>
            </div>
          </div>

          {/* TIME LEFT */}
          <div>
            <p className="font-medium mb-3">Time Left to Complete the Job</p>

            <div className="flex items-stretch justify-between">
                <div className="flex-1 text-center py-2">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.days}</div>
                  <div className="text-[13px] text-gray-500">Days</div>
                </div>

                <div className="flex-1 text-center py-2">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.hours}</div>
                  <div className="text-[13px] text-gray-500">Hours</div>
                </div>

                <div className="flex-1 text-center py-2 ">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.minutes}</div>
                  <div className="text-[13px] text-gray-500">Minutes</div>
                </div>
              </div>

            {/* ACTIONS */}
            {onDeliverNow && status !== "cancelled" && status !== "completed" && status !== "delivered" && (
              <button
                onClick={onDeliverNow}
                className="w-full rounded-full bg-red-500 py-3 text-white font-medium hover:bg-red-600 transition cursor-pointer"
              >
                Deliver Now
              </button>
            )}

            {onMessage && (
              <button
                type="button"
                onClick={onMessage}
                className="mt-3 w-full block text-center rounded-full border border-red-500 py-3 text-red-500 font-medium hover:bg-red-50 transition cursor-pointer"
              >
                Message Client
              </button>
            )}

            {onExtendDelivery && status !== "cancelled" && status !== "completed" && status !== "delivered" && (
              <button
                onClick={onExtendDelivery}
                className="mt-3 w-full block text-center rounded-full bg-orange-500 border border-orange-500 py-3 text-white font-medium hover:bg-orange-700 transition cursor-pointer"
              >
                Extend Delivery Date
              </button>
            )}
          </div>
        </div>


        {/* DETAILS */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order By: </span>
            <span className="font-medium">{orderBy}</span>
          </div>

          {(status !== "pending") && <div className="flex justify-between">
            <span className="text-gray-500">{status === "delivered" ? "Delivered" : status === "completed" ? "Completed" : status === "cancelled" ? "Cancelled" : "Delivery Date"}:</span>
            {deliveryDate &&<span className="font-medium">{new Date(deliveryDate).toLocaleDateString('en-US',{
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}</span>}
          </div>}

          <div className="flex justify-between">
            <span className="text-gray-500">Total Price:</span>
            <span className="font-semibold">${totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsCard;
