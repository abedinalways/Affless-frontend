"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type JobDetailsCardProps = {
  title: string;
  image: string;
  status: string;
  timeLeft: TimeLeft;

  orderBy: string;
  deliveryDate: string;
  totalPrice: number;
  orderNumber: string;
  jobId?: string;

  showDeliverNow?: boolean;
  onDeliverNow?: () => void;
  onMessage?: () => void;
  onExtendDelivery?: () => void;
};

const statusStyleMap: Record<string, string> = {
  pending: "bg-[#FFF7E6] text-[#FAAD14]",
    in_progress: "bg-[#E6F4FF] text-[#1677FF]",
    delivered: "bg-[#F6FFED] text-[#52C41A]",
    completed: "bg-[#D9F7BE] text-[#237804]",
    cancelled: "bg-[#FFF1F0] text-[#F5222D]",
};

const getStatusClasses = (status: string) => {
  const key = status?.toLowerCase?.() ?? "";
  return (
    statusStyleMap[key] ||
    "bg-gray-100 text-gray-600"
  );
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
                className={`inline-block mt-2 rounded-md px-3 py-1 text-sm font-medium capitalize ${getStatusClasses(
                  status
                )}`}
              >
                {status?.split("_").join(" ")}
              </span>
            </div>
          </div>

          {/* TIME LEFT */}
          <div>
            <p className="font-medium mb-3">Time Left to Complete the Job</p>

            <div className="grid grid-cols-3 text-center gap-2 mb-6">
              {[
                { label: "Day", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-lg font-semibold">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
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
              <Link href={`/editor/message?return=${pathname === "/editor/extend-delivery" ? "/editor/extend-delivery&jobid=" + jobId : pathname === "/editor/delivery" ? "back_to_delivery" : "back_to_job_details"}`}
                className="mt-3 w-full block text-center rounded-full border border-red-500 py-3 text-red-500 font-medium hover:bg-red-50 transition cursor-pointer"
              >
               Message Client
              </Link>
            )}

            {onExtendDelivery && status !== "cancelled" && status !== "completed" && status !== "delivered" && (
              <button
                onClick={onExtendDelivery}
                className="mt-3 w-full text-sm underline text-gray-500 cursor-pointer"
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

          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Date:</span>
            <span className="font-medium">{deliveryDate}</span>
          </div>

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
