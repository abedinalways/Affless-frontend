"use client";

import Image from "next/image";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  rating: number;
  img: string;
};

const users: User[] = [
  { id: 1, name: "Darrell Steward", rating: 4.7, img: "/images/profile.png" },
  { id: 2, name: "Leslie Alexander", rating: 4.7, img: "/images/profile.png" },
  { id: 3, name: "MusicArt", rating: 4.7, img: "/images/profile.png" },
  { id: 4, name: "Annette Black", rating: 4.7, img: "/images/profile.png" },
  { id: 5, name: "Ralph Edwards", rating: 4.7, img: "/images/profile.png" },
  { id: 6, name: "Cody Fisher", rating: 4.7, img: "/images/profile.png" },
  { id: 7, name: "Devon Lane", rating: 4.7, img: "/images/profile.png" },
  { id: 8, name: "Savannah Nguyen", rating: 4.7, img: "/images/profile.png" },
  { id: 9, name: "Esther Howard", rating: 4.7, img: "/images/profile.png" },
  { id: 10, name: "Courtney Henry", rating: 4.7, img: "/images/profile.png" },
  { id: 11, name: "Darlene Robertson", rating: 4.7, img: "/images/profile.png" },
  { id: 12, name: "Wade Warren", rating: 4.7, img: "/images/profile.png" },
];

export default function ClientPage() {
  return (
    <div className="p-6">
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
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
              href={`/admin/dashboard/usermanagement/client/${user.id}`}
              className="w-full mt-4"
            >
              <button className="w-full border rounded-lg py-2 hover:bg-gray-100 text-sm">
                View profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
