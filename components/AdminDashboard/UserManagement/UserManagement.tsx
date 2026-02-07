"use client";

import ClientPage from "@/app/(admin-dashboard)/admin/usermanagement/client/page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Pagination from "@/components/reusable/pagination";
import { useSearchParams } from "next/navigation";
const editorUsers = [
  { id: 1, name: "Darrell Steward", jobs: "5 Jobs Completed", rating: "4.7", img: "/images/profile.png" },
  { id: 2, name: "Leslie Alexander", jobs: "3 Jobs Completed", rating: "4.8", img: "/images/profile.png" },
  { id: 3, name: "Cody Fisher", jobs: "8 Jobs Completed", rating: "4.9", img: "/images/profile.png" },
  { id: 4, name: "Annette Black", jobs: "2 Jobs Completed", rating: "4.6", img: "/images/profile.png" },
  { id: 5, name: "Darrell Steward", jobs: "5 Jobs Completed", rating: "4.7", img: "/images/profile.png" },
  { id: 6, name: "Leslie Alexander", jobs: "3 Jobs Completed", rating: "4.8", img: "/images/profile.png" },
  { id: 7, name: "Cody Fisher", jobs: "8 Jobs Completed", rating: "4.9", img: "/images/profile.png" },
  { id: 8, name: "Annette Black", jobs: "2 Jobs Completed", rating: "4.6", img: "/images/profile.png" },
];

const ITEMS_PER_PAGE = 8;

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<"editor" | "client">("editor");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const userType = searchParams.get("type");

  useEffect(() => {
    if (userType === "client" || userType === "editor") {
      setActiveTab(userType);
      setPage(1);
    }
  }, [userType]);

  const totalPages = Math.ceil(editorUsers.length / ITEMS_PER_PAGE);
  const currentData = editorUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="">

      {/* TOP BAR */}
      <div className="">

        {/* TABS */}
        {/* <div className="flex gap-3 bg-gray-100 p-1 rounded-lg">
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
        </div> */}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "editor" | "client")} className="w-full">
          <div className="flex justify-between items-center mb-6 border border-[#DCDDDD] rounded-lg p-3 gap-4">
            <div>
              <TabsList className="flex gap-9">
                <TabsTrigger value="editor" className="cursor-pointer">Editor</TabsTrigger>
                <TabsTrigger value="client" className="cursor-pointer">Client</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex gap-4">
              <div>
                <input className="border rounded-lg px-4 py-2 w-full" placeholder="Search Here..." />

              </div>
              <select className="border rounded-lg px-4 py-2 w-full max-w-40">
                <option>All</option>
                <option>Jobs Completed</option>
                <option>Money Spent</option>
              </select>
            </div>
          </div>

          <TabsContent value="editor">

          </TabsContent>
          <TabsContent value="client">
            <ClientPage />
          </TabsContent>
        </Tabs>


      </div>


      {activeTab === "client" ? (
        <ClientPage />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

            {currentData.map((user) => (
              <div key={user.id} className="bg-white border rounded-xl shadow-sm p-5 flex flex-col items-center text-center">

                <Image src={user.img} width={80} height={80} alt={user.name} className="rounded-full" />

                <h3 className="text-lg font-semibold mt-3">{user.name}</h3>
                <p className="text-gray-500">{user.jobs}</p>

                <div className="flex items-center gap-1 text-yellow-500 mt-2">
                  ⭐ <span className="text-black">{user.rating}</span>
                  <span className="text-gray-500">(95)</span>
                </div>

                <Link href={`/admin/usermanagement/${user.id}`} className="w-full">
                  <button className="mt-4 border rounded-lg px-4 py-2 w-full hover:bg-gray-100 cursor-pointer">
                    View Profile
                  </button>
                </Link>

              </div>
            ))}

          </div>

          <div className="mt-8 flex justify-center">
            <Pagination
              page={page}
              pageSize={ITEMS_PER_PAGE}
              total={editorUsers.length}
              onPageChange={setPage}
              totalPages={totalPages}
            />

          </div>
        </>
      )}
    </div>
  );
}
