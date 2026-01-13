/** @format */

import CreateIcon from "@/components/Icons/CreateIcon";
import DepositeIcon from "@/components/Icons/DepositeIcon";
import ProjectIcon from "@/components/Icons/ProjectIcon";
import RelaseIcon from "@/components/Icons/RelaseIcon";
import { Book, BookAIcon } from "lucide-react";
import React from "react";

const data = [
  {
    id: 1,
    icon: <CreateIcon className='bg-red-400' />,
    title: "Create Project",
    desc: "Add your project details and set the payment amount.",
  },
  {
    id: 2,
    icon: <DepositeIcon className='text-red-500' />,
    title: "Deposit Payment",
    desc: "How Payment Protection Works? The deposit is securely held by the platform and is only released to the editor after the project is completed and approved.",
  },
  {
    id: 3,
    icon: <ProjectIcon className='text-red-500' />,
    title: "Project Completion",
    desc: "Editor delivers work and you review it carefully.",
  },
  {
    id: 1,
    icon: <RelaseIcon className='text-red-500' />,
    title: "Release Payment",
    desc: "Release payment only when you're satisfied.",
  },
];
export default function HowPayments() {
  return (
    <div className='containers pt-10 lg:pt-20'>
      <div>
        <h3 className='text-[32px] font-medium leading-120% md:text-[45px] text-center lg:text-[56px] text-[#333]'>
          How Payment Protection Works
        </h3>
        <p className='text-[#4A4C56] text-[18px] font-normal leading-[150%] text-center pt-[18px] pb-10 md:pb-14'>
          Our secure escrow system ensures your money is safe until you're
          completely satisfied with the work.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className='bg-[#FFFFFF] py-6 px-4.5 shadow-lg rounded-lg'>
              <div className='bg-red-500 mx-auto flex justify-center  rounded-lg items-center h-12 w-12'>
                <p className='flex items-center justify-center mx-auto '>
                  {item.icon}
                </p>
              </div>

              <p className='flex items-center justify-center pb-4 pt-6 text-[#333] text-center text-[16px] md:text-[18px] font-medium leading-[120%]'>
                {item.title}
              </p>

              <p className='flex items-center justify-center text-[#4A4C56] text-center text-[14px] font-normal leading-[150%]'>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
