"use client";

import ReviewPage from "@/components/ClientDashboard/GraphicsDesigner/ReviewPage";
import BrowseDetails from "@/components/ClientEditor/BrowseJob/BrowseDetails";
import BudgetPage from "@/components/ClientEditor/BrowseJob/Budget";
import BidCard from "@/components/reusable/Bids";
import { useRouter } from "next/navigation";
import React, { use, useState, useEffect } from "react";

// Simulated job data (this would normally come from an API)
const jobData = [
  { id: 1, },
  { id: 2, },
  { id: 3, },
  { id: 4, },
];
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

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function JobDetails({ params }: PostPageProps) {
  const parameters = use(params);
  const { id } = parameters;

  const router = useRouter();

  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const selectedJob = jobData.find((job) => job.id === Number(id));  // Find the job based on `id`
      setJob(selectedJob);  // Set the job details in state
    }
  }, [id]);  // Only run this effect when the `id` changes

  if (!job) {
    return <div>Loading...</div>;  // Show loading until job details are fetched
  }

  return (
    <div className="containers grid">
      <div className="py-10 flex flex-col lg:flex-row gap-9 w-full">
        <div className="w-full lg:w-5/4">
          <BrowseDetails />
          <div className="">
            <h1 className="text-2xl font-semibold py-8">Bids</h1>

            {bids.map((bid) => (
              <BidCard
                key={bid.id}
                id={bid.id}
                name={bid.name}
                avatar={bid.avatar}
                time={bid.time}
                description={bid.description}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <BudgetPage />
        </div>
      </div>

    </div>

  );
}
