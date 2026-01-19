"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import toast,{Toaster} from "react-hot-toast";
import { FaStarHalfAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className="cursor-pointer text-[26px]"
        >
          {i <= value ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            <AiOutlineStar className="text-gray-400" />
          )}
        </button>
      ))}
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;


  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
    </span>
  );
}

export default function ReviewClient() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit: formSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: 0,
      communication: 0,
      delivery: 0,
      valueForMoney: 0,
      recommend: 0,
      experience: "",
    },
  });

  const rating = watch("rating");
  const communication = watch("communication");
  const delivery = watch("delivery");
  const valueForMoney = watch("valueForMoney");
  const recommend = watch("recommend");
  const experience = watch("experience");

  const pickFiles = (fl: FileList | null) => {
    if (!fl) return;
    setFiles((prev) => [...prev, ...Array.from(fl)]);
  };

  const onSubmit = (data: {
    rating: number;
    communication: number;
    delivery: number;
    valueForMoney: number;
    recommend: number;
    experience: string;
  }) => {
    console.log({
      ...data,
      files,
    });
    toast.success("Thank you for your review!");
    setFiles([]);
    reset();
    setTimeout(() => {
      router.push('/client/manage-job')
    }, 1000);
  };

  const standoutError =
    errors.communication ||
    errors.delivery ||
    errors.valueForMoney ||
    errors.recommend;

  return (
    <form onSubmit={formSubmit(onSubmit)} className="containers py-8 space-y-6">
      {/* <Toaster position="top-right" /> */}
      {/* TOP SELLER CARD */}
      <div className="bg-white rounded-2xl border p-5 flex items-center gap-4">
        <Image
          src="/images/headset.svg"
          alt="seller"
          width={46}
          height={46}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">Sarah Johnson</p>
          <p className="text-sm text-gray-600">
            Professional Logo Design & Brand Identity
          </p>
          <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
            <RatingStars rating={4.9} /> 4.9 (347 Reviews)
          </p>
        </div>
      </div>

      {/* REVIEW CARD */}
      <div className="bg-white rounded-2xl border p-6">
        <p className="text-lg font-semibold text-gray-900">
          How would you rate this service?
        </p>

        <div className="mt-3">
          <StarRating
            value={rating}
            onChange={(value) =>
              setValue("rating", value, { shouldValidate: true })
            }
          />
          <input
            type="hidden"
            {...register("rating", {
              required: "Rating is required.",
              min: { value: 1, message: "Rating is required." },
            })}
          />
          {errors.rating && (
            <p className="mt-2 text-sm text-red-500">
              {String(errors.rating.message)}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-700 mt-6 flex items-center gap-2">
          <RatingStars rating={4.9} /> 4.9 (347 Reviews)
        </p>

        <hr className="my-6" />

        <p className="text-lg font-semibold text-gray-900">
          What stood out?
        </p>

        <div className="mt-5 space-y-5 max-w-[520px]">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">Communication Quality</p>
            <StarRating
              value={communication}
              onChange={(value) =>
                setValue("communication", value, { shouldValidate: true })
              }
            />
            <input
              type="hidden"
              {...register("communication", {
                required: "Communication rating is required.",
                min: { value: 1, message: "Communication rating is required." },
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">On-time Delivery</p>
            <StarRating
              value={delivery}
              onChange={(value) =>
                setValue("delivery", value, { shouldValidate: true })
              }
            />
            <input
              type="hidden"
              {...register("delivery", {
                required: "Delivery rating is required.",
                min: { value: 1, message: "Delivery rating is required." },
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Value for Money</p>
            <StarRating
              value={valueForMoney}
              onChange={(value) =>
                setValue("valueForMoney", value, { shouldValidate: true })
              }
            />
            <input
              type="hidden"
              {...register("valueForMoney", {
                required: "Value for money rating is required.",
                min: { value: 1, message: "Value for money rating is required." },
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Would Recommend</p>
            <StarRating
              value={recommend}
              onChange={(value) =>
                setValue("recommend", value, { shouldValidate: true })
              }
            />
            <input
              type="hidden"
              {...register("recommend", {
                required: "Recommendation rating is required.",
                min: { value: 1, message: "Recommendation rating is required." },
              })}
            />
          </div>
        </div>

        {standoutError && (
          <p className="mt-3 text-sm text-red-500">
            Please rate all categories above.
          </p>
        )}

        <hr className="my-6" />

        <p className="text-lg font-semibold text-gray-900">
          Share your experience
        </p>

        <textarea
          value={experience}
          {...register("experience", {
            required: "Experience is required.",
            minLength: { value: 10, message: "Minimum 10 characters required." },
          })}
          maxLength={300}
          placeholder="Briefly describe your experience (minimum 10 characters)"
          className="w-full mt-3 border rounded-xl p-4 min-h-[170px] outline-none bg-[#F3F3F5]"
        />

        {errors.experience && (
          <p className="mt-2 text-sm text-red-500">
            {String(errors.experience.message)}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-2">{experience.length}/300 characters</p>
      </div>

      {/* ATTACHMENTS CARD */}
      <div className="bg-white rounded-2xl  p-6">
        <p className="text-lg font-semibold text-gray-900">
          Attachments (Optional)
        </p>

        <div
          onClick={() => fileRef.current?.click()}
          className="mt-5 border border-dashed rounded-2xl p-12 text-center cursor-pointer flex justify-center items-center mx-auto"
        >
          <div className="">
            <MdOutlineFileUpload className="flex justify-center items-center mx-auto" />
            <p className="text-gray-800 py-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 mt-2">
              PDF, DOC, or images (Max 10MB)
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,image/*"
            className="hidden"
            onChange={(e) => pickFiles(e.target.files)}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {files.map((f, i) => (
              <p key={i}> {f.name}</p>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-[#ED4C4C] hover:bg-[#d43f3f] text-white py-4 rounded-xl text-lg font-semibold cursor-pointer"
      >
        Submit Review
      </button>
    </form>
  );
}
