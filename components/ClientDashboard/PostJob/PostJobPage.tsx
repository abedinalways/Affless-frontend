"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import PageBanner from "@/components/reusable/Bgbanner";
import SinglePaymentIcon from "@/components/Icons/SinglePaymentIcon";
import MilestoneIcon from "@/components/Icons/MilestoneIcon";
import Link from "next/link";

type FormValues = {
  jobTitle: string;
  jobDescription: string;
  budget: string;
  category: string;
  duration: string;
  platform: string;
  experience: string;
  pdfFile?: FileList;
  textFile?: FileList;
};

export default function PostJobForm() {
  const [paymentType, setPaymentType] = useState<"single" | "milestone">("single");

  // Define state for file inputs
  const [styleReference, setStyleReference] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textDocument, setTextDocument] = useState<File | null>(null);

  // Handle file uploads
  const handleStyleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleReference(e.target.files ? e.target.files[0] : null);
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfFile(e.target.files ? e.target.files[0] : null);
  };

  const handleTextDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextDocument(e.target.files ? e.target.files[0] : null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Submit handler
  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data, "Payment Type:", paymentType);
  };

  return (
    <div>
      <div>
        <PageBanner
          title="Post a Job"
          bgImage="/findEditor.jpg"
          links={[{ label: "Home", href: "/" }, { label: "Post a Job" }]}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex p-6 containers">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* LEFT SIDE */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow">
            {/* Job Title */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Job Title</label>
            <input
              {...register("jobTitle", { required: true })}
              type="text"
              placeholder="I will do"
              className="w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.jobTitle && <p className="text-red-500 text-sm mb-4">Job title is required.</p>}

            {/* Job Description */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Job Description</label>
            <textarea
              {...register("jobDescription", { required: true })}
              placeholder="Write Job Description"
              className="w-full border rounded-lg p-3 mb-2 h-24 focus:outline-none focus:border-gray-400"
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm mb-4">Job description is required.</p>
            )}

            {/* Budget */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Project Budget*</label>
            <input
              {...register("budget", { required: true })}
              type="text"
              placeholder="$354"
              className="w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400"
            />
            {errors.budget && <p className="text-red-500 text-sm mb-4">Budget is required.</p>}

            {/* Warning Box */}
            <div className="p-4 bg-red-50 border border-red-300 rounded-lg mb-6">
              <p className="text-red-600 font-semibold mb-2">All payments must be processed through Editor Marketplace</p>
              <p className="text-red-600 text-sm mb-2">DO NOT: Request or accept payment via external methods.</p>
              <p className="text-red-600 text-sm">
                <strong>Consequences:</strong>
                <br />
                • 1st violation: $25 penalty + warning
                <br />
                • 2nd violation: Permanent ban + funds withheld
              </p>
              <a href="#" className="text-red-600 underline text-sm mt-2 inline-block">
                Read full Off-Platform Policy →
              </a>
            </div>

            {/* Category */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Job Category</label>
            <select {...register("category", { required: true })} className="w-full border rounded-lg p-3 mb-6">
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
              <option value="Design">Design</option>
            </select>

            {/* Duration */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Project Duration</label>
            <select {...register("duration", { required: true })} className="w-full border rounded-lg p-3 mb-6">
              <option value="">Project Duration</option>
              <option value="1 Day">1 Day</option>
              <option value="3 Days">3 Days</option>
              <option value="1 Week">1 Week</option>
            </select>

            {/* Platform */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Platform</label>
            <select {...register("platform", { required: true })} className="w-full border rounded-lg p-3 mb-6">
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Instagram">Instagram</option>
            </select>

            {/* Skills (Static UI) */}
            <label className="block mb-2 text-sm font-medium text-gray-600">Skill:</label>
            <div className="flex gap-2 mb-6">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Photoshop</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Video editing</span>
            </div>

            {/* File Inputs */}
            <div className="space-y-5 pb-3">
              <div>
              <label className="mb-2">Style Reference </label>
              <input  
              className="w-full border rounded-lg relative p-3 mt-1.5 mb-2 focus:outline-none flex justify-between  focus:border-gray-400"  type="file"  
              placeholder=""
              />
              <span  className="" onChange={handleStyleReferenceChange}></span>
            </div>

            <div>
              <label className="mb-2">PDF File:</label>
              <input  className="w-full border rounded-lg p-3 mt-1.5 mb-2 focus:outline-none focus:border-gray-400" type="file" onChange={handlePdfFileChange} />
            </div>

            <div>
              <label className="">Text Document:</label>
              <input className="w-full border rounded-lg mt-1.5 p-3 mb-2 focus:outline-none focus:border-gray-400"  type="file" onChange={handleTextDocumentChange} />
            </div>
            </div>

            {/* Payment Options */}
            <div
              className={cn(
                "p-4 border rounded-lg cursor-pointer mb-4",
                paymentType === "single" ? "border-red-300 bg-red-50" : "border-gray-300"
              )}
              onClick={() => setPaymentType("single")}
            >
              <p className="font-semibold text-red-600 flex gap-3">
                <SinglePaymentIcon />Single Payment
              </p>
              <p className="text-sm text-gray-600">Receive full payment once the project is completed.</p>
            </div>

            <div
              className={cn(
                "p-4 border rounded-lg cursor-pointer",
                paymentType === "milestone" ? "border-red-300 bg-red-50" : "border-gray-300"
              )}
              onClick={() => setPaymentType("milestone")}
            >
              <p className="font-semibold flex gap-3">
                <MilestoneIcon /> Milestone Payments
              </p>
              <p className="text-sm text-gray-600">Divide the project into stages for partial payments.</p>
            </div>

         <Link href="/client/confirm-deposit">
            <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg mt-8 hover:bg-red-600">
              Next
            </button></Link>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow h-fit">
          <h3 className="text-[20px] font-medium leading-150% pb-6">Budget & Payment</h3>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Project Budget</span>
              <span>$20</span>
            </div>
              <div className="flex justify-between text-gray-700 mb-4">
              <span>Taxes & Other Frees</span>
              <span>$6</span>
            </div>
              <div className="flex justify-between text-gray-700 mb-4">
              <span>Platfrom Free 20%</span>
              <span>20%</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Project Duration</span>
              <span>5 Days</span>
            </div>
<hr className="my-4" />
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Total Payment</span>
              <span>$40</span>
            </div>

            

            {/* <div className="flex justify-between font-semibold text-gray-900">
              <span>Total Payment</span>
              <span>$654.00</span>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
