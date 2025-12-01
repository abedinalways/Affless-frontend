import React from "react";

type KeyIconProps = {
  className?: string;
};

export default function HandBreackIcon({ className }: KeyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="19"
      viewBox="0 0 24 19"
      fill="none"
      className={className}
    >
      <path
        d="M3.07967 16.3103C1.46811 14.3576 0.5 11.8541 0.5 9.12448C0.5 6.38525 1.47495 3.87373 3.09673 1.91797M20.497 1.91797C22.1188 3.87373 23.0938 6.38525 23.0938 9.12448C23.0938 11.8541 22.1256 14.3576 20.5141 16.3103"
        stroke="white"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7969 17.75C16.5603 17.75 20.4219 13.8885 20.4219 9.125C20.4219 4.36154 16.5603 0.5 11.7969 0.5C7.03342 0.5 3.17188 4.36154 3.17188 9.125C3.17188 13.8885 7.03342 17.75 11.7969 17.75Z"
        stroke="white"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7969 4.64844V11.0035M11.7969 13.5664V13.5986"
        stroke="white"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
