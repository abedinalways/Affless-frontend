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
    <div className='container'>
      <div>
        <h3 className='text-center font-bold text-4xl'>
How It Works

        </h3>
        <p className='text-center text-xl'>A simple, secure, and efficient process for both clients and editors </p>

        <div className='flex  justify-between'>
            <div className='mt-10'> 
                <p>for client</p>
                {
                    data1.map((index)=>{
                
                        return <div key={index.id}>
                        
                           <div className='flex gap-5'>
                            <div>
                                 <p>{index.icon}</p>
                            </div>
                            <div>
                                <p>{index.title}</p>
                                <p>{index.desc}</p>
                            </div>
                           </div>
                        </div>
                    })
                }
            </div>
            <div className='mt-10'> 
                <p>for client</p>
                {
                    data2.map((index)=>{
                
                        return <div key={index.id}>
                        
                           <div className='flex gap-5'>
                            <div>
                                 <p>{index.icon}</p>
                            </div>
                            <div>
                                <p>{index.title}</p>
                                <p>{index.desc}</p>
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
