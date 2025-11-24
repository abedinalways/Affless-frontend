type KeyIconProps = {
  className?: string;
};

export default function Logo({ className }: KeyIconProps) {
  return (
    <svg
      width="128"
      height="42"
      viewBox="0 0 128 42"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="keyPattern"
          patternUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            href="/key.png"
            width="128"
            height="42"
            preserveAspectRatio="none"
          />
        </pattern>
      </defs>

      <rect width="128" height="42" fill="url(#keyPattern)" />
    </svg>
  );
}
