"use client";

import BrowseDetails from "@/components/ClientEditor/BrowseJob/BrowseDetails";
import { data } from "@/components/ClientEditor/BrowseJob/BrowseJob";
import BudgetPage from "@/components/ClientEditor/BrowseJob/Budget";
import PageBanner from "@/components/reusable/Bgbanner";
import BidCard from "@/components/reusable/Bids";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  console.log(id)
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
  const selectedJob = data.find((job) => job.id === Number(id));
  setJob(selectedJob);
}, [id]);


  if (!job) return <div className="conta?iners py-10">Loading...</div>;

  return (
    <div>
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

            <h1 className="text-2xl font-semibold py-8">Bids</h1>
            {bids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/3">
            <BudgetPage />

          </div>

        </div>
      </div>
    </div>
  );
}
