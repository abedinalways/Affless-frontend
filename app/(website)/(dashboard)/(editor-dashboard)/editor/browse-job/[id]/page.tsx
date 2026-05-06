"use client";

import BrowseDetails from "@/components/ClientEditor/BrowseJob/BrowseDetails";
import { browseJobData as data } from "@/public/demodata";
import BudgetPage from "@/components/ClientEditor/BrowseJob/Budget";
import PageBanner from "@/components/reusable/Bgbanner";
import BidCard from "@/components/reusable/Bids";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Pagination from "@/components/reusable/pagination";
import { useSearchParams } from "next/navigation";
import { browsejobbids as bids } from "@/public/demodata";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import ProposalForm from "../_components/ProposalForm";

type PostPageProps = {
  params: { id: string };
};

export default function JobDetails({ params }: PostPageProps) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || undefined;

  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const selectedJob = data.find((job) => job.id === Number(id));
    setJob(selectedJob);
  }, [id]);

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
  useEffect(() => {
    if (job) {
      setBannerLinks(buildSourceBreadcrumbs(redirectUrl, {
        currentLabel: job.title,
        fallbackBase: [{ label: "Home", href: "/" }],
      }));
    }
  }, [redirectUrl, job]);


  if (!job) return <div className="conta?iners py-10">Loading...</div>;

  return (
    <div>
      <PageBanner
        title={job.title}
        bgImage="/findEditor.jpg"
        links={[...bannerLinks]}
      />
      <div className="grid items-center justify-start px-6 pt-6 containers">
        <Link
          href={`/editor/browse-job?${redirectUrl ? `redirect=${redirectUrl?.split("_").slice(0, -1).join("_")}` : ""}`}
          className="flex items-center gap-2 border px-5 py-3 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
        >
          <FaArrowLeft />
          <span>Back to Browse Jobs</span>
        </Link>
      </div>
      <div className="containers">
        <div className="py-10 flex gap-9 flex-col lg:flex-row">
          {/* LEFT */}
          <div className="w-full lg:w-2/3">
            <BrowseDetails />
            <ProposalForm />
            <h1 className="text-2xl font-semibold py-8">Editor Proposals</h1>
            {bids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
            <Pagination
              page={1}
              total={3}
              totalPages={1}
              onPageChange={(page) => console.log("Navigate to page:", page)}
              pageSize={10}
            />
          </div>
          {/* RIGHT */}
          <div className="w-full lg:w-1/3">
            <BudgetPage
              btnText="Chat With Client"
              returnLink={`${redirectUrl ? `${redirectUrl}_` : ""}browsejobdetails:${id}`}
              showBudget={true}
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
      </div>
    </div>
  );
}
