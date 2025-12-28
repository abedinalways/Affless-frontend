"use client";

import JobDetailsCard from "@/components/reusable/JobDetails";
import React, { useState } from "react";

export default function ExtendDelivery() {
  const [message, setMessage] = useState("");
  const [days, setDays] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    console.log({ message, days, file });
    alert("Sent! (check console)");
  };

  return (
    <div className="containers py-10">
      {/* ✅ Desktop এ 3 col, mobile এ 1 col */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
        
        {/* ✅ 1st div = 2 col */}
        <div className="bg-white p-6 rounded-xl lg:col-span-2">
          <h1 className="text-2xl font-semibold mb-6">
            Request: Extend Delivery Date
          </h1>

          <p className="text-sm font-medium mb-2">Write your request here..</p>
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
                How many days do you want to add to original date?
              </p>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full border rounded-lg p-3"
              >
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days</option>
                <option value={5}>5 Days</option>
                <option value={7}>7 Days</option>
              </select>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Original Date</p>
              <p className="text-gray-600">12 Jan 2024</p>
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
  image="/images/job.png"
  status="Progress"
  timeLeft={{ days: 1, hours: 2, minutes: 3, seconds: 4 }}
  orderBy="Bessie"
  deliveryDate="NOV 6"
  totalPrice={743}
  orderNumber="#123"
  onMessage={() => console.log("Message clicked")}
/>

        </div>
      </div>
    </div>
  );
}
