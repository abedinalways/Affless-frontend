"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { DataTable } from "@/components/reusable/DataTable";

type OrderStatus = "pending" | "accept";
type FilterType = "Biding jobs" | "Offer jobs";

interface Order {
  id: number;
  title: string;
  price: number;
  time: string;
  status: OrderStatus;
  img: string;
}

const ordersData: Order[] = [
  { id: 1, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 2, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 3, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 4, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 5, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 6, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 7, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "pending" },
  { id: 8, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654, time: "Jun 21", status: "accept" },
];

export default function ClientDashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const [filter, setFilter] = useState<FilterType>("Biding jobs");

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const filteredOrders = useMemo(() => {
    if (filter === "Biding jobs") return ordersData.filter((o) => o.status === "pending");
    return ordersData.filter((o) => o.status === "accept");
  }, [filter]);

  const total = filteredOrders.length;
  const paginated = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Service",
        cell: ({ row }) => {
          const o = row.original;
          return (
            <div className="flex items-center gap-3 min-w-[320px]">
              <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100">
                <Image src={o.img} alt="Order" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <p className="text-[14px] text-[#333] leading-5 line-clamp-2">{o.title}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Amount",
        cell: ({ row }) => <span className="text-[14px] text-[#4A4C56]">${row.original.price}</span>,
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => <span className="text-[14px] text-[#4A4C56]">{row.original.time}</span>,
      },
      {
        id: "action",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          return (
            <div className="flex justify-end">
              {s === "pending" ? (
                <span className="rounded-lg bg-[#FFF7E6] px-5 py-2 text-[14px] font-medium text-[#FAAD14]">
                  Pending
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-lg bg-[#EEFAE9] px-5 py-2 text-[14px] font-medium text-[#52C41A] cursor-pointer"
                >
                  Accept
                </button>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      <div className="mx-auto containers space-y-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* LEFT */}
          <div className="w-full space-y-6 lg:w-1/3">
            <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <Image src="/images/inbox1.png" alt="Zeeshan" width={80} height={80} className="h-full w-full object-cover" />
                </div>

                <div className="text-center">
                  <Link href="/client/profile" className="text-lg font-semibold underline">Zeeshan</Link>
                  <div className="pt-3 text-sm text-gray-500 flex">
                    <p className="flex gap-2">
                      <LocationIcon /> Pakistan <WorldIcon /> English
                    </p>
                  </div>
                </div>

                <Link
                  href="/client/find-editor-match"
                  className="mt-6 w-fit rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white"
                >
                  Match Me with an Editor
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-[18px] font-medium text-[#333] leading-130%">Balance</h3>
              <p className="text-2xl font-medium leading-150% text-[#333] text-center py-4">US$0</p>
              <div className="flex justify-center">
                <Link href="/client/add-money">
                  <button type="button" className="rounded-lg border border-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-[#ff4b4b] cursor-pointer">
                    Add Funds
                  </button>
                </Link>
              </div>
            </div>
          </div>
           {/* <div className="rounded-2xl bg-white p-4 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-medium text-[18px] text-[#333]">Inbox</h3>
//                 <button className="text-[14px] font-normal text-[#FF4D4F]">View All</button>
//               </div>

//               <div className="space-y-3 pt-4">
//                 {inboxItems.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between rounded-xl px-1 py-2 hover:bg-gray-50">
//                     <div className="flex items-center gap-3">
//                       <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
//                         <Image src={item.img} alt={item.name} width={32} height={32} className="h-full w-full object-cover" />
//                       </div>
//                       <div className="space-y-1">
//                         <p className="font-medium text-[18px]">{item.name}</p>
//                         <p className="text-[14px] text-[#777980]">{item.message}</p>
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-400">{item.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </div> */}

          {/* RIGHT */}
          <div className="w-full lg:w-2/3 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Welcome, Zeeshan</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Find important messages, tips, and links to helpful resources here:
                </p>
              </div>

              <Link href="/client/post-job" className="p-3 bg-red-500 text-white rounded-lg text-sm">
                + Post New Job
              </Link>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <DataTable<Order, any>
                columns={columns}
                data={paginated}
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
              >
                <div className="rounded-xl bg-[#FFE1E1] px-6 py-4 flex items-center justify-between">
                  <p className="text-[18px] md:text-[22px] font-medium text-[#FF4D4F]">
                    {filter}
                  </p>

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                    className="h-[38px] rounded-lg border border-[#7F7F86] bg-[#FFE1E1] px-3 text-[14px] text-[#333] outline-none cursor-pointer"
                  >
                    <option value="Biding jobs">Biding jobs</option>
                    <option value="Offer jobs">Offer jobs</option>
                  </select>
                </div>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// "use client";

// import LocationIcon from "@/components/Icons/LocationIcon";
// import WorldIcon from "@/components/Icons/WorldIcon";
// import Pagination from "@/components/reusable/pagination";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// type OrderStatus = "pending" | "accept";

// interface Order {
//   id: number;
//   title: string;
//   price: number;
//   days: number;
//   status: OrderStatus;
//   img: string;
//   bids: string;
// }

// interface InboxItem {
//   id: number;
//   name: string;
//   message: string;
//   time: string;
//   img: string;
// }

// const ordersData: Order[] = [
//   { id: 1, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 2, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 3, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 4, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 5, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 6, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 7, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
//   { id: 8, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
// ];

// const inboxItems: InboxItem[] = [
//   { id: 1, name: "Farhan", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox1.png" },
//   { id: 2, name: "Arlene", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox2.png" },
//   { id: 3, name: "Ralph", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox3.png" },
//   { id: 4, name: "Jenny", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox4.png" },
// ];

// export default function ClientDashboard() {
//   const [page, setPage] = useState(1);
//   const pageSize = 4;

//   const totalActiveOrders = ordersData.length;
//   const totalAmount = ordersData.reduce((sum, o) => sum + o.price, 0);

//   const paginatedOrders = ordersData.slice((page - 1) * pageSize, page * pageSize);

//   return (
//     <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
//       <div className="mx-auto containers space-y-6">
//         {/* <div className="grid justify-end">
//           <Link href="/client/post-job" className="mt-3 p-3 bg-red-500 text-white rounded-lg text-sm opacity-80 hover:opacity-100 duration-300">
//             + Post New Job
//           </Link>
//         </div> */}
//         {/* LEFT COLUMN */}
//         <div className="flex flex-col gap-8 lg:flex-row">
//           <div className="w-full space-y-6 lg:w-1/3 ">
//             {/* Profile Card */}
//             <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
//               <div className="flex flex-col items-center gap-3">
//                 <div className="h-20 w-20 overflow-hidden rounded-full">
//                   <Image src="/images/inbox1.png" alt="Zeeshan" width={50} height={50} className="h-full w-full object-cover" />
//                 </div>
//                 <div className="text-center">
//                   <p className="text-lg font-semibold underline">Zeeshan</p>
//                   <div className="pt-3 text-sm text-gray-500 flex">
//                     <p className="flex gap-2"><LocationIcon /> Pakistan <WorldIcon /> English</p>
//                   </div>
//                 </div>
//                 <Link href="/client/find-editor-match" className="mt-6 w-fit rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
//                   Match Me with an Editor
//                 </Link>
//               </div>
//             </div>

//             {/* Payment Overview */}
//             <div className="rounded-2xl bg-white p-6 shadow-sm">
//               <h3 className="text-[18px] font-medium text-[#333] leading-130%">Balance</h3>
//               <p className="text-2xl font-medium leading-150% text-[#333] text-center py-4">US$0</p>
//               <div className="flex justify-center">
//                <Link href="/client/add-money">
//                 <button className="rounded-lg border border-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-[#ff4b4b] cursor-pointer">
//                   Add Funds
//                 </button></Link>
//               </div>
//             </div>

//             {/* Inbox */}
//             {/* <div className="rounded-2xl bg-white p-4 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-medium text-[18px] text-[#333]">Inbox</h3>
//                 <button className="text-[14px] font-normal text-[#FF4D4F]">View All</button>
//               </div>

//               <div className="space-y-3 pt-4">
//                 {inboxItems.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between rounded-xl px-1 py-2 hover:bg-gray-50">
//                     <div className="flex items-center gap-3">
//                       <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
//                         <Image src={item.img} alt={item.name} width={32} height={32} className="h-full w-full object-cover" />
//                       </div>
//                       <div className="space-y-1">
//                         <p className="font-medium text-[18px]">{item.name}</p>
//                         <p className="text-[14px] text-[#777980]">{item.message}</p>
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-400">{item.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </div> */}
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="w-full lg:w-2/3 space-y-4">
//             <div className=" gap-8">
//               <div className="flex justify-between">
//                <div className="">
//                  <h1 className="text-2xl font-semibold">Welcome, Zeeshan</h1>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Find important messages, tips, and links to helpful resources here:
//                 </p>
//                </div>
//                <div className="">
//                  <Link href="/client/post-job" className="mt-3 p-3 bg-red-500 text-white rounded-lg text-sm">
//               + Post New Job
//             </Link>
//                </div>
//               </div>
//             </div>

//             {/* Active Orders Summary */}
//             <div className="rounded-xl bg-[#ffe1e1] px-6 py-6 text-[18px] md:text-[24px] font-medium text-[#FF4D4F]">
//               Active orders {totalActiveOrders} (${totalAmount})
//             </div>

//             {/* Orders List */}
//             <div className="rounded-2xl bg-white p-6 shadow-sm grid">
//               <div className="space-y-4 grid overflow-x-auto">
//                 {paginatedOrders.map((order) => (
//                   <div key={order.id} className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl px-2 py-3 hover:bg-gray-50">

//                     {/* Left */}
//                     <div className="grid grid-cols-[auto_1fr] min-w-[300px] gap-4">
//                       <div className="h-14 w-14 rounded-md">
//                         <Image src={order.img} alt="Order" width={500} height={500} className="h-full w-full object-cover rounded-md" />
//                       </div>
//                       <p className="text-sm font-normal text-[#333] text-[16px] leading-150%">
//                         {order.title}
//                       </p>
//                     </div>

//                     {/* Middle & Right */}
//                     <div className="flex md:gap-4 justify-between">
//                       <div className="flex items-center gap-4 text-[16px] font-normal text-[#4A4C56]">
//                         <p>${order.price}</p>
//                         <p className="whitespace-nowrap">{order.bids}</p>
//                         <p className="hidden md:block whitespace-nowrap">{order.days} Days</p>
//                       </div>
//                       <div>
//                         {order.status === "pending" ? (
//                           <button className="rounded-lg bg-[#EEFAE9] px-5 py-2 text-[16px] font-medium text-[#52C41A]">Pending</button>
//                         ) : (
//                           <button className="rounded-lg bg-[#FF4D4F] px-5 py-2 text-[16px] font-medium text-white">Accept</button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <Pagination
//                 page={page}
//                 pageSize={pageSize}
//                 total={ordersData.length}
//                 onPageChange={setPage}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
