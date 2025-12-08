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

export default function Review() {
  const jobs = [
    {
      id: 1,
      user: "sarahncl",
      country: "United Kingdom",
      description:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",

      priceRange: "$400–$600",
      software: "Adobe Premiere Pro",
      duration: "7–30 days",
      thumbnail: "/images/vedio.png.jpg",
      time:"1 month ago"
    },
    {
      id: 2,
      user: "sarahncl",
      country: "United Kingdom",
      description:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
    
      priceRange: "$400–$600",
      software: "Adobe Premiere Pro",
      duration: "7–30 days",
      thumbnail: "/images/vedio.png.jpg",
      time:"1 month ago"
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
    <div className=" min-h-screen ">

      {/* PROFILE HEADER */}
    
 <div className="bg-white rounded-2xl">
    <div className=" rounded-xl  p-6 mt-10 mx-w-md lg:max-w-lg">
        <h2 className="text-xl font-medium text-[18px] lg:text-[24px] pb-6">1,058 Reviews</h2>

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

              <span className="text-gray-600 text-sm">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
 </div>

      <div className="space-y-6 pt-10">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col lg:flex-row justify-between gap-6"
          >
            {/* LEFT SIDE */}
            <div className="flex-1">

              {/* USER INFO ROW */}
             <div className="flex justify-between">
               <div className="flex items-center gap-3 mb-2">
                <Image
                  src="/images/saramc.png"
                  width={40}
                  height={40}
                  alt={job.user}
                  className="rounded-full"
                />

                <div>
                  <p className="font-medium text-[18px] text-[#333]">{job.user}</p>
                  <p className="text-sm text-[#4A4C56] flex items-center gap-1 pt-1.5">
                 <UsaFlag/> {job.country}
                  </p>
                  <div className="flex gap-3 pt-6">
                   <div className="flex gap-1">
                     <TiStarFullOutline className="text-yellow-400"/>
                    <TiStarFullOutline className="text-yellow-400"/>
                    <TiStarFullOutline className="text-yellow-400"/>
                    <TiStarFullOutline className="text-yellow-400"/>
                    <TiStarFullOutline className="text-gray-500"/>
                   </div>
<p>4.9(338 reviews)</p>
                    <p>{job.time}</p>
                  </div>
                </div>
              </div>
               <div>
                 <p className=" top-2 right-2 text-red-500 text-sm cursor-pointer">
                View Job
              </p>
            </div>
             </div>

              {/* TITLE */}
            <div className="flex flex-col lg:flex-row gap-6 pt-2.5">
              <div className="w-full lg:w-3/4">

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {job.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 py-6 bg-[]">
             
              </div>
                 <div className=" grid grid-cols-2 md:grid-cols-3 justify-between text-sm text-gray-700">
                <div className="p-6 flex gap-6">
                  <div>
                    <p className="text-[#4A4C56] text-[14px]">Price range</p>
                  <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.priceRange}</p>
                  </div>
                  <div className="border hidden md:block border-r-gray-300 mx-6">

                  </div>
                </div>

                   <div className="p-6 flex  gap-6">
                  <div>
                    <p className="text-[#4A4C56] text-[14px]">Software</p>
                  <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.software}</p>
                  </div>
                  <div className="border hidden md:block border-r-gray-300 mx-6">

                  </div>
                </div>

                   <div className="p-6 flex gap-6">
                  <div>
                    <p className="text-[#4A4C56] text-[14px]">Project duration</p>
                  <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.duration}</p>
                  </div>
                  <div className="border hidden md:block border-r-gray-300 mx-6">

                  </div>
                </div>
              </div>
              </div>
              <div className="flex justify-center items-center">
              <Image
                src={job.thumbnail}
              
                alt="Job Thumbnail" width={200} height={200} className="rounded-lg"/>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
