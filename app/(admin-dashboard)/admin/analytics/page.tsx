// app/dashboard/page.tsx

import StatsCards from "@/components/reusable/Card";
import RevenueChart from "@/components/reusable/Revenue";

export default function DashboardPage() {
  return (
    <main className="min-h-screen space-y-6 ">
          <div className="">
      <StatsCards />
    </div>
      <RevenueChart />
    </main>
  );
}
