"use client";

import Image from "next/image";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdStar } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";

export type ProfileState = {
  name: string;
  rating: number;
  reviews: number;
  tagline: string;
  country: string;
  languages: string;
  avatar: string;
  jobsCompleted?: number;
  clientsWorked?: number;
  avgResponseTime?: string;
};

export default function ProfileHeaderCard({
  profile,
  onEdit,
}: {
  profile: ProfileState;
  onEdit?: () => void;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-start gap-6">
        <div className="h-[150px] w-[150px] rounded-full overflow-hidden border border-gray-200">
          <Image
            src={profile.avatar}
            alt="profile"
            width={150}
            height={150}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-2.5">
          <p className="text-[18px] font-medium text-[#333] leading-120%">{profile.name}</p>

          <div>
            <h2>Reviews</h2>
            <div className="flex items-center gap-2 text-[#333] text-[12px] font-normal">
              <MdStar className="text-yellow-500" />
              <span className=" text-[#333]">{profile.rating}</span>
              <span>({profile.reviews} reviews)</span>
            </div>
          </div>

          <p className="mt-2 text-[12px] text-[#333]">{profile.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-[#333]">

            <span className="inline-flex items-center gap-1.5">
              <span className="text-green-500 font-bold">✔</span>
              {profile.jobsCompleted || 0} Jobs Completed
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="text-green-500 font-bold">✔</span>
              Worked with {profile.clientsWorked || 0} Clients
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-green-500 font-bold">✔</span>
              Avg. Response Time: {profile.avgResponseTime || "N/A"}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-[14px] text-[#333]">
            <span className="inline-flex items-center gap-2">
              <HiOutlineLocationMarker />
              {profile.country}
            </span>

            <span className="inline-flex items-center gap-2">
              <BiWorld />
              {profile.languages}
            </span>
          </div>

          {onEdit && <button
            type="button"
            onClick={onEdit}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <FiPlus />
            Edit
          </button>}
        </div>
      </div>
    </div>
  );
}
