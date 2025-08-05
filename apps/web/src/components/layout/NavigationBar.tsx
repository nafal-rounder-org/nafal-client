'use client';

import React from 'react';
import SearchIcon from '@/components/ui/SearchIcon';
import NotificationIcon from '@/components/ui/NotificationIcon';

export default function NavigationBar() {
  return (
    <div className="h-14 bg-black flex items-center justify-between px-4">
      {/* 로고 */}
      <div className="flex items-center">
        <img
          src="/assets/lg-nafal-white.svg"
          alt="Nafal"
          className="h-8 w-24"
        />
      </div>

      {/* 우측 아이콘들 */}
      <div className="flex items-center gap-4">
        {/* 검색 아이콘 */}
        <button className="w-6 h-6 flex items-center justify-center">
          <SearchIcon strokeColor="white" strokeWidth={1.5} />
        </button>

        {/* 알림 아이콘 */}
        <button className="w-6 h-6 flex items-center justify-center">
          <NotificationIcon strokeColor="white" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
