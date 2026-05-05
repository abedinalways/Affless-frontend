"use client";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useState, useMemo, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/DataTable";
import SetAvailabilityModal, {
  AvailabilityData,
} from "./SetAvailabilityModal";
import { useRouter } from "next/navigation";
import { getJobStatusDefinition } from "@/lib/job-status";
import EditorDashboardSidebar from "@/app/(website)/(dashboard)/(editor-dashboard)/editor/_components/EditorDashboardSidebar";
import { exposureTiers, orders } from "@/public/demodata";
import { ExposureTier, Order } from "@/app/type";
import { usePathname, useSearchParams } from "next/navigation";
import { PlusIcon } from "@/public/svgIcons/svgIcons";


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
          <p className="text-[15px] font-medium text-[#333] leading-snug capitalize">
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
    cell: ({ row }) => {
      const d = row.original;
      return (
        <div>
          {(row.original.status === "in_progress" || row.original.status === "late" || row.original.status === "in_revision" || row.original.status === "delivered") ? (
            <div
              className="cursor-pointer  p-2 rounded-md text-center"
            >
              {Math.abs(d.days || 0)} {d.days || 0 > 1 ? "days left" : d.days || 0 < 0 ? d.status === "late" ? "days overdue" : "days left" : "day left"}
            </div>
          ) : (
            <div>
              Not available
            </div>
          )}

        </div>
      )
    }
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

const getExposureTierForHours = (hours: number, minutes: number) => {
  const cappedHours = Math.min(Math.max(hours, 0), 48);
  const totalHours = (cappedHours * 60) + minutes;
  return (
    exposureTiers.find(
      (tier) => totalHours >= tier.minHours && totalHours <= tier.maxHours
    ) ?? exposureTiers[exposureTiers.length - 1]
  );
};

export default function EditorDashboard() {
  const router = useRouter();
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editorAvailability, setEditorAvailability] = useState<AvailabilityData>({
    isAvailable: true,
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const averageResponseHours = 1;
  const averageResponseMinutes = 12;
  const exposureTier = getExposureTierForHours(averageResponseHours, averageResponseMinutes);

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
    router.push(`/editor/myproposal/${order.id}?redirect=${redirectUrl ? `${redirectUrl}_` : ""}dashboardeditor_editorjobs`);
  }

  const totalActiveOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      <div className="mx-auto containers grid lg:grid-cols-[auto_1fr] gap-8">
        {/* LEFT SIDE */}
        <EditorDashboardSidebar
          averageResponseHours={averageResponseHours}
          averageResponseMinutes={averageResponseMinutes}
          exposure={exposureTier.exposure}
          quickMatch={exposureTier.quickMatch}
          exposureTiers={exposureTiers}
        />

        {/* RIGHT SIDE */}
        <div className="w-full">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Welcome, Jane Cooper</h1>
              <p className="text-sm text-[#333]">
                Manage your jobs from here.
              </p>
            </div>
            <Link
              href="/editor/browse-job?redirect=dashboardeditor"
              type="button"
              className="cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white flex items-center gap-1"
            >
              <PlusIcon className="w-5" /> Browse New Jobs
            </Link>
          </div>

          {/* Summary */}
          <div className="my-5 rounded-xl bg-[#ffe1e1] px-6 py-6 text-[18px] font-medium text-[#FF4D4F] flex items-center justify-between">
            <span>Active Jobs: 5 (${totalAmount})</span>

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
