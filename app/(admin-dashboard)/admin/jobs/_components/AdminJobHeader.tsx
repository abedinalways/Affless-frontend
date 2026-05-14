"use client";

import DatePicker from "@/components/ClientDashboard/ManageJob/DatePicker";
import { useState } from "react";

const jobStatusTabs = [
  "all",
  "in_progress",
  "pending",
  "in_revision",
  "late",
  "delivered",
  "completed",
  "canceled",
];

export default function AdminJobHeader() {
  const [activeTab, setActiveTab] = useState("all");
  const [dateFilter, setDateFilter] = useState("lifetime");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Manage Jobs</h2>
      {/* TABS */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          {jobStatusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-md bg-white px-3 py-2 capitalize ${
                activeTab === tab
                  ? "font-semibold text-black shadow"
                  : "text-gray-500"
              }`}
            >
              {tab?.split("_").join(" ")}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-white p-4">
        <h2 className="text-lg font-semibold">
          <span className="capitalize">
            {activeTab?.split("_").join(" ") === "in progress" ||
            activeTab?.split("_").join(" ") === "pending" ||
            activeTab?.split("_").join(" ") === "in revision"
              ? "Jobs " + activeTab?.split("_").join(" ")
              : activeTab?.split("_").join(" ") + " Jobs"}
          </span>
        </h2>
        {dateFilter === "custom_date" && (
          <div>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => {
                setStartDate(date[0]);
                setEndDate(date[1]);
                console.log("Selected date range:", date);
              }}
            />
          </div>
        )}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="cursor-pointer rounded-lg border border-gray-300 p-2 text-sm"
        >
          <option value="today" className="cursor-pointer">
            Today
          </option>
          <option value="this_week" className="cursor-pointer">
            This week
          </option>
          <option value="this_month" className="cursor-pointer">
            This month
          </option>
          <option value="lifetime" className="cursor-pointer">
            Lifetime
          </option>
          <option value="custom_date" className="cursor-pointer">
            Custom Date
          </option>
        </select>
      </div>
    </div>
  );
}
