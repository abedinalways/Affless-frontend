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
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";
import { getJobStatusDefinition } from "@/lib/job-status";
import { TbAlertTriangleFilled } from "react-icons/tb";

type propType = {
  id: string;
}

export default function JobDetails({ id }: propType) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [job, setJob] = useState<JobRow | null>(null);

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

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
  useEffect(() => {
    if (!job) return;
    setBannerLinks(buildSourceBreadcrumbs(redirect, {
      currentLabel: job.service,
      fallbackBase: [{ label: "Home", href: "/" }],
    }));
  }, [redirect, job]);

  if (!job) return <div className="containers py-20">
    <Loading />
  </div>;

  return (
    <div>
      <PageBanner
        title={job.service}
        bgImage="/findEditor.jpg"
        links={bannerLinks}
      />

      <div className="containers flex flex-col lg:flex-row gap-6 py-20">

        <div className="lg:w-2/3">
          <JobDetailsPage
            job={job}
          />
        </div>

        <div className="lg:w-1/3">
          <div className="p-6 bg-white shadow rounded-xl space-y-6 border">
            <div className="border border-yellow-400 p-2 rounded-lg mb-4 bg-yellow-50 text-yellow-600 text-center">
              <TbAlertTriangleFilled className="text-yellow-400 inline text-xl" />
              <p className="inline"> The editor requested an extension. The delivery date has been moved by 10 days.</p>
            </div>
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
                  className={`text-xs px-3 rounded-full mt-2 inline-block capitalize leading-0 py-2.5 ${getJobStatusDefinition(job.status)?.colorClass}`}
                >
                  {job.status?.split("_").join(" ")}
                </span>
              </div>
            </div>

            <hr />
            <div className="w-full max-w-[520px] bg-white">
              <h3 className="text-[18px] font-semibold text-black mb-4">
                {job.status === "late" ? "Delivery Status" : "Time Left to Complete the Job"}
              </h3>

              {/* Time Row */}
              {job.status === "late" ?
                <div className="text-center text-[20px] font-semibold text-red-500">
                  {job.timeLeft.days === 0 ?
                    <p>{Math.abs(job.timeLeft.hours)} Hours Overdue</p>
                    :
                    <p>{Math.abs(job.timeLeft.days)} Days Overdue</p>
                  }
                  <p className="text-sm font-normal text-gray-500">Your editor is still working on this order. You’ll be notified as soon as it’s delivered.</p>
                </div>
                :
                <div className="flex items-stretch justify-between">
                  <div className="flex-1 text-center py-2">
                    <div className="text-[20px] font-semibold text-gray-700">{job.timeLeft.days}</div>
                    <div className="text-[13px] text-gray-500">Days</div>
                  </div>

                  <div className="flex-1 text-center py-2">
                    <div className="text-[20px] font-semibold text-gray-700">{job.timeLeft.hours}</div>
                    <div className="text-[13px] text-gray-500">Hours</div>
                  </div>

                  <div className="flex-1 text-center py-2 ">
                    <div className="text-[20px] font-semibold text-gray-700">{job.timeLeft.minutes}</div>
                    <div className="text-[13px] text-gray-500">Minutes</div>
                  </div>
                </div>
              }

              {/* Buttons */}
              <div className="mt-6 space-y-4">
                <div className="">
                  <Link href={`/client/delivery?redirect=${redirect ? redirect + "_" : ""}managejobdetails:${id}&id=${job.id}`}>
                    <button
                      className="w-full py-4 rounded-full bg-[#EAF7E5]  text-[#3BB54A] hover:bg-[#FFEDED] hover:text-[#FF4D4F] font-semibold hover:opacity-90 transition cursor-pointer"
                      type="button"
                    >
                      Delivery View
                    </button></Link>
                </div>

                <div className="w-full">
                  <Link href={`/client/message/3?redirect=${redirect ? redirect + "_" : ""}managejobdetails:${id}`}
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
                <span className="text-gray-500">Order By:</span>
                <span>{job.customer}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Date:</span>
                <span>{job.deliveryDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Price:</span>
                <span>${Number(job.price).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Order Number:</span>
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
