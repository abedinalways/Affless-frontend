import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AuthHeader() {
  return (
    <div className=''>
      <div className='containers py-4.5'>
        <Link href="/">
          <div className="w-32 h-[50px] ">
            <Image
              src="/images/logoUpdate.png"
              width={128}
              height={55}
              alt="Logo"
              className=" object-cover justify-start w-32"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
