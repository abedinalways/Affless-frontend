import { Book, BookAIcon } from 'lucide-react'
import React from 'react'

const data = [
{ 
    id:1,
    icon:<Book className='text-red-500'/>,
    title:"Safe & Secure",
    desc:"Your money is held in a secure escrow account until you approve the work."
},
{ 
    id:2,
    icon:<Book className='text-red-500'/>,
    title:"Pay for Results",
    desc:"Only pay when you're satisfied with the completed work."
},
{ 
    id:3,
    icon:<Book className='text-red-500'/>,
    title:"Dispute Support",
    desc:"Our team helps resolve any issues fairly and professionally."
},
{ 
    id:1,
    icon:<Book className='text-red-500'/>,
    title:"Peace of Mind",
    desc:"Hire freelancers confidently knowing you're protected."
},
]
export default function WhyUsPamymet() {
  return (
 <div className='pt-10 md:pt-20'>
      <div className='bg-[#FFEDED]' >
     <div className='containers py-20'>
        <div>
            <h3 className='text-[40px] font-medium leading-120% md:text-[45px] text-center lg:text-[56px] text-[#333]'>Why Use Payment Protection?</h3>
            <p className='text-[#4A4C56] text-[18px] font-normal leading-[150%] text-center pt-[18px] pb-10 md:pb-[56px]'>Hire editors with complete peace of mind knowing your investment is protected.</p>
        </div>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
   
    {
        data.map((index)=>{
            return <div key={index.id} className='bg-[#FFFFFF] py-6 px-4.5 shadow-lg rounded-lg'>
             <p className='flex items-center justify-center pb-6'>{index.icon}</p>
             <p className='flex items-center justify-center pb-4 text-[#333] text-center text-[18px] font-medium leading-[120%]'>{index.title}</p>

             <p className='flex items-center justify-center text-[#4A4C56] text-center text-[14px] font-normal leading-[150%]'>{index.desc}</p>

            </div>
        })
    }
</div>
    </div>
   </div>
 </div>
  )
}
