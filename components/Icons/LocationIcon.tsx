import React from "react";

type LocationIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function LocationIcon({
  size = 16,
  color = "#333333",
  className,
}: LocationIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M14 7.25796C14 10.5308 10.25 14.6654 8 14.6654C5.75 14.6654 2 10.5308 2 7.25796C2 3.98516 4.68629 1.33203 8 1.33203C11.3137 1.33203 14 3.98516 14 7.25796Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 7.33203C10 8.4366 9.10457 9.33203 8 9.33203C6.89543 9.33203 6 8.4366 6 7.33203C6 6.22746 6.89543 5.33203 8 5.33203C9.10457 5.33203 10 6.22746 10 7.33203Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
