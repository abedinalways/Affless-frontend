"use client";

import Link from "next/link";

export default function DisputeResolutionPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="containers mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:gap-10.5 md:gap-6" id="resolution-center-intro">

        {/* ---------------- Sidebar ---------------- */}
        <div className="bg-white shadow-sm rounded-xl p-6 h-fit sticky top-26">
          <h3 className="text-[24px] font-medium text-[#333] mb-6">Quick links</h3>
          <ul className="space-y-4 text-[#333] text-[16px] font-normal leading-150%">
            <li>
              <Link href="#resolution-center-intro" className="hover:text-red-500 transition">
                Accessing the Resolution Center
              </Link>
            </li>
            <li>
              <Link href="#for-freelancers" className="hover:text-red-500 transition">
                Editor options
              </Link>
            </li>
            <li>
              <Link href="#for-clients" className="hover:text-red-500 transition">
                Client options
              </Link>
            </li>
            <li>
              <Link href="#cancellations" className="hover:text-red-500 transition">
                Cancellations
              </Link>
            </li>
          </ul>
        </div>

        {/* ---------------- Content Section ---------------- */}
        <section className="bg-white shadow-sm rounded-xl p-10 leading-relaxed text-[#333]">
          <div>
            <h2 className="text-[24px] font-medium leading-150%  mb-4 ">How to use the Resolution Center</h2>

            <p className="mb-4">
              The Resolution Center is a place where editors and clients can work together to solve order
              disputes or manage orders when a resolution cannot be reached through Inbox. You can raise
              issues, submit supporting information to our Customer Support team through the Resolution
              Center.
            </p>

            <p className="mb-6">
              This guide will walk you through how to access and use the Resolution Center from both the
              freelancer’s and client’s perspectives.
            </p>

            <h3 className="  mt-6 mb-3">Accessing the Resolution Center</h3>

            <p className="mb-4">
              Once inside the Resolution Center, users and freelancers can see updates relevant to their
              orders. When submitting a request or an issue through the Resolution Center, both parties can
              view a ticket-style request or resolution, while users can choose to escalate an issue or cancel
              the request once it's submitted.
            </p>

            <p className="mb-3 font-medium">To open a request, go through these steps:</p>

            <ol className="list-decimal ml-6 mb-6 space-y-1">
              <li>Navigate to the Orders section from your Editor dashboard.</li>
              <li>Select the specific order you want to dispute.</li>
              <li>Click on Resolution Center located on the right side on the order page.</li>
            </ol>
          </div>

          {/* ---------------- Cancellations Section ---------------- */}
          <h3 className="text-[24px] font-medium leading-150%  mt-8 mb-3" id="cancellations">Cancellations</h3>

          <p className="mb-4">
            The Order Resolution Center is a safe tool for managing disputes and developing positive
            relationships with clients and editors. To do this successfully, it's important for you to know
            your options so that communication does not break down. If communication fails, orders are
            cancelled automatically and keep in mind that if there is repeated anomaly and resistance.
          </p>

          <h4 className="font-semibold mt-6 mb-2" id="for-freelancers">For freelancers:</h4>
          <p className="mb-4">
            Ensure you are transparent and clear with your client regarding your work and where you end your
            service. Use the Resolution Center wisely as a tool to clarify matters and keep all parties informed.
            Proper communication keeps projects healthy and keeps all parties safe.
          </p>

          <h4 className="font-semibold mt-6 mb-2" id="for-clients">For clients:</h4>
          <p>
            Always give the freelancer a chance to address your concerns before escalating to cancellation.
            Clear communication about your expectations from the start prevents most disputes.
          </p>
        </section>

      </div>
    </div>
  );
}
