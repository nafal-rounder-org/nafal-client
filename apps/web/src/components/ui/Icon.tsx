import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function Icon({ 
  name, 
  size = 24, 
  className = '',
  onClick 
}: IconProps) {
  const getIconPath = () => {
    switch (name) {
      case 'arrow-left':
        return (
          <path 
            d="M10 2L4 7L10 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      case 'home':
        return (
          <path 
            d="M3 9L10.5 2L18 9V20H13V14H8V20H3V9Z" 
            fill="currentColor"
          />
        );
      case 'eye':
        return (
          <path 
            d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      case 'eye-off':
        return (
          <path 
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2 16 2 12C2 7.5 4.5 4 8 3.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        );
      default:
        return null;
    }
  };

  const Component = onClick ? 'button' : 'div';
  const props = onClick ? { onClick } : {};

  return (
    <Component
      {...props}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {getIconPath()}
      </svg>
    </Component>
  );
}
