"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

type DataType = {
  id: string;
  name: string;
  type: string;
  totalJobsPosted?: number;
  totalJobsCompleted?: number;
  jobCompletionRate?: number;
  hireRate?: number;
  averageResponseTime: string;
  memberSince: string;
  location: string;
  image: string;
}

type propType = {
  btnText: string;
  data: DataType;
  showBudget?: boolean;
}

export default function UserCard({ btnText, data, showBudget }: propType) {
  return (
    <div className="w-full grid">
      {/* About Client */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow p-4 border">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 capitalize">
            About {data?.type}
          </h2>

          {/* Buyer Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border">
              <Link href="/client-profile/1" className="block w-full h-full">
                <Image
                  src={data?.image}
                  alt="Buyer"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            <Link href="/client-profile/1" className="text-lg font-semibold capitalize">{data?.name}</Link>

            {/* Small Badge Icons */}
            <div className="flex items-center gap-2 mt-2">
              <Image src="/images/coper1.png" alt="img" width={30} height={30}></Image>
              {/* <Image src="/images/coper2.png" alt="img" width={30} height={30}></Image>
              <Image src="/images/coper3.png" alt="img" width={30} height={30}></Image> */}
            </div>
          </div>

          {/* Buyer Info */}
          <div className="bg-gray-50 border rounded-2xl p-3 mt-4">
            <InfoRow label={data?.type === "editor" ? "total jobs completed:" : "Total Jobs Posted:"} value={`${data?.totalJobsPosted || data.totalJobsCompleted || 0}`} />
            <InfoRow label={data?.type === "editor" ? "job completion rate:" : "Hire Rate (%):"} value={`${data?.hireRate || data.jobCompletionRate || 0}%`} />
            <InfoRow label="Average Response Time:" value={data?.averageResponseTime || ""} />
            <InfoRow label="Member Since:" value={data?.memberSince || ""} />
            <InfoRow label="Location:" value={data?.location || ""} />
          </div>
        </div>

        {/* Chat Button */}
        <Link href={`/admin/chats/3`} className="w-full block text-center bg-red-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition">
          {btnText}
        </Link>
      </div>
    </div>
  );
}

/* Reusable row */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-gray-500 font-medium capitalize">{label}</span>
      <span className="text-[#4A6375] font-medium text-sm leading-150%">{value}</span>
    </div>
  );
}
