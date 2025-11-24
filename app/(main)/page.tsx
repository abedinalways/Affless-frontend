import Banner from '@/components/MainPage/banner/Banner'
import ContactUs from '@/components/MainPage/Contact-Us/Contact-Us'
import HowWork from '@/components/MainPage/HowWork/HowWork'
import Popularcategory from '@/components/MainPage/PopularCategory/Popularcategory'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>
     <Banner/>
     <ContactUs/>
     <HowWork/>
     <Popularcategory/>
    </div>
  )
}
