"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import toast,{Toaster} from "react-hot-toast";

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

export default function ReviewClient() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [rating, setRating] = useState(0);

  const [communication, setCommunication] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [recommend, setRecommend] = useState(0);

  const [experience, setExperience] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const pickFiles = (fl: FileList | null) => {
    if (!fl) return;
    setFiles((prev) => [...prev, ...Array.from(fl)]);
  };

  const handleSubmit = () => {
    console.log({
      rating,
      communication,
      delivery,
      valueForMoney,
      recommend,
      experience,
      files,
    });
    toast.success("Thank you for your review!");
  };

  return (
    <div className="containers py-8 space-y-6">
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
            <span className="text-yellow-500"><FaStar /></span> 4.9(347 reviews)
          </p>
        </div>
      </div>

      {/* REVIEW CARD */}
      <div className="bg-white rounded-2xl border p-6">
        <p className="text-lg font-semibold text-gray-900">
          How would you rate this service?
        </p>

        <div className="mt-3">
          <StarRating value={rating} onChange={setRating} />
        </div>

        <p className="text-sm text-gray-700 mt-6 flex items-center gap-2">
          <span className="text-yellow-500"><FaStar /></span> 4.9(347 reviews)
        </p>

        <hr className="my-6" />

        <p className="text-lg font-semibold text-gray-900">
          What stood out? (Optional)
        </p>

        <div className="mt-5 space-y-5 max-w-[520px]">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">Communication Quality</p>
            <StarRating value={communication} onChange={setCommunication} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">On-time Delivery</p>
            <StarRating value={delivery} onChange={setDelivery} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Value for Money</p>
            <StarRating value={valueForMoney} onChange={setValueForMoney} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-700">Would Recommend</p>
            <StarRating value={recommend} onChange={setRecommend} />
          </div>
        </div>

        <hr className="my-6" />

        <p className="text-lg font-semibold text-gray-900">
          Share your experience
        </p>

        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          maxLength={300}
          placeholder="Briefly describe your experience (minimum 10 characters)"
          className="w-full mt-3 border rounded-xl p-4 min-h-[170px] outline-none bg-[#F3F3F5]"
        />

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
        onClick={handleSubmit}
        className="w-full bg-[#ED4C4C] hover:bg-[#d43f3f] text-white py-4 rounded-xl text-lg font-semibold cursor-pointer"
      >
        Submit Review
      </button>
    </div>
  );
}
