"use client";

import Link from "next/link";

export default function Delivery() {
  return (
    <div className="containers mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* LEFT SIDE – Delivery Message */}
      <div className="border rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Delivery Message</h2>

        <div>
          <p className="text-sm mb-2">Write your request here.</p>
          <textarea
            className="w-full border rounded-xl p-4 h-36 bg-gray-50"
            placeholder="Write a message to your client about this delivery..."
          />
          <p className="text-xs text-gray-400 mt-1">0/1000 characters</p>
        </div>

        {/* Attachments */}
        <div>
          <p className="text-sm mb-2">Attachments (Optional)</p>

          <div className="border-2 border-dashed rounded-xl p-10 text-center text-gray-500 cursor-pointer">
            <div className="text-2xl mb-2">⬆️</div>
            Click to upload or drag and drop
            <p className="text-xs mt-1">PDF, DOC, or images (Max 10MB)</p>
          </div>
        </div>

        <Link href="/editor/offer">
        <button className="w-full bg-red-500 text-white py-3 rounded-xl">
          Deliver Work
        </button>
        </Link>
      </div>

      {/* RIGHT SIDE – Job Details */}
      <div className="border rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Job Details</h2>

        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src="https://via.placeholder.com/80"
            className="w-20 h-16 rounded object-cover"
            alt="job"
          />

          <div>
            <p className="text-sm">
              I will craft quality backlinks for your website's SEO.
            </p>
            <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full inline-block mt-2">
              In Progress
            </span>
          </div>
        </div>

        <hr />

        {/* Countdown */}
        <div>
          <p className="text-sm font-medium mb-4">Time left To Deliver</p>

          <div className="grid grid-cols-4 text-center">
            <div>
              <p className="text-xl font-bold">01</p>
              <p className="text-xs text-gray-500">Days</p>
            </div>
            <div>
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-gray-500">Hours</p>
            </div>
            <div>
              <p className="text-xl font-bold">35</p>
              <p className="text-xs text-gray-500">Minutes</p>
            </div>
            <div>
              <p className="text-xl font-bold">34</p>
              <p className="text-xs text-gray-500">Second</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-2">
            Extend delivery date
          </p>
        </div>

        {/* Message Button */}
        <button className="w-full py-3 rounded-full border border-red-300 text-red-500 bg-red-50">
          Message
        </button>

        {/* Order Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order by</span>
            <span className="font-medium">Bessie Cooper</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Delivery date:</span>
            <span className="font-medium">NOV 6, 7:24 AM</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Total Price</span>
            <span className="font-medium">$743</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Number</span>
            <span className="font-medium">#EM78373A0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
