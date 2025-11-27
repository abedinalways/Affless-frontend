import PageBanner from '@/components/reusable/Bgbanner'
import { Book } from 'lucide-react'
import React from 'react'
import TopToolEditorPage from './TopToolEditor/TopToolEditoPage'
import LearnImprove from './LearnImprove'
import PlatfromRules from './PlatfromRules'

const data = [
{ 
    id:1,
    bg:"bg-[#FBEFF1]",
    icon:<Book className='text-red-500'/>,
    title:"Editing Tools & Plugins",
    desc:"Access recommended tools"
},
{ 
    id:2,
    bg:"bg-[#FDF4EA]",
    icon:<Book className='text-red-500'/>,
    title:"Guides & Tutorials",
    desc:"Learn and improve your craft"
},
{ 
    id:3,
    bg:"bg-[#E0EDF3]",
    icon:<Book className='text-red-500'/>,
    title:"Platform Policies",
    desc:"Review platform rules"
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
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-20 containers'>
   
    {
        data.map((index)=>{
            return <div key={index.id}   className={`${index.bg} py-6 px-4 shadow-lg rounded-lg`}>
             <p className='flex items-center justify-center pb-6'>{index.icon}</p>
             <p className='flex items-center justify-center  text-[#333] text-center text-[18px] md:text-[24px] font-medium leading-[120%]'>{index.title}</p>

             <p className='flex items-center justify-center text-[#4A4C56] text-center text-[16px] font-normal leading-[150%]'>{index.desc}</p>

            </div>
        })
    }
</div> 
<TopToolEditorPage/>
<LearnImprove/>
<PlatfromRules/>
      </div>
      </div>
    </div>
  )
}
