"use client";

import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ReviewData {
  rating: number;
  communication: number;
  delivery: number;
  value: number;
  recommend: number;
  experience: string;
  attachments: File[];
}

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [value, setValue] = useState(0);
  const [recommend, setRecommend] = useState(0);
  const [experience, setExperience] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  // Handle file upload
  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    setAttachments([...attachments, ...fileArray]);
  };

  // API SUBMIT
  const handleSubmit = async () => {
    const payload: ReviewData = {
      rating,
      communication,
      delivery,
      value,
      recommend,
      experience,
      attachments,
    };

    const formData = new FormData();
    formData.append("rating", String(rating));
    formData.append("communication", String(communication));
    formData.append("delivery", String(delivery));
    formData.append("value", String(value));
    formData.append("recommend", String(recommend));
    formData.append("experience", experience);

    attachments.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/review", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Review Submitted Successfully!");
    } else {
      alert("Something went wrong!");
    }
  };

  // Render Stars
  const StarRow = ({ selected, onChange }: { selected: number; onChange: (n: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} onClick={() => onChange(i)} className="cursor-pointer text-2xl text-yellow-500">
          {i <= selected ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full containers mx-auto p-6 space-y-6">
      
      {/* Seller Header */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
        <img src="/user.jpg" alt="" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-gray-800">Sarah Johnson</h3>
          <p className="text-sm text-gray-500">Professional Logo Design & Brand Identity</p>
          <p className="text-sm text-yellow-500 flex items-center gap-1">
            ⭐ 4.9 (347 reviews)
          </p>
        </div>
      </div>

      {/* Review Form Card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        
        {/* Main Rating */}
        <div>
          <h3 className="text-lg font-semibold">How would you rate this service?</h3>
          <StarRow selected={rating} onChange={setRating} />
        </div>

        {/* Optional Ratings */}
        <div className="space-y-3">
          <p className="font-semibold text-gray-700">What stood out? (Optional)</p>

          <div className="flex justify-between items-center">
            <span>Communication Quality</span>
            <StarRow selected={communication} onChange={setCommunication} />
          </div>

          <div className="flex justify-between items-center">
            <span>On-time Delivery</span>
            <StarRow selected={delivery} onChange={setDelivery} />
          </div>

          <div className="flex justify-between items-center">
            <span>Value for Money</span>
            <StarRow selected={value} onChange={setValue} />
          </div>

          <div className="flex justify-between items-center">
            <span>Would Recommend</span>
            <StarRow selected={recommend} onChange={setRecommend} />
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="font-semibold">Share your experience</p>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            maxLength={300}
            placeholder="Briefly describe your experience (minimum 10 characters)"
            className="w-full h-32 border rounded-lg p-3 bg-gray-100 outline-none resize-none"
          />
          <p className="text-xs text-gray-500 text-right">{experience.length}/300 characters</p>
        </div>

        {/* File Upload */}
        <div>
          <p className="font-semibold mb-2">Attachments (Optional)</p>

          <label
            className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50"
          >
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">PDF, DOC, or Images (Max 10MB)</p>
          </label>

          {/* Show uploaded files */}
          {attachments.length > 0 && (
            <ul className="mt-3 text-sm text-gray-600">
              {attachments.map((file, i) => (
                <li key={i}>📎 {file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#ED4C4C] hover:bg-[#d43f3f] text-white py-3 rounded-lg text-lg font-semibold transition"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
