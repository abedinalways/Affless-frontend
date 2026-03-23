"use client";
import Image from "next/image";
import Link from "next/link";

interface BidCardProps {
  id: string;
  name: string;
  avatar: string;
  time: string;
  description: string;
  proposalId?: string;
  showViewButton?: boolean;
  redirect?: string;
}

export default function BidCard({
  id,
  name,
  avatar,
  time,
  description,
  proposalId,
  showViewButton = false,
  redirect,
}: BidCardProps) {
  return (
    <div className="space-y-6 mb-6">
      <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-[#EFEFEF] ">
        {/* LEFT SIDE */}
        <div className="flex gap-4 ">
          <Link href={`/editor-profile/1`} className="w-[70px] h-[70px] overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              width={70}
              height={70}
              className="rounded-full object-cover w-full h-full"
            />
          </Link>

          <div>
            <Link href="/editor-profile/1" className="text-[16px] font-semibold text-[#1D1F2C]">{name}</Link>
            <p className="text-[12px] text-gray-500 mb-2">{time}</p>

            <p className="text-[14px] text-gray-600 leading-6 line-clamp-2 max-w-[600px]">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE BUTTON */}
        {showViewButton && (
          <Link
            href={`/client/bids-details/${id}?redirect=${redirect}&proposalId=${proposalId}`}
            className="text-[14px] bg-[#FFECEC] text-[#FF4D4F] px-4 py-2 rounded-lg hover:bg-[#ffd6d6]"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}
