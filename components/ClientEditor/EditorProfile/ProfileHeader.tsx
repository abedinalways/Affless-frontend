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
};

export default function ProfileHeaderCard({
  profile,
  onEdit,
}: {
  profile: ProfileState;
  onEdit: () => void;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-start gap-6">
        <div className="h-[70px] w-[70px] rounded-full overflow-hidden border border-gray-200">
          <Image
            src={profile.avatar}
            alt="profile"
            width={70}
            height={70}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="text-[18px] font-semibold text-[#222]">{profile.name}</p>

          <div className="mt-1 flex items-center gap-2 text-gray-600 text-[13px]">
            <MdStar className="text-yellow-500" />
            <span className="font-semibold text-[#222]">{profile.rating}</span>
            <span>({profile.reviews} reviews)</span>
          </div>

          <p className="mt-2 text-[13px] text-gray-600">{profile.tagline}</p>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] text-gray-600">
            <span className="inline-flex items-center gap-2">
              <HiOutlineLocationMarker />
              {profile.country}
            </span>

            <span className="inline-flex items-center gap-2">
              <BiWorld />
              {profile.languages}
            </span>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <FiPlus />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
