"use client";

import Link from "next/link";

export default function DisputeResolutionPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="containers mx-auto px-4 md:px-0 grid grid-cols-1 lg:gap-10 md:gap-6 space-y-4" id="resolution-center-intro">

        {/* ---------------- Sidebar ---------------- */}
        {/* <div className="bg-white shadow-sm rounded-xl p-6 h-fit sticky-none  md:sticky top-24 lg:top-26">
          <h3 className="text-[24px] font-medium text-[#333] mb-6">Quick links</h3>
          <ul className="space-y-4 text-[#333] text-[16px] font-normal leading-150%">
            <li>
              <Link href="#" className="hover:text-red-500 transition">
                Accessing the Resolution Center
              </Link>
            </li>
            <li>
              <Link href="#freelancers" className="hover:text-red-500 transition">
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
        </div> */}

        {/* ---------------- Content Section ---------------- */}
        <section className="bg-white shadow-sm rounded-xl p-5 lg:p-10 leading-relaxed text-[#333] mt-7">
          <div>
            <h2 className="text-[24px] font-medium leading-150%  mb-4 ">How to Use the Resolution Center</h2>

            <p className="mb-4">
              The Resolution Center is a place where editors and clients can work together to resolve order disputes or manage issues when a resolution cannot be reached through the Inbox. Users can raise issues and submit supporting information to Customer Support through the Resolution Center.
            </p>

            {/* <p className="mb-6">
              This guide explains how both editors and clients can access and use the Resolution Center.
            </p> */}

            <h3 className="  mt-6 mb-3">Accessing the Resolution Center</h3>

            <p className="mb-4">
              Once inside the Resolution Center, editors and clients can view updates related to their orders. When a request or issue is submitted, both parties can view a ticket-style resolution thread. Users may choose to escalate an issue or cancel the request after it has been submitted.
            </p>

            <p className="mb-3 font-medium">To open a request, go through these steps:</p>

            <ol className="list-decimal ml-6 mb-6 space-y-1">
              <li>Navigate to the Orders section from your dashboard.</li>
              <li>Select the specific order you would like to dispute.</li>
              <li>Click the Resolution Center located on the right side of the order page.</li>
            </ol>
          </div>

          {/* ---------------- Cancellations Section ---------------- */}
          <h3 className="text-[24px] font-medium leading-150%  mt-8 mb-3" id="cancellations">Cancellations</h3>

          <p className="mb-4">
            The Resolution Center is designed to help manage disputes while encouraging clear and professional communication between editors and clients. Understanding your options helps prevent communication breakdowns.
            If communication fails, an order may be canceled. Repeated misuse of the Resolution Center or failure to cooperate may result in account review.
          </p>

          <h4 className="font-semibold mt-6 mb-2" id="for-freelancers">For Editors:</h4>
          <p className="mb-4">
            Editors should communicate clearly with clients regarding project scope, deliverables, and where their service responsibilities begin and end. The Resolution Center should be used to clarify issues, provide updates, and maintain transparency. Proper communication helps keep projects healthy and protects all parties involved.
          </p>

          <h4 className="font-semibold mt-6 mb-2" id="for-clients">For Clients:</h4>
          <p>
            Clients are encouraged to give editors an opportunity to address concerns before escalating to cancellation. Clearly communicating expectations at the beginning of a project helps prevent most disputes and leads to better outcomes.
          </p>
        </section>
      </div>
    </div>
  );
}
