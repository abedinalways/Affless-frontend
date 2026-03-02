"use client";

import Image from "next/image";
import Link from "next/link";

// Define the type for the payment data
interface Payment {
  id: number;
  img: string;
  title: string;
  price: string;
  day: string;
  status: "in_revision" | "completed";
}

export default function PaymentHistoryPage() {
  const payments: Payment[] = [
    { id: 1, img: "/images/payment1.jpg", title: "I will craft quality backlinks for your website's SEO.", price: "55", day: "5 Days", status: "in_revision" },
    { id: 2, img: "/images/payment2.jpg", title: "I will design a professional logo for your brand.", price: "75", day: "3 Days", status: "completed" },
    { id: 3, img: "/images/payment3.jpg", title: "I will develop a responsive website for your business.", price: "150", day: "10 Days", status: "in_revision" },
    { id: 3, img: "/images/payment1.jpg", title: "I will craft quality backlinks for your website's SEO.", price: "55", day: "5 Days", status: "in_revision" },
    { id: 4, img: "/images/payment2.jpg", title: "I will design a professional logo for your brand.", price: "75", day: "3 Days", status: "completed" },
    { id: 5, img: "/images/payment3.jpg", title: "I will develop a responsive website for your business.", price: "150", day: "10 Days", status: "in_revision" },
  ];

  return (
    <div className="p-6 containers">
      {/* ---------- TITLE ---------- */}
      <h1 className="text-2xl font-semibold mb-2">Payment History</h1>
      <p className="text-gray-400 mb-6">Total Amount Paid</p>

      {/* ---------- TOP CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        {/* Left Card */}
        <div className="bg-white rounded-xl min-h-[200px] h-full flex items-center justify-center shadow-sm">
          <p className="text-3xl font-semibold">$323.00</p>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div title="Money paid by the client but not yet released to the editor.">
            <p className="text-gray-600 text-lg mb-2 text-center  lg:text-start">Funds Held in Escrow</p>
            <p className="text-[32px] font-semibold mb-4 text-center lg:text-start" title="Money paid by the client but not yet released to the editor">$0.00</p>
          </div>
          <div title="Funds already released to the editor after job completion.">
            <p className="text-gray-600 text-[18px] mb-2 text-center pt-14 lg:pt-0 lg:text-start">Released Payments</p>
            <p className="text-[32px] font-semibold text-center  lg:text-start" title="Funds already released to the editor after job completion">$0.00</p>
          </div>
        </div>

      </div>

      {/* ---------- PAYMENT ROWS (Figma Style) ---------- */}
      <div className="flex justify-between pb-8">
        <p className="font-medium text-[24px] leading-150%">Jobs</p>
        {/* <Link href="/client/find-editor" className="text-sm font-normal leading-150% text-gray-700 bg-gray-100 px-4 py-2 rounded-lg hover:bg-[#ff4b4b] hover:text-white duration-300 transition-all">See More</Link> */}
      </div>
      <div className="space-y-3">
        {payments.map((payment) => (
          <Link
            href="/client/manage-job/1?redirect=/client/payment-history"
            key={payment.id}
            className="bg-white rounded-xl flex items-center justify-between shadow-sm py-4 px-4"
          >
            {/* Left: Image + Title */}
            <div className="flex items-center gap-3">
              <Image
                src={payment.img}
                alt="Payment"
                height={40}
                width={40}
              />
              <p className="text-sm font-medium max-w-[260px]">{payment.title}</p>
            </div>

            {/* Amount */}
            <p className="font-semibold hidden md:block">${Number(payment.price).toFixed(2)}</p>

            {/* Days */}
            <p className="text-gray-500  hidden md:block">{payment.day}</p>

            {/* Status */}
            <div className="hidden md:block">
              {payment.status === "in_revision" ? (
                <span className="px-4 py-1 rounded-lg bg-[#7C3AED] text-white text-[16px] font-medium">
                  In Revision
                </span>
              ) : (
                <span className="px-5 py-1 rounded-lg bg-[#166534] text-white text-[16px] font-medium">
                  Completed
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
