import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col justify-center items-center p-9'>
      <p>Editor Dashboard</p>
      <Link href="/client">
      <button className='bg-red-500 text-white px-8 py-2 rounded-lg'>
        back
      </button>
      </Link>
    </div>
  )
}
