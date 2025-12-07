"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import PageBanner from "@/components/reusable/Bgbanner";
import JobDetailsPage from "@/components/ClientDashboard/GraphicsDesigner/JobDetailsPa";
import { ALL_JOBS, JobRow } from "@/components/ClientDashboard/ManageJob/ManageJob";


export default function JobInProgressPage() {
  const { id } = useParams();
  const [job, setJob] = useState<JobRow | null>(null);

  useEffect(() => {
    const selected = ALL_JOBS.find((item) => item.id === Number(id));
    setJob(selected || null);
  }, [id]);

  if (!job) return <div className="containers py-20">Loading...</div>;

  return (
    <div>
      <PageBanner
        title="Graphic Designer for ongoing job"
        bgImage="/findEditor.jpg"
        links={[
          { label: "Home", href: "/" },
          { label: "Manage Job", href: "/client/manage-job" },
          { label: job.service, href: `/client/manage-job/${job.id}` },
        ]}
      />

      <div className="containers flex flex-col lg:flex-row gap-6 py-20">

        <div className="lg:w-2/3">
          <JobDetailsPage />
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
                  className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
                    job.status === "In Progress"
                      ? "bg-green-100 text-green-700"
                      : job.status === "In Revision"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>

            <hr />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order by</span>
                <span>{job.customer}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery date</span>
                <span>{job.deliveryDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Price</span>
                <span>${job.price}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Order Number</span>
                <span>{job.orderId}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
