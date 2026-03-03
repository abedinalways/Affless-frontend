"use client";

import BudgetPage from "@/components/ClientDashboard/GraphicsDesigner/BudgetPage";
import PdfIcon from "@/components/Icons/PdfIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import BidCard from "@/components/reusable/Bids";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Pagination from "@/components/reusable/pagination";
import { Clapperboard, Clock4 } from "lucide-react";
import DolarIcon from "@/components/Icons/DolarIcon";
import DesktopIcon from "@/components/Icons/Desktop";
import WorldIcon from "@/components/Icons/WorldIcon";
import { FaArrowLeft } from "react-icons/fa";
import { ProposalData, ProposalRow } from "@/components/ClientDashboard/JobProposal/JobProposalPage";

export const bidsData = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: "/images/devon.png",
        time: "2 hours ago",
        description:
            "I can do this job perfectly. I have 5+ years experience and I will deliver within 3 days with high quality output.",
    },
    {
        id: "2",
        name: "John Doe",
        avatar: "/images/jerome.png",
        time: "1 day ago",
        description:
            "I will handle your project professionally. You will get unlimited revisions and fast response.",
    },
    {
        id: "3",
        name: "John Doe",
        avatar: "/images/jerome.png",
        time: "1 day ago",
        description:
            "I will handle your project professionally. You will get unlimited revisions and fast response.",
    },
];

export default function ProposalDetails({ id }: { id: string }) {


    const [proposal, setProposal] = useState<ProposalRow | null>(ProposalData.find((p) => p.id === id) || null);

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
    console.log("Proposal Details Status:", ProposalData);
    return (
        <div>
            <div>
                <PageBanner
                    title={`${proposal?.service || "Proposal Details"}`}
                    bgImage="/findEditor.jpg"
                    links={[{ label: "Dashboard", href: "/client" }, { label: "Job Proposals", href: "/client/job-proposal" }, { label: proposal?.service || "Proposal Details", href: "#" }]}
                />
            </div>

            <div className="containers py-10 lg:py-20 ">
                <div className="flex flex-col lg:flex-row gap-9">
                    {/* LEFT */}
                    <div className="space-y-5 w-full order-2 lg:order-1">
                        <Link href="/client/job-proposal" className="block">
                            <button className="px-4 py-2 border rounded-md bg-[#e74c4c] hover:bg-[#c0392b] text-white text-center text-[18px] font-normal leading-[150%] cursor-pointer duration-300 flex items-center gap-2">
                                <FaArrowLeft />
                                Back to Job Proposals
                            </button>
                        </Link>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="p-4 rounded-xl border bg-[#E1E7FF]">
                                <div className="flex gap-4"> <div className="flex justify-center items-center">
                                    <Clapperboard />
                                </div>
                                    <div>
                                        <p className="text-lg text-[18px] font-semibold">Job Category</p>
                                        <p className="text-[16px] font-medium leading-150% mt-1.5 capitalize">{"Thumbnail"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl border bg-[#EBE6FE]">
                                <div className="flex gap-4"> <div className="flex justify-center items-center">
                                    <DolarIcon />
                                </div>
                                    <div>
                                        <p className="text-lg text-[18px] font-semibold">Project Budget</p>
                                        <p className="text-[16px] font-medium leading-150% mt-1.5 ">${Number(210.10).toFixed(2)}</p>
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
                                            <p className="text-[16px] font-medium leading-150% mt-1.5 ">{"YouTube"}</p>
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
                                            <p className="text-[16px] font-medium leading-150% mt-1.5 ">{2} Days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {<div className="p-4 rounded-xl border bg-[#E6F7D9]">
                                <div className="flex gap-4">
                                    <div className="flex gap-4"> <div className="flex justify-center items-center">
                                        <WorldIcon />
                                    </div>
                                        <div>
                                            <p className="text-lg text-[18px] font-semibold">Footage Duration</p>
                                            <p className="text-[16px] font-medium leading-150% mt-1.5 ">N/A</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}
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
                            <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] py-6">
                                Skills Required
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 border rounded-full bg-[#F3F5F6]">
                                    Retention Editing
                                </span>
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
                            <h2 className="tex-lg lg:text-[32px] font-medium text-[#333] mb-4">
                                Attachments
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* PDF Upload */}
                                <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
                                    <PdfIcon className="w-10 h-10" />
                                    <div>
                                        <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                                            {pdfFile ? pdfFile.name : "Added-in PDF File"}
                                        </p>
                                    </div>
                                </Link>

                                {/* TEXT Upload */}
                                <Link href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0" className="flex items-center gap-4 py-8 px-6 border rounded-xl cursor-pointer">
                                    <PdfIcon className="w-10 h-10" />
                                    <div>
                                        <p className="font-semibold pb-1.5 text-[18px] text-[#333]">
                                            {textFile ? textFile.name : "Added-in Text Document"}
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            {/* Bids */}
                            <div className="pt-10">
                                <p className="text-[24px] lg:text-[32px] font-semibold pb-6 text-[#333]">
                                    Editor Proposals
                                </p>

                                {bidsData.map((bid) => (
                                    <Link
                                        key={bid.id}
                                        href={`/client/bids-details/${bid.id}?redirect=client-dashboard&proposalId=${id}`}
                                        className=""
                                    >
                                        <BidCard
                                            id={bid.id}
                                            name={bid.name}
                                            avatar={bid.avatar}
                                            time={bid.time}
                                            description={bid.description}
                                            proposalId={id}
                                        />
                                    </Link>
                                ))}
                                <Pagination
                                    total={bidsData.length}
                                    page={1}
                                    pageSize={10}
                                    totalPages={1}
                                    onPageChange={() => { }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    {/* <div className="w-full lg:w-1/4 order-1 lg:order-2">
            <BudgetPage status={status} />
          </div> */}
                </div>
            </div>
        </div>
    );
}
