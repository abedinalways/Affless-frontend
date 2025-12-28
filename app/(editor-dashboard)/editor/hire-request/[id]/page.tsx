"use client";

import BidCard from "@/components/reusable/Bids";
import { File, FileText } from "lucide-react";
import React, { useState } from "react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function HireDetails({ params }: { params: { id: string } }) {

  const bids = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/images/devon.png",
    time: "2 hours ago",
    description:
      "I can do this job perfectly. I have 5+ years experience and I will deliver within 3 days with high quality output.",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "/images/jerome.png",
    time: "1 day ago",
    description:
      "I will handle your project professionally. You will get unlimited revisions and fast response.",
  },
   {
    id: 3,
    name: "John Doe",
    avatar: "/images/jerome.png",
    time: "1 day ago",
    description:
      "I will handle your project professionally. You will get unlimited revisions and fast response.",
  },
];

  const [files, setFiles] = useState<UploadedFile[]>([]);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded) return;

    const fileArray = Array.from(uploaded).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((prev) => [...prev, ...fileArray]);
  };

  // Format file size
  const formatSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="containers py-10 flex flex-col lg:flex-row gap-10">

      {/* LEFT SIDE */}
      <div className="lg:w-2/3 space-y-10">

        {/* ===== Proposal Details ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Proposal Details</h2>
          <p className="text-[15px] leading-7 text-gray-700 mb-4">
            Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit amet iaculis eros. Suspendisse pulvinar, erat sed interdum auctor, eros ligula tempus quam.
          </p>

          <p className="text-[15px] leading-7 text-gray-700 mb-4">
            Mauris sed venenatis libero. Sed vulputate euismod risus, eget auctor nulla aliquet sed. Donec sed lobortis nunc. Donec a pretium ipsum.
          </p>

          <p className="text-[15px] leading-7 text-gray-700 mb-4">
            The Ultimate Guide To Start — Etiam gravida euismod sodales. Vestibulum sed egestas sapien.
          </p>
        </div>

        {/* ===== Skills Required ===== */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
          <div className="flex gap-3 flex-wrap">
            <span className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-sm">Adobe Premiere Pro</span>
            <span className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-sm">Adobe After Effects</span>
            <span className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-sm">Video Editing</span>
          </div>
        </div>

        {/* ===== Attachments ===== */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Attachments</h3>

          {/* Upload Button */}
          <label className="cursor-pointer inline-block mb-4">
            <div className="px-5 py-2 bg-[#4A90E2] text-white rounded-lg font-medium hover:bg-[#3277C7]">
              Upload File
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <div className="flex flex-col md:flex-row gap-4 flex-wrap">

            {/* Uploaded Files */}
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm w-full md:w-[260px]"
              >
                <div className="p-3 bg-[#F8F8F8] rounded-lg border">
                  {file.type.includes("pdf") ? (
                    <File size={26} className="text-[#FF4D4F]" />
                  ) : (
                    <FileText size={26} className="text-[#4A4A4A]" />
                  )}
                </div>
                <div>
                  <p className="font-medium truncate w-[140px]">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    File size: {formatSize(file.size)}
                  </p>
                </div>
              </div>
            ))}

            {/* No file message */}
            {files.length === 0 && (
              <p className="text-sm text-gray-500">No files uploaded yet.</p>
            )}
          </div>
        </div>
        {bids.map((bid) => (
                <BidCard
                  key={bid.id}
                  id={bid.id}
                  name={bid.name}
                  avatar={bid.avatar}
                  time={bid.time}
                  description={bid.description}
                />
              ))}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="lg:w-1/3 space-y-6">

        {/* Budget Box */}
        <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
          <h3 className="text-gray-500 font-medium">Budget</h3>
          <p className="text-[34px] font-bold">$350.00</p>

          <button className="w-full py-3 rounded-lg bg-[#FF4D4F] text-white font-medium">
            Accept
          </button>

          <button className="w-full py-3 rounded-lg bg-[#F9E9EA] text-[#FF4D4F] font-medium">
            Reject
          </button>

          <div className="pt-2 space-y-1 text-sm">
            <p className="flex justify-between"><span>Project Level:</span><span>Expensive</span></p>
            <p className="flex justify-between"><span>Languages:</span><span>French</span></p>
            <p className="flex justify-between"><span>English Level:</span><span>Native</span></p>
          </div>
        </div>

        {/* About Buyer */}
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">About Buyer</h3>

          <div className="flex items-center gap-4">
            <img
              src="/images/headset.svg"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">Bessie Cooper</p>
              <p className="text-sm text-gray-500">Australia</p>
            </div>
          </div>

          <div className="mt-4 text-sm space-y-1">
            <p className="flex  justify-between"><strong>Gender:</strong> Male</p>
            <p className="flex  justify-between"><strong>Languages:</strong> Arabic, English</p>
            <p className="flex  justify-between"><strong>English Level:</strong> Fluent</p>
          </div>

          <button className="w-full mt-4 py-3 rounded-lg bg-[#FF4D4F] text-white font-medium">
            Contact Buyer
          </button>
        </div>
      </div>
    </div>
  );
}
