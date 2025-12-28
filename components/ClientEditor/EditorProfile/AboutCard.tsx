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
      <h3 className="text-[18px] font-semibold text-[#222]">About Me</h3>

      <p className="mt-3 text-[14px] leading-relaxed text-gray-600 whitespace-pre-line">
        {about}
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
