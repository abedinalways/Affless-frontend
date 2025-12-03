"use client";

import React from "react";
import PageBanner from "../reusable/Bgbanner";

export default function TermsConditionPage() {
  return (
   <div>
        <div>
        <PageBanner
  title="Terms & Conditions Page"
  bgImage="/findEditor.jpg"
  links={[
    { label: "Home", href: "/" },
    { label: "Terms & Conditions Page" }
  ]}
/>

      </div>
     <div className="bg-[#F7F7F7] min-h-screen lg:py-16 containers ">
      <div className="mx-auto bg-white p-4 md:p-8 rounded-xl shadow-sm leading-relaxed text-[#333]">

        {/* ---------------- 1. Introduction ---------------- */}
        <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150% text-[#333]">1. Introduction</h2>
        <p className="mb-6 text-4 lg:text-[18px] font-normal leading-[26px]">
          Welcome to Editor Marketplace. These Terms & Conditions govern your use of our platform,
          where editors and clients connect to complete projects efficiently and professionally.
          By accessing or using our services, you agree to comply with these terms.
        </p>

        {/* ---------------- 2. Personal Information We Collect ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">2. Personal Information We Collect</h2>
        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">
          When using our platform, you may provide personal information to enhance your experience,
          including:
        </p>

        <ul className="list-disc ml-6 space-y-1 mb-4">
          <li>Name, email address, phone number, and mailing address</li>
          <li>Profile details such as skills, portfolio, and work preferences</li>
          <li>Payment information for transactions</li>
        </ul>

        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">We collect this information when you:</p>

        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>Register an account</li>
          <li>Subscribe to newsletters</li>
          <li>Participate in surveys or promotional campaigns</li>
          <li>Submit projects or orders</li>
        </ul>

        {/* ---------------- 3. How We Use Your Information ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">3. How We Use Your Information</h2>
        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">We use your information to:</p>

        <ol className="list-decimal ml-6 space-y-1 mb-4">
          <li>Personalize your experience and deliver relevant project opportunities</li>
          <li>Improve platform features and user experience</li>
          <li>Administer contests, promotions, surveys, or other platform activities</li>
          <li>Facilitate secure payments and communication between clients and editors</li>
        </ol>

        <p className="mb-6 text-4 lg:text-[18px] font-normal leading-[26px]">
          Your data is handled securely and will not be shared with third parties without consent.
        </p>

        {/* ---------------- 4. User Responsibilities ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">4. User Responsibilities</h2>

        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">As a member of our marketplace, you agree to:</p>

        <ul className="list-disc ml-6 space-y-1 mb-4">
          <li>Provide accurate information on your profile</li>
          <li>Respect deadlines and project agreements</li>
          <li>Communicate professionally with clients and editors</li>
          <li>Follow dispute resolution procedures if conflicts arise</li>
        </ul>

        <p className="mb-6 text-4 lg:text-[18px] font-normal leading-[26px]">
          Failure to comply may result in account suspension or removal from the platform.
        </p>

        {/* ---------------- 5. Project and Payment Terms ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">5. Project and Payment Terms</h2>

        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>All payments must go through our platform’s secure system.</li>
          <li>Refunds, revisions, and cancellations are subject to our dispute resolution policy.</li>
          <li>Editors must deliver work according to agreed specifications and deadlines.</li>
          <li>Clients must provide clear project briefs and timely feedback.</li>
        </ul>

        {/* ---------------- 6. Dispute Resolution ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">6. Dispute Resolution</h2>

        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>If conflicts arise, users must attempt to resolve them through direct communication.</li>
          <li>For unresolved issues, users can submit a dispute via the Resolution Center.</li>
          <li>
            Our team will review the case and provide a fair resolution according to platform policies.
          </li>
        </ul>

        {/* ---------------- 7. Content and Intellectual Property ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">
          7. Content and Intellectual Property
        </h2>

        <ul className="list-disc ml-6 space-y-1 mb-4">
          <li>Editors retain rights to their original work unless otherwise agreed.</li>
          <li>
            Clients are granted rights for work purchased through the platform as per the project
            agreement.
          </li>
          <li>Uploading copyrighted or illegal content is strictly prohibited.</li>
        </ul>

      </div>
    </div>
   </div>
  );
}
