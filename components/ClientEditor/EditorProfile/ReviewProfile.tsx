"use client";

import UsaFlag from "@/components/Icons/UsaFlag";
import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

const reviews = [
  {
    id: 1,
    avatar: "/images/saramc.png",
    name: "sarahmcl",
    country: "United Kingdom",
    flag: "/images/flags/uk.png",
    rating: 4.9,
    time: "1 month ago",
    message:
      "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
    previewImage: "/images/vedio.png.jpg",
  },
  {
    id: 2,
    avatar: "/images/saramc.png",
    name: "sarahmcl",
    country: "United Kingdom",
    flag: "/images/flags/uk.png",
    rating: 4.9,
    time: "1 month ago",
    message:
      "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
    previewImage: "/images/vedio.png.jpg",
  },
];

export default function ReviewsSection() {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="w-full rounded-xl border border-gray-200 bg-white px-6 py-5 flex justify-between gap-6"
        >
          {/* ✅ LEFT SIDE */}
          <div className="flex gap-4 flex-1">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <Image
                src={review.avatar}
                alt={review.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Name + Country */}
              <div className="space-y-1">
                <Link href="/client/profile" className="text-[16px] font-semibold text-[#333] leading-none">
                  {review.name}
                </Link>

                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                 <UsaFlag />
                  <span>{review.country}</span>
                </div>
              </div>

              {/* Rating + Time */}
              <div className="mt-3 flex items-center gap-3 text-[13px] text-gray-500">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <MdStar key={i} className="text-[16px]" />
                  ))}
                </div>

                {/* Rating */}
                <span className="font-medium text-[#222]">{review.rating}</span>

                {/* Time */}
                <span>{review.time}</span>
              </div>

              {/* Message */}
              <p className="mt-3 text-[14px] leading-relaxed text-gray-600 max-w-[650px]">
                {review.message}
              </p>
            </div>
          </div>

          {/* ✅ RIGHT SIDE Preview Image */}
          <div className="w-[170px]  rounded-lg overflow-hidden border border-gray-200 shrink-0">
            <Image
              src={review.previewImage}
              alt="preview"
              width={170}
              height={110}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
