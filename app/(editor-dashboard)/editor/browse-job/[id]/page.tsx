"use client";

import BrowseDetails from "@/components/ClientEditor/BrowseJob/BrowseDetails";
import { data } from "@/components/ClientEditor/BrowseJob/BrowseJob";
import BudgetPage from "@/components/ClientEditor/BrowseJob/Budget";
import PageBanner from "@/components/reusable/Bgbanner";
import BidCard from "@/components/reusable/Bids";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

const bids = [
  {
    id: 1,
    name: "Devon Lane",
    avatar: "/images/devon.png",
    time: "2 hours ago",
    description:
      "I can do this job perfectly. I have 5+ years experience and I will deliver within 3 days with high quality output.",
  },
  {
    id: 1,
    name: "Jerome Bell",
    avatar: "/images/jerome.png",
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
];

type PostPageProps = {
  params: { id: string };
};

export default function JobDetails({ params }: PostPageProps) {
  const { id } = useParams();
  const { handleSubmit, register, formState: { errors } } = useForm<{
    bidAmount: string;
    deliveryTime: string;
    coverLetter: string;
  }>();
  console.log(id)
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const selectedJob = data.find((job) => job.id === Number(id));
    setJob(selectedJob);
  }, [id]);


  if (!job) return <div className="conta?iners py-10">Loading...</div>;

  const onProposalSubmit = (data: { bidAmount: string; deliveryTime: string; coverLetter: string }) => {
    console.log("Proposal Submitted:", data);
  };

  return (
    <div>
      {/* <Toaster position="top-right" /> */}
      <PageBanner
        title={"Graphic Designer for ongoing job"}
        bgImage="/findEditor.jpg"
        links={[
          { label: "Home", href: "/" },
          { label: "Browse Jobs", href: "/browse-job" },
          { label: job.title },
        ]}
      />
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
                        placeholder="Enter bid price"
                        className="w-full outline-none border rounded-full p-5 text-sm"
                        {...register("bidAmount", { required: true })}
                      />
                      {errors.bidAmount && (
                        <p className="text-red-500 text-xs mt-1">
                          Bid Amount is required
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Enter delivery time"
                        className="w-full outline-none border rounded-full p-5 text-sm"
                        {...register("deliveryTime", { required: true })}
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
                      placeholder="Write your cover letter"
                      className="w-full outline-none border rounded-lg p-5 text-sm resize-none"
                      {...register("coverLetter", { required: true })}
                    />
                    {errors.coverLetter && (
                      <p className="text-red-500 text-xs mt-1">
                        Cover Letter is required
                      </p>
                    )}
                  </div>
                </div>
                <button type="submit" className="w-full border border-red-300 text-red-500 py-4 rounded-lg text-lg font-normal text-[16px] hover:bg-[#FF4D4F] hover:text-white cursor-pointer transition">
                  Submit a Proposal
                </button>
              </form>
            </div>
            <h1 className="text-2xl font-semibold py-8">Bids</h1>
            {bids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>
          {/* RIGHT */}
          <div className="w-full lg:w-1/3">
            <BudgetPage
              btnText="Chat with Buyer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
