import Banner from '@/components/MainPage/banner/Banner'
import ContactUs from '@/components/MainPage/Contact-Us/Contact-Us'
import HowWork from '@/components/MainPage/HowWork/HowWork'
import Popularcategory from '@/components/MainPage/PopularCategory/Popularcategory'
import Subscribe from '@/components/MainPage/suscribe/Suscribe'
import TrustSafety from '@/components/MainPage/TrustSafety/TrustSafety'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>
     <Banner />
     <HowWork/>
     <Popularcategory/>
     <Subscribe/>
     <TrustSafety/>
      {/* <ContactUs/> */}
    </div>
  )
}
