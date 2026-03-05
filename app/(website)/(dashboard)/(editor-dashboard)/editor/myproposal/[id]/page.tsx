"use client";

import DesktopIcon from "@/components/Icons/Desktop";
import DolarIcon from "@/components/Icons/DolarIcon";
import PdfIcon from "@/components/Icons/PdfIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import JobDetailsCard from "@/components/reusable/JobDetails";
import { Clapperboard, Clock4, File as FileIcon, FileText } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BidCard from "@/components/reusable/Bids";
import ReviewList, { ReviewType } from "@/components/reusable/Review";
import Link from "next/link";
import { PROPOSAL_DEMO_DATA } from "@/components/ClientEditor/MyProposal/proposal-demo-data";
import { JobRow } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function HireDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const router = useRouter();
  // File Upload Handler
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleTextUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setTextFile(e.target.files[0]);
    }
  };

  const proposal = useMemo(() => {
    return PROPOSAL_DEMO_DATA.find((p) => p.id === id) || null;
  }, [id]);


  return (
    <div className="">
      <div>
        <PageBanner

          title={proposal?.service || ""}
          bgImage="/findEditor.jpg"
          links={[
            { label: "Dashboard", href: "/editor" },
            { label: "My Jobs", href: "/editor/myproposal" },
            { label: proposal?.service || "" }

          ]}
        />
      </div>
      <div className="containers pt-10 lg:pt-20 ">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 justify-between">
          <div className="w-full">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-xl border bg-[#E1E7FF]">
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center">
                      <Clapperboard />
                    </div>
                    <div>
                      <p className="text-lg text-[18px] font-semibold">
                        Job Category
                      </p>
                      <p className="text-[16px] font-medium leading-150% mt-1.5 ">
                        Shorts/Reels/TikToks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-[#EBE6FE]">
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center">
                      <DolarIcon />
                    </div>
                    <div>
                      <p className="text-lg text-[18px] font-semibold">
                        Project Budget
                      </p>
                      <p className="text-[16px] font-medium leading-150% mt-1.5 ">
                        {proposal?.price ? `$${proposal.price}` : "$675"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2nd Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border bg-[#FFCCE4]">
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center">
                      <DesktopIcon />
                    </div>
                    <div>
                      <p className="text-lg text-[18px] font-semibold">
                        Platform
                      </p>
                      <p className="text-[16px] font-medium leading-150% mt-1.5 ">
                        YouTube
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-[#FFF1CC]">
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center">
                      <Clock4 className="text-black" />
                    </div>
                    <div>
                      <p className="text-lg text-[18px] font-semibold">
                        Project Duration
                      </p>
                      <p className="text-[16px] font-medium leading-150% mt-1.5 ">
                        {proposal?.duration ? `${proposal.duration} Days` : "5 Days"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-[#E6F7D9]">
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center">
                      <Clock4 className="text-black" />
                    </div>
                    <div>
                      <p className="text-lg text-[18px] font-semibold">Footage Duration</p>
                      <p className="text-[16px] font-medium leading-150% mt-1.5 ">
                        50 seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-[28px] lg:text-[32px] font-medium text-[#333] mt-6">
              The Ultimate Guide To Start
            </h1>

            <p className="text-gray-700 leading-relaxed mt-3">
              Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit
              amet iaculis eros. Suspendisse pulvinar, erat sed interdum auctor,
              eros ligula tempus quam, in congue est nunc et turpis.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Mauris sed venenatis libero. Pellentesque elementum ante massa, ac
              ornare augue molestie ut.
            </p>

            <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] mt-6">
              Pellentesque elementum ante massa
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Suspendisse gravida risus in sapien sollicitudin.</li>
              <li>Quisque mollis enim nec lacus elementum vulputate.</li>
              <li>Nullam fermentum turpis a nisl tristique.</li>
              <li>Donec placerat orci id lobortis suscipit.</li>
              <li>Accumsan nibh vitae, hendrerit turpis.</li>
              <li>Etiam dignissim mauris at orci finibus.</li>
            </ul>

            <div>
              <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] py-6">
                Skills Required
              </h2>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                  Retention Editing
                </span>
                <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                  Storytelling
                </span>
                <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                  Color Correction
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] mb-4">
                Attachments
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PDF Upload */}
                <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" aria-disabled="true" tabIndex={-1} className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-not-allowed pointer-events-none">
                  <PdfIcon className="w-10 h-10" />
                  <div>
                    <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                      {pdfFile ? pdfFile.name : "PDF File"}
                    </p>
                  </div>
                </Link>

                {/* TEXT Upload */}
                <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" aria-disabled="true" tabIndex={-1} className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-not-allowed pointer-events-none">
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

          {/* RIGHT */}
          <div className="w-full lg:max-w-[300px] max-w-full">
            <JobDetailsCard
              title="I will craft quality backlinks for your website's SEO."
              image="/images/vedio.png.jpg"
              status={proposal?.status || ""}
              timeLeft={{ days: 1, hours: 2, minutes: 3, seconds: 4 }}
              orderBy="Bessie"
              deliveryDate="November 6, 2026"
              totalPrice={743}
              orderNumber="#123"
              onDeliverNow={() => router.push("/editor/delivery")} // ✅ link
              onMessage={() => console.log("Message clicked")}
              onExtendDelivery={() => router.push(`/editor/extend-delivery?jobid=${proposal?.id || ""}`)} // ✅ link
              jobId={proposal?.id || ""}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
