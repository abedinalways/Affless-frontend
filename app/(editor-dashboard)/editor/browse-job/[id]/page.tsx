"use client";
import ReviewPage from "@/components/ClientDashboard/GraphicsDesigner/ReviewPage";
import BrowseDetails from "@/components/ClientEditor/BrowseJob/BrowseDetails";
import BudgetPage from "@/components/ClientEditor/BrowseJob/Budget";
import { useRouter } from "next/navigation";
import React, { use, useState, useEffect } from "react";

// Simulated job data (this would normally come from an API)
const jobData = [
  { id: 1, },
  { id: 2, },
  { id: 3, },
  { id: 4, },




];


type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function JobDetails({ params }: PostPageProps ) {
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
    <div className=" containers ">
        <div className="py-10 flex gap-9 ">
          <BrowseDetails/>
        <div>
          <BudgetPage/>
        </div>
        </div>
<div>
  <ReviewPage/>
</div>
    </div>

  );
}
