"use client";

import Link from "next/link";

export default function ExtendDelivery() {
  return (
    <div className="containers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className=" w-full  space-y-6">
      <h1 className="text-2xl font-semibold">Request: Extend Delivery Date</h1>

      {/* Textarea */}
      <textarea
        placeholder="Describe your extension request in detail..."
        className="w-full border rounded p-3 h-28"
      />

      {/* Attachment box */}
      <div className="border-2 border-dashed rounded p-10 text-center text-gray-500">
        Click to upload or drag & drop
      </div>

      {/* Days + Original Date */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block mb-2">Add Days</label>
          <select className="w-full border rounded p-3">
            <option>1 Day</option>
            <option>2 Days</option>
            <option>3 Days</option>
            <option>7 Days</option>
            <option>15 Days</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Original Date</label>
          <div className="border rounded p-3 bg-gray-100">12 Jan 2024</div>
        </div>
      </div>

      {/* Submit Button */}
     <Link href="/editor/delivery">
      <button className="w-full bg-red-500 text-white py-3 rounded">
        Send Request
      </button>
      </Link>
    </div>
    <div>
        <div className="w-full  p-6 border rounded-2xl shadow-sm space-y-6">
      <h2 className="text-2xl font-semibold">Job Details</h2>

      {/* Thumbnail + Title */}
      <div className="flex items-start gap-4">
        <img
          src="https://via.placeholder.com/80"
          className="w-20 h-16 rounded object-cover"
          alt=""
        />

        <div>
          <p className="text-sm">I will craft quality backlinks for your website's SEO.</p>

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
            <p className="text-xl font-semibold">07</p>
            <p className="text-xs text-gray-500">Days</p>
          </div>
          <div>
            <p className="text-xl font-semibold">12</p>
            <p className="text-xs text-gray-500">Hours</p>
          </div>
          <div>
            <p className="text-xl font-semibold">35</p>
            <p className="text-xs text-gray-500">Minutes</p>
          </div>
          <div>
            <p className="text-xl font-semibold">34</p>
            <p className="text-xs text-gray-500">Second</p>
          </div>
        </div>
      </div>

      {/* Message Button */}
      <button className="w-full py-3 rounded-full border border-red-300 text-red-500 bg-red-50">
        Message
      </button>

      <p className="text-center text-xs text-gray-500">Extend delivery date</p>

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
        </div>
    </div>
  );
}
