"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import PageBanner from "@/components/reusable/Bgbanner";
import JobDetailsPage from "@/components/ClientDashboard/GraphicsDesigner/JobDetailsPa";
import { JobRow } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import { ALL_JOBS } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import ExtendDelivery from "@/components/ClientEditor/ExtendDelivery/ExtendDelivery";
import ExtendDeliveryCard from "@/components/ClientDashboard/GraphicsDesigner/ExtendDeliveryCard";
import Link from "next/link";
import Loading from "@/components/shared/Loading";

type propType = {
  id: string;
}

export default function JobDetails({ id }: propType) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [job, setJob] = useState<JobRow | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const selected = ALL_JOBS.find((item) => item.id === id);
    setJob(selected || null);
  }, [id]);

  // Additional scroll to top after render
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timer);
  }, [job]);

  useEffect(() => {
    if (!job?.dueOn) return;

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(job.dueOn).getTime();
      const diff = Math.max(target - now, 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [job]);

  if (!job) return <div className="containers py-20">
    <Loading />
  </div>;

  return (
    <div>
      <PageBanner
        title={job.service}
        bgImage="/findEditor.jpg"
        links={[
          { label: "Dashboard", href: "/client" },
          { label: redirect === "/client/payment-history" ? "Payment History" : "Manage Jobs", href: redirect || "/client/manage-job" },
          { label: job.service, href: `/client/manage-job/${job.id}` },
        ]}
      />

      <div className="containers flex flex-col lg:flex-row gap-6 py-20">

        <div className="lg:w-2/3">
          <JobDetailsPage
            job={job}
          />
        </div>

        <div className="lg:w-1/3">
          <div className="p-6 bg-white shadow rounded-xl space-y-6 border">
            <h2 className="text-xl font-semibold">Job Details</h2>

            <div className="flex gap-4 items-start">
              <Image
                src={job.thumbnail}
                width={80}
                height={80}
                alt="Job"
                className="rounded-lg"
              />

              <div>
                <p>{job.service}</p>

                <span
                  className={`text-xs px-3 py-1 rounded-full mt-2 inline-block capitalize ${job.status === "in_revision"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {job.status?.split("_").join(" ")}
                </span>
              </div>
            </div>

            <hr />
            <div className="w-full max-w-[520px] bg-white">
              <h3 className="text-[18px] font-semibold text-black mb-4">
                Time Left Until Your Job Is Completed
              </h3>

              {/* Time Row */}
              <div className="flex items-stretch justify-between">
                <div className="flex-1 text-center py-2">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.days}</div>
                  <div className="text-[13px] text-gray-500">Days</div>
                </div>

                <div className="flex-1 text-center py-2 border-l border-gray-200">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.hours}</div>
                  <div className="text-[13px] text-gray-500">Hours</div>
                </div>

                <div className="flex-1 text-center py-2 border-l border-gray-200">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.minutes}</div>
                  <div className="text-[13px] text-gray-500">Minutes</div>
                </div>

                <div className="flex-1 text-center py-2 border-l border-gray-200">
                  <div className="text-[20px] font-semibold text-gray-700">{timeLeft.seconds}</div>
                  <div className="text-[13px] text-gray-500">Seconds</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-4">
                <div className="">
                  <Link href={`/client/delivery?id=${job.id}`}>
                    <button
                      className="w-full py-4 rounded-full bg-[#EAF7E5]  text-[#3BB54A] hover:bg-[#FFEDED] hover:text-[#FF4D4F] font-semibold hover:opacity-90 transition cursor-pointer"
                      type="button"
                    >
                      Delivery View
                    </button></Link>
                </div>

                <div className="w-full">
                  <Link href="/client/message"
                    className="w-full block text-center py-4 rounded-full bg-[#EAF7E5]  text-[#3BB54A] hover:bg-[#FFEDED] hover:text-[#FF4D4F]  font-semibold hover:opacity-90 transition cursor-pointer"
                    type="button"
                  >
                    Message Editor
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order by</span>
                <span>{job.customer}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Date</span>
                <span>{job.deliveryDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Price</span>
                <span>${Number(job.price).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Order Number</span>
                <span>{job.orderId}</span>
              </div>
            </div>
            {(job.status !== "completed" && job.status !== "cancelled") && <ExtendDeliveryCard />}

          </div>
        </div>

      </div>
    </div>
  );
}
