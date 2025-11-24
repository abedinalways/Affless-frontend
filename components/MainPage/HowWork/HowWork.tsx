import MailIcon from '@/components/Icons/MailIcon'
import { EyeIcon } from 'lucide-react'
import React from 'react'

const data1 = [
    {
       ddf:"for client"
    },
    { id:1,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
    {
        id:2,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
    {
        id:3,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
    {
        id:4,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
]


const data2 = [
    {
       ddf:"for client"
    },
    { id:1,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
    {
        id:2,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
    {
        id:3,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
    {
        id:4,
        icon:<MailIcon/>,
        title:" Post Job",
        desc:"Describe your project needs and budget"
    },
]

export default function HowWork() {
  return (
    <div className='container mx-auto'>
      <div>
        <h3 className='text-center font-bold text-4xl'>
          How It Works
        </h3>

        <p className='text-center text-xl'>
          A simple, secure, and efficient process for both clients and editors
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>

          {/* LEFT CARD */}
          <div className='mt-10 bg-white shadow-lg w-full py-[30px] px-8'>
            <p className='font-semibold text-lg mb-4 text-center text-[32px]'>For Client</p>

            <div className="space-y-[60px]">
              {data1.slice(1).map((item) => (
                <div key={item.id} className='flex gap-5'>
                  <div>{item.icon}</div>
                  <div>
                    <p className='font-semibold'>{item.title}</p>
                    <p className='text-gray-600'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className='mt-10 bg-white shadow-lg w-full py-[30px] px-8 '>
            <p className='font-semibold text-lg mb-4 text-center text-[32px]'>For Editors</p>

            <div className="space-y-[60px]">
              {data2.slice(1).map((item) => (
                <div key={item.id} className='flex gap-5'>
                  <div>{item.icon}</div>
                  <div>
                    <p className='font-semibold'>{item.title}</p>
                    <p className='text-gray-600'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
