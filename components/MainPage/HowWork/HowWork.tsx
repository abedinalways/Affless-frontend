import BrowseIcon from "@/components/Icons/BrowseIcon";
import CreateProfile from "@/components/Icons/crateProfile";
import DeleverIcon from "@/components/Icons/DeleverIcon";
import FoundEscrow from "@/components/Icons/FoundEscrowIcon";
import GetPaidIcon from "@/components/Icons/GetPaidIcon";
import GetProposal from "@/components/Icons/getProposal";
import MailIcon from "@/components/Icons/MailIcon";
import Postjob from "@/components/Icons/postJob";
import ReleaseFoundIcon from "@/components/Icons/ReleseFoundIcon";
import { EyeIcon } from "lucide-react";
import React from "react";

const data1 = [
  {
    ddf: "for client",
  },
  {
    id: 1,
    icon: <Postjob />,
    title: " Post Job",
    desc: "Describe your project needs and budget",
  },
  {
    id: 2,
    icon: <GetProposal />,
    title: " Get Proposals",
    desc: "Review editor profiles and proposals",
  },
  {
    id: 3,
    icon: <FoundEscrow />,
    title: "Fund Escrow",
    desc: "Secure payment until work is complete",
  },
  {
    id: 4,
    icon: <ReleaseFoundIcon/>,
    title: " Release Funds",
    desc: "Approve delivery and release payment",
  },
];

const data2 = [
  {
    ddf: "for client",
  },
  {
    id: 1,
    icon: <CreateProfile />,
    title: " Create Profile",
    desc: "Describe your project needs and budget",
  },
  {
    id: 2,
    icon: <BrowseIcon />,
    title: " Browse & Apply",
    desc: "Find projects that match your expertise",
  },
  {
    id: 3,
    icon: <DeleverIcon />,
    title: "Deliver",
    desc: "Complete project to client specifications",
  },
  {
    id: 4,
    icon: <GetPaidIcon />,
    title: " Get Paid",
    desc: "Receive payment securely and quickly",
  },
];

export default function HowWork() {
  return (
    <div className="bg-[#F9FAFB]">
      <div className="containers mx-auto py-8 lg:py-20">
        <div>
          <h3 className="text-[#333] text-center font-[Poppins]  text-[28px] md:text-[40px] lg:text-[64px] font-normal leading-[124%] ">
            How It Works
          </h3>

          <p className="text-[#4A4C56] text-center font-[Poppins] text-[18px] font-normal leading-[150%] mt-4">
            A simple, secure, and efficient process for both clients and editors
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 lg:gap-[34px] ">
            {/* LEFT CARD */}
            <div className="mt-10 bg-white shadow-lg w-full py-[30px] px-4 lg:px-8 rounded-lg">
              <p className="text-[#333] text-center font-[Poppins] text-[28px] lg:text-[32px] pb-8 font-medium leading-[130%]">
                For Clients
              </p>

              <div className="space-y-4 lg:space-y-[60px]">
                {data1.slice(1).map((item) => (
                  <div key={item.id} className="flex  gap-[18px]">
                    <div className="">{item.icon}</div>
                    <div>
                      <p className="text-[#333] font-[Poppins] text-[16px] md:text-[24px] font-medium pb-1.5 leading-[150%]">
                        {item.title}
                      </p>
                      <p className="text-[#4A4C56] font-[Poppins] text-[16px] font-normal leading-[150%]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="mt-10 bg-white shadow-lg w-full py-[30px] px-4 lg:px-8 rounded-lg ">
              <p className="text-[#333] text-center font-[Poppins] text-[28px] lg:text-[32px] font-medium leading-[130%] pb-8">
                For Editors
              </p>

              <div className="space-y-4 lg:space-y-[60px]">
                {data2.slice(1).map((item) => (
                  <div key={item.id} className="flex gap-[18px]">
                    <div>{item.icon}</div>
                    <div>
                      <p className="text-[#333] font-[Poppins] text-[16px] lg:text-[24px] font-medium leading-[150%] pb-1.5">
                        {item.title}
                      </p>
                      <p className="text-[#4A4C56] font-[Poppins] text-[16px] font-normal leading-[150%]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
