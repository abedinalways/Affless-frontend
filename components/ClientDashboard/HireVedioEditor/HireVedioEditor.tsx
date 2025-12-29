"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { MdOutlineCloudUpload, MdOutlineFileUpload } from "react-icons/md";
import ReviewConfirm from "../ReviewConfirm/ReviewConfirmPage";
import Link from "next/link";

type FormValues = {
  projectTitle: string;
  videoCategory: string;
  videoDuration: string;
  software: string[];
  notes: string;
  budget: number;
  duration: string;
  payment: string;
  files?: FileList;
};

export default function HireVideoEditorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const [files, setFiles] = useState<FileList | null>(null);


  const [showReview, setShowReview] = useState(false);


  const [formData, setFormData] = useState<FormValues | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
    setFormData(data);
    setShowReview(true);
  };

  const handleBack = () => setShowReview(false);


  const handleConfirm = () => alert("Hire Request Sent!");


  if (showReview && formData) {
    return (
      <ReviewConfirm

      />
    );
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="containers mx-auto py-10 px-6 bg-[#f5f5f5] overflow-hidden"
    >
      <h1 className="text-3xl font-semibold mb-6">Hire a Video Editor</h1>
      <p className="text-gray-600 mb-8">
        Fill out the project details to connect with your chosen editor.
      </p>

      {/* Basic Information */}
      <div className="bg-white p-8 rounded-xl mb-8 shadow-sm">
        <h2 className="text-[18px] md:text-[20px] font-semibold mb-5">Basic Information</h2>

        {/* Project Title */}
        <div className="mb-4.5">
          <label className="block pb-3 text-[16px] font-medium">Project Title*</label>
          <input
            {...register("projectTitle", { required: true })}
            type="text"
            placeholder="e.g. YouTube Travel Vlog Editing"
            className="w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]"
          />
          {errors.projectTitle && <p className="text-red-500 text-sm mt-1">Project Title is required</p>}
        </div>

        {/* Video Category */}
        <div>
          <label className="block pb-3 text-[16px] font-medium ">Video Category*</label>
          <select {...register("videoCategory", { required: true })} className="w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]">
            <option value="">Select category</option>
            <option value="youtube">YouTube Vlog Editing</option>
            <option value="business">Business Video Editing</option>
            <option value="marketing">Marketing Video Editing</option>
            <option value="music">Music Video Editing</option>
          </select>
          {errors.videoCategory && <p className="text-red-500 text-sm mt-1">Video category is required</p>}
        </div>
      </div>

      {/* Project Requirements */}
      <div className="bg-white p-6 rounded-xl mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-5">Project Requirements</h2>

        {/* Video Duration */}
        <div className="mb-5">
          <label className="block pb-3 font-medium">Video Duration (approx.)*</label>
          <input
            {...register("videoDuration", { required: true })}
            type="text"
            placeholder="e.g. 5–10 mins"
            className="w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]"
          />
          {errors.videoDuration && <p className="text-red-500 text-sm mt-1">Video duration is required</p>}
        </div>

        {/* Software Preference */}
        <div className="mb-4">

          <label className="block mb-2 font-medium pb-[18px]">Software Preference</label>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 text-sm">
            {[
              "Final Cut Pro",
              "Adobe Premiere Pro",
              "DaVinci Resolve",
              "Sony Vegas",
              "Any Software",
              "Adobe Premiere Pro",
              "Filmora",

              "CapCut",


            ].map((software) => (
              <label key={software} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={software}
                  {...register("software")}
                />
                <span>{software}</span>
              </label>
            ))}
          </div>


          <div className="mt-3 py-6 px-4 bg-blue-50 border border-[#0070FF] rounded-lg text-sm text-gray-700">
            <span className="text-[#1F6FD5]">Note:</span>   Editors can use any software they need to complete the project, regardless of software preference. They may still use any software they choose and will receive full payment as long as their work meets quality standards.
          </div>
        </div>

        {/* Notes */}
        <div className="mb-5">
          <label className="block mb-1 font-medium">Description / Notes</label>
          <textarea
            {...register("notes")}
            placeholder="Provide detailed instructions..."
            className="w-full border px-4 py-3 rounded-lg h-28  bg-[#F3F3F5]"
          />
        </div>
      </div>

      {/* Budget & Payment */}
      <div className="bg-white p-6 rounded-xl mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-5">Budget & Payment</h2>

        {/* Budget */}
        <div className="mb-5">
          <label className="block mb-1 font-medium">Project Budget*</label>
          <input
            {...register("budget", { required: true })}
            type="number"
            placeholder="Enter project budget"
            className="w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]"
          />
        </div>

        {/* Duration */}
        <div className="mb-5">
          <label className="block mb-1 font-medium">Project Duration*</label>
          <input
            {...register("duration", { required: true })}
            type="text"
            placeholder="Enter project duration"
            className="w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]"
          />
        </div>

        {/* Payment Method */}
        <label className="block mb-2 font-medium">Payment Method*</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" value="card" {...register("payment")} />
            Credit Card
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="paypal" {...register("payment")} />
            PayPal
          </label>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white p-6 rounded-xl mb-8 shadow-sm">
        <h2 className="text-[18px] md:text-[20px] font-normal mb-5.5 text-black">File Upload (Optional)</h2>
        <p className="text-[16px] pb-3">Upload reference clips, raw footage, or style examples</p>

        <div
          className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <MdOutlineFileUpload className="text-4xl mx-auto mb-3 " />
          <p className="">Click to upload or drag & drop</p>
          <p className="text-[12px] text-normal pt-2 font-roboto text-[#777980]">MP4, MOV, AVI, or other video formats</p>
        </div>

        <input
          id="fileInput"
          type="file"
          multiple
          hidden
          {...register("files")}
          onChange={(e) => setFiles(e.target.files)}
        />

        {files && <p className="mt-3 text-sm">{files.length} file(s) uploaded</p>}
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between mt-8 gap-6">

        <div className="w-full bg-gray-200 rounded-xl cursor-pointer">
          <Link href="/client/find-editor">
            <button type="button" className="px-8 py-3 flex text-center items-center mx-auto">
              Back
            </button>
          </Link>

        </div>


        <div className="w-full bg-[#FF4D4F] rounded-lg cursor-pointer">
          <button
            type="submit"
            className="px-8 py-3  text-white flex text-center items-center mx-auto cursor-pointer "
          >
            Continue to Review
          </button>
        </div>
      </div>
    </form>
  );
}
