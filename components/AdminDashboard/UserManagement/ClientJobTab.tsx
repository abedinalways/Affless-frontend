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
import Review from "./Review";
import ReviewPage from "@/components/ClientDashboard/GraphicsDesigner/ReviewPage";
import ReviewBreakdown from "@/components/reusable/reviews";
import ReviewList, { ReviewType } from "@/components/reusable/Review";
import toast from "react-hot-toast";

const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


export default function ClientJob() {
  const jobs = [
    {
      id: 1,
      user: "sarahncl",
      country: "United Kingdom",
      description:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any job.",

      priceRange: 600,
      software: "3",
      duration: "7 days",
      thumbnail: "/images/vedio.png.jpg",
      time: "1 month ago"
    },
    {
      id: 2,
      user: "sarahncl",
      country: "United Kingdom",
      description:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any job.",

      priceRange: 400,
      software: "5",
      duration: "12 days",
      thumbnail: "/images/vedio.png.jpg",
      time: "1 month ago"
    },
  ];

  const reviewBreakdownData = [
    { stars: 5, count: 1006 },
    { stars: 4, count: 323 },
    { stars: 3, count: 143 },
    { stars: 2, count: 42 },
    { stars: 1, count: 56 },
  ];


  const reviews: ReviewType[] = [
    {
      id: 1,
      name: "Devon Lane",
      img: "/images/devon.png",
      rating: 5,
      totalReviews: 338,
      comment:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free.",
      timeAgo: "4 years ago",
    },
    {
      id: 2,
      name: "Jerome Bell",
      img: "/images/jerome.png",
      rating: 5,
      totalReviews: 338,
      comment:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free.",
      timeAgo: "4 years ago",
    },
    {
      id: 3,
      name: "Floyd Miles",
      img: "/images/floyd.png",
      rating: 5,
      totalReviews: 338,
      comment:
        "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline.",
      timeAgo: "4 years ago",
    },
  ];


  return (
    <div className=" min-h-screen ">
      <h2 className="py-5 text-[32px] font-semibold text-[#333]">Active & Past Jobs Posted by this Client</h2>
      {/* PROFILE HEADER */}
      <div className="space-y-6">
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
                        <p className="text-sm">4.9(338 reviews)</p>
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
              <div className="flex flex-col lg:flex-row gap-6 pt-2.5">
                <div className="w-full lg:w-3/4">

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
                      <span className="text-[#777980]">Job Type: </span>
                      <span className="font-medium">YouTube Long-Form</span>
                    </div>
                    <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                      <span className="text-[#777980]">Editor Experience: </span>
                      <span className="font-medium">12 Jobs Completed</span>
                    </div>
                  </div>
                  <div className=" grid grid-cols-2 md:grid-cols-3 justify-between text-sm text-gray-700">
                    <div className="p-6 flex gap-6">
                      <div>
                        <p className="text-[#4A4C56] text-[14px]">Price</p>
                        <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">${usFormatWithDecimals.format(job.priceRange)}</p>
                      </div>
                      <div className="border hidden md:block border-r-gray-300 mx-6">

                      </div>
                    </div>

                    <div className="p-6 flex  gap-6">
                      <div>
                        <p className="text-[#4A4C56] text-[14px]">Number of Revisions</p>
                        <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.software}</p>
                      </div>
                      <div className="border hidden md:block border-r-gray-300 mx-6">

                      </div>
                    </div>

                    <div className="p-6 flex gap-6">
                      <div>
                        <p className="text-[#4A4C56] text-[14px]">Job duration</p>
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

                    alt="Job Thumbnail" width={200} height={200} className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl">
        <div className=" rounded-xl  p-6 mt-10 mx-w-md lg:max-w-lg">

          <ReviewBreakdown reviewe={reviewBreakdownData} />


        </div>
      </div>
      <div className="container mx-auto py-10">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
