
"use client";

import ClockIcon from "@/components/Icons/ClockIcon";
import DesktopIcon from "@/components/Icons/Desktop";
import DolarIcon from "@/components/Icons/DolarIcon";
import PdfIcon from "@/components/Icons/PdfIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { FileText, File, YoutubeIcon, Clapperboard, Clock4 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TbClock } from "react-icons/tb";

export default function BrowseDetails() {

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleTextUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTextFile(e.target.files[0]);
    }
  };

  return (
    <div className="mx-auto space-y-5 ">
      {/* Top Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="p-4 rounded-xl border bg-[#E1E7FF]">
          <div className="flex gap-4"> <div className="flex justify-center items-center">
            <Clapperboard />
          </div>
            <div>
              <p className="text-lg text-[18px] font-semibold">Job Category</p>
              <p className="text-[16px] font-medium leading-150% mt-1.5 ">Video</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-[#EBE6FE]">
          <div className="flex gap-4"> <div className="flex justify-center items-center">
            <DolarIcon />
          </div>
            <div>
              <p className="text-lg text-[18px] font-semibold">Project Budget</p>
              <p className="text-[16px] font-medium leading-150% mt-1.5 ">$675</p>
            </div>
          </div>
        </div>


      </div>

      {/* 2nd Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-[#FFCCE4]">
          <div className="flex gap-4">
            <div className="flex gap-4"> <div className="flex justify-center items-center">
              <DesktopIcon />
            </div>
              <div>
                <p className="text-lg text-[18px] font-semibold">Platform</p>
                <p className="text-[16px] font-medium leading-150% mt-1.5 ">Youtobe</p>
              </div>
            </div>
          </div>
        </div>


        <div className="p-4 rounded-xl border bg-[#FFF1CC]">
          <div className="flex gap-4">
            <div className="flex gap-4"> <div className="flex justify-center items-center">
              <Clock4 className="text-black" />

            </div>
              <div>
                <p className="text-lg text-[18px] font-semibold">Project Duration</p>
                <p className="text-[16px] font-medium leading-150% mt-1.5 ">5 Days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-[#E6F7D9]">
          <div className="flex gap-4">
            <div className="flex gap-4"> <div className="flex justify-center items-center">
              <WorldIcon />
            </div>
              <div>
                <p className="text-lg text-[18px] font-semibold">Country</p>
                <p className="text-[16px] font-medium leading-150% mt-1.5 ">USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-[28px] lg:text-[32px] font-medium text-[#333]">The Ultimate Guide To Start</h1>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">
        Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit amet
        iaculis eros. Suspendisse pulvinar, erat sed interdum auctor, eros
        ligula tempus quam, in congue est nunc et turpis. Nam non nisl sed sem
        placerat semper. Proin egestas, odio eu semper mattis, enim odio
        pulvinar leo, ac vestibulum sapien nulla non arcu.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Mauris sed venenatis libero. Pellentesque elementum ante massa, ac
        ornare augue molestie ut. Suspendisse lacinia tortor sem, at
        condimentum nulla auctor in. Sed vulputate euismod risus, eget auctor
        nulla aliquet sed.
      </p>

      {/* Subtitle */}
      <h2 className="tex-lg lg:text-[32px] font-medium text-[#333]">
        Pellentesque elementum ante massa
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Suspendisse gravida risus in sapien sollicitudin.</li>
        <li>Quisque mollis enim nec lacus elementum vulputate.</li>
        <li>Nullam fermentum turpis a nisl tristique.</li>
        <li>Donec placerat orci id lobortis suscipit.</li>
        <li>Accumsan nibh vitae, hendrerit turpis.</li>
        <li>Etiam dignissim mauris at orci finibus.</li>
      </ul>

      {/* Skills */}
      <div>
        <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] py-6">Skills Required</h2>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
            Adobe Premiere Pro
          </span>
          <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
            Adobe After Effects
          </span>
          <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
            Adobe After Effects
          </span>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] mb-4">Attachments</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* PDF Upload */}
          <Link href="" target="_blank" className="flex items-center gap-4 py-4 px-6 border rounded-xl cursor-pointer">
            <PdfIcon className="w-10 h-10" />
            <div>
              <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                {pdfFile ? pdfFile.name : "PDF File"}
              </p>
            </div>
          </Link>

          {/* TEXT Upload */}
          <Link href="" target="_blank" className="flex items-center gap-4 py-4 px-6 border rounded-xl cursor-pointer">
            <PdfIcon className="w-10 h-10" />
            <div>
              <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                {textFile ? textFile.name : "Upload Text Document"}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
