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

              <p className="text-lg font-semibold underline">Zeeshan</p>

              <p className="pt-3 text-sm text-gray-500 flex gap-2">
                <LocationIcon /> Pakistan <WorldIcon /> English
              </p>

              <Link href="/editor/quick-match-result" className="w-full">
                <button className="mt-6 w-full rounded-lg bg-[#ff4b4b] py-2.5 text-white text-[16px]">
                  Match Me with a Client Quickly
                </button>
              </Link>

              <Link href="#" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
                <button className="flex gap-2 text-[#FF4D4F] items-center mx-auto py-2.5 text-[14px]">
                  <LockIcon /> Platform Safety Rules{" "}
                  <IoArrowForwardSharp className="mt-1 text-red-500" />
                </button>
              </Link>
            </div>
          </div>

          {/* Level Overview */}
          <div className="bg-white p-6 border rounded-lg shadow-md">
            <h3 className="text-[18px] font-medium mb-8 text-[#333]">Level overview</h3>
            {/* same as your code */}
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
            <DataTable columns={columns} data={orders} />
          </div>
        </div>

      </div>
    </div>
  );
}
