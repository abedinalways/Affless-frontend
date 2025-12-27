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

  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    image: "/images/settingProfile.svg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FAF3E0] p-10">

      {/* LEFT */}
      <div className="border border-[#F5C6C6] rounded-xl p-6 bg-white flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden border border-[#FF4D4F] relative">
          <Image
            src={formData.image}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        {isEditing && (
          <input
            type="file"
            className="mt-4 text-sm"
          />
        )}

        <p className="mt-8 text-[#181414] text-lg">Profile</p>
        <h2 className="text-[24px] pb-3 font-normal">{formData.name}</h2>
      </div>

      {/* RIGHT */}
      <div className="md:col-span-2 space-y-6">

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#FF4D4F] text-white px-6 py-2 rounded-full"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* NAME */}
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

        {/* EMAIL */}
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

        {/* PHONE */}
        <div>
          <label className="font-medium">Phone Number</label>
          <div className="flex gap-3">
            <div className="flex items-center gap-4 w-[160px] px-2.5 rounded-lg border border-[#FF4D4F] bg-white">
              <Image
                src="/images/flag america.png"
                width={47}
                height={25}
                alt="flag"
              />
              <span className="text-[16px] font-normal">+1242</span>
            </div>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-3 rounded-lg bg-white border border-[#FF4D4F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
