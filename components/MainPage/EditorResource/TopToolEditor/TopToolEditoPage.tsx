import AdobeIcon from '@/components/Icons/AdobeIcon'
import DescriptIcon from '@/components/Icons/Descript'
import DevinceIcon from '@/components/Icons/DivinceIcon'
import GramarlyIcon from '@/components/Icons/Gramarly'
import HandBreackIcon from '@/components/Icons/HandBreakIcon'
import HemingWayIcon from '@/components/Icons/HemingWayIcon'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const data = [
  { 
    id:1,
    icon:<GramarlyIcon/>,
    title:"Grammarly",
    desc:"AI-powered writing assistant for script editing and content refinement with real-time suggestions."
  },
  { 
    id:2,
    icon:<HemingWayIcon/>,
    title:"Hemingway Editor",
    desc:"Makes your writing bold and clear. Perfect for editing scripts and captions with readability scores."
  },
  { 
    id:3,
    icon:<DescriptIcon/>,
    title:"Descript",
    desc:"All-in-one audio & video editing with AI transcription and collaborative features."
  },
  { 
    id:4,
    icon:<AdobeIcon/>,
    title:"Adobe Audition",
    desc:"Professional audio workstation for advanced audio editing, mixing, and restoration."
  },
  { 
    id:5,
    icon:<DevinceIcon/>,
    title:"DaVinci Resolve",
    desc:"Professional video editing, color correction, visual effects, and post-production software."
  },
  { 
    id:6,
    icon:<HandBreackIcon/>,
    title:"HandBrake",
    desc:"Open-source video transcoder for format conversion, compression, and optimization."
  },
]

export default function TopToolEditorPage() {
  return (
    <div>
      <div className="bg-[#FFEDED]">
        <div className="containers py-20">

          {/* Header */}
          <h3 className="text-[40px] font-medium leading-120% md:text-[45px] text-center lg:text-[56px] text-[#333]">
            Top Tools for Editors
          </h3>
          <p className="text-[#4A4C56] text-[18px] font-normal leading-[150%] text-center pt-[18px] pb-10 md:pb-[56px]">
            Boost your editing quality and speed with our curated toolset.
          </p>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 shadow-lg rounded-lg space-y-4"
              >
                
                {/* Icon */}
                <div className="flex items-center justify-center bg-[#FF4D4F] w-14 h-14 mx-auto rounded-full">
                  {item.icon}
                </div>

                {/* Title */}
                <p className="flex items-center justify-center text-[#333] text-center md:text-[24px] text-[18px] font-medium leading-[120%]">
                  {item.title}
                </p>

                {/* Description */}
                <p className="flex items-center justify-center text-[#4A4C56] text-center text-[14px] font-normal leading-[150%]">
                  {item.desc}
                </p>

                {/* Button */}
                <button className="flex items-center justify-center border-2 border-red-400 w-full rounded-full px-4 py-2.5 gap-2 text-red-500 hover:bg-red-50 transition">
                  <span>Read more</span>
                  <ArrowRight size={18} />
                </button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
