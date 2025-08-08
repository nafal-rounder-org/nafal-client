'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from '@/components/ui/SearchIcon';
import NotificationIcon from '@/components/ui/NotificationIcon';
import HomeIcon from '@/components/ui/HomeIcon';
import HouseIcon from '@/components/ui/HouseIcon';
import MagnifyingGlassIcon from '@/components/ui/MagnifyingGlassIcon';
import Icon from '@/components/ui/Icon';

interface NavigationBarProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
  variant?: 'home' | 'detail';
}

export function NavigationBar({
  showBackButton = false,
  showHomeButton = false,
  showSearchButton = true,
  showNotificationButton = true,
  variant = 'home',
}: NavigationBarProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleSearchClick = () => {
    // TODO: 검색 페이지로 이동
    console.log('Search clicked');
  };

  const handleNotificationClick = () => {
    // TODO: 알림 페이지로 이동
    console.log('Notification clicked');
  };

  return (
    <div className="h-14 bg-black flex items-center justify-between px-4">
      {/* 좌측 영역 */}
      <div className="flex items-center gap-4">
        {variant === 'detail' && (
          <button onClick={handleBackClick} className="w-6 h-6 flex items-center justify-center">
            <Icon name="arrow" strokeColor="white" strokeWidth={2} />
          </button>
        )}

        {variant === 'detail' && (
          <button onClick={handleHomeClick} className="w-6 h-6 flex items-center justify-center">
            <HouseIcon fillColor="white" />
          </button>
        )}

        {/* 홈 화면에서는 로고만 표시 */}
        {variant === 'home' && <img src="/assets/lg-nafal-white.svg" alt="Nafal" className="h-8 w-24" />}
      </div>

      {/* 우측 아이콘들 */}
      <div className="flex items-center gap-4">
        {showSearchButton && (
          <button onClick={handleSearchClick} className="w-6 h-6 flex items-center justify-center">
            <MagnifyingGlassIcon strokeColor="white" strokeWidth={2} />
          </button>
        )}

        {showNotificationButton && (
          <button onClick={handleNotificationClick} className="w-6 h-6 flex items-center justify-center">
            <NotificationIcon strokeColor="white" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
