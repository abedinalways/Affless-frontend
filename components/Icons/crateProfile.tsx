import React from 'react'

type KeyIconProps = {
  className?: string;
};

export default function CreateProfile({ className }: KeyIconProps) {
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

      <ellipse
        cx="20"
        cy="27.5"
        rx="7"
        ry="3.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <circle
        cx="20"
        cy="17"
        r="4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M31 21H27"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M29 19L29 23"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
