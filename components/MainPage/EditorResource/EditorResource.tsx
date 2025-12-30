import PageBanner from '@/components/reusable/Bgbanner'
import { Book } from 'lucide-react'
import React from 'react'
import TopToolEditorPage from './TopToolEditor/TopToolEditoPage'
import LearnImprove from './LearnImprove'
import PlatfromRules from './PlatfromRules'
import EditIcon from '@/components/Icons/EditingIcon'
import GuideIcon from '@/components/Icons/GuideIcon'

const data = [
  {
    id: 1,
    bg: "bg-[#FBEFF1]",
    IconBg: "bg-[#F93F42]",
    icon: <EditIcon className='text-red-500' />,
    title: "Editing Tools & Plugins",
    desc: "Access recommended tools"
  },
  {
    id: 2,
    bg: "bg-[#FDF4EA]",
    IconBg: "bg-[#FE5D00]",
    icon: <GuideIcon className='text-red-500' />,
    title: "Guides & Tutorials",
    desc: "Learn and improve your craft"
  },
  {
    id: 3,
    bg: "bg-[#E0EDF3]",
    IconBg: "bg-[#0582C1]",
    icon: <GuideIcon className='text-red-500' />,
    title: "Platform Policies",
    desc: "Review platform rules"
  },

]

export default function EditorResourcePage() {
  return (
    <div>
      <div>
        <div>
          <PageBanner
            title="Editor Resources"
            bgImage="/findEditor.jpg"
            links={[
              { label: "Home", href: "/" },
              { label: "Editor Resources" }
            ]}
          />
        </div>

        <div className=''>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 lg:py-20 containers">
            {data.map((item) => (
              <div
                key={item.id}
                className={`${item.bg} py-10 px-6 shadow-md rounded-2xl flex flex-col items-center text-center`}
              >
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full ${item.IconBg} flex items-center justify-center mb-5`}>
                  {item.icon}
                </div>

                {/* Title */}
                <p className="text-[#333] text-[18px] md:text-[22px] font-semibold leading-[120%]">
                  {item.title}
                </p>

                {/* Description */}
                <p className="text-[#4A4C56] text-[14px] md:text-[16px] font-normal leading-[150%] mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <TopToolEditorPage />
          <LearnImprove />
          <PlatfromRules />
        </div>
      </div>
    </div>
  )
}
