"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  name?: string;
  email?: string;
  phone?: string;
}

export default function PersonalInformation({
  name = "Admin",
  email = "admin@email.com",
  phone = "123456789",
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    image: "/images/headset.svg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE CHANGE HANDLER (NEW)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  return (
    <div className="bg-[#FAF3E0] p-10 rounded-2xl">
      <h1 className="text-[26px] font-semibold text-[#FF4D4F] mb-6">
        Personal Information
      </h1>
      <hr  className="border-[#A5A5AB] w-full pb-12"/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="border border-[#F5C6C6] rounded-xl p-6 bg-white flex flex-col items-center">
          <label htmlFor="profile" className={`w-40 h-40 rounded-full overflow-hidden border border-[#FF4D4F] relative ${isEditing ? "cursor-pointer" : ""}`}>
            <Image
              src={formData.image}
              alt="profile"
              width={1000}
              height={1000}
              className="object-cover"
            />
          </label>

          <input
            type="file"
            id="profile"
            accept="image/*"
            onChange={handleImageChange}
            disabled={!isEditing}
            className="sr-only"
          />

          <p className="mt-8 text-[#181414] text-lg">Profile</p>
          <h2 className="text-[24px] pb-3 font-normal">
            {formData.name}
          </h2>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 space-y-6">

          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#FF4D4F] text-white px-6 py-2 rounded-full cursor-pointer"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          <div>
            <label className="font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 rounded-lg bg-white border border-[#FF4D4F]"
            />
          </div>

          <div>
            <label className="font-medium">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 rounded-lg bg-white border border-[#FF4D4F]"
            />
          </div>

          <div>
            <label className="font-medium">Phone Number</label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 w-fit min-w-20 px-2.5 rounded-lg border border-[#FF4D4F] bg-white">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  disabled={!isEditing}
                  className="w-full bg-white text-[16px] font-normal outline-none"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+234">+234</option>
                </select>
              </div>

              <input
                name="phone"
                type="text"
                inputMode="numeric"
                pattern="^[0-9]*$"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 rounded-lg bg-white border border-[#FF4D4F]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
