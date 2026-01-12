/** @format */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import PageBanner from "@/components/reusable/Bgbanner";
import SinglePaymentIcon from "@/components/Icons/SinglePaymentIcon";
import MilestoneIcon from "@/components/Icons/MilestoneIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  styleReference?: FileList;
  videoDuration: string;
};

export default function HireVideoEditorForm() {
  const [paymentType, setPaymentType] = useState<"single" | "milestone">(
    "single"
  );
  const router = useRouter();
  const [jobCategory, setJobCategory] = useState<
    { key: string; label: string }[]
  >([
    {
      key: "youtube_long_form",
      label: "YouTube Long Form",
    },
    // {
    //   key: "shorts_reels_tiktoks",
    //   label: "Shorts/Reels/TikToks",
    // },
    // {
    //   key: "thumbnails",
    //   label: "Thumbnails",
    // },
    // {
    //   key: "ads_ugc",
    //   label: "Ads/UGC",
    // },
    // {
    //   key: "podcasts",
    //   label: "Podcasts",
    // },
    // {
    //   key: "weddings_events",
    //   label: "Weddings/Events",
    // },
    // {
    //   key: "captions_subtitles",
    //   label: "Captions/Subtitles"
    // },
    // {
    //   key: "color_audio",
    //   label: "Color/Audio"
    // }
  ]);

  const [platform, setPlatform] = useState<{ key: string; label: string }[]>([
    { key: "youtube", label: "YouTube" },
    { key: "tiktok", label: "TikTok" },
    { key: "instagram", label: "Instagram" },
    { key: "facebook", label: "Facebook" },
    { key: "x_twitter", label: "X (Twitter)" },
    { key: "snapchat", label: "Snapchat" },
  ]);

  // Define state for file inputs
  const [styleReference, setStyleReference] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textDocument, setTextDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file uploads
  const handleStyleReferenceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    setLoading(true);
    console.log("Form Submitted:", data, "Payment Type:", paymentType);
    setTimeout(() => {
      setLoading(false);
      router?.push("/client/confirm-deposit");
    }, 500);
  };

  return (
    <div>
      <div>
        <PageBanner
          title='Hire a Video Editor'
          bgImage='/findEditor.jpg'
          links={[
            { label: "Home", href: "/" },
            { label: "Hire a Video Editor" },
          ]}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex p-6 containers'>
        <div className='flex flex-col md:flex-row gap-8 w-full'>
          {/* LEFT SIDE */}
          <div className='w-full md:w-2/3 bg-white p-6 rounded-xl shadow'>
            {/* Job Title */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Job Title
            </label>
            <input
              {...register("jobTitle", { required: true })}
              type='text'
              placeholder='I need...'
              className='w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400'
            />
            {errors.jobTitle && (
              <p className='text-red-500 text-sm mb-4'>
                Job title is required.
              </p>
            )}

            {/* Job Description */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Job Description
            </label>

            <textarea
              {...register("jobDescription", {
                required: "Job description is required.",
                minLength: {
                  value: 50,
                  message: "Job description must be at least 50 characters.",
                },
              })}
              placeholder='Write Job Description'
              className='w-full border rounded-lg p-3 mb-2 h-24 focus:outline-none focus:border-gray-400'
            />

            {errors.jobDescription && (
              <p className='text-red-500 text-sm mb-4'>
                {errors.jobDescription.message}
              </p>
            )}

            {/* Budget */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Project Budget*
            </label>

            <input
              type='text'
              placeholder='$2.00'
              className='w-full border rounded-lg p-3 mb-2'
              {...register("budget", {
                required: "Budget is required",

                onChange: (e) => {
                  // শুধু number allow
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                },

                onBlur: (e) => {
                  let value = parseFloat(e.target.value);

                  if (isNaN(value) || value < 2) value = 2;

                  // auto format
                  e.target.value = `$${value.toFixed(2)}`;
                },
              })}
            />

            {errors.budget && (
              <p className='text-red-500 text-sm'>{errors.budget.message}</p>
            )}

            {/* Warning Box */}
            <div className='p-4 bg-red-50 border border-red-300 rounded-lg mb-6'>
              <p className='text-red-600 font-semibold mb-2'>
                All payments must be processed through Editor Marketplace
              </p>
              <p className='text-red-600 text-sm mb-2'>
                DO NOT: Request or accept payment via external methods.
              </p>
              <p className='text-red-600 text-sm'>
                <strong>Consequences:</strong>
                <br />
                • 1st violation: $25 penalty + warning
                <br />• 2nd violation: Permanent ban + funds withheld
              </p>
              <Link
                href='/platform-safety'
                className='text-red-600 underline text-sm mt-2 inline-block'>
                Read Full Off-Platform Policy
              </Link>
            </div>

            {/* Category */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Job Category
            </label>
            <select
              {...register("category", { required: true })}
              className='w-full border rounded-lg p-3 mb-6'>
              {jobCategory.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Duration */}
            {/* Project Duration (Days) */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Project Duration
            </label>

            <input
              type='text'
              placeholder='5'
              className='w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400'
              {...register("duration", {
                required: "Duration is required",

                onChange: (e) => {
                  // শুধু number allow
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },

                onBlur: (e) => {
                  let value = parseInt(e.target.value);

                  if (!value || value < 1) value = 1;

                  // auto format
                  e.target.value = `${value} day${value > 1 ? "s" : ""}`;
                },
              })}
            />

            {errors.duration && (
              <p className='text-red-500 text-sm'>{errors.duration.message}</p>
            )}

            {errors.duration && (
              <p className='text-red-500 text-sm mb-4'>
                {errors.duration.message || "Project Duration is required."}
              </p>
            )}

            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Video Duration
            </label>

            <input
              {...register("videoDuration", {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              })}
              inputMode='numeric'
              pattern='[0-9]*'
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault();
                }
              }}
              placeholder='Video Duration (Estimate)'
              className='w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400'
            />

            {errors.videoDuration && (
              <p className='text-red-500 text-sm mb-4'>
                {errors.videoDuration.message || "Video Duration is required."}
              </p>
            )}

            {/* Platform */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Platform
            </label>
            <select
              {...register("platform", { required: true })}
              className='w-full border rounded-lg p-3 mb-6'>
              {platform.map((plat) => (
                <option key={plat.key} value={plat.key}>
                  {plat.label}
                </option>
              ))}
            </select>

            {/* Skills (Static UI) */}
            {/* <label className="block mb-2 text-sm font-medium text-gray-600">Skill:</label>
            <div className="flex gap-2 mb-6">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Photoshop</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Video editing</span>
            </div> */}

            {/* File Inputs */}
            <div className='space-y-5 pb-3'>
              <div>
                <label className='mb-2 block'>
                  Style Reference <span className='text-red-500'>*</span>
                </label>
                <input
                  {...register("styleReference", {
                    required: "Style reference is required",
                  })}
                  id='style-reference-upload'
                  className='hidden'
                  type='file'
                  onChange={handleStyleReferenceChange}
                />
                <div className='flex items-center gap-3'>
                  <label
                    htmlFor='style-reference-upload'
                    className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                    Choose File
                  </label>
                  <span className='text-sm text-gray-600 truncate capitalize'>
                    {styleReference?.name || "No file selected"}
                  </span>
                </div>
                {errors.styleReference && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.styleReference.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-2 block'>PDF File:</label>
                <input
                  {...register("pdfFile")}
                  id='pdf-file-upload'
                  className='hidden'
                  type='file'
                  onChange={handlePdfFileChange}
                />
                <div className='flex items-center gap-3'>
                  <label
                    htmlFor='pdf-file-upload'
                    className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                    Choose File
                  </label>
                  <span className='text-sm text-gray-600 truncate capitalize'>
                    {pdfFile?.name || "No file selected"}
                  </span>
                </div>
              </div>

              <div>
                <label className='block'>Text Document:</label>
                <input
                  {...register("textFile")}
                  id='text-document-upload'
                  className='hidden'
                  type='file'
                  onChange={handleTextDocumentChange}
                />
                <div className='flex items-center gap-3'>
                  <label
                    htmlFor='text-document-upload'
                    className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                    Choose File
                  </label>
                  <span className='text-sm text-gray-600 truncate capitalize'>
                    {textDocument?.name || "No file selected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div
              className={cn(
                "p-4 border rounded-lg cursor-pointer mb-4",
                paymentType === "single"
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              )}
              onClick={() => setPaymentType("single")}>
              <p className='font-semibold text-red-600 flex gap-3'>
                <SinglePaymentIcon />
                Single Payment
              </p>
              <p className='text-sm text-gray-600'>
                The editor will receive full payment once the project is
                completed.
              </p>
            </div>

            <div
              className={cn(
                "p-4 border rounded-lg cursor-pointer",
                paymentType === "milestone"
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              )}
              onClick={() => setPaymentType("milestone")}>
              <p className='font-semibold flex gap-3'>
                <MilestoneIcon /> Milestone Payments
              </p>
              <p className='text-sm text-gray-600'>
                Divide the project into stages for partial payments.
              </p>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-red-500 text-white py-3 rounded-lg mt-8 hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              Next
            </button>
          </div>

          {/* RIGHT SUMMARY */}
          <div className='w-full md:w-1/3 bg-white p-6 rounded-xl shadow h-fit'>
            <h3 className='text-[20px] font-medium leading-150% pb-6'>
              Budget & Payment
            </h3>
            <div className='flex justify-between text-gray-700 mb-4'>
              <span>Project Budget</span>
              <span>$20</span>
            </div>
            <div className='flex justify-between text-gray-700 mb-4'>
              <span>Taxes & Other Fees</span>
              <span>$6</span>
            </div>
            <div className='flex justify-between text-gray-700 mb-4'>
              <span>Service Fee</span>
              <span>$4.00</span>
            </div>
            <div className='flex justify-between text-gray-700 mb-4'>
              <span>Project Duration</span>
              <span>5 Days</span>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between text-gray-700 mb-4'>
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

// /** @format */

// "use client";

// import { useForm, SubmitHandler } from "react-hook-form";
// import { useState } from "react";
// import { MdOutlineCloudUpload, MdOutlineFileUpload } from "react-icons/md";
// import ReviewConfirm from "../ReviewConfirm/ReviewConfirmPage";
// import Link from "next/link";

// type FormValues = {
//   projectTitle: string;
//   videoCategory: string;
//   videoDuration: string;
//   software: string[];
//   notes: string;
//   budget: number;
//   duration: string;
//   payment: string;
//   files?: FileList;
// };

// export default function HireVideoEditorForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const [files, setFiles] = useState<FileList | null>(null);
//   const [showReview, setShowReview] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log("Form Submitted:", data);
//     setFormData(data);
//     setShowReview(true);
//   };

//   const handleBack = () => setShowReview(false);

//   const handleConfirm = () => alert("Hire Request Sent!");

//   if (showReview && formData) {
//     return <ReviewConfirm />;
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className='containers mx-auto py-10 px-6 bg-[#f5f5f5] overflow-hidden'>
//       <h1 className='text-3xl font-semibold mb-6'>Hire a Video Editor</h1>
//       <p className='text-gray-600 mb-8'>
//         Fill out the project details to connect with your chosen editor.
//       </p>

//       {/* Basic Information */}
//       <div className='bg-white px-3 py-6 lg:p-8 rounded-xl mb-8 shadow-sm'>
//         <h2 className='text-[18px] md:text-[20px] font-semibold mb-5'>
//           Basic Information
//         </h2>

//         {/* Project Title */}
//         <div className='mb-4.5'>
//           <label className='block pb-3 text-[16px] font-medium'>
//             Project Title*
//           </label>
//           <input
//             {...register("projectTitle", { required: true })}
//             type='text'
//             placeholder='e.g. YouTube Travel Vlog Editing'
//             className='w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]'
//           />
//           {errors.projectTitle && (
//             <p className='text-red-500 text-sm mt-1'>
//               Project Title is required
//             </p>
//           )}
//         </div>

//         {/* Video Category */}
//         <div>
//           <label className='block pb-3 text-[16px] font-medium '>
//             Video Category*
//           </label>
//           <select
//             {...register("videoCategory", { required: true })}
//             className='w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]'>
//             <option value=''>Select category</option>
//             <option value='youtube'>YouTube Vlog Editing</option>
//             <option value='business'>Business Video Editing</option>
//             <option value='marketing'>Marketing Video Editing</option>
//             <option value='music'>Music Video Editing</option>
//           </select>
//           {errors.videoCategory && (
//             <p className='text-red-500 text-sm mt-1'>
//               Video category is required
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Project Requirements */}
//       <div className='bg-white px-3 py-6 lg:p-8 rounded-xl mb-8 shadow-sm'>
//         <h2 className='text-xl font-semibold mb-5'>Project Requirements</h2>

//         {/* Video Duration */}
//         <div className='mb-5'>
//           <label className='block pb-3 font-medium'>
//             Video Duration (approx.)*
//           </label>
//           <input
//             {...register("videoDuration", { required: true })}
//             type='text'
//             placeholder='e.g. 5–10 mins'
//             className='w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]'
//           />
//           {errors.videoDuration && (
//             <p className='text-red-500 text-sm mt-1'>
//               Video duration is required
//             </p>
//           )}
//         </div>

//         {/* Software Preference */}
//         <div className='mb-4'>
//           <label className='block mb-2 font-medium pb-[18px]'>
//             Software Preference
//           </label>

//           <div className='grid grid-cols-2 md:grid-cols-2 gap-3 text-sm'>
//             {[
//               "Final Cut Pro",
//               "Adobe Premiere Pro",
//               "DaVinci Resolve",
//               "Sony Vegas",
//               "Any Software",
//               "Adobe Premiere Pro",
//               "Filmora",

//               "CapCut",
//             ].map((software) => (
//               <label key={software} className='flex items-center gap-2'>
//                 <input
//                   type='checkbox'
//                   value={software}
//                   {...register("software")}
//                 />
//                 <span>{software}</span>
//               </label>
//             ))}
//           </div>

//           <div className='mt-3 py-6 px-4 bg-blue-50 border border-[#0070FF] rounded-lg text-sm text-gray-700'>
//             <span className='text-[#1F6FD5]'>Note:</span> Editors can use any
//             software they need to complete the project, regardless of software
//             preference. They may still use any software they choose and will
//             receive full payment as long as their work meets quality standards.
//           </div>
//         </div>

//         {/* Notes */}
//         <div className='mb-5'>
//           <label className='block mb-1 font-medium'>Description / Notes</label>
//           <textarea
//             {...register("notes")}
//             placeholder='Provide detailed instructions...'
//             className='w-full border px-4 py-3 rounded-lg h-28  bg-[#F3F3F5]'
//           />
//         </div>
//       </div>

//       {/* Budget & Payment */}
//       <div className='bg-white px-3 py-6 lg:p-8 rounded-xl mb-8 shadow-sm'>
//         <h2 className='text-xl font-semibold mb-5'>Budget & Payment</h2>

//         {/* Budget */}
//         <div className='mb-5'>
//           <label className='block mb-1 font-medium'>Project Budget*</label>
//           <input
//             {...register("budget", { required: true })}
//             type='number'
//             placeholder='Enter project budget'
//             className='w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]'
//           />
//         </div>

//         {/* Duration */}
//         <div className='mb-5'>
//           <label className='block mb-1 font-medium'>Project Duration*</label>
//           <input
//             {...register("duration", { required: true })}
//             type='text'
//             placeholder='Enter project duration'
//             className='w-full px-4 py-3.5 rounded-lg bg-[#F3F3F5]'
//           />
//         </div>

//         {/* Payment Method */}
//         <label className='block mb-2 font-medium'>Payment Method*</label>
//         <div className='flex gap-6'>
//           <label className='flex items-center gap-2'>
//             <input type='radio' value='card' {...register("payment")} />
//             Credit Card
//           </label>
//           <label className='flex items-center gap-2'>
//             <input type='radio' value='paypal' {...register("payment")} />
//             PayPal
//           </label>
//         </div>
//       </div>

//       {/* File Upload */}
//       <div className='bg-white px-3 py-6 lg:p-8 rounded-xl mb-8 shadow-sm'>
//         <h2 className='text-[18px] md:text-[20px] font-normal mb-5.5 text-black'>
//           File Upload (Optional)
//         </h2>
//         <p className='text-[16px] pb-3'>
//           Upload reference clips, raw footage, or style examples
//         </p>

//         <div
//           className='border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50'
//           onClick={() => document.getElementById("fileInput")?.click()}>
//           <MdOutlineFileUpload className='text-4xl mx-auto mb-3 ' />
//           <p className=''>Click to upload or drag & drop</p>
//           <p className='text-[12px] text-normal pt-2 font-roboto text-[#777980]'>
//             MP4, MOV, AVI, or other video formats
//           </p>
//         </div>

//         <input
//           id='fileInput'
//           type='file'
//           multiple
//           hidden
//           {...register("files")}
//           onChange={(e) => setFiles(e.target.files)}
//         />

//         {files && (
//           <p className='mt-3 text-sm'>{files.length} file(s) uploaded</p>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className='flex flex-col md:flex-row justify-between mt-8 gap-6'>
//         <div className='w-full bg-gray-200 rounded-xl cursor-pointer'>
//           <Link href='/find-editors'>
//             <button
//               type='button'
//               className='px-8 py-3 flex text-center items-center mx-auto'>
//               Back
//             </button>
//           </Link>
//         </div>

//         <div className='w-full bg-[#FF4D4F] rounded-lg cursor-pointer'>
//           <button
//             type='submit'
//             className='px-8 py-3  text-white flex text-center items-center mx-auto cursor-pointer '>
//             Continue to Review
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
