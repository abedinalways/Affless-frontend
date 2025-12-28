"use client";

import KeyIcon from "@/components/Icons/KeyIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import LockIcon from "@/components/Icons/LockIcon";
import WorldIcon from "@/components/Icons/WorldIcon";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardSharp } from "react-icons/io5";

// ✅ IMPORT YOUR REUSABLE DATATABLE
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";


type OrderStatus = "In progress" | "Cencel" | "Delivered";

interface Order {
  id: number;
  title: string;
  price: number;
  days: number;
  status: OrderStatus;
  img: string;
}

interface InboxItem {
  id: number;
  name: string;
  message: string;
  time: string;
  img: string;
}


const orders: Order[] = [
  {
    id: 1,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "In progress",
  },
  {
    id: 2,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "Cencel",
  },
  {
    id: 3,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "Delivered",
  },
  {
    id: 4,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "Delivered",
  },
];

const inboxItems: InboxItem[] = [
  { id: 1, name: "Farhan", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox1.png" },
  { id: 2, name: "Arlene", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox2.png" },
  { id: 3, name: "Ralph", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox3.png" },
  { id: 4, name: "Jenny", message: "Lorem Ipsum is text", time: "1 month", img: "/images/inbox4.png" },
];

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "title",
    header: "Order",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-md overflow-hidden">
            <Image
              src={order.img}
              alt="order"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-[16px] text-[#333]">{order.title}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <p className="text-[18px] text-[#4A4C56]">${row.original.price}</p>
    ),
  },

  {
    accessorKey: "days",
    header: "Days",
    cell: ({ row }) => (
      <p className="text-[18px] text-[#4A4C56]">{row.original.days} Days</p>
    ),
  },

{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.original.status;

    const statusConfig: Record<OrderStatus, { text: string; classes: string }> = {
      "In progress": {
        text: "In Progress",
        classes: "bg-[#E8FFDA] text-[#52C41A]",  // Light green
      },
      Cencel: {
        text: "Cancel",
        classes: "bg-[#FFECEC] text-[#FF4D4F]", // Light red
      },
      Delivered: {
        text: "Delivered",
        classes: "bg-[#FF4D4F] text-white", // Solid red
      },
    };

    const current = statusConfig[status];

    return (
      <button
        className={`rounded-lg px-5 py-2 text-[16px] font-medium ${current.classes}`}
      >
        {current.text}
      </button>
    );
  },
},



];


export default function EditorDashboard() {
  const totalActiveOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      <div className="mx-auto containers flex flex-col gap-8 lg:flex-row">

        {/* LEFT SIDE — SAME AS YOUR CODE */}
        {/* -------------------------------------- */}
        <div className="w-full space-y-6 lg:w-2/5">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src="/images/inbox1.png"
                  alt="Zeeshan"
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold underline">Zeeshan</p>
                <div className="pt-3 text-sm text-gray-500 flex">
                  <p className="flex gap-2"><LocationIcon /> Pakistan  <WorldIcon /> English</p>
                </div>
              </div>
              <Link href="/editor/quick-match-result" className="w-full">
                <button className="mt-6 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                  Match Me with a Client Quickly
                </button>
              </Link>
              <Link href="#" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
                <button className="flex gap-2 text-[#FF4D4F]  text-center justify-center items-center mx-auto py-2.5 px-4 text-[14px] ">
                  <LockIcon /> Platform Safety Rules  <IoArrowForwardSharp className="mt-1 text-red-500" /></button></Link>
            </div>


          </div>
          <div className="bg-[#FFFFFF] p-6 border  rounded-lg shadow-md mx-auto">
            <h3 className="text-[18px] font-medium mb-8 text-[#333]">Level overview</h3>
            <div className="">
              <div className="flex justify-between mb-2.5">
                <span className="font-normal text-[14px] leading-150% text-[#777980]">My level</span>
                <span className="text-[#777980] text-[14px]">New seller</span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-normal text-[14px] leading-150% text-[#777980]">Success score</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between mb-2.5">
                <span className="font-normal text-[14px] leading-150% text-[#777980]">Rating</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between mb-5">
                <span className="font-normal text-[14px] leading-150% text-[#777980]">Response rate</span>
                <span className="text-gray-500">-</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button className="w-[178px]  py-2 rounded-lg border border-[#D9D9D9] px-4">
                View progress
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-6 border  rounded-lg shadow-md mx-auto">
            <h3 className="text-[18px] font-medium mb-8 text-[#333]">Availability</h3>
            <h3 className="text-center font-normal leading-150% text-[#777980] py-8">While unavailable, your Gigs are hidden and you will not receive new orders.</h3>
            <div className="">
              <div className="flex justify-center items-center ">
                <button className="  py-2 rounded-lg border border-[#D9D9D9] px-4">
                  Set your avallablllty
                </button>
              </div>
            </div>
          </div>

          {/* Payment Overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-[18px] font-medium text-[#333]">Earned in September</h3>
            <p className="text-2xl font-medium text-center py-8">US$0</p>
            <button className="w-[178px] mx-auto block border rounded-lg py-2.5">
              Payment
            </button>
          </div>

          {/* Inbox */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-[18px] font-semibold text-[#333]">Inbox</h3>
    <button className="text-[14px] text-[#FF4D4F] font-medium">View All</button>
  </div>

  {/* Inbox List */}
  <div className="space-y-4">
    {inboxItems.map((item, index) => (
      <div
        key={item.id}
        className={`flex items-start justify-between pb-4 ${
          index !== inboxItems.length - 1 ? "border-b border-[#EDEDED]" : ""
        }`}
      >
        {/* Left: Image + Name + Message */}
        <div className="flex items-start gap-3">
          <Image
            src={item.img}
            alt={item.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

          <div className="space-y-0.5">
            <p className="text-[16px] font-semibold text-[#333]">{item.name}</p>
            <p className="text-[14px] text-[#777980]">{item.message}</p>
          </div>
        </div>

        {/* Right: Time */}
        <p className="text-[12px] text-gray-400 whitespace-nowrap">{item.time}</p>
      </div>
    ))}
  </div>
</div>

        </div>


        {/* RIGHT SIDE */}
        {/* -------------------------------------- */}
        <div className="w-full lg:w-6/5">
          <h1 className="text-2xl font-semibold">Welcome, Zeeshan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Find important messages, tips, and links to helpful resources here:
          </p>

          {/* Summary */}
          <div className="my-5 rounded-xl bg-[#ffe1e1] px-6 py-6 text-[18px] font-medium text-[#FF4D4F]">
            Active orders {totalActiveOrders} (${totalAmount})
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl px-2 py-3 hover:bg-gray-50"
                >
                  {/* Left: image + title */}
                  <div className="flex flex- items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-md">
                      <Image
                        src={order.img} // add some thumbnail
                        alt="Order"
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-normal text-[#333] text-[16px] leading-150% ">
                      {order.title}
                    </p>
                  </div>

                  {/* Middle: price + days */}
                  <div className="flex gap-[190px] md:gap-7 justify-between">
                    <div className="flex items-center gap-8 text-[18px] font-normal text-[#4A4C56]">
                      <p>${order.price}</p>
                      <p className="hidden md:block">{order.days} Days</p>
                    </div>

                    {/* Right: status button */}
                    <div>
                      {order?.status === "In progress" ? (
                        <button className="rounded-lg bg-[#EEFAE9] px-5 py-2 text-[16px] font-medium text-[#52C41A]">
                          In Progress
                        </button>
                      ) : (
                        <button className="rounded-lg bg-[#FF4D4F] px-5 py-2 text-[16px] font-medium text-white">
                          Accept
                        </button>
                      )}
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
