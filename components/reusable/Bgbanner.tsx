"use client";

import BreadCrumb from "./BreadCumb";

type PageBannerProps = {
  title: string;
  desc?:string;
  bgImage: string;
  links: { label: string; href?: string }[];
};

export default function PageBanner({ title, bgImage, links, desc}: PageBannerProps) {
  return (
  <div className="hidden lg:block">
      <div
      className="h-[394px] bg-cover bg-center flex items-center "
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="containers justify-center items-start ">
        <h1 className="text-white text-[40px] md:text-[50px] lg:text-[56px] font-medium">{title}</h1>
        {desc&&<h1 className="text-white text-[16px] font-normal leading-150% pt-3 pb-6">{desc}</h1>}
        <BreadCrumb links={links} />
      </div>
    </div>
  </div>
  );
}
