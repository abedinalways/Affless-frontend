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
import BudgetPage from "@/components/ClientEditor/BrowseJob/Budget";

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
  const [proposalPrice, setProposalPrice] = useState(280);

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
                <p className="text-[22px] font-semibold text-[#333] mt-1">${proposalPrice.toFixed(2)}</p>
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
        <div className="lg:w-1/3 space-y-6 overflow-hidden">
          {/* Budget Box */}
          <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
            <h3 className="text-gray-500 font-medium">Client’s Chosen Job Payout</h3>
            <p className="text-[34px] font-bold">$350.00</p>

            <button type="button" disabled={proposalPrice === 350} onClick={() => setShowConfirmation(true)} className="w-full border border-red-300 text-red-500 py-4 rounded-lg text-lg font-normal text-[16px] hover:bg-[#FF4D4F] hover:text-white cursor-pointer transition disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-green-500 disabled:text-green-500 disabled:border-green-500 disabled:opacity-30">
              {proposalPrice === 350 ? "You Matched the Client’s Chosen Job Payout" : "Match Client’s Chosen Job Payout"}
            </button>

            {/* <div className="pt-2 space-y-1 text-sm">
              <p className="flex justify-between"><span>Project Level:</span><span>Expensive</span></p>
              <p className="flex justify-between"><span>Languages:</span><span>French</span></p>
              <p className="flex justify-between"><span>English Level:</span><span>Native</span></p>
            </div> */}
          </div>

          <div className="w-full grid">
            <h3 className="text-lg font-semibold mb-3">Attachments</h3>

            {/* Upload Button */}
            <div className="w-full grid grid-cols-1 gap-4">
              {/* PDF Upload */}
              <Link href="https://docs.google.com/document/d/1dMaecDuSwkP7_ppNmOGfjSun3W-4a1009OdFCozKdoc/edit?usp=sharing" target="_blank" aria-disabled="true" tabIndex={-1} className="w-full grid grid-cols-[40px_1fr] items-center gap-4 py-4 px-6 border rounded-xl">
                <Image
                  src="/images/pdfIcon.png"
                  alt="PDF Icon"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-semibold pb-1.5 text-[18px] text-[#333] capitalize truncate" style={{ maxWidth: 'calc(100% - 40px)' }} title="Instructions for the editor">
                    Instructions for the editor
                  </p>
                </div>
              </Link>

              {/* TEXT Upload */}
              <Link href="https://docs.google.com/document/d/1j8vESQ6rYlclSjxmbhauxnN55SGqI6wjyu0OmWismE4/edit?usp=sharing" aria-disabled="true" target="_blank" tabIndex={-1} className="w-full grid grid-cols-[40px_1fr] items-center gap-4 py-4 px-6 border rounded-xl">
                <Image
                  src="/images/wordIcon.jpg"
                  alt="Word Icon"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-semibold pb-1.5 text-[18px] text-[#333] capitalize truncate" style={{ maxWidth: 'calc(100% - 40px)' }} title="Script for the video">
                    Script for the video
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* About Buyer */}
          <BudgetPage
            btnText="Chat With Client"
            returnLink={`${redirectUrl ? `${redirectUrl}_` : ""}browsejobdetails:${id}`}
            showBudget={false}
            data={{
              id: `${new Date()?.getDate?.toString()}`,
              name: "John Doe",
              type: "client",
              totalJobsPosted: 50,
              hireRate: 90,
              averageResponseTime: "1 hour",
              memberSince: "January, 2020",
              location: "Australia",
            }}
          />
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
          toast.success("You have matched the client's chosen job payout.");
          setProposalPrice(350);
        }}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
}
