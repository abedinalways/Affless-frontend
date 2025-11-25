import React from 'react'

type KeyIconProps = {
  className?: string;
};

export default function ReleaseIcon({ className }: KeyIconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="44" height="44" rx="22" fill="#FF4D4F" />
      
      <g clipPath="url(#clip0_6769_11735)">
        <path
          d="M23.7314 25.0624C25.7302 25.0624 27.3563 23.4392 ..."
          fill="white"
        />
      </g>

      <defs>
        <clipPath id="clip0_6769_11735">
          <rect width="24" height="24" fill="white" transform="translate(10 10)" />
        </clipPath>
      </defs>
    </svg>
  );
}
