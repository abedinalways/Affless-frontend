// app/dashboard/page.tsx

import RevenueChart from "@/components/reusable/Revenue";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <RevenueChart />
    </main>
  );
}
