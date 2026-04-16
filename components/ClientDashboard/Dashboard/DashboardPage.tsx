"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { DataTable } from "@/components/reusable/DataTable";

type OrderStatus = "pending" | "in_progress" | "delivered" | "completed" | "canceled";
type FilterType = "Biding jobs" | "Offer jobs";
import LockIcon from "@/components/Icons/LockIcon";
import { IoArrowForwardSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ALL_JOBS, JobRow } from "../ManageJob/manage-job-demo-data";
import { getJobStatusDefinition } from "@/lib/job-status";
import { PlusIcon } from "@/public/svgIcons/svgIcons";

interface Order {
  id: number;
  title: string;
  price: number;
  time: string;
  status: OrderStatus;
  img: string;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const [filter, setFilter] = useState<FilterType>("Biding jobs");


  const total = ALL_JOBS.length;
  const paginated = ALL_JOBS.slice((page - 1) * pageSize, page * pageSize);

  const columns: ColumnDef<JobRow>[] = [
      {
        accessorKey: "service",
        header: "Jobs",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div
              className="flex items-center gap-4 cursor-pointer  p-2 rounded-md"
            >
              <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200">
                <img
                  src={data.thumbnail}
                  alt={data.service}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-800 capitalize">
                {data.service}
              </span>
            </div>
          );
        },
      },
  
      {
        accessorKey: "total",
        header: "Amount",
        cell: ({ row }) => {
          const d = row.original;
          return (
            <div
              className="cursor-pointer p-2 rounded-md"
            >
              ${d.total}
            </div>
          );
        },
      },
  
      {
        accessorKey: "dueOn",
        header: "Days Left",
        cell: ({ row }) => {
          const d = row.original;
          const time = Math.ceil((d.dueOn.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return (
            <>
              {(d.status === "in_progress" || d.status === "late" || d.status === "in_revision" || d.status === "delivered") && (
                <div
                  className="cursor-pointer  p-2 rounded-md text-center"
                >
                  {Math.abs(d.timeLeft.days)} {d.timeLeft.days > 1 ? "days left" : d.timeLeft.days < 0 ? d.status === "late" ? "days overdue" : "days left" : "day left"}
                </div>
              )}
            </>
          );
        },
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

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-12 pb-9 overflow-hidden">
      <div className="mx-auto containers space-y-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* LEFT */}
          <div className="w-full space-y-6 lg:max-w-[348px]">
            <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <Link href="/client/profile">
                    <Image src="/images/jone3.png" alt="Zeeshan" width={500} height={500} className="h-full w-full object-cover" />
                  </Link>
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
                <Link href="/client/find-editor-match?redirect=dashboardclient" className="w-full">
                  <button className="mt-6 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                    Match Me with an Editor Quickly
                  </button>
                </Link>

                <Link href="/platform-safety?redirect=dashboardclient" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
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
                <Link href="/client/add-money?redirect=dashboardclient">
                  <button type="button" className="rounded-lg border border-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-[#ff4b4b] cursor-pointer">
                    Add Funds
                  </button>
                </Link>
              </div>
            </div>
          </div>
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
                href="/client/post-job?redirect=dashboardclient"
                className="w-fit px-4 py-3 bg-red-500 text-white rounded-lg text-base inline-flex items-center mx-auto lg:ml-auto lg:mr-0 gap-1"
              >
                <PlusIcon className="w-5"/> Post a New Job
              </Link>
            </div>

            <div className="rounded-2xl bg-white px-6 shadow-sm">
              <DataTable<JobRow, any>
                columns={columns}
                data={ALL_JOBS}
                page={1}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                onRowClick={(data)=>router.push(`/client/manage-job/${data?.id}?redirect=dashboardclient_managejobs`)}
              >
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}