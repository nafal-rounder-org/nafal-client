'use client';

import React from 'react';

interface RefreshButtonProps {
  refreshTime: Date;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export default function RefreshButton({ refreshTime, isLoading = false, onRefresh }: RefreshButtonProps) {
  const currentTime = refreshTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="fixed bottom-20 right-4 z-10">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="bg-[#202020] bg-opacity-70 backdrop-blur-[20px] rounded-full px-2 py-1 flex items-center gap-2.5 disabled:opacity-50"
      >
        <span className="text-[#FFFFF5] text-xs leading-[1.4] tracking-[-0.016667em]">{currentTime} 기준</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isLoading ? 'animate-spin' : ''}
        >
          <path
            d="M10.5 2.5C9.5 1.5 8.25 1 7 1C4.25 1 2 3.25 2 6C2 8.75 4.25 11 7 11C9.25 11 11.25 9.25 11.5 7"
            stroke="#FFFFF5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 2.5L10.5 1.5L11.5 0.5"
            stroke="#FFFFF5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
