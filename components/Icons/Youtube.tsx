import React from 'react'

type KeyIconProps = {
  className?: string;
};

export default function Youtube({ className }: KeyIconProps) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="42" height="30" viewBox="0 0 42 30" fill="none" className={className}>
  <path d="M33.2771 0H8.72286C3.90535 0 0 3.90535 0 8.72286V20.9974C0 25.8149 3.90535 29.7203 8.72286 29.7203H33.2771C38.0946 29.7203 42 25.8149 42 20.9974V8.72286C42 3.90535 38.0946 0 33.2771 0ZM27.3779 15.4573L15.8931 20.9349C15.5871 21.0809 15.2336 20.8577 15.2336 20.5187V9.22121C15.2336 8.87738 15.5964 8.65453 15.903 8.80996L27.3879 14.6299C27.7293 14.8029 27.7234 15.2926 27.3779 15.4573Z" fill="white"/>
</svg>
  );
}
