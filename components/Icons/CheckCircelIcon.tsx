import React from 'react'

type KeyIconProps = {
  className?: string;
};
export default function CheckCircelIcon( {className}: KeyIconProps) {
  return (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="11" fill="#FF5151" />
    <path
      d="M6 11.5L9.5 15L16 8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
      </svg>

  )
}
