"use client";

import ClientPage from "@/app/(admin-dashboard)/admin/usermanagement/client/page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Pagination from "@/components/reusable/pagination";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type User = {
  id: number;
  name: string;
  rating: number;
  img: string;
  jobs: number;
  spent: number;
};

const clientUsers: User[] = [
  { id: 1, name: "Darrell Steward", rating: 4.7, img: "/images/profile.png", jobs: 12, spent: 8450 },
  { id: 2, name: "Leslie Alexander", rating: 4.7, img: "/images/profile.png", jobs: 8, spent: 5320 },
  { id: 3, name: "MusicArt", rating: 4.7, img: "/images/profile.png", jobs: 15, spent: 12400 },
  { id: 4, name: "Annette Black", rating: 4.7, img: "/images/profile.png", jobs: 5, spent: 2780 },
  { id: 5, name: "Ralph Edwards", rating: 4.7, img: "/images/profile.png", jobs: 9, spent: 6190 },
  { id: 6, name: "Cody Fisher", rating: 4.7, img: "/images/profile.png", jobs: 20, spent: 15300 },
  { id: 7, name: "Devon Lane", rating: 4.7, img: "/images/profile.png", jobs: 3, spent: 1750 },
  { id: 8, name: "Savannah Nguyen", rating: 4.7, img: "/images/profile.png", jobs: 11, spent: 9270 },
];

const editorUsers: User[] = [
  { id: 1, name: "Darrell Steward", rating: 4.7, img: "/images/profile.png", jobs: 5, spent: 2350 },
  { id: 2, name: "Leslie Alexander", rating: 4.8, img: "/images/profile.png", jobs: 3, spent: 1280 },
  { id: 3, name: "Cody Fisher", rating: 4.9, img: "/images/profile.png", jobs: 8, spent: 100 },
  { id: 4, name: "Annette Black", rating: 4.6, img: "/images/profile.png", jobs: 2, spent: 19050 },
  { id: 5, name: "Darrell Steward", rating: 4.7, img: "/images/profile.png", jobs: 5, spent: 2350 },
  { id: 6, name: "Leslie Alexander", rating: 4.8, img: "/images/profile.png", jobs: 3, spent: 1280 },
  { id: 7, name: "Cody Fisher", rating: 4.9, img: "/images/profile.png", jobs: 8, spent: 100 },
  { id: 8, name: "Annette Black", rating: 4.6, img: "/images/profile.png", jobs: 2, spent: 19050 },
];

const ITEMS_PER_PAGE = 8;

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<"editor" | "client">("editor");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const userType = searchParams.get("type");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("all");

  useEffect(() => {
    if (userType === "client" || userType === "editor") {
      setActiveTab(userType);
      setPage(1);
    }
  }, [userType]);

  const filteredUsers = useMemo(() => {
    let users = editorUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.jobs === parseInt(search) ||
      user.rating.toString().includes(search)
    );
    if (sortBy === "jobs") {
      users = users.slice().sort((a, b) => {
        // Extract the number of jobs from the string (e.g., "5 Jobs Completed")
        const jobsA = a.jobs;
        const jobsB = b.jobs;
        return jobsB - jobsA; // Descending order
      });
    } else if (sortBy === "money") {
      users = users.slice().sort((a, b) => {
        const spentA = a.spent;
        const spentB = b.spent;
        return spentB - spentA;
      });
    }
    return users;
  }, [search, sortBy]);

  const filteredClients = useMemo(() => {
    let users = clientUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.rating.toString().includes(search) ||
      user.spent.toString().includes(search)
    );
    if (sortBy === "jobs") {
      users = users.slice().sort((a, b) => {
        // Extract the number of jobs from the string (e.g., "5 Jobs Completed")
        const jobsA = a.jobs;
        const jobsB = b.jobs;
        return jobsB - jobsA; // Descending order
      });
    } else if (sortBy === "money") {
      users = users.slice().sort((a, b) => {
        const spentA = a.spent;
        const spentB = b.spent;
        console.log("Sorting by money:", spentA, spentB);
        return spentB - spentA;
      });
    }
    return users;
  }, [search, sortBy]);


  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const currentData = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="">
      <div className="">
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

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value as "editor" | "client")
          setSortBy("all")
          setSearch("")
        }} className="w-full">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border border-[#DCDDDD] rounded-lg p-3 gap-4">
            <div>
              <TabsList className="flex gap-9">
                <TabsTrigger value="editor" className="cursor-pointer">Editor</TabsTrigger>
                <TabsTrigger value="client" className="cursor-pointer">Client</TabsTrigger>
              </TabsList>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
              <div>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-4 py-2 w-full cursor-pointer focus:cursor-text" placeholder="Search Here..." />
              </div>
              <Select
                defaultValue={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="border rounded-lg px-4 py-5 w-full min-w-25 sm:max-w-45 focus-visible:ring-0 focus-visible:border cursor-pointer">
                  <SelectValue placeholder="Select to sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all" className="cursor-pointer">All</SelectItem>
                    {activeTab === "editor" && (
                      <SelectItem value="jobs" className="cursor-pointer">Jobs Completed</SelectItem>
                    )}
                    {activeTab === "client" && (
                      <SelectItem value="money" className="cursor-pointer">Money Spent</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="editor">
            <>
              {currentData?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                  {currentData.map((user) => (
                    <div key={user.id} className="bg-white border rounded-xl shadow-sm p-5 flex flex-col items-center text-center">

                      <Image src={user.img} width={80} height={80} alt={user.name} className="rounded-full" />

                      <h3 className="text-lg font-semibold mt-3">{user.name}</h3>
                      <p className="text-gray-500">{user.jobs} Jobs Completed</p>

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
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500">No users found.</p>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Pagination
                  page={page}
                  pageSize={ITEMS_PER_PAGE}
                  total={filteredUsers.length}
                  onPageChange={setPage}
                  totalPages={totalPages}
                />

              </div>
            </>
          </TabsContent>
          <TabsContent value="client">
            <ClientPage
              data={filteredClients.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
