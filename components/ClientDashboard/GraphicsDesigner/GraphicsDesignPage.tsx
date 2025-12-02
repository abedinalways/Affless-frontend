import React from 'react'
import JobDetailsPage from './JobDetailsPa'
import BudgetPage from './BudgetPage'
import PageBanner from '@/components/reusable/Bgbanner'
import ReviewPage from './ReviewPage'

export default function GraphicsDesignerPage() {
  return (
    <div className=' overflow-hidden'>
              <div>
                <PageBanner
          title="Graphic Designer for ongoing job"
        bgImage="/findEditor.jpg"
        links={[
          { label: "Home", href: "/" },
          { label: "job details", href: "#" },
          { label: "Graphic Designer for ongoing job", href: "/pricing" },
        ]}
        />
              </div>
     <div className='containers pt-20'>
         <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-3/4">
            <JobDetailsPage/>
        </div>
        <div className="w-full md:w-1/4">
            <BudgetPage/>
        </div>
      </div>
      <div>
        <ReviewPage/>
      </div>
     </div>
    </div>
  )
}
