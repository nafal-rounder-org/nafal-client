'use client';

import React from 'react';
import HomeIcon from '@/components/ui/HomeIcon';
import SearchIcon from '@/components/ui/SearchIcon';
import MenuIcon from '@/components/ui/MenuIcon';
import HeartIcon from '@/components/ui/HeartIcon';
import UserIcon from '@/components/ui/UserIcon';

const menuItems = [
  {
    id: 'home',
    label: 'HOME',
    icon: HomeIcon,
    active: true,
  },
  {
    id: 'search',
    label: 'SEARCH',
    icon: SearchIcon,
    active: false,
  },
  {
    id: 'category',
    label: 'CATEGORY',
    icon: MenuIcon,
    active: false,
  },
  {
    id: 'like',
    label: 'LIKE',
    icon: HeartIcon,
    active: false,
  },
  {
    id: 'my',
    label: 'MY',
    icon: UserIcon,
    active: false,
  },
];

export default function MenuBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] px-6 py-2">
      <div className="flex justify-between items-center">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 min-w-[31px] ${
                item.active ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="flex justify-center w-6 h-6">
                <IconComponent fillColor={item.active ? 'black' : '#9E9E9E'} className="w-6 h-6" />
              </div>
              <div
                className="text-center text-black flex justify-center items-center"
                style={{
                  fontFamily: 'Helvetica',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '140%',
                  height: '14px',
                  width: '31px',
                }}
              >
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
