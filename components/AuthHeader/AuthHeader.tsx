import Image from 'next/image'
import React from 'react'

export default function AuthHeader() {
  return (
<div className=''>
     <div className='containers pb-[88px]'>
     <div className=" w-[100px] h-[50px] ">
              <Image src="/fdf.png" alt='logo' height={500} width={500} className=" w-full object-cover"></Image>
           
           </div>
   </div>
</div>
  )
}
