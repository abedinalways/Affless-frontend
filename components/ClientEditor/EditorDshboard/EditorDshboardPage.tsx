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
import { useRouter } from "next/navigation";
import { getJobStatusDefinition } from "@/lib/job-status";

type OrderStatus = "pending" | "in_progress" | "cancelled" | "delivered";

interface Order {
  id: number;
  title: string;
  price: number;
  days: number;
  status: OrderStatus;
  img: string;
}

type ExposureTier = {
  label: string;
  exposure: string;
  quickMatch: string;
  zone: "benefit" | "neutral" | "penalty";
  minHours: number;
  maxHours: number;
};

const orders: Order[] = [
  {
    id: 1,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "in_progress",
  },
  {
    id: 2,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "cancelled",
  },
  {
    id: 3,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "delivered",
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
    status: "in_progress",
  },
  {
    id: 6,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "cancelled",
  },
  {
    id: 7,
    img: "/images/product.png",
    title: "I will craft quality backlinks for your website's SEO.",
    price: 55,
    days: 5,
    status: "delivered",
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
    header: "Jobs",
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
    header: "Amount",
    cell: ({ row }) => (
      <p className="text-[16px] text-[#4A4C56] text-center">${row.original.price}</p>
    ),
  },
  {
    accessorKey: "days",
    header: "Days Left",
    cell: ({ row }) => (
      <p className="text-[16px] text-[#4A4C56] text-center">{row.original.days} Days</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const d = row.original;
      const statusDefinition = getJobStatusDefinition(d.status);
      return (
        <div
          className="cursor-pointer  p-2 rounded-md grid items-center justify-center"
        >
          <span
            title={statusDefinition.description}
            className={`px-3 text-[16px] w-full py-1.5 rounded-md ${statusDefinition.colorClass}`}
          >
            {statusDefinition.label}
          </span>
        </div>
      );
    },
  },
];

const exposureTiers: ExposureTier[] = [
  {
    label: "≤ 1 hour",
    exposure: "10.3×",
    quickMatch: "+500%",
    zone: "benefit",
    minHours: 0,
    maxHours: 1,
  },
  {
    label: "1–2 hours",
    exposure: "6.5×",
    quickMatch: "+300%",
    zone: "benefit",
    minHours: 1,
    maxHours: 2,
  },
  {
    label: "2–4 hours",
    exposure: "4.0×",
    quickMatch: "+200%",
    zone: "benefit",
    minHours: 2,
    maxHours: 4,
  },
  {
    label: "4–8 hours",
    exposure: "2.5×",
    quickMatch: "+120%",
    zone: "benefit",
    minHours: 4,
    maxHours: 8,
  },
  {
    label: "8–12 hours",
    exposure: "1.8×",
    quickMatch: "+75%",
    zone: "benefit",
    minHours: 8,
    maxHours: 12,
  },
  {
    label: "12–18 hours",
    exposure: "1.3×",
    quickMatch: "+35%",
    zone: "benefit",
    minHours: 12,
    maxHours: 18,
  },
  {
    label: "18–23 hours",
    exposure: "1.05×",
    quickMatch: "+10%",
    zone: "benefit",
    minHours: 18,
    maxHours: 23,
  },
  {
    label: "24 hours",
    exposure: "0.99×",
    quickMatch: "Neutral",
    zone: "neutral",
    minHours: 24,
    maxHours: 24,
  },
  {
    label: "25–30 hours",
    exposure: "0.85×",
    quickMatch: "−10%",
    zone: "penalty",
    minHours: 25,
    maxHours: 30,
  },
  {
    label: "30–36 hours",
    exposure: "0.70×",
    quickMatch: "−25%",
    zone: "penalty",
    minHours: 30,
    maxHours: 36,
  },
  {
    label: "36–42 hours",
    exposure: "0.55×",
    quickMatch: "−40%",
    zone: "penalty",
    minHours: 36,
    maxHours: 42,
  },
  {
    label: "42–48 hours",
    exposure: "0.40×",
    quickMatch: "−60%",
    zone: "penalty",
    minHours: 42,
    maxHours: 48,
  },
];

const getExposureTierForHours = (hours: number) => {
  const cappedHours = Math.min(Math.max(hours, 0), 48);
  return (
    exposureTiers.find(
      (tier) => cappedHours >= tier.minHours && cappedHours <= tier.maxHours
    ) ?? exposureTiers[exposureTiers.length - 1]
  );
};

export default function EditorDashboard() {
  const router = useRouter();
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editorAvailability, setEditorAvailability] = useState<AvailabilityData>({
    isAvailable: true,
  });

  const averageResponseHours = 1;
  const exposureTier = getExposureTierForHours(averageResponseHours);

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

  const handleRowClick = (order: Order) => {
    console.log("Row clicked:", order);
    router.push(`/editor/myproposal/${order.id}`);
  }

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
                <Link href="/editor/editor-profile">
                  <Image
                    src="/images/photographer.jpg"
                    alt="Zeeshan"
                    width={1000}
                    height={1000}
                    className="h-20 w-20 object-cover"
                  />
                </Link>
              </div>
              <div className="text-center">
                <Link href="/editor/editor-profile" className="text-lg font-semibold underline">Jane Cooper</Link>
                <div className="pt-3 text-sm text-gray-500 flex">
                  <p className="flex gap-2">
                    <LocationIcon /> Pakistan <FaRegUser className="text-[#333333]" /> Editor
                  </p>
                </div>
              </div>

              <Link href="/editor/quick-match-result" className="w-full">
                <button className="mt-6 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                  Match Me with a Client Quickly
                </button>
              </Link>

              <Link href="/platform-safety?redirect=/editor" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
                <button className="flex gap-2 text-[#FF4D4F] text-center justify-center items-center mx-auto py-2.5 px-4 text-[14px] cursor-pointer">
                  <LockIcon /> Platform Safety Rules{" "}
                  <IoArrowForwardSharp className="mt-1 text-red-500" />
                </button>
              </Link>
            </div>
          </div>

          {/* Level Overview */}
          <div className="bg-white p-6 border rounded-lg shadow-md mx-auto space-y-5">
            <h3 className="text-[18px] font-medium text-[#333]">
              Your Performance Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">Average Response Time</span>
                <span className="text-[#777980] text-[14px]">1h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">Rating</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">Jobs Completed</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777980] text-[14px]">
                  Clients Worked With
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

          {/* Response Speed & Visibility */}
          <div className="bg-white p-6 border rounded-lg shadow-md mx-auto space-y-5">
            <div>
              <h3 className="text-[18px] font-medium text-[#333]">
                Response Speed & Visibility
              </h3>
              <p className="text-[14px] text-[#777980] mt-1">
                Responding faster boosts your visibility
              </p>
            </div>

            <div className="rounded-lg border bg-[#f9f9f9] p-4 text-[14px] text-[#4A4C56]">
              This system rewards fast replies with higher exposure in search
              results and stronger priority in Quick Match. Slower replies
              reduce both.
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span className="text-[14px] text-[#777980]">Your avg. response</span>
                <span className="text-[14px] font-medium text-[#333]">
                  {averageResponseHours}h
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border px-4 py-3">
                  <p className="text-[12px] text-[#777980]">Search Exposure</p>
                  <p className="text-[16px] font-semibold text-[#333]">
                    {exposureTier.exposure}
                  </p>
                </div>
                <div className="rounded-lg border px-4 py-3">
                  <p className="text-[12px] text-[#777980]">Quick Match Priority</p>
                  <p className="text-[16px] font-semibold text-[#333]">
                    {exposureTier.quickMatch}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#f3f4f6] px-3 py-2 text-[12px] font-medium text-[#4A4C56]">
                <span>Avg Response Time</span>
                <span>Search Exposure</span>
                <span>Quick Match Priority</span>
              </div>
              <div className="divide-y">
                {exposureTiers.map((tier) => (
                  <div
                    key={tier.label}
                    className={`grid grid-cols-[1.2fr_1fr_1fr] px-3 py-2 text-[13px] ${
                      tier.zone === "benefit"
                        ? "bg-[#F3FBF1]"
                        : tier.zone === "neutral"
                          ? "bg-[#FFF9E6]"
                          : "bg-[#FFF0F0]"
                    }`}
                  >
                    <span className="text-[#333]">{tier.label}</span>
                    <span className="text-[#333]">{tier.exposure}</span>
                    <span className="text-[#333]">{tier.quickMatch}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[12px] text-[#777980]">
              Hard cap: slower than 48 hours will not reduce exposure further.
            </p>
          </div>

          {/* Payment Overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-[18px] font-medium text-[#333]">Earnings</h3>
            <p className="text-2xl font-medium text-center py-8">$0.00</p>
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
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold">Welcome, Jane Cooper</h1>
              <p className="text-sm text-[#333]">
                Manage your jobs from here.
              </p>
            </div>
            <Link
              href="/browse-job?redirect=/editor"
              type="button"
              className="cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white"
            >
              + Find New Job
            </Link>
          </div>

          {/* Summary */}
          <div className="my-5 rounded-xl bg-[#ffe1e1] px-6 py-6 text-[18px] font-medium text-[#FF4D4F] flex items-center justify-between">
            <span>Active Jobs: {totalActiveOrders} (${totalAmount})</span>

          </div>

          {/* Orders Table */}
          <div className="rounded-2xl bg-white p-6 shadow-sm w-full grid">
            <DataTable
              columns={columns}
              data={pageData}
              page={page}
              pageSize={PAGE_SIZE}
              total={pageData.length}
              onPageChange={setPage}
              onRowClick={handleRowClick}
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
