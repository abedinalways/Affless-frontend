"use client";

import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import Pagination from "@/components/reusable/pagination";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type OrderStatus = "pending" | "accept";

interface Order {
  id: number;
  title: string;
  price: number;
  days: number;
  status: OrderStatus;
  img: string;
  bids: string;
}

interface InboxItem {
  id: number;
  name: string;
  message: string;
  time: string;
  img: string;
}

const ordersData: Order[] = [
  { id: 1, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 2, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 3, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 4, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 5, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 6, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 7, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
  { id: 8, img: "/images/product.png", title: "I will craft quality backlinks for your website's SEO.", price: 55, bids: "Bids 5", days: 5, status: "pending" },
];

const inboxItems: InboxItem[] = [
  { id: 1, name: "Farhan", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox1.png" },
  { id: 2, name: "Arlene", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox2.png" },
  { id: 3, name: "Ralph", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox3.png" },
  { id: 4, name: "Jenny", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox4.png" },
];

export default function ClientDashboard() {
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const totalActiveOrders = ordersData.length;
  const totalAmount = ordersData.reduce((sum, o) => sum + o.price, 0);

  const paginatedOrders = ordersData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      <div className="mx-auto containers flex flex-col gap-8 lg:flex-row">
        {/* LEFT COLUMN */}
        <div className="w-full space-y-6 lg:w-1/3 ">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-full">
                <Image src="/images/inbox1.png" alt="Zeeshan" width={50} height={50} className="h-full w-full object-cover" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold underline">Zeeshan</p>
                <div className="pt-3 text-sm text-gray-500 flex">
                  <p className="flex gap-2"><LocationIcon /> Pakistan <WorldIcon /> English</p>
                </div>
              </div>
              <Link href="/client/find-editor-match">
                <button className="mt-6 w-full rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                  Match Me with an Editor
                </button>
              </Link>
            </div>
          </div>

          {/* Payment Overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-[18px] font-medium text-[#333] leading-130%">Payment Overview</h3>
            <p className="text-2xl font-medium leading-150% text-[#333] text-center py-4">US$0</p>
            <div className="flex justify-center">
              <button className="rounded-lg border border-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-[#ff4b4b]">
                View Details
              </button>
            </div>
          </div>

          {/* Inbox */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[18px] text-[#333]">Inbox</h3>
              <button className="text-[14px] font-normal text-[#FF4D4F]">View All</button>
            </div>

            <div className="space-y-3 pt-4">
              {inboxItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl px-1 py-2 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
                      <Image src={item.img} alt={item.name} width={32} height={32} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-[18px]">{item.name}</p>
                      <p className="text-[14px] text-[#777980]">{item.message}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-2/3">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold">Welcome, Zeeshan</h1>
            <p className="mt-1 text-sm text-gray-500">
              Find important messages, tips, and links to helpful resources here:
            </p>
          </div>

          {/* Active Orders Summary */}
          <div className="mb-5 rounded-xl bg-[#ffe1e1] px-6 py-6 text-[18px] md:text-[24px] font-medium text-[#FF4D4F]">
            Active orders {totalActiveOrders} (${totalAmount})
          </div>

          {/* Orders List */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {paginatedOrders.map((order) => (
                <div key={order.id} className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl px-2 py-3 hover:bg-gray-50">

                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-md">
                      <Image src={order.img} alt="Order" width={64} height={64} className="h-full w-full object-cover" />
                    </div>
                    <p className="text-sm font-normal text-[#333] text-[16px] leading-150%">
                      {order.title}
                    </p>
                  </div>

                  {/* Middle & Right */}
                  <div className="flex md:gap-4 justify-between">
                    <div className="flex items-center gap-4 text-[16px] font-normal text-[#4A4C56]">
                      <p>${order.price}</p>
                      <p>{order.bids}</p>
                      <p className="hidden md:block">{order.days} Days</p>
                    </div>

                    <div>
                      {order.status === "pending" ? (
                        <button className="rounded-lg bg-[#EEFAE9] px-5 py-2 text-[16px] font-medium text-[#52C41A]">Pending</button>
                      ) : (
                        <button className="rounded-lg bg-[#FF4D4F] px-5 py-2 text-[16px] font-medium text-white">Accept</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={page}
              pageSize={pageSize}
              total={ordersData.length}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
