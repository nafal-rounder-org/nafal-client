import React from 'react';

interface MagnifyingGlassIconProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export default function MagnifyingGlassIcon({
  className = '',
  strokeColor = 'white',
  strokeWidth = 2,
}: MagnifyingGlassIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
