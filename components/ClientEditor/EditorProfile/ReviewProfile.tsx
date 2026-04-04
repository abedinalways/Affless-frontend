"use client";

import UsaFlag from "@/components/Icons/UsaFlag";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    avatar: "/images/saramc.png",
    name: "sarahmcl",
    country: "United Kingdom",
    flag: "/images/flags/uk.png",
    rating: 4.0,
    time: "1 month ago",
    jobImage: "/images/project1.jpg",
    jobTitle: "I will do SEO backlinks with blogger outreach for high quality link building",
    price: 400,
    message:
      "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any job.",
    previewImage: "/images/vedio.png.jpg",
    reviews: 338,
  },
  {
    id: 2,
    avatar: "/images/saramc.png",
    name: "sarahmcl",
    country: "United Kingdom",
    flag: "/images/flags/uk.png",
    rating: 4.0,
    time: "1 month ago",
    jobImage: "/images/project2.jpg",
    jobTitle: "Create a modern minimalist logo design for tech startup",
    price: 150,
    message:
      "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the job deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any job.",
    previewImage: "/images/vedio.png.jpg",
    reviews: 328,
  },
];

export default function ReviewsSection() {
  return (
    <div className="space-y-4">
      <h2 className="font-medium text-[#333] text-2xl">Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="w-full rounded-xl border border-gray-200 bg-white px-6 py-5 flex flex-col justify-between gap-6"
        >
          {/* ✅ LEFT SIDE */}
          <div className="flex gap-4 flex-1">
            {/* Avatar */}
            <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <Link href={`/client-profile/${review?.id}`} className="">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover hover:scale-110 transition duration-300"
                />
              </Link>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Name + Country */}
              <div className="space-y-1">
                <Link href={`/client-profile/${review?.id}`} className="text-[16px] font-semibold text-[#333] leading-none capitalize">
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
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <FaStar key={i} className="text-[16px]" />
                  ))}
                  {[...Array(5 - Math.floor(review.rating))].map((_, i) => (
                    <FaStar key={i} className="text-[16px] text-gray-300" />
                  ))}
                </div>
                {/* Rating */}
                <div className="text-[#333]">
                  <span className="font-medium text-[#222]">{review.rating.toFixed(1)}</span>
                  <span className=" text-sm"> ({review.reviews} reviews)</span>
                </div>
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
          {review.jobImage && (
            <div className="mt-4 flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center">
              <Image
                src={review.jobImage}
                alt={`Job image for review by ${review.name}`}
                width={80}
                height={60}
                className="w-24 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-[#333] line-clamp-1">{review.jobTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">Fixed-price • ${review.price.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
