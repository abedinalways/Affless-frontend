"use client";

import React from "react";
import { FiEdit2 } from "react-icons/fi";

export default function AboutCard({
  about,
  onEdit,
}: {
  about: string;
  onEdit: () => void;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-[24px] font-medium text-[#333]">About Me</h3>



      <p className="mt-3 text-[18px] leading-150% text-[#4A4C56] whitespace-pre-line">
        We are PixxelStudio, A full-service design and developing web agency. From designing logos to developing websites to satisfying our customer’s every digital need is what we thrive for. We’ve worked not only with brilliant individuals but also with top companies all around the world. Our mission is to become an indispensable partner to our clients by offering the best ideas, skills and services they could possibly get.
      </p>

      <button
        type="button"
        onClick={onEdit}
        className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
      >
        <FiEdit2 />
        Edit details
      </button>
    </div>
  );
}
