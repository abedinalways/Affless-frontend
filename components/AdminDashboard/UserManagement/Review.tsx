"use client";

import Image from "next/image";
import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { CalendarHeartIcon, Star } from "lucide-react";
import { FiCalendar } from "react-icons/fi";
import { PiToolboxDuotone } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import UsaFlag from "@/components/Icons/UsaFlag";
import Link from "next/link";
import StarIcon from "@/components/Icons/StarIcon";
import { TiStarFullOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";

export default function Review() {

  const usFormats = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const jobs = [
    {
      id: 1,
      user: "sarahncl",
      country: "United Kingdom",
      description:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any job.",

      priceRange: 400,
      software: 2,
      duration: 7,
      thumbnail: "/images/project-1.jpg",
      time: "1 month ago"
    },
    {
      id: 2,
      user: "sarahncl",
      country: "United Kingdom",
      description:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any job.",

      priceRange: 500,
      software: 1,
      duration: 12,
      thumbnail: "/images/project-1.jpg",
      time: "1 month ago"
    },
  ];

  const reviews = [
    { stars: 5, count: 1006 },
    { stars: 4, count: 323 },
    { stars: 3, count: 143 },
    { stars: 2, count: 42 },
    { stars: 1, count: 56 },
  ];

  return (
    <div className=" min-h-screen space-y-6">
      {/* PROFILE HEADER */}

      <div className="bg-white rounded-2xl">
        <div className=" rounded-xl p-4 md:p-6 mx-w-md lg:max-w-lg">
          <h2 className="font-medium text-[18px] lg:text-[24px] pb-6">{usFormats.format(1058)} Reviews</h2>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.stars} className="flex items-center gap-4">
                <span className="w-16">{r.stars} Stars</span>

                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-full bg-red-400 rounded-full"
                    style={{ width: `${(r.count / 1058) * 100}%` }}
                  ></div>
                </div>

                <span className="text-gray-600 text-sm">{usFormats.format(r.count)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col lg:flex-row justify-between gap-6"
          >
            {/* LEFT SIDE */}
            <div className="flex-1">

              {/* USER INFO ROW */}
              <div className="flex justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <Link href={`/client-profile/${job.id}`}>
                    <Image
                      src="/images/saramc.png"
                      width={40}
                      height={40}
                      alt={job.user}
                      className="rounded-full"
                    />
                  </Link>

                  <div>
                    <Link href={`/client-profile/${job.id}`} className="font-medium text-[18px] text-[#333] capitalize">{job.user}</Link>
                    <p className="text-sm text-[#4A4C56] flex items-center gap-1">
                      <UsaFlag /> {job.country}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <TiStarFullOutline className="text-yellow-400" />
                          <TiStarFullOutline className="text-yellow-400" />
                          <TiStarFullOutline className="text-yellow-400" />
                          <TiStarFullOutline className="text-yellow-400" />
                          <TiStarFullOutline className="text-gray-500" />
                        </div>
                        <p className="text-sm">4.9({usFormats.format(338)} reviews)</p>
                      </div>
                      <p className="text-sm">{job.time}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <button type="button" onClick={() => toast.success("Coming soon!")} className=" top-2 right-2 text-red-500 text-sm cursor-pointer">
                    View Job
                  </button>
                </div>
              </div>

              {/* TITLE */}
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6 sm:pt-2.5">
                <div className="w-full max-w-[700px]">

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {job.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-3 py-6">
                    <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                      <span className="text-[#777980]">Platform: </span>
                      <span className="font-medium">YouTube</span>
                    </div>
                    <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                      <span className="text-[#777980]">job Type: </span>
                      <span className="font-medium">YouTube Long-Form</span>
                    </div>
                    <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                      <span className="text-[#777980]">Editor Experience: </span>
                      <span className="font-medium">12 Jobs Completed</span>
                    </div>
                  </div>
                  <div className=" grid grid-cols-3 justify-between text-sm text-gray-700">
                    <div className="w-full border-r pr-4">
                      <p className="text-[#4A4C56] text-[14px]">Price</p>
                      <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">${usFormatWithDecimals.format(job.priceRange)}</p>
                    </div>
                    <div className="w-full border-r px-4">
                      <p className="text-[#4A4C56] text-[14px]">Number of Revisions</p>
                      <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{usFormats.format(job.software)}</p>
                    </div>
                    <div className="w-full pl-4">
                      <p className="text-[#4A4C56] text-[14px]">Job duration</p>
                      <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.duration} days</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    src={job.thumbnail}

                    alt="Job Thumbnail"
                    width={1940}
                    height={1940}
                    quality={100}
                    className="w-full md:w-[300px] h-auto rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
