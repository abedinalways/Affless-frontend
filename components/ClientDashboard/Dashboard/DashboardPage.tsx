"use client";

import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { LocateIcon, LocationEdit } from "lucide-react";
import Image from "next/image";

type OrderStatus = "pending" | "accept";

interface Order {
  id: number;
  title: string;
  price: number;
  days: number;
  status: OrderStatus;
  img:string;
}

interface InboxItem {
  id: number;
  name: string;
  message: string;
  time: string;
  img:string;
}

const orders: Order[] = [
  {
    id: 1,
    img:"/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "pending",
  },
  {
    id: 2,
     img:"/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "accept",
  },
  {
    id: 3,
     img:"/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "accept",
  },
  {
    id: 4,
     img:"/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "accept",
  },
  
];

const inboxItems: InboxItem[] = [
  { id: 1, name: "Farhan", message: "Lorem Ipsum is text", time: "1 month",img:"/images/inbox1.png" },
  { id: 2, name: "Arlene", message: "Lorem Ipsum is text", time: "1 month",img:"/images/inbox2.png" },
  { id: 3, name: "Ralph", message: "Lorem Ipsum is text", time: "1 month",img:"/images/inbox3.png" },
  { id: 4, name: "Jenny", message: "Lorem Ipsum is text", time: "1 month",img:"/images/inbox4.png" },
];

export default function ClientDashboard() {
  const totalActiveOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.price, 0);


  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9">
      <div className="mx-auto containers flex flex-col gap-8 lg:flex-row">
        {/* LEFT COLUMN */}
        <div className="w-full space-y-6 lg:w-1/3 ">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src="/images/inbox1.png" // change to your avatar
                  alt="Zeeshan"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold underline">Zeeshan</p>
                <div className="mt-3 text-sm text-gray-500 flex">
                  <p className="flex gap-2"><LocationIcon/> Pakistan  <WorldIcon/> English</p>
                </div>
              </div>
              <button className="mt-4 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                Match Me with an Editor
              </button>
            </div>
          </div>

          {/* Payment Overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className=" text-[18px] font-medium text-[#333] leading-130%">
              Payment Overview
            </h3>
            <p className="text-2xl font-medium leading-150%  text-[#333] text-center py-4">US$0</p>
            <div className="flex justify-center">
                <button className=" rounded-lg border border-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium  text-[#ff4b4b] cursor-pointer">
              View Details
            </button>
            </div>
          </div>

          {/* Inbox */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className=" flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Inbox</h3>
              <button className="text-xs font-medium text-[#ff4b4b]">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {inboxItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl px-1 py-2 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src={item.img} // or different avatars
                        alt={item.name}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.message}</p>
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
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-2xl font-semibold">Welcome, Zeeshan</h1>
            <p className="mt-1 text-sm text-gray-500">
              Find important messages, tips, and links to helpful resources here:
            </p>
          </div>

          {/* Active Orders Summary */}
          <div className="mb-5 rounded-xl bg-[#ffe1e1] px-6 py-6 text-sm font-medium text-[#e34242]">
            Active orders {totalActiveOrders} (${totalAmount})
          </div>

          {/* Orders List */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-4 rounded-xl px-2 py-3 hover:bg-gray-50"
                >
                  {/* Left: image + title */}
                  <div className="flex flex-1 items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-md">
                      <Image
                        src={order.img} // add some thumbnail
                        alt="Order"
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {order.title}
                    </p>
                  </div>

                  {/* Middle: price + days */}
                  <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
                    <span>${order.price}</span>
                    <span>{order.days} Days</span>
                  </div>

                  {/* Right: status button */}
                  {order.status === "pending" ? (
                    <button className="rounded-full bg-[#e5f8dd] px-5 py-2 text-xs font-semibold text-[#61a546]">
                      Pending
                    </button>
                  ) : (
                    <button className="rounded-full bg-[#ff4b4b] px-5 py-2 text-xs font-semibold text-white">
                      Accept
                    </button>
                  )}

               
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
