"use client";

import PdfIcon from "@/components/Icons/PdfIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import BidCard from "@/components/reusable/Bids";
import { File, FileText } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import toast from "react-hot-toast";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function page({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const [files, setFiles] = useState<UploadedFile[]>([{
    name: "SampleDocument.pdf",
    size: 1024,
    type: "application/pdf",
  }, {
    name: "ProjectDetails.docx",
    size: 2048,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  }]);

  // File Upload Handler

  // Format file size
  const formatSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
  useEffect(() => {
    setBannerLinks(buildSourceBreadcrumbs(redirectUrl, {
      currentLabel: "I will craft quality backlinks.",
      fallbackBase: [{ label: "Home", href: "/" }],
    }));
  }, [redirectUrl]);

  return (
    <div className="">
      <div>
        <PageBanner
          title="I will craft quality backlinks."
          bgImage="/findEditor.jpg"
          links={[...bannerLinks]}
        />
      </div>
      <div className="containers py-10 flex flex-col lg:flex-row gap-10">

        {/* LEFT SIDE */}
        <div className="lg:w-2/3 space-y-10">

          {/* ===== Proposal Details ===== */}
          <div>
            <h2 className="text-xl font-semibold mb-4">My Proposal Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-xl p-4 bg-white">
                <p className="text-sm text-gray-500">My Pricing</p>
                <p className="text-[22px] font-semibold text-[#333] mt-1">$350.00</p>
              </div>
              <div className="border rounded-xl p-4 bg-white">
                <p className="text-sm text-gray-500">My Delivery Time</p>
                <p className="text-[22px] font-semibold text-[#333] mt-1">3 Days</p>
              </div>
            </div>

            <p className="text-[15px] leading-7 text-gray-700 mb-4">
              Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit amet iaculis eros. Suspendisse pulvinar, erat sed interdum auctor, eros ligula tempus quam.
            </p>

            <p className="text-[15px] leading-7 text-gray-700 mb-4">
              Mauris sed venenatis libero. Sed vulputate euismod risus, eget auctor nulla aliquet sed. Donec sed lobortis nunc. Donec a pretium ipsum.
            </p>

            <p className="text-[15px] leading-7 text-gray-700 mb-4">
              The Ultimate Guide To Start — Etiam gravida euismod sodales. Vestibulum sed egestas sapien.
            </p>
          </div>

          {/* ===== Skills Required ===== */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-sm">Adobe Premiere Pro</span>
              <span className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-sm">Adobe After Effects</span>
              <span className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-sm">Video Editing</span>
            </div>
          </div> */}

          {/* ===== Attachments ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Attachments</h3>

            {/* Upload Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PDF Upload */}
              {files.map((file, index) => (
                <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
                  <PdfIcon className="w-10 h-10" />
                  <div>
                    <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                      {file ? file.name : "PDF File"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* {bids.map((bid) => (
            <BidCard
              key={bid.id}
              id={bid.id}
              name={bid.name}
              avatar={bid.avatar}
              time={bid.time}
              description={bid.description}
            />
          ))} */}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:w-1/3 space-y-6">

          {/* Budget Box */}
          <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
            <h3 className="text-gray-500 font-medium">Client’s Chosen Job Payout</h3>
            <p className="text-[34px] font-bold">$350.00</p>

            <button type="button" onClick={() => setShowConfirmation(true)} className="w-full border border-red-300 text-red-500 py-4 rounded-lg text-lg font-normal text-[16px] hover:bg-[#FF4D4F] hover:text-white cursor-pointer transition">
              Match Client’s Chosen Job Payout
            </button>

            {/* <div className="pt-2 space-y-1 text-sm">
              <p className="flex justify-between"><span>Project Level:</span><span>Expensive</span></p>
              <p className="flex justify-between"><span>Languages:</span><span>French</span></p>
              <p className="flex justify-between"><span>English Level:</span><span>Native</span></p>
            </div> */}
          </div>

          {/* About Buyer */}
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">About Client</h3>

            <div className="flex items-center gap-4">
              <Link href="/client-profile/1">
                <Image
                  src="/images/headset.svg"
                  alt="Client profile image"
                  className="h-14 w-14 rounded-full object-cover"
                  width={500}
                  height={500}
                />
              </Link>
              <div>
                <Link href="/client-profile/1" className="font-semibold">Bessie Cooper</Link>
                <p className="text-sm text-gray-500">Australia</p>
              </div>
            </div>

            <div className="mt-4 text-sm space-y-1">
              <p className="flex  justify-between"><strong>Total Jobs Posted:</strong> 45</p>
              <p className="flex  justify-between"><strong>Hire Rate (%):</strong> 92%</p>
              <p className="flex  justify-between"><strong>Average Response Time:</strong> 1 hour</p>
              <p className="flex  justify-between"><strong>Member Since:</strong> January, 2023</p>
            </div>

            <Link href={`/editor/message?id=${id}&redirect=${ redirectUrl ? redirectUrl + "_" : ''}myjobproposalsdetails:${id}`} className="inline-block text-center w-full mt-4 py-3 rounded-lg bg-[#FF4D4F] text-white font-medium cursor-pointer hover:bg-red-600 transition">
              Message Client
            </Link>
          </div>
        </div>
      </div>
      <ConfirmationPopup
        isOpen={showConfirmation}
        title="Confirm Price Match"
        description="You are about to update your proposal price to match the client’s chosen job payout. This will permanently replace your current pricing and cannot be undone."
        confirmText="Confirm and Match Payout"
        cancelText="Cancel"
        confirmClassName="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#FF4D4F] text-white hover:bg-red-600 cursor-pointer"
        cancelClassName="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
        onConfirm={() => {
          setShowConfirmation(false);
          toast.success("You have accepted the job!")
        }}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
}
