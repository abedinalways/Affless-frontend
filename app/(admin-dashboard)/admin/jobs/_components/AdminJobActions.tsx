import Image from "next/image";
import { getJobStatusDefinition } from "@/lib/job-status";

export default function AdminJobActions() {
  const jobStatus = getJobStatusDefinition("in_progress");

  return (
    <div className="space-y-5 rounded-lg bg-white p-4 shadow-xs">
      <div className="grid grid-cols-2 sm:flex items-center justify-end gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white transition-all duration-300 hover:rounded hover:bg-green-600"
        >
          Complete the Job
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:rounded hover:bg-red-600"
        >
          Cancel the Job
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-[auto_1fr] items-center gap-4">
        <Image
          src="/images/Marvin5.jpg"
          alt="Marvin"
          width={1000}
          height={1000}
          className="w-full max-w-[400px] rounded-lg object-cover"
        />
        <div>
          <div className="flex items-center gap-3 py-0.5">
            <p className="text-lg font-medium text-shadow-black">Current Status: </p>
            <p className={`px-2 rounded text-sm ${jobStatus?.colorClass}`}>In Progress</p>
          </div>
          <div className="flex items-center py-0.5 gap-3">
            <p className="text-lg font-medium text-shadow-black">Revisions taken: </p>
            <p className="text-sm">1</p>
          </div>
          <div className="flex items-center py-0.5 gap-3">
            <p className="text-lg font-medium text-shadow-black">Extensions taken: </p>
            <p className="text-sm">1</p>
          </div>
          <div className="flex items-center py-0.5 gap-3">
            <p className="text-lg font-medium text-shadow-black">Posted On: </p>
            <p className="text-sm">April 20, 2026</p>
          </div>
          <div className="flex items-center py-0.5 gap-3">
            <p className="text-lg font-medium text-shadow-black">Assigned to Editor On: </p>
            <p className="text-sm">April 20, 2026</p>
          </div>
          <div className="flex items-center py-0.5 gap-3">
            <p className="text-lg font-medium text-shadow-black">Deadline for Editor: </p>
            <p className="text-sm">May 29, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
