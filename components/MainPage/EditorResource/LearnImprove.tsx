
import Image from 'next/image'
import React from 'react'

const data = [
{ 
    id:1,
    img:"/images/success/learn1.jpg",
    title:"Advanced Audio Cleanup",
    desc:"Learn professional techniques for removing background noise and enhancing audio quality."
},
{ 
    id:2,
    img:"/images/success/learn2.jpg",
    title:"Color Grading Fundamentals",
    desc:"Learn professional techniques for removing background noise and enhancing audio quality."
},
{ 
    id:3,
    img:"/images/success/learn3.jpg",
    title:"Audio Mixing for Social Media",
    desc:"Learn professional techniques for removing background noise and enhancing audio quality."
},

]
export default function LearnImprove() {
  return (
 <div className='py-10 md:py-20'>
      <div className='' >
     <div className='containers'>
        <div>
            <h3 className='text-[32px] font-medium leading-120% md:text-[45px]  lg:text-[56px] text-[#333] text-center lg:text-start'>Learn & Improve Your Craft</h3>
            <p className='text-[#4A4C56] text-[18px] font-normal leading-[150%] pt-[18px] pb-10 md:pb-[60px]'>Enhance your skills with expert tutorials and guides.</p>
        </div>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between'>
   
    {
        data.map((index)=>{
            return <div key={index.id} className='bg-[#FF4D4F]  shadow-lg rounded-lg text-white'>
             <Image src={index.img} alt='learn' width={500} height={500} className='flex items-center justify-center rounded-t-lg'></Image>
            <div className='px-6 pt-4 '>
                 <p className='flex items-center justify-center pb-2  text-center text-[18px] md:text-[24px] font-medium leading-[120%]'>{index.title}</p>

             <p className='flex items-center justify-center  text-center text-[14px] font-normal leading-[150%]'>{index.desc}</p>
             <div className='py-6'>
                <button className='px-4 py-2.5 text-red-600 bg-white w-full rounded-lg text-[16px] lg:text-[14px]'>View Tutorial</button>
             </div>
            </div>

            </div>
        })
    }
</div>
    </div>
   </div>
 </div>
  )
}
