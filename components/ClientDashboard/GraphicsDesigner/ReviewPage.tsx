"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  timeAgo: string;
  text: string;
  jobImage?: string;
  jobTitle: string;
  price: string;
}

const reviewData: Review[] = [
  {
    id: 1,
    name: "Devon Lane",
    avatar: "/images/devon.png", // your image
    rating: 4.9,
    reviews: 338,
    jobImage: "/images/project1.jpg",
    timeAgo: "4 years ago",
    text: "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
    jobTitle: "I will do SEO backlinks with blogger outreach for high quality link building",
    price: "$400",
  },
  {
    id: 2,
    name: "Jerome Bell",
    avatar: "/images/jerome.png",
    rating: 4.9,
    reviews: 338,
    jobImage: "/images/project2.jpg",
    timeAgo: "4 years ago",
    text: "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
    jobTitle: "Create a modern minimalist logo design for tech startup",
    price: "$150",
  },
  {
    id: 3,
    name: "Floyd Miles",
    avatar: "/images/floyd.png",
    rating: 4.9,
    reviews: 338,
    jobImage: "/images/project3.jpg",
    timeAgo: "4 years ago",
    text: "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
    jobTitle: "Professional Video Editing for YouTube Channel - 10 min ep",
    price: "$300",
  },
];

export default function ReviewPage() {
  return (
    <div className="max-w-4xl  mt-10 space-y-8">

      <h2 className="text-xl lg:text-3xl font-bold font-roboto leading-150%">Reviews</h2>

      <div className="space-y-10">
        {reviewData.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="flex items-start gap-4">
      {/* Avatar */}
      <Link href={`/editor-profile/${review?.id}`} className="w-16 h-16 overflow-hidden rounded-full shrink-0">
        <Image
          src={review.avatar}
          alt={review.name}
          width={70}
          height={70}
          className="rounded-full object-cover hover:scale-105 transition duration-300 w-full h-full"
        />
      </Link>

      <div className="flex-1 space-y-1">
        {/* Name + Rating Row */}
        <div className="flex justify-between items-start">
          <Link href={`/editor-profile/${review?.id}`} className="font-semibold text-lg capitalize">{review.name}</Link>

          <p className="text-gray-500 text-sm">{review.timeAgo}</p>
        </div>

        {/* Rating + count */}
        <div className="flex items-center    gap-2">
          <div className="flex py-2.5">
            <FaStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <FaStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <FaStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <FaStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <FaStar className="w-5 h-5 text-gray-300 fill-gray-300" />
          </div>
          <div className="text-[#333]">
            <span className="">{review.rating}</span>
            <span className=" text-sm">({review.reviews} reviews)</span>
          </div>
        </div>

        {/* Review text */}
        <p className="text-gray-600 leading-relaxed">{review.text}</p>
        
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
                <p className="text-sm text-gray-500 mt-1">Fixed-price • {review.price}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
