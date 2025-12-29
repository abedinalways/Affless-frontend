"use client";

import React, { useState } from "react";
import { CloudUpload } from "lucide-react";
import JobDetailsCard from "@/components/reusable/JobDetails";
import PageBanner from "@/components/reusable/Bgbanner";
import toast,{Toaster} from "react-hot-toast";

type UploadKey = "video" | "audio" | "thumb1" | "thumb2";

const uploadItems = [
  { key: "video", label: "Upload video", accept: "video/*" },
  { key: "audio", label: "Upload audio", accept: "audio/*" },
  { key: "thumb1", label: "Upload thumbnail", accept: "image/*" },
  { key: "thumb2", label: "Upload thumbnail", accept: "image/*" },
] as const;

export default function DeliveryMessage() {
  const [files, setFiles] = useState<Record<UploadKey, File | null>>({
    video: null,
    audio: null,
    thumb1: null,
    thumb2: null,
  });

  const handlePick = (key: UploadKey, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleDeliver = () => {
    console.log(files);
    toast.success("Your work is in delivery process!");
  };

  return (
    <div className="">
      <Toaster />
      <PageBanner
        title="Delivery"
        bgImage="/findEditor.jpg"
        links={[{ label: "Home", href: "/" },
        { label: "Active order", },
        { label: "Delivery" }]}
      />

      <div className="containers">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 ">
          <div className="w-full max-w-3xl bg-white rounded-2xl p-6">
            <h1 className="text-2xl font-semibold">Delivery Message</h1>
            <p className="text-sm font-medium mt-6 mb-3">Upload Final Files</p>

            <div className="space-y-4">
              {uploadItems.map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between border rounded-xl p-5 cursor-pointer bg-white"
                >
                  <div>
                    <p className="text-[18px] font-semibold text-[#111]">
                      {files[item.key]?.name || item.label}
                    </p>
                    <p className="text-sm text-gray-500">Click to browse</p>
                  </div>

                  <div className="flex items-center gap-2 text-red-500 font-medium">
                    <CloudUpload size={18} />
                    <span>Browse</span>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    accept={item.accept}
                    onChange={(e) => handlePick(item.key, e.target.files?.[0] ?? null)}
                  />
                </label>
              ))}
            </div>

            <button
              onClick={handleDeliver}
              className="w-full mt-8 bg-red-500 text-white py-4 rounded-xl font-semibold cursor-pointer"
            >
              Deliver Work
            </button>
          </div>
          <div className="">
            <JobDetailsCard
              title="I will craft quality backlinks for your website's SEO."
              image="/images/vedio.png.jpg"
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
    </div>
  );
}
