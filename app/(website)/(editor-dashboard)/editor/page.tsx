import EditorDashboard from '@/components/ClientEditor/EditorDshboard/EditorDshboardPage'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      
      {/* <Link href="/client">
      <button className='bg-red-500 text-white px-8 py-2 rounded-lg'>
        back
      </button>
      </Link> */}
      <EditorDashboard/>
    </div>
  )
}
