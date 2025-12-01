"use client";

import PageBanner from "@/components/reusable/Bgbanner";
import { useForm } from "react-hook-form";

type JobForm = {
  title: string;
  description: string;
  budget: number;
  category: string;
  duration: string;
  platform: string;
  skills: string;
  experience: string;
  pdf?: FileList;
  doc?: FileList;
  paymentMethod: "single" | "milestone";
};

export default function PostJobPage() {
  const { register, handleSubmit, watch } = useForm<JobForm>();

  const onSubmit = (data: JobForm) => {
    console.log("FORM SUBMITTED:", data);

  };

  return (
   <div>
      <div>
            <PageBanner
      title="Post a Job"
      bgImage="/findEditor.jpg"
      links={[
        { label: "Home", href: "/" },
        { label: "Post a Job" }
      ]}
    />
          </div>
     <div className="containers mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Create Job</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >
        {/* Job Title */}
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            {...register("title")}
            className="w-full mt-1 border rounded p-2"
            placeholder="I will do..."
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Job Description</label>
          <textarea
            {...register("description")}
            className="w-full mt-1 border rounded p-2 h-24"
            placeholder="Write Job Description"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="font-medium">Project Budget ($)</label>
          <input
            type="number"
            {...register("budget")}
            className="w-full mt-1 border rounded p-2"
          />
        </div>

        {/* Warning Box */}
        <div className="border border-red-400 bg-red-100 p-4 rounded">
          <p className="text-red-700 font-semibold">
            All payments must be processed through Marketplace.
          </p>
          <ul className="text-sm text-red-600 mt-2">
            <li>• 1st violation: $25 penalty + 21-day warning</li>
            <li>• 2nd violation: Permanent ban + funds withheld</li>
          </ul>
        </div>

        {/* Job Category */}
        <div>
          <label className="font-medium">Job Category</label>
          <select
            {...register("category")}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="">Select Category</option>
            <option value="video">Video</option>
            <option value="graphic">Graphic Design</option>
            <option value="writing">Writing</option>
          </select>
        </div>

        {/* Project Duration */}
        <div>
          <label className="font-medium">Project Duration</label>
          <select
            {...register("duration")}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="">Select Duration</option>
            <option value="1_day">1 Day</option>
            <option value="1_week">1 Week</option>
            <option value="1_month">1 Month</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="font-medium">Platform</label>
          <select
            {...register("platform")}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="font-medium">Skills</label>
          <input
            {...register("skills")}
            className="w-full mt-1 border rounded p-2"
            placeholder="Photoshop, Video Editing"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="font-medium">Years of Experience</label>
          <select
            {...register("experience")}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3+ Years</option>
          </select>
        </div>

        {/* File Uploads */}
        <div>
          <label className="font-medium">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            {...register("pdf")}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Upload Text Document</label>
          <input
            type="file"
            accept=".txt,.doc,.docx"
            {...register("doc")}
            className="w-full mt-1"
          />
        </div>

        {/* Payment Options */}
        <div className="border p-4 rounded bg-red-50">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="single"
              {...register("paymentMethod")}
              defaultChecked
            />
            <span className="font-medium">Single Payment</span>
          </label>
          <p className="text-xs mt-1 text-gray-600">
            Receive full payment once the project is completed.
          </p>
        </div>

        <div className="border p-4 rounded">
          <label className="flex items-center gap-2">
            <input type="radio" value="milestone" {...register("paymentMethod")} />
            <span className="font-medium">Milestone Payments</span>
          </label>
          <p className="text-xs mt-1 text-gray-600">
            Divide project into stages and get paid per milestone.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold p-3 rounded"
        >
          Next
        </button>
      </form>
    </div>
   </div>
  );
}
