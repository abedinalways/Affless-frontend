"use client";

import EarningTab from "@/components/AdminDashboard/UserManagement/EarningTab";
import UserProfile from "@/components/AdminDashboard/UserManagement/UserDetailsTab";
import UserDetails from "@/components/AdminDashboard/UserManagement/UserDetailsTab";
import JobPage from "@/components/AdminDashboard/UserManagement/UserDetailsTab";
import Image from "next/image";
import { useState } from "react";

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const [activeTab, setActiveTab] = useState<"details" | "job" | "earning">("details");

  return (
    <div className="p-6">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500">Job completed</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">$500.00</h2>
          <p className="text-gray-500">Earnings</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center">
          <h2 className="text-3xl font-bold">4.7</h2>
          <p className="text-gray-500">Average rating</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mt-6 border-b pb-2">

        <button
          onClick={() => setActiveTab("details")}
          className={`px-6 py-2 rounded-lg ${
            activeTab === "details" ? "bg-red-500 text-white" : "text-gray-600"
          }`}
        >
          Details
        </button>

        <button
          onClick={() => setActiveTab("job")}
          className={`px-6 py-2 rounded-lg ${
            activeTab === "job" ? "bg-red-500 text-white" : "text-gray-600"
          }`}
        >
          Job
        </button>

        <button
          onClick={() => setActiveTab("earning")}
          className={`px-6 py-2 rounded-lg ${
            activeTab === "earning" ? "bg-red-500 text-white" : "text-gray-600"
          }`}
        >
          Earning
        </button>

      </div>

      {/* ====================== DETAILS SECTION ====================== */}
      {activeTab === "details" && (
        <>
          {/* ABOUT */}
          <div className="bg-white mt-6 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-gray-600 leading-7">
              Looking for authentic, high-quality guitar tracks to enhance your music? I’ll record
              professional guitar parts tailored to your song’s needs...
            </p>
          </div>

          {/* PORTFOLIO */}
          <div className="bg-white mt-6 p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">My Portfolio</h3>

            <div className="flex gap-6">
              <Image src="/images/portfolio.png" width={200} height={200} alt="portfolio" className="rounded-lg" />

              <div>
                <h2 className="font-bold text-lg">Antec Biogas – Empowering renewable energy</h2>
                <p className="text-gray-600 mt-2 leading-7">
                  I had the pleasure of working with Antec, a company that provides turnkey solutions...
                </p>
              </div>
            </div>
             <h3 className="text-lg font-semibold mb-4">Job History</h3>

          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between border-b py-3 text-sm">
              
              <div className="flex gap-4">
                <Image src="/images/profile.png" width={50} height={50} alt="job" className="rounded-md" />
                <div>
                  <p className="font-semibold">Client {item}</p>
                  <p className="text-gray-600">Custom project work completed</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">$500</p>
                <p className="text-yellow-500 text-sm">⭐ 4</p>
              </div>

            </div>
          ))}
          </div>
        </>
      )}

      {/* ====================== JOB SECTION ====================== */}
      {activeTab === "job" && (
      
         <UserDetails/>
     
      )}

      {/* ====================== EARNING SECTION ====================== */}
      {activeTab === "earning" && (
       <EarningTab/>
      )}

    </div>
  );
}
