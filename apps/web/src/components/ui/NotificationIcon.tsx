import React from 'react';

interface NotificationIconProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export default function NotificationIcon({ 
  className = '', 
  strokeColor = 'white',
  strokeWidth = 2 
}: NotificationIconProps) {
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
        d="M9.35102 21C10.0561 21.6224 10.9824 22 11.9968 22C13.0113 22 13.9375 21.6224 14.6426 21M17.9968 8C17.9968 6.4087 17.3647 4.88258 16.2395 3.75736C15.1142 2.63214 13.5881 2 11.9968 2C10.4055 2 8.87943 2.63214 7.75421 3.75736C6.62899 4.88258 5.99685 6.4087 5.99685 8C5.99685 11.0902 5.21732 13.206 4.34651 14.6054C3.61198 15.7859 3.24471 16.3761 3.25817 16.5408C3.27309 16.7231 3.31171 16.7926 3.45862 16.9016C3.59131 17 4.18944 17 5.3857 17H18.608C19.8042 17 20.4024 17 20.535 16.9016C20.682 16.7926 20.7206 16.7231 20.7355 16.5408C20.749 16.3761 20.3817 15.7859 19.6472 14.6054C18.7763 13.206 17.9968 11.0902 17.9968 8Z" 
        stroke={strokeColor} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
} 