/** @format */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import PageBanner from "@/components/reusable/Bgbanner";
import SinglePaymentIcon from "@/components/Icons/SinglePaymentIcon";
import MilestoneIcon from "@/components/Icons/MilestoneIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import PdfIcon from "@/components/Icons/PdfIcon";
import { FaArrowLeft } from "react-icons/fa";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";
import { getNavigationSource } from "@/lib/navigation-source";
import _ from 'lodash';
import { conversationDirectory } from "@/public/demodata";
import { routes } from "@/helper/routes";

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
  requiredSkills: string;
};

// Mapping of categories to available platforms
const categoryPlatformMap: { [key: string]: string[] } = {
  youtube_long_form: ["youtube"],
  shorts_reels_tiktoks: ["tiktok", "instagram", "snapchat", "youtube", "facebook", "x_twitter"],
  thumbnails: ["youtube"],
  ads_ugc: ["tiktok", "instagram", "facebook", "x_twitter", "youtube", "snapchat"],
  podcasts: ["youtube", "tiktok", "x_twitter"],
  weddings_events: ["youtube", "instagram", "facebook", "tiktok", "x_twitter", "snapchat",],
  captions_subtitles: ["youtube", "instagram", "facebook", "tiktok", "x_twitter", "snapchat",],
  color_audio: ["youtube", "instagram", "facebook", "tiktok", "x_twitter", "snapchat",],
};

export default function HireVideoEditorForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const source = getNavigationSource(searchParams);
  const assignedEditorId = searchParams.get("assign") || "";
  const assignedEditor = conversationDirectory.find((editor) => editor.id === assignedEditorId);
  const [paymentType, setPaymentType] = useState<"single" | "milestone">(
    "single"
  );
  const router = useRouter();
  const allPlatforms = [
    { key: "youtube", label: "YouTube" },
    { key: "tiktok", label: "TikTok" },
    { key: "instagram", label: "Instagram" },
    { key: "facebook", label: "Facebook" },
    { key: "x_twitter", label: "X (Twitter)" },
    { key: "snapchat", label: "Snapchat" },
  ];
  const [jobCategory, setJobCategory] = useState<
    { key: string; label: string }[]
  >([
    {
      key: "youtube_long_form",
      label: "Long-Form YouTube",
    },
    {
      key: "shorts_reels_tiktoks",
      label: "Shorts/Reels/TikToks",
    },
    {
      key: "thumbnails",
      label: "Thumbnails",
    },
    {
      key: "ads_ugc",
      label: "Ads/UGC",
    },
    {
      key: "podcasts",
      label: "Podcasts",
    },
    {
      key: "weddings_events",
      label: "Weddings/Events",
    },
    {
      key: "captions_subtitles",
      label: "Captions/Subtitles"
    },
    {
      key: "color_audio",
      label: "Color/Audio"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("youtube_long_form");

  const filteredPlatforms = allPlatforms.filter((plat) =>
    categoryPlatformMap[selectedCategory]?.includes(plat.key)
  );

  // Define state for file inputs
  const [styleReference, setStyleReference] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textDocument, setTextDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(2);
  const [videoLength, setVideoLength] = useState(0);
  const [videoNotRequired, setVideoNotRequired] = useState(false);

  // Handle file uploads
  const handleStyleReferenceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStyleReference(e.target.files ? e.target.files[0] : null);
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setPdfFile(null);
      return;
    }

    const isPdfType = file.type === "application/pdf";
    const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType && !isPdfExtension) {
      toast.error("Only PDF files are allowed.");
      e.target.value = "";
      setPdfFile(null);
      return;
    }

    setPdfFile(file);
  };

  const handleTextDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setTextDocument(null);
      return;
    }

    const lowerFileName = file.name.toLowerCase();
    const isTxt = lowerFileName.endsWith(".txt") || file.type === "text/plain";
    const isDocx =
      lowerFileName.endsWith(".docx") ||
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isTxt && !isDocx) {
      toast.error("Only .txt and .docx files are allowed.");
      e.target.value = "";
      setTextDocument(null);
      return;
    }

    setTextDocument(file);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // Submit handler
  const onSubmit = (data: FormValues) => {
    setLoading(true);
    if (minPrice > parseFloat(data.budget.replace("$", ""))) {
      toast.error(`Minimum budget for this Job is $${minPrice}`);
      setLoading(false);
      return;
    }
    console.log("Form Submitted:", data, "Payment Type:", paymentType);
    setTimeout(() => {
      setLoading(false);
      router?.push(`/confirm-deposit?redirect=${redirectUrl ? redirectUrl + "_" : ""}hireaneditor`);
    }, 500);
  };

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
  useEffect(() => {
    setBannerLinks(buildSourceBreadcrumbs(redirectUrl, {
      currentLabel: name ? `Hire ${name.split(" ").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ")}` : 'Hire a Video Editor',
      fallbackBase: [{ label: "Home", href: "/" }],
    }));
  }, [redirectUrl]);

  useEffect(() => {
    if (videoLength) {
      let length = (selectedCategory === "shorts_reels_tiktoks" || selectedCategory === "captions_subtitles" || selectedCategory === "ads_ugc") ? videoLength : videoLength * 60;
      if (selectedCategory === "shorts_reels_tiktoks" || selectedCategory === "captions_subtitles" || selectedCategory === "ads_ugc") {
        if (length <= 39) {
          setMinPrice(2);
        } else {
          setMinPrice(3);
        }
        return;
      } else if (selectedCategory === "thumbnails") {
        setMinPrice(3);
        return;
      } else {
        if (length <= 39) {
          setMinPrice(2);
        } else if (length <= 59) {
          setMinPrice(3);
        } else if (length <= 300 && length > 59) {
          setMinPrice(5);
        } else if (length <= 600 && length > 300) {
          setMinPrice(8);
        } else if (length <= 900 && length > 600) {
          setMinPrice(12);
        } else if (length <= 1200 && length > 900) {
          setMinPrice(16);
        } else if (length <= 1800 && length > 1200) {
          setMinPrice(20);
        } else if (length <= 2400 && length > 1800) {
          setMinPrice(25);
        } else if (length <= 3000 && length > 2400) {
          setMinPrice(30);
        } else if (length <= 3600 && length > 3000) {
          setMinPrice(40);
        } else if (length <= 7200 && length > 3600) {
          setMinPrice(50);
        } else if (length > 7200) {
          setMinPrice(100);
        }
      }
    } else if (selectedCategory === "thumbnails") {
      setMinPrice(3);
      return;
    }else{
      setMinPrice(2);
    }
  }, [videoLength, selectedCategory]);

  useEffect(() => {
    ["thumbnails"].includes(selectedCategory) ? setVideoNotRequired(true) : setVideoNotRequired(false);
    if (!videoNotRequired || !(selectedCategory && videoLength)) {
      setValue("budget", "");
    }
  }, [selectedCategory])

  return (
    <div>
      <div>
        <PageBanner
          title={name ? `Hire ${name}` : 'Hire a Video Editor'}
          bgImage="/findEditor.jpg"
          links={bannerLinks}
        />
      </div>
      {(redirectUrl.includes("quickmatchclient") || redirectUrl.includes("findeditors") || redirectUrl.includes("messageclientid")) && <div className="grid items-center justify-start px-6 pt-6 containers">
        <Link
          href={`${buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]?.href}?redirect=${redirectUrl ? redirectUrl?.split("_").slice(0, -1).join("_") : ""}`}
          className="flex items-center gap-2 border px-5 py-3 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
        >
          <FaArrowLeft />
          <span>Back to {buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]?.label || "Dashboard"}</span>
        </Link>
      </div>}
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

            {/* Category */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Job Category
            </label>
            <select
              {...register("category", { required: true })}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue("videoDuration", "");
                setVideoLength(0);
              }}
              className='w-full border rounded-lg p-3 mb-6'>
              {jobCategory.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Required Skills */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Required Skills
            </label>

            <input
              type='text'
              placeholder='e.g. Retention Editing, Storytelling, Color Correction'
              className='w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400'
              {...register("requiredSkills", {
                required: "Required skills are required.",
              })}
            />

            {errors.requiredSkills && (
              <p className='text-red-500 text-sm mb-4'>
                {errors.requiredSkills.message || "Required skills are required."}
              </p>
            )}

            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Job Budget*
            </label>

            <input
              type='text'
              placeholder={`$${minPrice.toFixed(2)}`}
              disabled={videoNotRequired || (selectedCategory && videoLength) ? false : true}
              className='w-full border rounded-lg p-3 mb-2 disabled:bg-gray-100 disabled:cursor-not-allowed'
              {...register("budget", {
                required: "Budget is required",

                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                },

                onBlur: (e) => {
                  let value = parseFloat(e.target.value);
                  if (isNaN(value) || value < minPrice) value = minPrice;
                  // auto format
                  e.target.value = `$${value.toFixed(2)}`;
                },
              })}
            />

            {errors.budget && (
              <p className='text-red-500 text-sm'>{errors.budget.message}</p>
            )}
            <div className="mb-4 space-y-2">
              {videoNotRequired || (selectedCategory && videoLength) ? (
                <p className='text-gray-600 text-sm mb-4'>
                  The minimum budget for this Job is <strong>${minPrice.toFixed(2)}</strong> based on the video length and category.
                </p>
              ) : (
                <p className='text-gray-600 text-sm mb-4'>
                  Please select a job category and enter the estimated video duration to enter the job budget.
                </p>
              )}

              <Link href={`/payment-rules?redirect=${redirectUrl ? redirectUrl + "_" : ""}hireaneditor`} className='text-sm underline text-blue-600 hover:text-blue-900 transition-colors duration-300'>
                Read the Full Payment Rules Here.
              </Link>
            </div>

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
                href={`/platform-safety?redirect=${redirectUrl ? redirectUrl + "_" : ""}hireaneditor`}
                className='text-red-600 underline text-sm mt-2 inline-block hover:text-red-400 transition-colors duration-300'>
                Read the Full Platform Safety Rules Here.
              </Link>
            </div>


            {/* Duration */}
            {/* Job Duration (Days) */}
            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Job Duration
            </label>

            <input
              type='text'
              placeholder='5'
              className='w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400'
              onFocus={(e) => {
                e.target.value = e.target.value.replace(/\s*(days|seconds)$/i, "").trim();
              }}
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
              <p className='text-red-500 text-sm mb-4'>
                {errors.duration.message || "Job Duration is required."}
              </p>
            )}

            <label className='block mb-2 text-sm font-medium text-gray-600'>
              Video Duration
            </label>

            <input
              type='text'
              placeholder='Video Duration (Estimate)'
              className='w-full border rounded-lg p-3 mb-2 focus:outline-none focus:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed'
              disabled={selectedCategory === "thumbnails"}
              onFocus={(e) => {
                e.target.value = e.target.value.replace(/\s*(minutes|seconds)$/i, "").trim();
              }}
              {...register("videoDuration", {
                required: "Video duration is required",

                onChange: (e) => {
                  // শুধু number allow
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  setVideoLength(parseInt(e.target.value) || 0);
                },

                onBlur: (e) => {
                  let value = parseInt(e.target.value);
                  if (!value || value < 1) value = 1;
                  // auto format
                  const unit = (selectedCategory === "shorts_reels_tiktoks" || selectedCategory === "ads_ugc" || selectedCategory === "captions_subtitles") ? "seconds" : "minutes";
                  e.target.value = `${value} ${unit}`;
                },
              })}
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
              {filteredPlatforms.map((plat) => (
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
                  Style Reference
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
                  accept='.pdf,application/pdf'
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
                  accept='.txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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

            <div className="flex items-center gap-4 py-4">
              {(redirectUrl.includes("quickmatchclient") || redirectUrl.includes("findeditors")) && <button
                type='button'
                onClick={() => router?.back()}
                className='w-full text-red-500 border border-red-500 py-3 rounded-lg hover:bg-red-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-300'>
                Back
              </button>}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-300'>
                Next
              </button>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="w-full md:w-[300px] flex flex-col gap-4">
            <div className='w-full bg-white p-6 rounded-xl shadow h-fit'>
              <h3 className='text-[20px] font-medium leading-150% pb-6'>
                Budget & Payment
              </h3>
              <div className='flex justify-between text-gray-700 mb-4'>
                <span>Job Budget</span>
                <span>$20.00</span>
              </div>
              <div className='flex justify-between text-gray-700 mb-4'>
                <span>Service Fee</span>
                <span>$4.00</span>
              </div>
              <div className='flex justify-between text-gray-700 mb-4'>
                <span>Taxes & Other Fees</span>
                <span>$6.00</span>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between text-gray-700 mb-4'>
                <span>Total Payment</span>
                <span>$30.00</span>
              </div>

              {/* <div className="flex justify-between font-semibold text-gray-900">
              <span>Total Payment</span>
              <span>$654.00</span>
              </div> */}
            </div>
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <div className='flex justify-between text-gray-700'>
                <span>Job Duration</span>
                <span>5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}