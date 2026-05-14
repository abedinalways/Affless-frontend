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
import { FaArrowLeft, FaPhotoVideo } from "react-icons/fa";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";
import { getNavigationSource } from "@/lib/navigation-source";
import _ from "lodash";
import { conversationDirectory } from "@/public/demodata";
import { routes } from "@/helper/routes";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

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
  thumbnail?: FileList;
};

// Mapping of categories to available platforms
const categoryPlatformMap: { [key: string]: string[] } = {
  youtube_long_form: ["youtube"],
  shorts_reels_tiktoks: [
    "tiktok",
    "instagram",
    "snapchat",
    "youtube",
    "facebook",
    "x_twitter",
  ],
  thumbnails: ["youtube"],
  ads_ugc: [
    "tiktok",
    "instagram",
    "facebook",
    "x_twitter",
    "youtube",
    "snapchat",
  ],
  podcasts: ["youtube", "tiktok", "x_twitter"],
  weddings_events: [
    "youtube",
    "instagram",
    "facebook",
    "tiktok",
    "x_twitter",
    "snapchat",
  ],
  captions_subtitles: [
    "youtube",
    "instagram",
    "facebook",
    "tiktok",
    "x_twitter",
    "snapchat",
  ],
  color_audio: [
    "youtube",
    "instagram",
    "facebook",
    "tiktok",
    "x_twitter",
    "snapchat",
  ],
};

export default function HireVideoEditorForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const source = getNavigationSource(searchParams);
  const assignedEditorId = searchParams.get("assign") || "";
  const assignedEditor = conversationDirectory.find(
    (editor) => editor.id === assignedEditorId,
  );
  const [paymentType, setPaymentType] = useState<"single" | "milestone">(
    "single",
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
      label: "Captions/Subtitles",
    },
    {
      key: "color_audio",
      label: "Color/Audio",
    },
  ]);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("youtube_long_form");

  const filteredPlatforms = allPlatforms.filter((plat) =>
    categoryPlatformMap[selectedCategory]?.includes(plat.key),
  );

  // Define state for file inputs
  const [styleReference, setStyleReference] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textDocument, setTextDocument] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(2);
  const [videoLength, setVideoLength] = useState(0);
  const [videoNotRequired, setVideoNotRequired] = useState(false);
  const [jobDurationError, setJobDurationError] = useState("");

  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");

  // Handle file uploads
  const handleStyleReferenceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if(e.target.files && e.target.files[0]) {
      setStyleReference(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      return;
    }
    setThumbnail(file);
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    const isPdfType = file.type === "application/pdf";
    const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType && !isPdfExtension) {
      toast.error("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    setPdfFile(file);
  };

  const handleTextDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
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

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    console.log("Form Submitted:", data, "Payment Type:", paymentType);
    if (minPrice > parseFloat(data.budget.replace(/[^0-9.]/g, ""))) {
      toast.error(`The minimum budget for this Job is $${minPrice}.`);
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "postJobData",
      JSON.stringify({
        ...data,
        budget: parseFloat(data.budget.replace("$", "")),
        duration: parseInt(data.duration.replace(/[^0-9]/g, "")),
        videoDuration: parseInt(data.videoDuration.replace(/[^0-9]/g, "")),
        styleReference: styleReference
          ? {
              name: styleReference.name,
              type: styleReference.type,
              size: styleReference.size,
            }
          : null,
        pdfFile: pdfFile
          ? {
              name: pdfFile.name,
              type: pdfFile.type,
              size: pdfFile.size,
            }
          : null,
        textDocument: textDocument
          ? {
              name: textDocument.name,
              type: textDocument.type,
              size: textDocument.size,
            }
          : null,
      }),
    );

    setTimeout(() => {
      setLoading(false);
      router?.push(
        `/client/confirm-deposit?redirect=${redirectUrl ? redirectUrl + "_" : ""}hireaneditor`,
      );
    }, 500);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("postJobData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const unit =
        parsedData.category === "shorts_reels_tiktoks" ||
        parsedData.category === "ads_ugc" ||
        parsedData.category === "captions_subtitles"
          ? parsedData.duration === 1
            ? "second"
            : "seconds"
          : parsedData.duration === 1
            ? "minute"
            : "minutes";
      setValue("jobTitle", parsedData.jobTitle || "");
      setJobTitle(parsedData.jobTitle || "");
      setValue("jobDescription", parsedData.jobDescription || "");
      setJobDescription(parsedData.jobDescription || "");
      setValue("category", parsedData.category || "youtube_long_form");
      setValue(
        "duration",
        `${usFormat.format(parsedData.duration)} ${parsedData.duration > 1 ? " days" : "day"}` ||
          "",
      );
      setValue("platform", parsedData.platform || "");
      if (parsedData.category !== "thumbnails") {
        setValue(
          "videoDuration",
          `${usFormat.format(parsedData.videoDuration)} ${unit}` || "",
        );
      }
      setValue("requiredSkills", parsedData.requiredSkills || "");
      setRequiredSkills(parsedData.requiredSkills || "");
      setSelectedCategory(parsedData.category || "youtube_long_form");
      setVideoLength(parseInt(parsedData.videoDuration) || 0);
      setValue(
        "budget",
        `$${usFormatWithDecimals.format(parsedData.budget < minPrice ? minPrice : parsedData.budget)}` ||
          "",
      );
    }
  }, []);

  const [bannerLinks, setBannerLinks] = useState<
    { label: string; href?: string }[]
  >([]);
  useEffect(() => {
    setBannerLinks(
      buildSourceBreadcrumbs(redirectUrl, {
        currentLabel: name
          ? `Hire ${name
              .split(" ")
              .map((s) => s[0].toUpperCase() + s.slice(1))
              .join(" ")}`
          : "Hire a Video Editor",
        fallbackBase: [{ label: "Home", href: "/" }],
      }),
    );
  }, [redirectUrl]);

  useEffect(() => {
    if (videoLength) {
      let length =
        selectedCategory === "shorts_reels_tiktoks" ||
        selectedCategory === "captions_subtitles" ||
        selectedCategory === "ads_ugc"
          ? videoLength
          : videoLength * 60;
      if (
        selectedCategory === "shorts_reels_tiktoks" ||
        selectedCategory === "captions_subtitles" ||
        selectedCategory === "ads_ugc"
      ) {
        if (length <= 39) {
          setMinPrice(2);
          setValue("budget", `$${usFormatWithDecimals.format(2)}`);
        } else {
          setMinPrice(3);
          setValue("budget", `$${usFormatWithDecimals.format(3)}`);
        }
        return;
      } else if (selectedCategory === "thumbnails") {
        setMinPrice(3);
        setValue("budget", `$${usFormatWithDecimals.format(3)}`);
        return;
      } else {
        if (length <= 39) {
          setMinPrice(2);
          setValue("budget", `$${usFormatWithDecimals.format(2)}`);
        } else if (length <= 59) {
          setMinPrice(3);
          setValue("budget", `$${usFormatWithDecimals.format(3)}`);
        } else if (length <= 300 && length > 59) {
          setMinPrice(5);
          setValue("budget", `$${usFormatWithDecimals.format(5)}`);
        } else if (length <= 600 && length > 300) {
          setMinPrice(8);
          setValue("budget", `$${usFormatWithDecimals.format(8)}`);
        } else if (length <= 900 && length > 600) {
          setMinPrice(12);
          setValue("budget", `$${usFormatWithDecimals.format(12)}`);
        } else if (length <= 1200 && length > 900) {
          setMinPrice(16);
          setValue("budget", `$${usFormatWithDecimals.format(16)}`);
        } else if (length <= 1800 && length > 1200) {
          setMinPrice(20);
          setValue("budget", `$${usFormatWithDecimals.format(20)}`);
        } else if (length <= 2400 && length > 1800) {
          setMinPrice(25);
          setValue("budget", `$${usFormatWithDecimals.format(25)}`);
        } else if (length <= 3000 && length > 2400) {
          setMinPrice(30);
          setValue("budget", `$${usFormatWithDecimals.format(30)}`);
        } else if (length <= 3600 && length > 3000) {
          setMinPrice(40);
          setValue("budget", `$${usFormatWithDecimals.format(40)}`);
        } else if (length <= 7200 && length > 3600) {
          setMinPrice(50);
          setValue("budget", `$${usFormatWithDecimals.format(50)}`);
        } else if (length > 7200) {
          setMinPrice(100);
          setValue("budget", `$${usFormatWithDecimals.format(100)}`);
        }
      }
    } else if (selectedCategory === "thumbnails") {
      setMinPrice(3);
      setValue("budget", `$${usFormatWithDecimals.format(3)}`);
      return;
    } else {
      setMinPrice(2);
      setValue("budget", `$${usFormatWithDecimals.format(2)}`);
    }
  }, [videoLength, selectedCategory]);

  useEffect(() => {
    ["thumbnails"].includes(selectedCategory)
      ? setVideoNotRequired(true)
      : setVideoNotRequired(false);
  }, [selectedCategory]);

  const usFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <div>
        <PageBanner
          title={name ? `Hire ${name}` : "Hire a Video Editor"}
          bgImage="/findEditor.jpg"
          links={bannerLinks}
        />
      </div>
      {(redirectUrl.includes("quickmatchclient") ||
        redirectUrl.includes("findeditors") ||
        redirectUrl.includes("messageclientid")) && (
        <div className="containers grid items-center justify-start px-6 pt-6">
          <Link
            href={`${buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]?.href}?redirect=${redirectUrl ? redirectUrl?.split("_").slice(0, -1).join("_") : ""}`}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-white bg-[#ff4d4f] px-5 py-3 font-medium text-white duration-300 hover:bg-[#fd4447] hover:text-white"
          >
            <FaArrowLeft />
            <span>
              Back to{" "}
              {buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]
                ?.label || "Dashboard"}
            </span>
          </Link>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="containers flex w-full p-6"
      >
        <div className="flex w-full flex-col gap-8 md:flex-row">
          {/* LEFT SIDE */}
          <div className="w-full rounded-xl bg-white p-6 shadow md:w-2/3">
            {/* Job Title */}
            {/* Job Title */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Job Title
              </label>
              <input
                {...register("jobTitle", {
                  required: "Job title is required",
                  minLength: {
                    value: 5,
                    message: "Job title must be at least 5 characters",
                  },
                  onChange(event) {
                    let value = event.target.value;
                    if (value.length > 100) {
                      value = value.slice(0, 100);
                    }
                    setValue("jobTitle", value);
                    setJobTitle(value);
                  },
                  onBlur(event) {
                    let value = event.target.value.trim();
                    setValue("jobTitle", value);
                    setJobTitle(value);
                  },
                })}
                type="text"
                placeholder="I need..."
                className="w-full rounded-lg border p-3 focus:border-gray-400 focus:outline-none"
              />
              <p
                className={`mt-1.5 text-sm text-gray-500 ${jobTitle.length >= 100 ? "text-red-500" : ""}`}
              >
                {jobTitle?.length}/100
              </p>
              {errors.jobTitle && (
                <p className="mb-4 text-sm text-red-500">
                  {errors.jobTitle.message || "Job title is required"}
                </p>
              )}
              {!errors.jobTitle && jobTitle.length >= 100 && (
                <p className="mb-4 text-sm text-red-500">
                  Maximum character limit reached
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">Upload Thumbnail</label>
              <input
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                  onChange: handleThumbnailChange
                })}
                id="thumbnail-upload"
                className="hidden"
                type="file"
                accept="image/*"
              />
              <div className="flex items-center gap-3">
                <label
                  htmlFor="thumbnail-upload"
                  className="relative block h-60 w-full cursor-pointer rounded-md border border-dashed"
                >
                  {thumbnail ? (
                    <>
                      <Image
                        src={URL.createObjectURL(thumbnail)}
                        alt="Thumbnail"
                        width={200}
                        height={200}
                        className="h-full w-full rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 cursor-pointer rounded-full border bg-white p-0.5 mix-blend-difference"
                        onClick={() => {
                          setThumbnail(null);
                          setValue("thumbnail", undefined);
                        }}
                      >
                        <IoClose className="text-base mix-blend-hard-light" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center p-4">
                      <FaPhotoVideo className="text-5xl text-red-400" />
                    </div>
                  )}
                </label>
              </div>
              {errors.thumbnail && (
                <p className="mb-4 text-sm text-red-500">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            {/* Job Description */}

            <div className="mb-4">
              <div className="">
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Job Description
                </label>

                <div className="flex flex-col gap-px">
                  <textarea
                    {...register("jobDescription", {
                      required: "Job description is required",
                      minLength: {
                        value: 50,
                        message:
                          "Job description must be at least 50 characters",
                      },
                      maxLength: {
                        value: 5000,
                        message: "Maximum character limit reached.",
                      },
                      onChange: (e) => {
                        let value = e.target.value;
                        if (value.length > 5000) {
                          value = value.slice(0, 5000);
                        }
                        setValue("jobDescription", value);
                        e.target.value = value;
                        setJobDescription(value);
                      },
                      onBlur: (e) => {
                        let value = e.target.value.trim();
                        setValue("jobDescription", value);
                        setJobDescription(value);
                      },
                    })}
                    placeholder="Write Job Description"
                    className="h-26 w-full resize-none rounded-lg border p-3 focus:border-gray-400 focus:outline-none"
                    // onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <p
                    className={`mt-1.5 text-sm text-gray-500 ${jobDescription.length >= 5000 ? "text-red-500" : ""}`}
                  >
                    {jobDescription?.length}/5000
                  </p>
                </div>
              </div>

              {errors.jobDescription && (
                <p className="mb-4 text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
              {!errors.jobDescription && jobDescription?.length >= 5000 && (
                <p className="mb-4 text-sm text-red-500">
                  Maximum character limit reached
                </p>
              )}
            </div>

            {/* Category */}
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Job Category
            </label>
            <select
              {...register("category", { required: true })}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue("videoDuration", "");
                setVideoLength(0);
              }}
              className="mb-6 w-full rounded-lg border p-3"
            >
              {jobCategory.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Required Skills */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Required Skills{" "}
                <span className="text-xs">(comma separated)</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Retention Editing, Storytelling, Color Correction"
                className="w-full rounded-lg border p-3 focus:border-gray-400 focus:outline-none"
                {...register("requiredSkills", {
                  required: "Required skills are required",
                  minLength: {
                    value: 5,
                    message: "Required skills must be at least 5 characters",
                  },
                  onChange(e) {
                    let value = e.target.value;
                    if (value.length > 100) {
                      value = value.slice(0, 100);
                    }
                    setValue("requiredSkills", value);
                    e.target.value = value;
                    setRequiredSkills(value);
                  },
                  onBlur(e) {
                    let value = e.target.value.trim();
                    setValue("requiredSkills", value);
                    setRequiredSkills(value);
                  },
                })}
              />
              <p
                className={`mt-1.5 text-sm text-gray-500 ${requiredSkills.length >= 100 ? "text-red-500" : ""}`}
              >
                {requiredSkills?.length}/100
              </p>

              {errors.requiredSkills && (
                <p className="mb-4 text-sm text-red-500">
                  {errors.requiredSkills.message ||
                    "Required skills are required"}
                </p>
              )}

              {!errors.requiredSkills && requiredSkills.length >= 100 && (
                <p className="mb-4 text-sm text-red-500">
                  Maximum character limit reached
                </p>
              )}
            </div>

            <label className="mb-2 block text-sm font-medium text-gray-600">
              Job Budget
            </label>

            <input
              type="text"
              placeholder={`$${minPrice.toFixed(2)}`}
              disabled={
                videoNotRequired || (selectedCategory && videoLength)
                  ? false
                  : true
              }
              className="mb-2 w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-gray-100"
              onFocus={(e) => {
                e.target.value = e.target.value.replace(/[^0-9.]/g, "");
              }}
              {...register("budget", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                },

                onBlur: (e) => {
                  let value = parseFloat(e.target.value);

                  console.log(
                    "Parsed budget value:",
                    value,
                    "Min price:",
                    minPrice,
                    "Raw input value: ",
                    e.target.value,
                  );

                  if (isNaN(value) || value < minPrice) value = minPrice;
                  setValue("budget", `$${usFormatWithDecimals.format(value)}`);
                  // auto format
                  e.target.value = `$${usFormatWithDecimals.format(value)}`;
                },
              })}
            />

            {errors.budget && (
              <p className="text-sm text-red-500">{errors.budget.message}</p>
            )}

            <div className="mb-4 space-y-2">
              {videoNotRequired || (selectedCategory && videoLength) ? (
                <p className="text-sm text-gray-600">
                  The minimum budget for this Job is{" "}
                  <strong>${minPrice.toFixed(2)}</strong> based on the video
                  length and category.
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Please select a job category and enter the estimated video
                  duration to enter the job budget.
                </p>
              )}

              <Link
                href={`/payment-rules?redirect=${redirectUrl ? redirectUrl + "_" : ""}postajob`}
                className="text-sm text-blue-600 underline transition-colors duration-300 hover:text-blue-900"
              >
                Read the Full Payment Rules Here.
              </Link>
            </div>

            {/* Warning Box */}
            <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4">
              <p className="mb-2 font-semibold text-red-600">
                All payments must be processed through Editor Marketplace
              </p>
              <p className="mb-2 text-sm text-red-600">
                DO NOT: Request or accept payment via external methods.
              </p>
              <p className="text-sm text-red-600">
                <strong>Consequences:</strong>
                <br />
                • 1st violation: $25 penalty + warning
                <br />• 2nd violation: Permanent ban + funds withheld
              </p>
              <Link
                href={`/platform-safety?redirect=${redirectUrl ? redirectUrl + "_" : ""}hireaneditor`}
                className="mt-2 inline-block text-sm text-red-600 underline transition-colors duration-300 hover:text-red-400"
              >
                Read the Full Platform Safety Rules Here.
              </Link>
            </div>

            {/* Duration */}
            {/* Job Duration (Days) */}
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Job Duration
            </label>

            <input
              type="text"
              placeholder="5"
              className="mb-2 w-full rounded-lg border p-3 focus:border-gray-400 focus:outline-none"
              onFocus={(e) => {
                e.target.value = e.target.value
                  .replace(/\s*(days|day)$/i, "")
                  .trim();
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              {...register("duration", {
                required: "Job duration is required",

                onChange: (e) => {
                  // শুধু number allow
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },

                onBlur: (e) => {
                  let value = parseInt(e.target.value);

                  if (value > 50) {
                    value = 50;
                    setJobDurationError("Maximum job duration is 50 days.");
                  } else {
                    setJobDurationError("");
                  }
                  if (!value || value < 1) value = 1;
                  setValue(
                    "duration",
                    `${usFormat.format(value)} day${value > 1 ? "s" : ""}`,
                    { shouldValidate: true },
                  );
                },
              })}
            />
            {errors.duration && (
              <p className="mb-4 text-sm text-red-500">
                {errors.duration.message || "Job Duration is required"}
              </p>
            )}

            {jobDurationError && (
              <p className="mb-4 ml-3 text-sm text-red-500">
                {jobDurationError}
              </p>
            )}

            <label className="mb-2 block text-sm font-medium text-gray-600">
              Video Duration
            </label>

            <input
              type="text"
              placeholder="Video Duration (Estimate)"
              className="mb-2 w-full rounded-lg border p-3 focus:border-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              disabled={selectedCategory === "thumbnails"}
              onFocus={(e) => {
                e.target.value = e.target.value
                  .replace(/\s*(minutes|seconds)$/i, "")
                  .trim();
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              {...register("videoDuration", {
                required: videoNotRequired
                  ? false
                  : "Video duration is required",

                onChange: (e) => {
                  // শুধু number allow
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  setVideoLength(parseInt(e.target.value) || 0);
                },

                onBlur: (e) => {
                  let value = parseInt(e.target.value);
                  if (!value || value < 1) value = 1;
                  setVideoLength(value);
                  setValue("videoDuration", value.toString(), { shouldValidate: true});
                  // auto format
                  const unit =
                    selectedCategory === "shorts_reels_tiktoks" ||
                    selectedCategory === "ads_ugc" ||
                    selectedCategory === "captions_subtitles"
                      ? value === 1
                        ? "second"
                        : "seconds"
                      : value === 1
                        ? "minute"
                        : "minutes";
                  e.target.value = `${usFormat.format(value)} ${unit}`;
                },
              })}
            />

            {errors.videoDuration && !videoNotRequired && (
              <p className="mb-4 text-sm text-red-500">
                {errors.videoDuration.message || "Video Duration is required"}
              </p>
            )}

            {/* Platform */}
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Platform
            </label>
            <select
              {...register("platform", { required: true })}
              className="mb-6 w-full rounded-lg border p-3"
            >
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
            <div className="space-y-5 pb-3">
              <div>
                <label className="mb-2 block">Style Reference</label>
                <input
                  {...register("styleReference", {
                    required: "Style reference is required",
                  })}
                  id="style-reference-upload"
                  className="hidden"
                  type="file"
                  onChange={handleStyleReferenceChange}
                />
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="style-reference-upload"
                    className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Choose File
                  </label>
                  <span className="truncate text-sm text-gray-600 capitalize">
                    {styleReference?.name || "No file selected"}
                  </span>
                </div>
                {errors.styleReference && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.styleReference.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block">PDF File:</label>
                <input
                  {...register("pdfFile")}
                  id="pdf-file-upload"
                  className="hidden"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfFileChange}
                />
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="pdf-file-upload"
                    className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Choose File
                  </label>
                  <span className="truncate text-sm text-gray-600 capitalize">
                    {pdfFile?.name || "No file selected"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block">Text Document:</label>
                <input
                  {...register("textFile")}
                  id="text-document-upload"
                  className="hidden"
                  type="file"
                  accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleTextDocumentChange}
                />
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="text-document-upload"
                    className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Choose File
                  </label>
                  <span className="truncate text-sm text-gray-600 capitalize">
                    {textDocument?.name || "No file selected"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-4 py-4">
              {(redirectUrl.includes("quickmatchclient") ||
                redirectUrl.includes("findeditors") ||
                redirectUrl.includes("messageclientid")) && (
                <Link
                  href={`${buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]?.href}?redirect=${redirectUrl ? redirectUrl?.split("_").slice(0, -1).join("_") : ""}`}
                  className="w-full cursor-pointer rounded-lg border border-red-500 py-3 text-center text-red-500 duration-300 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back
                </Link>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg bg-red-500 py-3 text-white duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="flex w-full flex-col gap-4 md:w-[300px]">
            <div className="h-fit w-full rounded-xl bg-white p-6 shadow">
              <h3 className="leading-150% pb-6 text-[20px] font-medium">
                Budget & Payment
              </h3>
              <div className="mb-4 flex justify-between text-gray-700">
                <span>Job Budget</span>
                <span>$20.00</span>
              </div>
              <div className="mb-4 flex justify-between text-gray-700">
                <span>Service Fee</span>
                <span>$4.00</span>
              </div>
              <div className="mb-4 flex justify-between text-gray-700">
                <span>Taxes & Other Fees</span>
                <span>$6.00</span>
              </div>
              <hr className="my-4" />
              <div className="mb-4 flex justify-between text-gray-700">
                <span>Total Payment</span>
                <span>$30.00</span>
              </div>

              {/* <div className="flex justify-between font-semibold text-gray-900">
              <span>Total Payment</span>
              <span>$654.00</span>
              </div> */}
            </div>
            <div className="h-fit rounded-xl bg-white p-6 shadow">
              <div className="flex justify-between text-gray-700">
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
