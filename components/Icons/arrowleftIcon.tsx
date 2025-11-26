import React from "react";

type ArrowLeftIconProps = {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
};

export default function ArrowLeftIcon({
  className,
  color = "white",
  width = 20,
  height = 20,
}: ArrowLeftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M10.5878 14.4102L7.01031 10.8327H14.9986V9.16599H7.01031L10.5878 5.58849L9.40948 4.41016L3.82031 9.99932L9.40948 15.5885L10.5878 14.4102Z"
        fill={color}
      />
    </svg>
  );
}
