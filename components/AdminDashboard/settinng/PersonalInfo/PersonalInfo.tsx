"use client";

import Image from "next/image";
import Link from "next/link";

export default function PersonalInformation({
  name = "",
  email = "",
  phone = "",
  onEdit = () => {},
}: {
  name?: string;
  email?: string;
  phone?: string;
  onEdit?: () => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FAF3E0] p-10">

        {/* LEFT */}
        <div className="border border-[#F5C6C6] rounded-xl p-6 bg-white flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#FF4D4F]">
            <Image
              src="/profile.jpg"
              alt="profile"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>

          <p className="mt-4 text-gray-500 text-sm">Profile</p>
          <h2 className="text-lg font-semibold">Admin</h2>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 space-y-6">

          <div className="flex justify-end">
       <Link href="/admin/dashboard/setting/personal-info-edit">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 bg-[#FF4D4F] text-white px-6 py-2 rounded-full"
            >
              ✏️ Edit Profile
            </button>
            </Link>
          </div>

          <div>
            <label className="font-medium">Name</label>
            <input
              disabled
              value={name}
              className="w-full p-3 rounded-lg bg-[#FFFFFF] border border-[#FF4D4F]"
            />
          </div>

          <div>
            <label className="font-medium">E-mail</label>
            <input
              disabled
              value={email}
              className="w-full p-3 rounded-lg bg-[#FFFFFF] border border-[#FF4D4F]"
            />
          </div>

          <div>
            <label className="font-medium">Phone Number</label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 rounded-lg border border-[#FF4D4F] bg-[#FFFFFF]">
                <Image src="/usa.png" width={30} height={20} alt="flag" />
                <span>+1242</span>
              </div>

              <input
                disabled
                value={phone}
                className="w-full p-3 rounded-lg bg-[#FFFFFF] border border-[#FF4D4F]"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
