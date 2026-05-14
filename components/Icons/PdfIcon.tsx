import React from "react";

type KeyIconProps = {
  className?: string;
};
export default function PdfIcon({ className }: KeyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <path
        d="M40.9998 21V20C40.9998 12.4575 40.9998 8.6863 38.6568 6.34314C36.3136 4 32.5424 4 24.9998 4H23C15.4577 4 11.6865 4 9.34332 6.34312C7.00018 8.68624 7.00014 12.4574 7.00008 19.9999L7 29C6.99994 35.5748 6.99992 38.8624 8.81576 41.075C9.14824 41.4802 9.51972 41.8516 9.92484 42.1842C12.1375 44 15.425 44 21.9998 44"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 14H33"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 24H27"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41 40V34C41 31.1412 38.3138 28 35 28C31.6862 28 29 31.1412 29 34V41C29 42.6568 30.3432 44 32 44C33.6568 44 35 42.6568 35 41V34"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
