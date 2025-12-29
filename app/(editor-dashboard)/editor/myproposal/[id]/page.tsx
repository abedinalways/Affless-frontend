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
interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface ProposalRow {
  id: number;
  service: string;
  amount: string;
  time: string;
  status: "Progress" | "Pending" | "Cancellation";
  thumbnail: string;
}

const Proposal: ProposalRow[] = [
  {
    id: 1,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft quality backlinks.",
    amount: "$55",
    time: "5 Days",
    status: "Progress",
  },
  {
    id: 2,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "Pending",
  },
  {
    id: 3,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft backlinks.",
    amount: "$60",
    time: "5 Days",
    status: "Pending",
  },
  {
    id: 4,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$70",
    time: "7 Days",
    status: "Progress",
  },
  {
    id: 5,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will craft backlinks.",
    amount: "$80",
    time: "5 Days",
    status: "Progress",
  },
  {
    id: 6,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "Cancellation",
  },
  {
    id: 7,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$55",
    time: "3 Days",
    status: "Pending",
  },
  {
    id: 8,
    thumbnail: "/images/mnagejob2.jpg",
    service: "I will create backlinks.",
    amount: "$90",
    time: "7 Days",
    status: "Pending",
  },
];

export default function HireDetails({ params }: { params: { id: string } }) {
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
    const idNum = Number(params.id);
    if (Number.isNaN(idNum)) return null;
    return Proposal.find((p) => p.id === idNum) || null;
  }, [params.id]);


  const dynamicStatus: ProposalRow["status"] = proposal?.status ?? "Pending";

  return (
 <div className="">
   <div>
        <PageBanner

          title="Graphic Designer for ongoing job"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/editor" },
            { label: "My Job",href:"/editor/myproposal"}, 
            { label: "In Progress" }

          ]}
        />
      </div>
     <div className="containers pt-10 lg:pt-20 ">
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
       
        <div className="w-2/3">
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
                      Video
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
                      {proposal?.amount ?? "$675"}
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
                      Youtobe
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
                      {proposal?.time ?? "5 Days"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-[#E6F7D9]">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center">
                    <WorldIcon />
                  </div>
                  <div>
                    <p className="text-lg text-[18px] font-semibold">Country</p>
                    <p className="text-[16px] font-medium leading-150% mt-1.5 ">
                      USA
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

          <div className="mt-6">
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

                  <p className=" text-[#666] text-[16px]">
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

                  <p className=" text-[#666] text-[16px]">
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
          </div>
        </div>

        {/* RIGHT */}
       <div className="w-1/3">
          <JobDetailsCard
  title="I will craft quality backlinks for your website's SEO."
  image="/images/vedio.png.jpg"
  status="Pending"
  timeLeft={{ days: 1, hours: 2, minutes: 3, seconds: 4 }}
  orderBy="Bessie"
  deliveryDate="NOV 6"
  totalPrice={743}
  orderNumber="#123"
  onDeliverNow={() => router.push("/editor/delivery")} // ✅ link
  onMessage={() => console.log("Message clicked")}
  onExtendDelivery={() => router.push("/editor/extend-delivery")} // ✅ link
/>
       </div>

      </div>
    </div>
 </div>
  );
}
