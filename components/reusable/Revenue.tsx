"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

// SSR issue এড়াতে dynamic import
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RevenueChart = () => {
  // demo data (screenshot style)
  const data = [
    { month: "Jan", earned: 980, orders: 14 },
    { month: "Feb", earned: 1250, orders: 18 },
    { month: "Mar", earned: 930, orders: 12 },
    { month: "Apr", earned: 820, orders: 10 },
    { month: "May", earned: 1498, orders: 24 }, // highlighted example
    { month: "Jun", earned: 780, orders: 9 },
    { month: "Jul", earned: 1010, orders: 16 },
    { month: "Aug", earned: 950, orders: 13 },
    { month: "Sep", earned: 1180, orders: 19 },
    { month: "Oct", earned: 870, orders: 11 },
    { month: "Nov", earned: 1320, orders: 20 },
    { month: "Dec", earned: 910, orders: 12 },
  ];

  const series = useMemo(
    () => [
      {
        name: "Earnings",
        data: data.map((item) => item.earned),
      },
    ],
    [data]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 320,
        toolbar: { show: false },
        fontFamily: "inherit",
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#ff6b6b"],
      xaxis: {
        categories: data.map((item) => item.month),
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#9ca3af",
            fontSize: "11px",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => `$${value}`,
          style: {
            colors: "#9ca3af",
            fontSize: "11px",
          },
        },
      },
      tooltip: {
        custom: ({ dataPointIndex }) => {
          const item = data[dataPointIndex];

          return `
            <div style="
              background: white;
              border-radius: 8px;
              box-shadow: 0 10px 25px rgba(15,23,42,0.12);
              padding: 8px 10px;
              border: 1px solid #e5e7eb;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 12px;
            ">
              <div style="margin-bottom:4px;">
                <span style="color:#6b7280;">Earned:</span>
                <span style="font-weight:600; margin-left:6px;">$${item.earned.toFixed(2)}</span>
              </div>
              <div>
                <span style="color:#6b7280;">Jobs Completed:</span>
                <span style="font-weight:600; margin-left:6px;">${item.orders}</span>
              </div>
            </div>
          `;
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        width: 0,
      },
    }),
    [data]
  );

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Top bar: title + filters */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">
          Revenue Analytic
        </h2>

        <div className="flex items-center gap-2">
          
        </div>
      </div>

      {/* Chart */}
      <div className="-ml-2 -mr-4 sm:ml-0 sm:mr-0">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={320}
        />
      </div>
    </div>
  );
};

export default RevenueChart;
