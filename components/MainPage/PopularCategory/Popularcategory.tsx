import MailIcon from '@/components/Icons/MailIcon'
import React from 'react'

const data =[
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:2,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },
    {
        id:1,
        icon:<MailIcon/>,
        title:"YouTube Long-form",
        desc:"Educational, vlogs, tutorials"
    },

]

export default function Popularcategory() {
  return (
    <div className='container mx-auto mt-[80px]'>
      <div> 
        <p  className='text-center font-bold text-4xl'>Popular Categories</p>
    
        <p className='text-center pb-[50px]'>Find the perfect editor for any project</p>
        <div className='grid grid-cols-2 md:grid-cols-4'>
{
    data.map((index)=>{
        return <div key={index.id}>
            <div className='flex gap-3'>
                <p>{index.icon}</p>
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
  )
}
