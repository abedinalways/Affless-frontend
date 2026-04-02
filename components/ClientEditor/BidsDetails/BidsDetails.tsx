"use client";

import PdfIcon from "@/components/Icons/PdfIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditorPrise from "./EditorPrise";
import { useSearchParams } from "next/navigation";
import { bidsData } from "@/app/(website)/(dashboard)/(client-dashboard)/client/job-proposal/_component/ProposalDetails";
import { EditorJobProposalType } from "@/app/type";
import { editorJobProposals } from "@/public/demodata";
import Link from "next/link";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";

const BidsDetails = ({ id }: { id: string }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const proposalId = searchParams.get("proposalId");
  const bidDetails = bidsData.find(bid => bid.id === id);
  const proposalDetails = proposalId ? (editorJobProposals.find(proposal => proposal.id.toString() === proposalId) as EditorJobProposalType) : null;

  // console.log("Bid Details:", bidDetails);

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
  useEffect(() => {
    setBannerLinks(buildSourceBreadcrumbs(redirect, {
      currentLabel: bidDetails ? bidDetails.name + "'s Proposal" : "Proposal Details",
      fallbackBase: [{ label: "Home", href: "/" }],
    }));
  }, [redirect, bidDetails]);

  return (
    <div>
      {/* Banner */}
      <div>
        <PageBanner
          title={`${bidDetails?.name ? bidDetails.name + "'s Proposal" : "Proposal Details"}`}
          bgImage="/findEditor.jpg"
          links={bannerLinks}
        />
      </div>

      {/* Page Content */}
      <div className="containers py-10 lg:py-20 ">
        <div className="gap-9">
          <div className=" flex flex-col lg:flex-row  gap-9">
            <div className="space-y-5 w-full lg:w-2/3 order-2 lg:order-1">
              {/* Title */}
              <h1 className="text-lg lg:text-[32px] font-bold text-[#333] leading-150% text-[#333]">
                {bidDetails?.name ? bidDetails.name + "'s Proposal" : "Proposal Details"}
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
            </div>
            <div className="w-full lg:w-1/3 order-1 lg:order-2">
              <EditorPrise
                id={id}
                redirect={redirect ? redirect + "_bidsdetails:" + id : "bidsdetails:" + id}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BidsDetails;
