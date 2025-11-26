import React from "react";

type GlobeIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function WorldIcon({
  size = 16,
  color = "#333333",
  className,
}: GlobeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M14.6673 7.9987C14.6673 11.6806 11.6825 14.6654 8.00065 14.6654M14.6673 7.9987C14.6673 4.3168 11.6825 1.33203 8.00065 1.33203M14.6673 7.9987C14.6673 6.89413 11.6825 5.9987 8.00065 5.9987C4.31875 5.9987 1.33398 6.89413 1.33398 7.9987M14.6673 7.9987C14.6673 9.10327 11.6825 9.9987 8.00065 9.9987C4.31875 9.9987 1.33398 9.10327 1.33398 7.9987M8.00065 14.6654C4.31875 14.6654 1.33398 11.6806 1.33398 7.9987M8.00065 14.6654C9.47341 14.6654 10.6673 11.6806 10.6673 7.9987C10.6673 4.3168 9.47341 1.33203 8.00065 1.33203M8.00065 14.6654C6.52789 14.6654 5.33398 11.6806 5.33398 7.9987C5.33398 4.3168 6.52789 1.33203 8.00065 1.33203M1.33398 7.9987C1.33398 4.3168 4.31875 1.33203 8.00065 1.33203"
          stroke={color}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
