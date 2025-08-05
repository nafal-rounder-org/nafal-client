'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useHomeStore } from '@/stores/homeStore';

const categories = [
  { id: 'recommend', label: '추천', path: '/home/recommendation' },
  { id: 'new', label: '신규', path: '/home/new' },
  { id: 'ranking', label: '랭킹', path: '/home/ranking' },
  { id: 'upcoming', label: '오픈예정', path: '/home/upcoming' },
  { id: 'ending', label: '마감임박', path: '/home/ending' },
  { id: 'ended', label: '마감', path: '/home/ended' },
];

export default function CategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useHomeStore();

  const handleTabClick = (tabId: string) => {
    const category = categories.find((cat) => cat.id === tabId);
    if (category) {
      setActiveTab(tabId as any);
      router.push(category.path);
    }
  };

  return (
    <div className="flex items-end bg-black overflow-x-auto h-[42px]">
      {categories.map((category) => {
        const isActive = activeTab === category.id;
        return (
          <button
            key={category.id}
            onClick={() => handleTabClick(category.id)}
            className={`flex-shrink-0 flex flex-col items-center px-4 pb-2 ${
              isActive ? 'text-white font-bold' : 'text-[#9E9E9E] font-normal'
            }`}
          >
            <span className="text-base leading-[1.4] tracking-[-0.025em] whitespace-nowrap">{category.label}</span>
            {isActive && <div className="w-full h-0.5 bg-white mt-2 -mb-2" />}
          </button>
        );
      })}
    </div>
  );
}
