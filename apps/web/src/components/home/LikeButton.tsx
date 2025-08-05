'use client';

import React from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export default function LikeButton({ isLiked, onClick, className = '' }: LikeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm ${className}`}
      aria-label={isLiked ? '찜하기 해제' : '찜하기'}
    >
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 13.5L7.1 12.6C3.4 9.2 1 6.8 1 4.2C1 2.1 2.6 0.5 4.7 0.5C5.8 0.5 6.8 1 7.5 1.8C8.2 1 9.2 0.5 10.3 0.5C12.4 0.5 14 2.1 14 4.2C14 6.8 11.6 9.2 7.9 12.6L8 13.5Z"
          fill={isLiked ? '#FF5142' : 'none'}
          stroke={isLiked ? '#FF5142' : '#9E9E9E'}
          strokeWidth="1"
        />
      </svg>
    </button>
  );
}
