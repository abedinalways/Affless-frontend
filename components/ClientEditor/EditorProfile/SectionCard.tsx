"use client";

import React from "react";
import { FiExternalLink } from "react-icons/fi";

export default function SectionCard({
  title,
  desc,
  btnText,
  onClick,
  rightIcon,
}: {
  title: string;
  desc: string;
  btnText: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-[18px] font-semibold text-[#222]">{title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{desc}</p>

          {onClick && (
            <button
              type="button"
              onClick={onClick}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              <FiExternalLink className="text-[15px]" />
              {btnText}
            </button>
          )}
        </div>

        {rightIcon && (
          <div className="h-[56px] w-[56px] rounded-xl bg-[#EEF2FF] border border-[#E6EAFD] flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
