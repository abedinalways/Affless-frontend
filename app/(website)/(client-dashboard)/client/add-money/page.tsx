import AddMoney from '@/components/ClientDashboard/AddMoney/AddMoney'
import PageBanner from '@/components/reusable/Bgbanner'
import React from 'react'

export default function AddMoneyPage() {
  return (
    <div>
      <div>
        <PageBanner
          title="Add Money"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Dashboard", href: "/client" },
            { label: "Add Money", href: "#" },
          ]}
        />
      </div>
      <AddMoney />
    </div>
  )
}
