"use client";

import PageBanner from "@/components/reusable/Bgbanner";
import JobDetailsCard from "@/components/reusable/JobDetails";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function ExtendDelivery() {
  const [message, setMessage] = useState("");
  const [days, setDays] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobid") || "";

  const handleSubmit = () => {
    console.log({ message, days, file });
    toast("Extension request sent. \n\n The client has been notified and will review your request.", {
      icon: "✅"
    })
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  return (
    <div className="">
      <div>
        <PageBanner
          title="Extend Delivery Date"
          bgImage="/findEditor.jpg"
          links={[
            { label: "I will craft quality backlinks for your website's SEO.", href: "/editor/myproposal/1" },
            { label: "Extend Delivery Date" }
          ]}
        />
      </div>
      <div className="containers py-10">
        <button type="button" onClick={() => router.push(`/editor/myproposal/${jobId}`)} className="bg-red-500 text-white px-4 py-1 rounded-lg flex items-center gap-1 cursor-pointer"> <FaArrowLeft />
          Back</button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
          <div className="bg-white p-6 rounded-xl lg:col-span-2">
            <h1 className="text-2xl font-semibold mb-6">
              Request Delivery Extension
            </h1>

            <p className="text-sm font-medium mb-2">Write your request here...</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your extension request in detail..."
              className="w-full border rounded-lg p-3 min-h-[120px]"
            />

            <p className="text-sm font-medium mt-6 mb-2">Attachments (Optional)</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full border rounded-lg p-2"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-sm font-medium mb-2">
                  How many days do you want to add to the original date?
                </p>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full border rounded-lg p-3"
                >
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={6}>6 Days</option>
                  <option value={7}>7 Days</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Original Date</p>
                <p className="text-gray-600">November 6, 2026</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-8 bg-red-500 text-white py-3 rounded-lg font-semibold cursor-pointer"
            >
              Send Request
            </button>
          </div>

          {/* ✅ 2nd div = 1 col */}
          <div className="lg:col-span-1">
            <JobDetailsCard
              title="I will craft quality backlinks for your website's SEO."
              image="/images/vedio.png.jpg"
              status="in_progress"
              timeLeft={{ days: 1, hours: 2, minutes: 3, seconds: 4 }}
              orderBy="Bessie"
              deliveryDate="November 6, 2026"
              totalPrice={743}
              orderNumber="#123"
              onMessage={() => console.log("Message clicked")}
              jobId={jobId}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
