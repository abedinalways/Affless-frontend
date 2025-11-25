

import React from 'react'
import PageBanner from '@/components/reusable/Bgbanner'
import TrustSafety from '@/components/MainPage/TrustSafety/TrustSafety'
export default function TrustSefteyPage() {
  return (
    <div>
      <div>
          <div>
                <PageBanner
          title="How It Works
"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/" },
            { label: "How It works" }
          ]}
        />
              
              </div>
              <div>
                <TrustSafety/>
              </div>
      </div>
    </div>
  )
}
