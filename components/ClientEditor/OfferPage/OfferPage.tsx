"use client";

import JobDetailsCard from "@/components/reusable/JobDetails";

export default function OfferPage() {
  return (
    <div className="containers">
      <div className=" p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE – Send Offer Form */}
        <div className="border rounded-2xl p-6 space-y-6 bg-white">
          {/* Service Title */}
          <div>
            <label className="font-medium">Service Title</label>
            <p className="text-sm text-gray-500 mb-2">Create a clear, descriptive title for your service</p>
            <input
              type="text"
              placeholder="Enter the title of your service."
              className="w-full border rounded-xl p-3 bg-gray-50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category</label>
            <select className="w-full border rounded-xl p-3 bg-gray-50 mt-2">
              <option>Select a category</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Description</label>
            <p className="text-sm text-gray-500 mb-2">
              Create a clear, descriptive title for your service
            </p>
            <textarea
              className="w-full border rounded-xl p-4 h-32 bg-gray-50"
              placeholder="Describe your service in detail..."
            />
          </div>

          {/* Delivery Time + Revisions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Delivery Time</label>
              <select className="w-full border rounded-xl p-3 bg-gray-50 mt-2">
                <option>20</option>
                <option>10</option>
                <option>5</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Number of Revisions</label>
              <select className="w-full border rounded-xl p-3 bg-gray-50 mt-2">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price</label>
            <input
              type="text"
              placeholder="$56"
              className="w-full border rounded-xl p-3 bg-gray-50 mt-2"
            />
          </div>

          {/* Warning Box */}
          <div className="border border-red-300 bg-red-50 rounded-xl p-4 text-red-700 text-sm">
            <p className="font-semibold flex items-center gap-2">
              ⚠️ WARNING: Off-Platform Payments Are Strictly Prohibited
            </p>

            <p className="mt-2">
              DO NOT request or accept payment via PayPal, Venmo, CashApp, Zelle, bank transfer,
              cryptocurrency, or any other external method.
            </p>

            <p className="mt-2 font-medium">Consequences:</p>
            <ul className="list-disc ml-6 mt-1">
              <li>1st violation: $25 penalty + 21-day warning</li>
              <li>2nd violation: Permanent account ban + funds withheld</li>
            </ul>

            <a href="#" className="text-red-600 underline mt-2 inline-block">
              Read full Off-Platform Policy →
            </a>
          </div>

          {/* Buttons */}
          <button className="w-full bg-red-500 text-white py-3 rounded-xl">
            Send Offer
          </button>

          <button className="w-full text-gray-600 py-2">Cancel</button>
        </div>

        {/* RIGHT SIDE – Job Details */}
        <div className="">
          <JobDetailsCard
            title="I will craft quality backlinks for your website's SEO."
            image="/images/job.png"
            status="in_progress"
            timeLeft={{ days: 1, hours: 2, minutes: 3 }}
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
