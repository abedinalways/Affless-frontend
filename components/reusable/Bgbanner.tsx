"use client";

import BreadCrumb from "./BreadCumb";

type PageBannerProps = {
  title: string;
  bgImage: string;
  links: { label: string; href?: string }[];
};

export default function PageBanner({ title, bgImage, links }: PageBannerProps) {
  return (
    <div
      className="h-[394px] bg-cover bg-center"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="container pt-20 mx-auto">
        <h1 className="text-white text-[64px] font-medium">{title}</h1>

        <BreadCrumb links={links} />
      </div>
    </div>
  );
}
