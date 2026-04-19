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

const formatBidAmount = (value: string, minimum: number = 2) => {
  const sanitized = value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
  const parsed = Number.parseFloat(sanitized);
  const finalAmount = Number.isFinite(parsed) && parsed >= minimum ? parsed : minimum;

  return `$${finalAmount.toFixed(2)}`;
};

type PostPageProps = {
  params: { id: string };
};

export default function JobDetails({ params }: PostPageProps) {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || undefined;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<{
    bidAmount: string;
    deliveryTime: string;
    coverLetter: string;
  }>();
  const [actualBidAmount, setActualBidAmount] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");

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

  const handleMatchClientBudget = () => {
    const rawBudget = job?.budget ?? job?.clientBudget ?? job?.price;

    if (rawBudget === undefined || rawBudget === null) {
      toast.error("Client budget is not available.");
      return;
    }

    const numericBudget =
      typeof rawBudget === "number"
        ? rawBudget
        : Number.parseFloat(String(rawBudget).replace(/[^0-9.]/g, ""));

    if (!Number.isFinite(numericBudget) || numericBudget <= 0) {
      toast.error("Client budget is not available.");
      return;
    }

    setValue("bidAmount", formatBidAmount(String(numericBudget), 2), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onProposalSubmit = (data: { bidAmount: string; deliveryTime: string; coverLetter: string }) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      toast.success("Proposal submitted successfully!");
    }, 1000);
  };

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
            <div>
              <h1 className="text-2xl font-semibold py-8">Submit a Proposal</h1>
              <form className="space-y-5" onSubmit={handleSubmit(onProposalSubmit)}>
                <div className="w-full grid gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="w-full">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter Your Pricing"
                        className="w-full outline-none border rounded-full p-5 text-sm"
                        {...register("bidAmount", {
                          required: true,
                          onChange: (e) => {
                            // শুধু number allow
                            let rawValue = e.target.value.replace(/[^0-9.]/g, "");
                            const parts = rawValue.split(".");
                            rawValue = parts.shift() + (parts.length ? "." + parts.join("") : "");
                            e.target.value = rawValue;
                            setActualBidAmount(rawValue);
                          },

                          onBlur: (e) => {
                            e.target.value = formatBidAmount(e.target.value, 2);
                          },
                        })}

                      />
                        {errors.bidAmount && (
                          <p className="text-red-500 text-xs mt-2 pl-4">
                            Proposal amount is required
                          </p>
                        )}
                        {(Number(actualBidAmount) < 2 && actualBidAmount && !errors.bidAmount) && (
                          <p className="text-red-500 text-xs mt-2 pl-4">
                            The minimum pricing for this job is $2.00.
                          </p>
                        )}
                      <button
                        type="button"
                        onClick={handleMatchClientBudget}
                        className="text-sm border px-4 py-1 cursor-pointer rounded-lg mt-1 ml-4 bg-red-500 text-white hover:bg-red-600 transition duration-300"
                      >
                        Match Client Budget
                      </button>
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Enter Delivery Time"
                        className="w-full outline-none border rounded-full p-5 text-sm"
                        {...register("deliveryTime", { required: true })}
                        {...register("deliveryTime", {
                          required: true,
                          onChange: (e) => {
                            // শুধু number allow
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                          },

                          onBlur: (e) => {
                            let value = parseInt(e.target.value.replace(/[^0-9]/g, ""));

                            if (!value || value < 1) value = 1;

                            // auto format
                            e.target.value = `${value} days`;
                          },
                        })}
                      />
                      {errors.deliveryTime && (
                        <p className="text-red-500 text-xs mt-1">
                          Delivery Time is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <textarea
                      rows={6}
                      placeholder="Write Your Proposal Details"
                      className="w-full outline-none border rounded-lg p-5 text-sm resize-none"
                      maxLength={2000}
                      {...register("coverLetter", {
                        required: true, minLength: 50,
                        onChange: (e) => {
                          let value = e.target.value;
                          if (value.length > 2000) {
                            value = value.slice(0, 2000);
                          }
                          setProposalDescription(value);
                        }
                      })}
                      value={proposalDescription}
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className={proposalDescription.length >= 2000 ? "text-red-500 text-xs font-normal" : proposalDescription.length >= 1800 ? "text-gray-900 text-xs" : "text-gray-500 text-xs"}>
                        {proposalDescription.length}/2000
                      </span>
                      {proposalDescription.length >= 1200 && proposalDescription.length < 2000 && (
                        <span className={`${proposalDescription.length >= 1800 ? "text-gray-900 text-xs" : "text-gray-500 text-xs"}`}>Shorter proposals get more replies.</span>
                      )}
                      {proposalDescription.length === 2000 && (
                        <span className="text-red-500 text-xs">Maximum character limit reached.</span>
                      )}
                    </div>
                    {errors.coverLetter && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.coverLetter.type === "minLength"
                          ? "Proposal Details must be at least 50 characters"
                          : "Proposal Details is required"}
                      </p>
                    )}
                  </div>
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full border border-red-300 text-red-500 py-4 rounded-lg text-lg font-normal text-[16px] hover:bg-[#FF4D4F] hover:text-white cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Submitting..." : "Submit a Proposal"}
                </button>
              </form>
            </div>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
