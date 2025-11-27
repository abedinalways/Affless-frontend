import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Book } from 'lucide-react'

export default function PlatfromRules() {
  return (
    <div className='containers '>
      <div>
        <h3 className='text-[40px] font-medium leading-120% md:text-[45px]  lg:text-[56px] text-[#333]'>
            Platform Rules & Best Practices
        </h3>
        <p className='text-[#4A4C56] text-[18px] font-normal leading-[150%] pt-[18px] pb-10 md:pb-[60px]'>Essential guidelines to ensure quality and compliance.</p>
      </div>
      <div className=''>
        <Accordion type="single" collapsible className=''>
 <div className='rounded-2xl'>
     <AccordionItem value="item-1 " className='border-none'>
  
        <div className='bg-[#FFDBDC] px-6 py-5 flex gap-3'>
            <Book className='mt-4'/>
            <AccordionTrigger className=' text-[18px] font-normal leading-120%'> Quality Standards for Video & Audio Editing</AccordionTrigger>
        </div>
    <AccordionContent className='px-6 py-4'>
      All delivered content must meet minimum technical specifications: Video resolution of 1080p or higher, frame rate of 24fps minimum, audio at -16 LUFS for social media or -23 LUFS for broadcast. Ensure proper color correction, no visual artifacts, and clean audio with no clipping or distortion. Maintain consistent quality across all deliverables.
    </AccordionContent>
  
  </AccordionItem>
   <AccordionItem value="item-2 " className='border-none'>
  
        <div className='bg-[#FFDBDC] px-6 py-5 flex gap-3'>
            <Book className='mt-4'/>
            <AccordionTrigger className=' text-[18px] font-normal leading-120%'> File Delivery Format Guidelines</AccordionTrigger>
        </div>
    <AccordionContent className='px-6 py-4'>
      All delivered content must meet minimum technical specifications: Video resolution of 1080p or higher, frame rate of 24fps minimum, audio at -16 LUFS for social media or -23 LUFS for broadcast. Ensure proper color correction, no visual artifacts, and clean audio with no clipping or distortion. Maintain consistent quality across all deliverables.
    </AccordionContent>
  
  </AccordionItem>
   <AccordionItem value="item-3 " className='border-none'>
  
        <div className='bg-[#FFDBDC] px-6 py-5 flex gap-3'>
            <Book className='mt-4'/>
            <AccordionTrigger className=' text-[18px] font-normal leading-120%'>Quality Standards for Video & Audio Editing</AccordionTrigger>
        </div>
    <AccordionContent className='px-6 py-4'>
      All delivered content must meet minimum technical specifications: Video resolution of 1080p or higher, frame rate of 24fps minimum, audio at -16 LUFS for social media or -23 LUFS for broadcast. Ensure proper color correction, no visual artifacts, and clean audio with no clipping or distortion. Maintain consistent quality across all deliverables.
    </AccordionContent>
  
  </AccordionItem>
   <AccordionItem value="item-4 " className='border-none'>
  
        <div className='bg-[#FFDBDC] px-6 py-5 flex gap-3'>
            <Book className='mt-4'/>
            <AccordionTrigger className=' text-[18px] font-normal leading-120%'> Quality Standards for Video & Audio Editing</AccordionTrigger>
        </div>
    <AccordionContent className='px-6 py-4'>
      All delivered content must meet minimum technical specifications: Video resolution of 1080p or higher, frame rate of 24fps minimum, audio at -16 LUFS for social media or -23 LUFS for broadcast. Ensure proper color correction, no visual artifacts, and clean audio with no clipping or distortion. Maintain consistent quality across all deliverables.
    </AccordionContent>
  
  </AccordionItem>
 </div>
</Accordion>
      </div>
    </div>
  )
}
