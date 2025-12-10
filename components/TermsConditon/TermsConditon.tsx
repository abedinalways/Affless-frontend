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
        <div>
        <h3 className="text-[14px] font-normal  leading-150%">Last Updated: December 9, 2025</h3>
        <p className="text-[14px] font-normal  leading-150% pt-4 pb-3"> Welcome to Editor Marketplace. These Terms & Conditions govern your use of our platform,
          where editors and clients connect to complete projects efficiently and professionally.
          By accessing or using our services, you agree to comply with these terms.</p>
      </div>

        {/* ---------------- 1. Introduction ---------------- */}
        <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150% text-[#333]">1. Introduction</h2>
        <p className="mb-6 text-4 lg:text-[18px] font-normal leading-[26px]">
         Editor Marketplace provides an online platform that enables clients to submit projects and editors to offer professional editing services. These Terms apply to all users of the platform, including editors and clients. By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
        </p>

        {/* ---------------- 2. Personal Information We Collect ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">2. Personal Information We Collect</h2>
        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">
        To enhance your experience, we collect certain personal information from users. This may include:
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
          <li>Submit projects, orders, or job proposals</li>
        </ul>

        {/* ---------------- 3. How We Use Your Information ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">3. How We Use Your Information</h2>
        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">Your information is used to:</p>

        <ol className="list-decimal ml-6 space-y-1 mb-4">
          <li>Personalize your user experience and match you with relevant project opportunities</li>
          <li>Improve platform functionality and overall user experience</li>
          <li>Administer surveys, promotions, contests, or platform-related activities</li>
          <li>Facilitate secure payments and communication between clients and editors</li>
        </ol>

        <p className="mb-6 text-4 lg:text-[18px] font-normal leading-[26px]">
          Your information is stored securely and will not be shared with third parties without your consent, unless required by law.
        </p>

        {/* ---------------- 4. User Responsibilities ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">4. User Responsibilities</h2>

        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">As a member of Editor Marketplace, you agree to:</p>

        <ul className="list-disc ml-6 space-y-1 mb-4">
          <li>Provide accurate and truthful information on your profile</li>
          <li>Respect deadlines and project agreements</li>
          <li>Communicate professionally with all users</li>
          <li>Follow dispute resolution procedures if conflicts Arise</li>
        </ul>

        <p className="mb-6 text-4 lg:text-[18px] font-normal leading-[26px]">
          Failure to comply may result in account suspension.
        </p>

        {/* ---------------- 5. Project and Payment Terms ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">5. Project and Payment Terms</h2>

        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>All payments must be made exclusively through Editor Marketplace’s secure payment system.</li>
          <li>Off-platform payment or communication is strictly prohibited and may result in account termination.</li>
          <li>Refunds, revisions, and cancellations are governed by our dispute resolution policy.</li>
          <li>Editors must deliver work according to the agreed specifications, deadlines, and project requirements.</li>
          <li>Clients must provide clear project briefs, reference materials, and timely feedback.</li>

        </ul>

        {/* ---------------- 6. Dispute Resolution ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">6. Dispute Resolution</h2>

        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>Users should first attempt to resolve the issue through direct communication.</li>
          <li>If unresolved, either party may open a dispute through the Resolution Center.</li>
          <li>
           Our team will review the case and provide a fair, unbiased resolution in accordance with platform policies.
          </li>
        </ul>

        {/* ---------------- 7. Content and Intellectual Property ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">
          7. Content and Intellectual Property
        </h2>

        <ul className="list-disc ml-6 space-y-1 mb-4">
          <li>Users should first attempt to resolve the issue through direct communication.</li>
          <li>
         If unresolved, either party may open a dispute through the Resolution Center.
          </li>
          <li>Our team will review the case and provide a fair, unbiased resolution in accordance with platform policies.</li>
        </ul>
        <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">8. Prohibited Activities</h2>
<p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">Users may not:
</p>
        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>Attempt to bypass the platforms payment or rnessaøng systems</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Upload malware, malicious files, or prohibited content</li>
          <li>Create multiple accounts to evade restrictions or impersonate others</li>

        </ul>
<p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">Violations may lead to account suspension or perrnanent deactivation.</p>

     <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">9. Account Suspension & Termination</h2>
<p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">we reserve the right to suspend or terminate accounts that:</p>
        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>Engage in off-platform communication or payment</li>
          <li>Repeatedly Violate platform rules</li>
          <li>Commit fraud or misuse platform features</li>

        </ul>
<p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">Depending on seventy, termination may be automated and permanent.</p>

        <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">10. Changes to These Terms</h2>

        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">We may update these Terms & Conditions from time to time. Continued use of the platform after
changes are posted constitutes acceptance of the updated Terms.</p>

        {/* ---------------- 6. Dispute Resolution ---------------- */}
    <h2 className="text-[20px] md:text-[24px] font-medium pb-3 leading-150%">11. Contact Information</h2>
    <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">If you have questions about these Terms, please contact our support team through:</p>

        <ul className="list-disc ml-6 space-y-1 mb-6">
          <li>Live Chat</li>
          <li>Email Support</li>
          <li>
          The Resolution Center
          </li>
        </ul>
        <p className="mb-4 text-4 lg:text-[18px] font-normal leading-[26px]">We are here to assist you.</p>

      </div>
    </div>
   </div>
  );
}
