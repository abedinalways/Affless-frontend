"use client";

import BudgetPage from "@/components/ClientDashboard/GraphicsDesigner/BudgetPage";
import PdfIcon from "@/components/Icons/PdfIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import BidCard from "@/components/reusable/Bids";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function JobDetails({ params }: { params: { id: string } }) {
  const bids = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/images/devon.png",
      time: "2 hours ago",
      description:
        "I can do this job perfectly. I have 5+ years experience and I will deliver within 3 days with high quality output.",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "/images/jerome.png",
      time: "1 day ago",
      description:
        "I will handle your project professionally. You will get unlimited revisions and fast response.",
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "/images/jerome.png",
      time: "1 day ago",
      description:
        "I will handle your project professionally. You will get unlimited revisions and fast response.",
    },
  ];

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPdfFile(e.target.files[0]);
  };

  const handleTextUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setTextFile(e.target.files[0]);
  };

  // ✅ get status from url query
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  // ✅ type-safe sanitize
  const status: "Accept" | "Declined" | null =
    statusParam === "Accept" || statusParam === "Declined"
      ? statusParam
      : null;

  return (
    <div>
      <div>
        <PageBanner
          title="Proposal Details"
          bgImage="/findEditor.jpg"
          links={[{ label: "Home", href: "/" }, { label: "Proposal Details" }]}
        />
      </div>

      <div className="containers py-10 lg:py-20 ">
        <div className="flex flex-col lg:flex-row gap-9">
          {/* LEFT */}
          <div className="space-y-5 w-full lg:w-3/4 order-2 lg:order-1">
            <h1 className="text-[28px] lg:text-[32px] font-medium text-[#333]">
              Proposal Details
            </h1>

           <p className="text-[16px] font-normal leading-150% text-[#4A4C56]">
              Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit
              amet iaculis eros. Suspendisse pulvinar, erat sed interdum auctor,
              eros ligula tempus quam, in congue est nunc et turpis. Nam non
              nisi sed sem placerat semper. Proin egestas, odio eu semper mattis,
              enim odio pulvinar leo, ac vestibulum sapien nulla non arcu.
            </p>

            <p className="text-[16px] font-normal leading-150% text-[#4A4C56]">
              Mauris sed venenatis libero, Pellentesque elementum ante massa,ac
              ornare augue molestie ut. Suspendisse lacinia tortor sem, at
              condimentum nulla auctor in. Sed vulputate euismod risus, eget
              auctor nulla aliquet sed.
            </p>

            <p className="text-[16px] font-normal leading-150% text-[#4A4C56]">
              Nunc consequat quam tincidunt, mattis purus et, euismod eros.
              Donec sed lobortis nunc. Donec a pretium ipsum. Curabitur
              pellentesque neque et dictum interdum. Nam eu faucibus augue, id
              sagittis magna. Aliquam sodales est dolor, non convallis arcu
              feugiat a. Curabitur dictum dapibus nisl quis convallis. Morbi nec
              ex vestibulum, tincidunt sapien a, pretium arcu.
            </p>

            <p className="text-[16px] font-normal leading-150% text-[#4A4C56]">
              The Ultimate Guide To StartEtiam gravida euismod sodales.
              Vestibulum sed egestas sapien, sit amet iaculis eros. Suspendisse
              pulvinar, erat sed interdum auctor, eros ligula tempus quam, in
              congue est nunc et turpis. Nam non nisi sed sem placerat semper.
              Proin egestas, odio eu semper mattis, enim odio pulvinar leo, ac
              vestibulum sapien nulla non arcu.
            </p>

            <p className="text-[16px] font-normal leading-150% text-[#4A4C56]">
              Mauris sed venenatis libero, Pellentesque elementum ante massa, ac
              ornare augue molestie ut. Suspendisse lacinia tortor sem, at
              condimentum nulla auctor in. Sed vulputate euismod risus, eget
              auctor nulla aliquet sed.
            </p>

            <p className="text-[16px] font-normal leading-150% text-[#4A4C56]">
              Nunc consequat quam tincidunt, mattis purus et, euismod eros.
              Donec sed lobortis nunc. Donec a pretium ipsum. Curabitur
              pellentesque neque et dictum interdum. Nam eu faucibus augue, id
              sagittis magna. Aliquam sodales est dolor, non convallis arcu
              feugiat a. Curabitur dictum dapibus nisl quis convallis. Morbi nec
              ex vestibulum, tincidunt sapien a, pretium arcu.
            </p>

            {/* Skills */}
            <div>
              <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] py-6">
                Skills Required
              </h2>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                  Adobe Premiere Pro
                </span>
                <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                  Adobe After Effects
                </span>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] mb-4">
                Attachments
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PDF Upload */}
                <label className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
                  <PdfIcon className="w-10 h-10" />
                  <div>
                    <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                      {pdfFile ? pdfFile.name : "PDF File"}
                    </p>
                    <p className="text-[#666] text-[16px]">
                      {pdfFile
                        ? `File size: ${(pdfFile.size / 1024).toFixed(2)} KB`
                        : "Choose a PDF file"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handlePdfUpload}
                  />
                </label>

                {/* TEXT Upload */}
                <label className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
                  <PdfIcon className="w-10 h-10" />
                  <div>
                    <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                      {textFile ? textFile.name : "Upload Text Document"}
                    </p>
                    <p className="text-[#666] text-[16px]">
                      {textFile
                        ? `File size: ${(textFile.size / 1024).toFixed(2)} KB`
                        : "Choose a TXT file"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".txt"
                    className="hidden"
                    onChange={handleTextUpload}
                  />
                </label>
              </div>

              {/* Bids */}
              <div className="pt-10">
                <p className="text-[24px] lg:text-[32px] font-semibold pb-6 text-[#333]">
                  Bids
                </p>

                {bids.map((bid) => (
                  <Link
                    key={bid.id}
                    href="/client/bids-details"
                    className=""
                  >
                    <BidCard
                      id={bid.id}
                      name={bid.name}
                      avatar={bid.avatar}
                      time={bid.time}
                      description={bid.description}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2">
            {/* ✅ Pass status safely */}
            <BudgetPage status={status} />
          </div>
        </div>
      </div>
    </div>
  );
}
