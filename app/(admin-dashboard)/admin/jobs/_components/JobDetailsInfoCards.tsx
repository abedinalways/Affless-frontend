import { JobRow } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import DesktopIcon from "@/components/Icons/Desktop";
import DolarIcon from "@/components/Icons/DolarIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { Job } from "@/public/demodata";
import { Clapperboard, Clock4 } from "lucide-react";

type Props = {
    job: Job;
}

export default function JobDetailsInfoCards({ job }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-[#E1E7FF] p-4">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex w-6 items-center justify-center">
              <Clapperboard className="w-6" />
            </div>
            <div>
              <p className="text-lg text-[18px] font-semibold">Job Category</p>
              <p className="leading-150% mt-1.5 text-[16px] font-medium capitalize">
                {job?.category || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-[#EBE6FE] p-4">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex w-6 items-center justify-center">
              <DolarIcon className="w-6" />
            </div>
            <div>
              <p className="text-lg text-[18px] font-semibold">Job Budget</p>
              <p className="leading-150% mt-1.5 text-[16px] font-medium">
                ${Number(job.total)?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-[#FFCCE4] p-4">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex w-6 items-center justify-center">
              <DesktopIcon className="w-6" />
            </div>
            <div>
              <p className="text-lg text-[18px] font-semibold">Platform</p>
              <p className="leading-150% mt-1.5 text-[16px] font-medium">
                {job.platform || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-[#FFF1CC] p-4">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex w-6 items-center justify-center">
              <Clock4 className="text-xl text-black" />
            </div>
            <div>
              <p className="text-lg text-[18px] font-semibold">Job Duration</p>
              <p className="leading-150% mt-1.5 text-[16px] font-medium">
                {7} Days
              </p>
            </div>
          </div>
        </div>

        {/* {job?.videoLength && ( */}
          <div className="rounded-xl border bg-[#E6F7D9] p-4">
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex w-6 items-center justify-center">
                <WorldIcon size={24} />
              </div>
              <div>
                <p className="text-lg text-[18px] font-semibold">
                  Footage Duration
                </p>
                <p className="leading-150% mt-1.5 text-[16px] font-medium">
                  {20 } {}
                  {job.category === "Shorts/Reels/TikToks"
                    ? "seconds"
                    : "minutes"}
                </p>
              </div>
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}
