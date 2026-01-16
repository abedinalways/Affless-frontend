"use client";

import KeyIcon from "@/components/Icons/KeyIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import LockIcon from "@/components/Icons/LockIcon";
import { FaRegUser } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useState, useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import SetAvailabilityModal, {
  AvailabilityData,
} from "./SetAvailabilityModal";

type OrderStatus = "pending" | "In progress" | "Cencel" | "Delivered";

interface Order {
  id: number;
  title: string;
  price: number;
  days: number;
  status: OrderStatus;
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
    status: "pending",
  },
  {
    id: 5,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "In progress",
  },
  {
    id: 6,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "Cencel",
  },
  {
    id: 7,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "Delivered",
  },
  {
    id: 8,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "pending",
  },
];

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "title",
    header: "Order",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-md overflow-hidden">
            <Image
              src={order.img}
              alt="order"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-[15px] font-medium text-[#333] leading-snug">
            {order.title}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <p className="text-[16px] text-[#4A4C56]">${row.original.price}</p>
    ),
  },
  {
    accessorKey: "days",
    header: "Days",
    cell: ({ row }) => (
      <p className="text-[16px] text-[#4A4C56]">{row.original.days} Days</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const statusStyles: Record<OrderStatus, string> = {
        pending: "bg-[#EEFAE9] text-[#52C41A]",
        "In progress": "bg-[#E8FFDA] text-[#52C41A]",
        Cencel: "bg-[#FFECEC] text-[#FF4D4F]",
        Delivered: "bg-[#FF4D4F] text-white",
      };

      return (
        <button
          className={`w-[130px] text-center justify-center inline-flex items-center rounded-lg px-4 py-2 text-[14px] font-medium ${statusStyles[status]}`}
        >
          {status}
        </button>
      );
    },
  },
];

export default function EditorDashboard() {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editorAvailability, setEditorAvailability] = useState<AvailabilityData>({
    isAvailable: true,
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Paginated data calculation
  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return orders.slice(start, start + PAGE_SIZE);
  }, [page]);

  const handleAvailabilitySave = (availability: AvailabilityData) => {
    setEditorAvailability(availability);
  };

  const totalActiveOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      <div className="mx-auto containers grid lg:grid-cols-[auto_1fr] gap-8">
        {/* LEFT SIDE */}
        <div className="w-full min-w-[260px] lg:max-w-[348px] space-y-6">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src="/images/inbox1.png"
                  alt="Zeeshan"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <Link href="/editor/editor-profile" className="text-lg font-semibold underline">Zeeshan</Link>
                <div className="pt-3 text-sm text-gray-500 flex">
                  <p className="flex gap-2">
                    <LocationIcon /> Pakistan <FaRegUser className="text-[#333333]"/> Editor
                  </p>
                </div>
              </div>

              <Link href="/editor/quick-match-result" className="w-full">
                <button className="mt-6 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                  Match Me with a Client Quickly
                </button>
              </Link>

              <Link href="/platform-safety" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
                <button className="flex gap-2 text-[#FF4D4F] text-center justify-center items-center mx-auto py-2.5 px-4 text-[14px] cursor-pointer">
                  <LockIcon /> Platform Safety Rules{" "}
                  <IoArrowForwardSharp className="mt-1 text-red-500" />
                </button>
              </Link>
            </div>
          </div>

          {/* Level Overview */}
          <div className="bg-white p-6 border rounded-lg shadow-md mx-auto">
            <h3 className="text-[18px] font-medium mb-8 text-[#333]">
              Level overview
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">My level</span>
                <span className="text-[#777980] text-[14px]">New seller</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">Success score</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">Rating</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">
                  Response rate
                </span>
                <span className="text-gray-500">-</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/editor/editor-profile" className="w-[178px]  py-2 rounded-lg border border-[#D9D9D9] hover:border-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-white cursor-pointer duration-300 px-4 text-center">
                View progress
              </Link>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white p-6 border rounded-lg shadow-md mx-auto">
            <h3 className="text-[18px] font-medium mb-8 text-[#333]">
              Availability
            </h3>

            <p className="text-center text-[#777980] py-8">
              While unavailable, your Gigs are hidden and you will not receive
              new orders.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setShowAvailabilityModal(true)}
                className="py-2 rounded-lg border border-[#D9D9D9] px-4 cursor-pointer hover:border-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-white duration-300"
              >
                Set your availability
              </button>
            </div>
          </div>

          {/* Payment Overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-[18px] font-medium text-[#333]">Earning</h3>
            <p className="text-2xl font-medium text-center py-8">US$0</p>
            <Link
              href="/editor/withdrow-balance"
              className="w-[178px] text-center mx-auto block border rounded-lg py-2.5 hover:border-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-white cursor-pointer duration-300"
            >
              Withdraw Balance
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full">
          <h1 className="text-2xl font-semibold">Welcome, Jane Cooper</h1>
          <p className="text-sm text-[#333] pt-2.5 pb-8">
            Find important messages, tips, and links to helpful resources here:
          </p>

          {/* Summary */}
          <div className="my-5 rounded-xl bg-[#ffe1e1] px-6 py-6 text-[18px] font-medium text-[#FF4D4F]">
            Active orders {totalActiveOrders} (${totalAmount})
          </div>

          {/* Orders Table */}
          <div className="rounded-2xl bg-white p-6 shadow-sm w-full grid">
            <DataTable
              columns={columns}
              data={pageData}
              page={page}
              pageSize={PAGE_SIZE}
              total={orders.length}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      {/* Set Availability Modal */}
      <SetAvailabilityModal
        open={showAvailabilityModal}
        onClose={() => setShowAvailabilityModal(false)}
        onSave={handleAvailabilitySave}
      />
    </div>
  );
}
