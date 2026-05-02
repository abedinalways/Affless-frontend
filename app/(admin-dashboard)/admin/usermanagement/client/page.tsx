"use client";

import Pagination from "@/components/reusable/pagination";
import Image from "next/image";
import Link from "next/link";



export default function ClientPage({ data }: { data: any[] }) {
  return (
    <div className="">
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-xl p-6 flex flex-col items-center text-center border"
          >
            {/* Profile Image */}
            <Image
              src={user.img}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />

            {/* Name */}
            <h3 className="mt-4 text-lg font-semibold">{user.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
              ⭐ <span className="text-black">{user.rating}</span>
              <span className="text-gray-500">(950+)</span>
            </div>

            {/* View Profile Button */}
            <Link
              href={`/admin/usermanagement/client/[id]${user.id}`}
              className="w-full mt-4"
            >
              <button className="w-full border rounded-lg py-2 hover:bg-gray-100 text-sm cursor-pointer">
                View profile
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          page={1}
          pageSize={10}
          total={data?.length}
          onPageChange={() => {}}
          totalPages={1}
        />

      </div>
    </div>
  );
}
