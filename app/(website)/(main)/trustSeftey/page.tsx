/** @format */

import React from "react";
import PageBanner from "@/components/reusable/Bgbanner";
import TrustSafety from "@/components/MainPage/TrustSafety/TrustSafety";
export default function TrustSefteyPage() {
  return (
    <div>
      <div>
        <div>
          <PageBanner
            title='Trust & Safety
'
            bgImage='/findEditor.jpg'
            links={[{ label: "Home", href: "/" }, { label: "Trust & Safety" }]}
          />
        </div>
        <div>
          <TrustSafety />
        </div>
      </div>
    </div>
  );
}
