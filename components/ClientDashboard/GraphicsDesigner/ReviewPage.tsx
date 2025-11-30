"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  timeAgo: string;
  text: string;
}

const reviewData: Review[] = [
  {
    id: 1,
    name: "Devon Lane",
    avatar: "/user1.jpg", // your image
    rating: 4.9,
    reviews: 338,
    timeAgo: "4 years ago",
    text: "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
  },
  {
    id: 2,
    name: "Jerome Bell",
    avatar: "/user2.jpg",
    rating: 4.9,
    reviews: 338,
    timeAgo: "4 years ago",
    text: "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
  },
  {
    id: 3,
    name: "Floyd Miles",
    avatar: "/user3.jpg",
    rating: 4.9,
    reviews: 338,
    timeAgo: "4 years ago",
    text: "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
  },
];

export default function ReviewPage() {
  return (
    <div className="max-w-4xl  mt-10 space-y-8">

      <h2 className="text-2xl font-bold">Review</h2>

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
      <Image
        src={review.avatar}
        alt={review.name}
        width={60}
        height={60}
        className="rounded-full object-cover"
      />

      <div className="flex-1 space-y-1">
        {/* Name + Rating Row */}
        <div className="flex justify-between items-start">
          <p className="font-semibold text-lg">{review.name}</p>

          <p className="text-gray-500 text-sm">{review.timeAgo}</p>
        </div>

        {/* Rating + count */}
        <div className="flex items-center    gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{review.rating}</span>
          <span className="text-gray-500 text-sm">({review.reviews} reviews)</span>
        </div>

        {/* Review text */}
        <p className="text-gray-600 leading-relaxed">{review.text}</p>
      </div>
    </div>
  );
}
