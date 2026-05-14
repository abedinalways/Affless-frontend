"use client";

import { useEffect, useState } from "react";
import JobDetailsPage from "@/components/ClientDashboard/GraphicsDesigner/JobDetailsPa";
import { adminJobs } from "@/public/demodata";
import { JobRow } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import Loading from "@/components/shared/Loading";
import DesktopIcon from "@/components/Icons/Desktop";
import DolarIcon from "@/components/Icons/DolarIcon";
import PdfIcon from "@/components/Icons/PdfIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import {
  FileText,
  File,
  YoutubeIcon,
  Clapperboard,
  Clock4,
} from "lucide-react";
import Link from "next/link";
import UserCard from "./UserCard";
import JobDetailsInfoCards from "../jobs/_components/JobDetailsInfoCards";
import JobDescription from "../jobs/_components/JobDescription";
import AdminJobActions from "../jobs/_components/AdminJobActions";
import type { Job } from "@/public/demodata";

type propType = {
  id: string;
};

export default function JobDetails({ id }: propType) {
  const [job, setJob] = useState<Job | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const selected = adminJobs.find((item) => item.id === id);
    setJob(selected || null);
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
    return () => clearTimeout(timer);
  }, [job]);

  useEffect(() => {
    if (!job?.dueOn) return;

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(job.dueOn).getTime();
      const diff = Math.max(target - now, 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [job]);

  if (!job)
    return (
      <div className="containers py-20">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="">
          <div className="2xl:grid-cols-[auto_400px] grid gap-6">
            <div className="space-y-5">
              <AdminJobActions />
              <JobDetailsInfoCards job={job} />
              <JobDescription
                textFile={"Reference for styling"}
                pdfFile={"Raw Footage Details"}
              />
            </div>

            <div className="grid grid-cols-2 2xl:grid-cols-1 gap-6 2xl:h-fit">
              <UserCard
                btnText="Chat With Client"
                data={{
                  id: "1",
                  name: "John Doe",
                  type: "client",
                  totalJobsPosted: 123,
                  hireRate: 98,
                  averageResponseTime: "1 hour",
                  memberSince: "January, 2020",
                  location: "Australia",
                  image: "/images/Courtney.jpg",
                }}
              />
              <UserCard
                btnText="Chat With Editor"
                data={{
                  id: "1",
                  name: "Johnson Smith",
                  type: "editor",
                  totalJobsCompleted: 123,
                  jobCompletionRate: 98,
                  averageResponseTime: "1 hour",
                  memberSince: "January, 2020",
                  location: "Australia",
                  image: "/images/Annette.jpg",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
