import PageBanner from '@/components/reusable/Bgbanner'
import React from 'react'

export default function EditorResource() {
  return (
    <div>
      <div>
            <div>
        <PageBanner
  title="Pricing"
  bgImage="/findEditor.jpg"
  links={[
    { label: "Home", href: "/" },
    { label: "Pricing" }
  ]}
/>

      </div>
      </div>
    </div>
  )
}
