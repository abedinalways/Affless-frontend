"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { DataTable } from "@/components/reusable/DataTable";

type OrderStatus = "pending" | "in_progress" | "delivered" | "completed" | "cancelled";
type FilterType = "Biding jobs" | "Offer jobs";
import { Toaster } from "react-hot-toast";
import LockIcon from "@/components/Icons/LockIcon";
import { IoArrowForwardSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Order {
  id: number;
  title: string;
  price: number;
  time: string;
  status: OrderStatus;
  img: string;
}

const ordersData: Order[] = [
  { id: 1, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "1", status: "pending" },
  { id: 2, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "2", status: "in_progress" },
  { id: 5, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "5", status: "cancelled" },
  { id: 3, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "3", status: "pending" },
  { id: 4, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "4", status: "completed" },
  { id: 6, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "6", status: "delivered" },
  { id: 7, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "7", status: "pending" },
  { id: 8, img: "/images/product.png", title: "I will create backlinks to improve your SEO rankings.", price: 654.00, time: "8", status: "in_progress" },
];

export default function ClientDashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const [filter, setFilter] = useState<FilterType>("Biding jobs");


  const total = ordersData.length;
  const paginated = ordersData.slice((page - 1) * pageSize, page * pageSize);

  const statusClasses: Record<OrderStatus, string> = {
    pending: "rounded-lg bg-[#FFF7E6] px-5 py-2 text-[14px] font-medium text-[#FAAD14]",
    in_progress: "rounded-lg bg-[#E6F4FF] px-5 py-2 text-[14px] font-medium text-[#1677FF]",
    delivered: "rounded-lg bg-[#F6FFED] px-5 py-2 text-[14px] font-medium text-[#52C41A]",
    completed: "rounded-lg bg-[#D9F7BE] px-5 py-2 text-[14px] font-medium text-[#237804]",
    cancelled: "rounded-lg bg-[#FFF1F0] px-5 py-2 text-[14px] font-medium text-[#F5222D]",
  };

  const statusLabels: Record<OrderStatus, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    delivered: "Delivered",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const statusTooltips: Record<OrderStatus, string> = {
    pending: "Job posted, awaiting action",
    in_progress: "Work has started",
    delivered: "Work submitted",
    completed: "Client accepted delivery",
    cancelled: "Job cancelled by either party",
  };

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Jobs",
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
        cell: ({ row }) => <span className="text-[14px] text-[#4A4C56]">${row.original.price.toFixed(2)}</span>,
      },
      {
        accessorKey: "time",
        header: "Days Left",
        cell: ({ row }) => <span className="text-[14px] text-[#4A4C56]">{row.original.time} Days Left</span>,
      },
      {
        id: "action",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          return (
            <div className="flex justify-end">
              <span title={statusTooltips[s]} className={statusClasses[s]}>
                {statusLabels[s]}
              </span>
            </div>
          );
        },
      },
    ],
    [statusClasses, statusLabels, statusTooltips]
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      {/* <Toaster position="top-right"/> */}
      <div className="mx-auto containers space-y-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* LEFT */}
          <div className="w-full space-y-6 lg:w-1/3">
            <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <Image src="/images/inbox1.png" alt="Zeeshan" width={500} height={500} className="h-full w-full object-cover" />
                </div>

                <div className="text-center">
                  <Link href="/client/profile" className="text-lg font-semibold underline">Zeeshan</Link>
                  <div className="pt-3 text-sm text-gray-500 flex">
                    <p className="flex gap-2">
                      <LocationIcon /> Pakistan <FaRegUser className="text-[#333333]" /> Client
                    </p>
                  </div>
                </div>

                {/* <Link
                  href="/client/find-editor-match"
                  className="mt-6 w-fit rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white"
                >
                  Match Me with an Editor
                </Link> */}
                <Link href="/client/find-editor-match" className="w-full">
                  <button className="mt-6 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                    Match Me with an Editor Quickly
                  </button>
                </Link>

                <Link href="/platform-safety?redirect=/client" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
                  <button className="flex gap-2 text-[#FF4D4F] text-center justify-center items-center mx-auto py-2.5 px-4 text-[14px] cursor-pointer">
                    <LockIcon /> Platform Safety Rules{" "}
                    <IoArrowForwardSharp className="mt-1 text-red-500" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-[18px] font-medium text-[#333] leading-130%">Balance</h3>
              <p className="text-2xl font-medium leading-150% text-[#333] text-center py-4">$0.00</p>
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
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">Welcome, Zeeshan</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your jobs from here.
                </p>
              </div>

              <Link
                href="/post-job?redirect=/client"
                className="w-fit px-4 py-3 bg-red-500 text-white rounded-lg text-base inline-flex items-center mx-auto lg:ml-auto lg:mr-0"
              >
                + Post New Job
              </Link>

            </div>

            <div className="rounded-2xl bg-white px-6 shadow-sm">
              <DataTable<Order, any>
                columns={columns}
                data={paginated}
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                onRowClick={()=>router.push('/client/manage-job/1')}
              >
                {/* <div className="rounded-xl bg-[#FFE1E1] px-6 py-4 flex items-center justify-between">
                  <p className="text-[18px] md:text-[22px] font-medium text-[#FF4D4F]">
                    {filter}
                  </p>
                </div> */}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}