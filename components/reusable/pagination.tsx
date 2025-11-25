import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

export default function Pagination() {
  return (
    <div>
      {/* Pagination */}
<div className="flex justify-center items-center gap-3 mt-10">

  {/* Prev Button */}
  <button className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-sm hover:bg-gray-50">
    <ChevronLeft className="text-gray-700" size={18} />
  </button>

  {/* Page Numbers */}
  <ul className="flex items-center gap-3">
    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white font-medium">
      1
    </li>
    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 font-medium">
      2
    </li>
    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 font-medium">
      3
    </li>

    {/* Dots */}
    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-400 font-medium">
      ...
    </li>

    {/* Last Page */}
    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 font-medium">
      32
    </li>
  </ul>

  {/* Next Button */}
  <button className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-sm hover:bg-gray-50">
    <ChevronRight className="text-gray-700" size={18} />
  </button>

</div>

    </div>
  )
}
