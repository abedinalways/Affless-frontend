"use client";

import ClientPage from "@/app/(admin-dashboard)/admin/(admin)/dashboard/usermanagement/clientPage";
import { Pagination } from "@/components/reusable/DashboardPagination";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const editorUsers = [
  { id: 1, name: "Darrell Steward", jobs: "5 Job Complete", rating: "4.7", img: "/images/profile.png" },
  { id: 2, name: "Leslie Alexander", jobs: "3 Job Complete", rating: "4.8", img: "/images/profile.png" },
  { id: 3, name: "Cody Fisher", jobs: "8 Job Complete", rating: "4.9", img: "/images/profile.png" },
  { id: 4, name: "Annette Black", jobs: "2 Job Complete", rating: "4.6", img: "/images/profile.png" },
  { id: 5, name: "Darrell Steward", jobs: "5 Job Complete", rating: "4.7", img: "/images/profile.png" },
  { id: 6, name: "Leslie Alexander", jobs: "3 Job Complete", rating: "4.8", img: "/images/profile.png" },
  { id: 7, name: "Cody Fisher", jobs: "8 Job Complete", rating: "4.9", img: "/images/profile.png" },
  { id: 8, name: "Annette Black", jobs: "2 Job Complete", rating: "4.6", img: "/images/profile.png" },
];

const ITEMS_PER_PAGE = 8;

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<"editor" | "client">("editor");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(editorUsers.length / ITEMS_PER_PAGE);
  const currentData = editorUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        {/* TABS */}
        <div className="flex gap-3 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => { setActiveTab("editor"); setPage(1); }}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "editor" ? "bg-red-500 text-white" : "text-gray-700"
            }`}>
            Editor
          </button>

          <button
            onClick={() => { setActiveTab("client"); }}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "client" ? "bg-red-500 text-white" : "text-gray-700"
            }`}>
            Client
          </button>
        </div>

        <div className="flex gap-4">
          <input className="border rounded-lg px-4 py-2 w-64" placeholder="Search here..." />
          <select className="border rounded-lg px-4 py-2">
            <option>All status (06)</option>
          </select>
        </div>
      </div>

      {/* CONDITIONAL VIEW */}
      {activeTab === "client" ? (
        <ClientPage />
      ) : (
        <>
          {/* EDITOR GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {currentData.map((user) => (
              <div key={user.id} className="bg-white border rounded-xl shadow-sm p-5 flex flex-col items-center text-center">

                <Image src={user.img} width={80} height={80} alt={user.name} className="rounded-full" />

                <h3 className="text-lg font-semibold mt-3">{user.name}</h3>
                <p className="text-gray-500">{user.jobs}</p>

                <div className="flex items-center gap-1 text-yellow-500 mt-2">
                  ⭐ <span className="text-black">{user.rating}</span>
                  <span className="text-gray-500">(950+)</span>
                </div>

                {/* Dynamic Profile Button */}
                <Link href={`/admin/dashboard/usermanagement/${user.id}`} className="w-full">
                  <button className="mt-4 border rounded-lg px-4 py-2 w-full hover:bg-gray-100">
                    View profile
                  </button>
                </Link>

              </div>
            ))}

          </div>

          <div className="mt-8 flex justify-center">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

    </div>
  );
}
