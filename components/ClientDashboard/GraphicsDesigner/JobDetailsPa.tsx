// import Youtube from '@/components/Icons/Youtube'
// import { YoutubeIcon } from 'lucide-react'
// import Image from 'next/image'
// import React from 'react'

// const data =[
//     { 
//         id:1,
//         img:<YoutubeIcon/>,
//         itemBg:"bg-[#E1E7FF]",
//         title:"Job Category",
//         desc:"Video"
//     },
//       {
//         id:2,
//         img:<YoutubeIcon/>,
//           itemBg:"bg-[#EBE6FE]",
//         title:"Job Category",
//         desc:"Video"
//     },
//       { id:3,
//         img:<YoutubeIcon/>,
//           itemBg:"bg-[#FFCCE4]",
//         title:"Job Category",
//         desc:"Video"
//     },
//       { id:4,
//         img:<YoutubeIcon/>,
//           itemBg:"bg-[#FFF1CC]",
//         title:"Job Category",
//         desc:"Video"
//     },
//       {
//         id:5,
//         img:<YoutubeIcon/>,
//           itemBg:"#E6F7D9",
//         title:"Job Category",
//         desc:"Video"
//     },
// ]

// export default function JobDetailsPage() {
//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-9 containers ">
//         {
//             data.map((index)=>{
//                 return <div key={index.id} className=''>
//                     <div className='flex bg-amber-400'>
//                        <span className='text-black '>
//                          {index.img}
//                        </span>
//                       <div>
//                          <div>{index.title}</div>
//                        <div>{index.desc}</div>
//                       </div>

//                     </div>
//                 </div>
//             })
//         }
//       </div>
//     </div>
//   )
// }


"use client";

import { FileText, File, YoutubeIcon } from "lucide-react";
import { useState } from "react";

export default function JobDetailsPage() {

      const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleTextUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTextFile(e.target.files[0]);
    }
  };

  return (
    <div className="mx-auto space-y-8">

      {/* Top Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="p-4 rounded-xl border bg-blue-100">
          <div className="flex gap-4"> <div className="flex justify-center items-center">
            <YoutubeIcon />
          </div>
            <div>
                <p className="text-sm text-gray-600">Job Category</p>
          <p className="text-lg font-semibold">Video</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-purple-100">
          <p className="text-sm text-gray-600">Project Budget</p>
          <p className="text-lg font-semibold">$675</p>
        </div>

      
      </div>

      {/* 2nd Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-pink-100">
          <p className="text-sm text-gray-600">Platform</p>
          <p className="text-lg font-semibold">Youtube</p>
        </div>

        <div className="p-4 rounded-xl border bg-yellow-100">
          <p className="text-sm text-gray-600">Project Duration</p>
          <p className="text-lg font-semibold">5 Days</p>
        </div>

        <div className="p-4 rounded-xl border bg-green-100">
          <p className="text-sm text-gray-600">Country</p>
          <p className="text-lg font-semibold">USA</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold">The Ultimate Guide To Start</h1>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">
        Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit amet
        iaculis eros. Suspendisse pulvinar, erat sed interdum auctor, eros
        ligula tempus quam, in congue est nunc et turpis. Nam non nisl sed sem
        placerat semper. Proin egestas, odio eu semper mattis, enim odio
        pulvinar leo, ac vestibulum sapien nulla non arcu.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Mauris sed venenatis libero. Pellentesque elementum ante massa, ac
        ornare augue molestie ut. Suspendisse lacinia tortor sem, at
        condimentum nulla auctor in. Sed vulputate euismod risus, eget auctor
        nulla aliquet sed.
      </p>

      {/* Subtitle */}
      <h2 className="text-2xl font-semibold mt-6">
        Pellentesque elementum ante massa
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Suspendisse gravida risus in sapien sollicitudin.</li>
        <li>Quisque mollis enim nec lacus elementum vulputate.</li>
        <li>Nullam fermentum turpis a nisl tristique.</li>
        <li>Donec placerat orci id lobortis suscipit.</li>
        <li>Accumsan nibh vitae, hendrerit turpis.</li>
        <li>Etiam dignissim mauris at orci finibus.</li>
      </ul>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Skills Required</h2>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 border rounded-xl bg-gray-100">
            Adobe Premiere Pro
          </span>
          <span className="px-4 py-2 border rounded-xl bg-gray-100">
            Adobe After Effects
          </span>
          <span className="px-4 py-2 border rounded-xl bg-gray-100">
            Adobe After Effects
          </span>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Attachments</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* PDF Upload */}
      <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer">
        <FileText className="w-10 h-10" />

        <div>
          <p className="font-semibold">
            {pdfFile ? pdfFile.name : "Upload PDF File"}
          </p>

          <p className="text-sm text-gray-600">
            {pdfFile
              ? `File size: ${(pdfFile.size / 1024).toFixed(2)} KB`
              : "Choose a PDF file"}
          </p>
        </div>

        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handlePdfUpload}
        />
      </label>

      {/* TEXT Upload */}
      <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer">
        <File className="w-10 h-10" />

        <div>
          <p className="font-semibold">
            {textFile ? textFile.name : "Upload Text Document"}
          </p>

          <p className="text-sm text-gray-600">
            {textFile
              ? `File size: ${(textFile.size / 1024).toFixed(2)} KB`
              : "Choose a TXT file"}
          </p>
        </div>

        <input
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleTextUpload}
        />
      </label>

    </div>
      </div>
    </div>
  );
}
