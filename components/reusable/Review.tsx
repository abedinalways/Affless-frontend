"use client";

import Image from "next/image";

export interface ReviewType {
  id: number;
  name: string;
  img: string;
  rating: number;
  totalReviews: number;
  comment: string;
  timeAgo: string;
}

export default function ReviewList({ reviews }: { reviews: ReviewType[] }) {
  return (
    <div className="space-y-8">
      <h2 className="text-[32px] font-semibold text-[#333]">Review</h2>

      <div className="space-y-10">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-5 items-start">

            {/* Avatar */}
            <div className="min-w-[60px] h-[60px] rounded-full overflow-hidden">
              <Image
                src={review.img}
                alt={review.name}
                width={60}
                height={60}
                className="object-cover h-full w-full"
              />
            </div>

            {/* Content */}
            <div className="flex-1">

              {/* Name + Time */}
              <div className="flex justify-between">
                <h3 className="text-[20px] font-semibold text-[#333]">
                  {review.name}
                </h3>
                <p className="text-[14px] text-[#777]">{review.timeAgo}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1 mb-1 text-[#F9A825]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? "⭐" : "☆"}
                  </span>
                ))}
                <span className="ml-1 text-[#555] text-[14px]">
                  {review.rating}.0 ({review.totalReviews} reviews)
                </span>
              </div>

              {/* Comment */}
              <p className="text-[15px] text-[#555] leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


//usable

// import ReviewList, { ReviewType } from "@/components/review/ReviewList";

// const reviews: ReviewType[] = [
//   {
//     id: 1,
//     name: "Devon Lane",
//     img: "/images/devon.png",
//     rating: 5,
//     totalReviews: 338,
//     comment:
//       "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free. Truly a remarkable partner for any project.",
//     timeAgo: "4 years ago",
//   },
//   {
//     id: 2,
//     name: "Jerome Bell",
//     img: "/images/jerome.png",
//     rating: 5,
//     totalReviews: 338,
//     comment:
//       "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline. Their professionalism, attention to detail, and ability to collaborate seamlessly made the entire process smooth and stress-free.",
//     timeAgo: "4 years ago",
//   },
//   {
//     id: 3,
//     name: "Floyd Miles",
//     img: "/images/floyd.png",
//     rating: 5,
//     totalReviews: 338,
//     comment:
//       "Absolutely outstanding work! The seller went above and beyond, delivering exceptional quality well ahead of the project deadline.",
//     timeAgo: "4 years ago",
//   },
// ];

// export default function Page() {
//   return (
//     <div className="container mx-auto py-10">
//       <ReviewList reviews={reviews} />
//     </div>
//   );
// }
