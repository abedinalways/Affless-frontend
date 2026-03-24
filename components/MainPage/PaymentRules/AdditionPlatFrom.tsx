"use client";

import { Image as ImageIcon, Headphones, BadgeCheck, AlertTriangle } from "lucide-react";

export default function AdditionalPlatform() {
  return (
    <div className="w-full">
      <h3 className="text-[18px] font-medium text-[#111827] mb-4 p-3 lg:p-6">
        Additional Platform Rules
      </h3>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo Editing */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 lg:p-8">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-green-600" />
            </div>

            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-[#111827]">
                Photo Editing
              </h4>
              <p className="mt-2 text-[13px] text-[#6B7280]">
                Applies to general photo editing services
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-[20px] font-semibold text-green-600">$2</span>
                <span className="text-[13px] text-[#6B7280]">minimum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Editing */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 lg:p-8">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Headphones className="h-4 w-4 text-[#49B4D6]" />
            </div>

            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-[#111827]">
                Audio Editing
              </h4>
              <p className="mt-2 text-[13px] text-[#6B7280]">
                Applies to audio editing and mixing
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-[20px] font-semibold text-[#49B4D6]">$2</span>
                <span className="text-[13px] text-[#6B7280]">minimum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Editing */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 lg:p-8">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
              <BadgeCheck className="h-4 w-4 text-red-500" />
            </div>

            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-[#111827]">
                Thumbnail Editing
              </h4>
              <p className="mt-2 text-[13px] text-[#6B7280]">
                Applies to video thumbnail creation
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-[20px] font-semibold text-red-500">$3</span>
                <span className="text-[13px] text-[#6B7280]">minimum</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Required Note */}
      <div className="mt-8 rounded-2xl border border-red-200 bg-[#FFEDED] p-6">
        <div className="flex justify-center">
          <p className="text-sm font-medium text-[#111827] leading-7 text-center pl-1"><AlertTriangle className="mt-0.5 h-5 w-5 text-red-500 inline pb-0.5" /> Minimum pricing ensures fair compensation for editors. Clients may offer more than the minimum, but cannot go below it.</p>

          {/* <div className="flex-1">
            <h4 className="text-[18px] font-semibold text-red-500">
              Required Information Note
            </h4>

            <p className="mt-2 text-[13px] text-red-500">
              This note must be displayed under every area where editors/clients
              see minimum pricing
            </p>

            <div className="mt-4 border-l-4 border-red-500 pl-4">
              <p className="text-[18px] font-medium text-[#111827] leading-7">
                "Minimum pricing ensures fair compensation for editors. Creators
                may offer more than the minimum, but cannot go below it."
              </p>
            </div>

            <p className="mt-4 text-[13px] text-[#6B7280]">
              This exact sentence must be used everywhere
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
