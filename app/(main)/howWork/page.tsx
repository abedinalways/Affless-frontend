import HowWork from '@/components/MainPage/HowWork/HowWork'
import PageBanner from '@/components/reusable/Bgbanner'
import React from 'react'

export default function HowWorkPage() {
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
                <HowWork/>
              </div>
      </div>
    </div>
  )
}
