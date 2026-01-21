"use client";

import React, { useState } from "react";
import PageBanner from "@/components/reusable/Bgbanner";
import JobDetailsCard from "@/components/reusable/JobDetails";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { GoDeviceCameraVideo, GoImage } from "react-icons/go";
import { CheckCircle } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";

type UploadKey = "video" | "audio" | "thumb1" | "thumb2";

const uploadItems: {
  key: UploadKey;
  icon: React.ElementType;
  label: string;
  accept: string;
  bg: string;
  iconColor: string;
}[] = [
  {
    key: "video",
    icon: GoDeviceCameraVideo,
    label: "Upload video",
    accept: "video/*",
    bg:"#F5E8FF" ,
    iconColor: "#A855F7",
  },
  {
    key: "audio",
    icon: GoImage,
    label: "Upload audio",
    accept: "audio/*",
    bg:"#E6F7EC" ,
    iconColor: "#22C55E",
  },
  {
    key: "thumb1",
    icon: GoImage,
    label: "Upload thumbnail",
    accept: "image/*",
    bg: "#FFF9EE",
    iconColor: "#F59E0B",
  },
  {
    key: "thumb2",
    icon: GoImage,
    label: "Upload thumbnail",
    accept: "image/*",
    bg: "#FFF9EE",
    iconColor: "#F59E0B",
  },
];

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
      {/* <Toaster position="top-right"/> */}
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
              {uploadItems.map(({ key, icon: Icon, label, accept, bg, iconColor }) => (
                <label
                  key={key}
                  className="flex items-center justify-between border border-gray-200 rounded-xl p-5 cursor-pointer bg-white hover:bg-gray-50 transition"
                >
                  {/* LEFT ICON + TEXT */}
                  <div className="flex items-center">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-[30px]"
                      style={{ backgroundColor: bg, color: iconColor }}
                    >
                      <Icon />
                    </div>

                    {/* Text */}
                    <div className="ml-4">
                      <p className="text-[18px] font-semibold text-[#111]">
                        {files[key]?.name || label}
                      </p>
                      <p className="text-sm text-gray-500">Click to browse</p>
                    </div>
                  </div>

                  {/* RIGHT STATUS */}
                  {files[key] ? (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle className="w-6 h-6" />
                      <span>Uploaded</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500 font-medium">
                      <AiOutlineCloudUpload className="w-6 h-6" />
                      <span>Browse</span>
                    </div>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={(e) => handlePick(key, e.target.files?.[0] ?? null)}
                  />
                </label>
              ))}
            </div>

            <button
              onClick={handleDeliver}
              className="w-full mt-8 bg-red-500 text-white py-4 rounded-xl font-semibold cursor-pointer hover:bg-red-600 transition"
            >
              Deliver Work
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div>
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
