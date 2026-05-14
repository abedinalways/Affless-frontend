"use client";

import { useState } from "react";
import Loading from "@/components/shared/Loading";
import { getJobStatusDefinition } from "@/lib/job-status";
import { adminJobs } from "@/public/demodata";
import DynamicTable from "@/helper/DynamicTable";
import { formatAmount, formatFullDate, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { MdMailOutline, MdStar } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineYoutube } from "react-icons/ai";

export default function JobsTable() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const columns = [
    {
      label: "Job Title",
      width: "320px",
      accessor: "service",
      formatter: (accessor: string, row: any) => (
        <div className="grid grid-cols-[96px_1fr] items-center justify-center gap-2 px-4 py-3 text-sm">
          <Image
            src={row?.thumbnail}
            alt={accessor}
            width={80}
            height={80}
            className="aspect-video w-full rounded-md object-cover"
          />
          <h2>{accessor}</h2>
        </div>
      ),
    },
    {
      label: "Posted By",
      width: "260px",
      accessor: "author",
      formatter: (accessor: any, row: any) => (
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={`/admin/usermanagement/client/${accessor.id}`}
            className="rounded-md ring-gray-400 transition-all duration-300 hover:ring-2"
          >
            <Image
              src={accessor.image}
              alt={accessor.name}
              width={100}
              height={100}
              quality={100}
              className="aspect-square h-[54px] w-[54px] rounded-md object-cover"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/usermanagement/client/${accessor.id}`}
                className="transition-all duration-300 hover:text-blue-400 hover:underline"
              >
                <h2 className="text-sm font-medium">{accessor.name}</h2>
              </Link>
              <Link
                href={`/admin/chats/${accessor.id}`}
                title="Chat with Client"
                className="rounded-full p-1 transition-colors duration-300 hover:bg-gray-200"
              >
                <MdMailOutline className="text-sm" />
              </Link>
            </div>
            <div className="flex items-center gap-1 text-[13px]">
              <p className="whitespace-nowrap">Total Jobs Posted: </p>
              <p>{formatNumber({ value: accessor.totalJobs })}</p>
            </div>
            <div className="flex items-center gap-0.5">
              <MdStar className="text-yellow-400" />
              <div className="flex items-center text-xs">
                <p>{accessor.rating}</p>
                <span>({formatNumber({ value: accessor.reviewCount })} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Assigned Editor",
      width: "260px",
      accessor: "editor",
      formatter: (accessor: any, row: any) => (
        <div className="flex items-center gap-1" onClick={(e)=> e.stopPropagation()}>
          <Link
            href={`/admin/usermanagement/${accessor.id}`}
            className="rounded-md ring-gray-400 transition-all duration-300 hover:ring-2"
          >
            <Image
              src={accessor.image}
              alt={accessor.name}
              width={100}
              height={100}
              quality={100}
              className="aspect-square h-[54px] w-[54px] rounded-md object-cover"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/usermanagement/${accessor.id}`}
                className="transition-all duration-300 hover:text-blue-400 hover:underline"
              >
              <h2 className="text-sm font-medium">{accessor.name}</h2>
              </Link>
              <Link
                href={`/admin/chats/${accessor.id}`}
                title="Chat with Editor"
                className="rounded-full p-1 transition-colors duration-300 hover:bg-gray-200"
              >
                <MdMailOutline className="text-sm" />
              </Link>
            </div>
            <div className="flex items-center gap-1 text-[13px]">
              <p className="whitespace-nowrap">Total Jobs Completed: </p>
              <p>{formatNumber({ value: accessor.totalJobs })}</p>
            </div>
            <div className="flex items-center gap-0.5">
              <MdStar className="text-yellow-400" />
              <div className="flex items-center text-xs">
                <p>{accessor.rating}</p>
                <span>({formatNumber({ value: accessor.reviewCount })} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Platform",
      accessor: "total",
      width: "100px",
      formatter: (accessor: string) => (
        <div className="px-4 py-2 text-center text-sm flex items-center gap-1">
          <AiOutlineYoutube className="text-2xl text-red-600" />
          <p>YouTube</p>
        </div>
      ),
    },
    {
      label: "Amount",
      accessor: "total",
      width: "100px",
      formatter: (accessor: string) => (
        <div className="px-4 py-2 text-center text-sm">
          ${formatAmount({ value: accessor })}
        </div>
      ),
    },
    {
      label: "Extension Count",
      accessor: "extensionCount",
      width: "100px",
      formatter: (accessor: string) => (
        <div className="px-4 py-2 text-center text-sm whitespace-nowrap">
          {formatNumber({ value: accessor })}
        </div>
      ),
    },
    {
      label: "Revision Count",
      accessor: "revisionCount",
      width: "100px",
      formatter: (accessor: string) => (
        <div className="px-4 py-2 text-center text-sm whitespace-nowrap">
          {formatNumber({ value: accessor })}
        </div>
      ),
    },
    {
      label: "Posted At",
      accessor: "postedAt",
      width: "100px",
      formatter: (accessor: Date) => (
        <div className="px-4 py-2 text-center text-sm whitespace-nowrap">
          {formatFullDate(accessor)}
        </div>
      ),
    },
    {
      accessor: "timeLeft",
      label: "Days Left",
      width: "150px",
      formatter: (accessor: any, row: any) => {
        const d = row;
        return (
          <>
            {d.status === "in_progress" ||
            d.status === "late" ||
            d.status === "in_revision" ||
            d.status === "delivered" ? (
              <div className="cursor-pointer rounded-md p-2 text-center text-sm">
                {Math.abs(accessor.days)}{" "}
                {accessor.days > 1
                  ? "days left"
                  : accessor.days < 0
                    ? d.status === "late"
                      ? "days overdue"
                      : "days left"
                    : "day left"}
              </div>
            ) : (
              <div className="text-center text-sm">Not available</div>
            )}
          </>
        );
      },
    },
    {
      label: "Deadline",
      accessor: "dueOn",
      width: "150px",
      formatter: (accessor: Date) => (
        <div className="px-4 py-2 text-center text-sm whitespace-nowrap">
          {formatFullDate(accessor)}
        </div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "200px",
      formatter: (accessor: string, row: any) => {
        const d = row;
        return (
          <div className="flex justify-center">
            <span
              title={getJobStatusDefinition(d.status).description}
              className={`inline-block w-40 rounded-md px-4 py-1 text-center text-[14px] capitalize ${getJobStatusDefinition(d.status).colorClass ?? "bg-[#F3F4F6] text-[#374151]"} `}
            >
              {d.status.split("_").join(" ")}
            </span>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="my-4 rounded-lg bg-white">
      <DynamicTable
        columns={columns}
        data={adminJobs}
        header={{
          padding: "16px",
          fontSize: "18px",
          position: "justify-center",
          text: "oklch(37.3% 0.034 259.733)",
        }}
        rowStyle={{
          hover: true,
          hoverbg: "hover:bg-gray-50",
          rowClickable: true,
          rowClick: (row) => router.push(`/admin/jobs/${row.id}`),
        }}
      />
    </div>
  );
}
