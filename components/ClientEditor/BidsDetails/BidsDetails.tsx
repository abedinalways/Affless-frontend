"use client";

import PdfIcon from "@/components/Icons/PdfIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import EditorPrise from "./EditorPrise";
import { useSearchParams } from "next/navigation";
import { bidsData } from "@/app/(website)/(client-dashboard)/client/job-proposal/_component/ProposalDetails";
import { ProposalData, ProposalRow } from "@/components/ClientDashboard/JobProposal/JobProposalPage";
import Link from "next/link";

const BidsDetails = ({ id }: { id: string }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const proposalId = searchParams.get("proposalId");
  const bidDetails = bidsData.find(bid => bid.id === id);
  const proposalDetails = proposalId ? (ProposalData.find(proposal => proposal.id === proposalId) as ProposalRow) : null;

  console.log("Bid Details:", bidDetails);

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
    <div>
      {/* Banner */}
      <div>
        <PageBanner
          title="Proposal Details"
          bgImage="/findEditor.jpg"
          links={[
            {
              label: redirect === "client-dashboard" ? "Dashboard" : "Home",
              href: redirect === "client-dashboard" ? "/client" : "/"
            },
            {
              label: redirect === "client-dashboard" ? "Job Proposals" : "Home",
              href: redirect === "client-dashboard" ? "/client/job-proposal" : "/"
            },
            ...(proposalDetails ?
              [{
                label: proposalDetails ? proposalDetails.service : "Home",
                href: proposalDetails ? `/client/job-proposal/${proposalDetails.id}` : "/"
              }] : []
            ),
            {
              label: bidDetails ? bidDetails.name : "Proposal Details"
            }
          ]}
        />
      </div>

      {/* Page Content */}
      <div className="containers py-10 lg:py-20 ">
        <div className="gap-9">
          <div className=" flex flex-col lg:flex-row  gap-9">
            <div className="space-y-5 w-full lg:w-2/3 order-2 lg:order-1">
              {/* Title */}
              <h1 className="text-lg lg:text-[32px] font-bold text-[#333] leading-150% text-[#333]">
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
                <h2 className="text-lg lg:text-[32px] font-bold text-[#333] leading-150% text-[#333] py-6">
                  Skills Required
                </h2>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                    Color Correction
                  </span>
                  <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                    Storytelling
                  </span>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h2 className="text-lg lg:text-[32px] font-bold text-[#333] leading-150% mb-4">
                  Attachments
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PDF Upload */}
                  <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
                    <PdfIcon className="w-10 h-10" />
                    <div>
                      <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                        {pdfFile ? pdfFile.name : "PDF File"}
                      </p>
                    </div>
                  </Link>

                  {/* TEXT Upload */}
                  <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
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
            <div className="w-full lg:w-1/3 order-1 lg:order-2">
              <EditorPrise />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BidsDetails;
