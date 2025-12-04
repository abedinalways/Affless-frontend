"use client";

import BreadCrumb from "./BreadCumb";

type PageBannerProps = {
  title: string;
  bgImage: string;
  links: { label: string; href?: string }[];
};

export default function PageBanner({ title, bgImage, links, }: PageBannerProps) {
  return (
  <div className="hidden md:block">
      <div
      className="h-[394px] bg-cover bg-center flex items-center "
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="containers justify-center items-start ">
        <h1 className="text-white text-[40px] md:text-[50px] lg:text-[56px] font-medium">{title}</h1>

        <BreadCrumb links={links} />
      </div>
    </div>
  </div>
  );
}
