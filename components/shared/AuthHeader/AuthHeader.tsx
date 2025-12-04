import Image from 'next/image'
import React from 'react'

export default function AuthHeader() {
  return (
<div className=''>
     <div className='containers pb-8 lg:pb-[88px] pt-4'>
     <div className=" w-[100px] h-[50px] ">
              <Image
                              src="/images/footerLogo.png"
                              width={167}
                              height={55}
                              alt="Logo"
                              className=" object-cover justify-start w-[167px]"
                            />
           
           </div>
   </div>
</div>
  )
}
