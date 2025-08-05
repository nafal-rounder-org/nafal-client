'use client';

import React from 'react';

const categories = [
  { id: 'recommend', label: '추천', active: true },
  { id: 'new', label: '신규', active: false },
  { id: 'ranking', label: '랭킹', active: false },
  { id: 'upcoming', label: '오픈예정', active: false },
  { id: 'ending', label: '마감임박', active: false },
  { id: 'ended', label: '마감', active: false },
];

export default function CategoryBar() {
  return (
    <div className="flex items-end bg-black overflow-x-auto h-[42px]">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`flex-shrink-0 flex flex-col items-center px-4 pb-2 ${
            category.active ? 'text-white font-bold' : 'text-[#9E9E9E] font-normal'
          }`}
        >
          <span className="text-base leading-[1.4] tracking-[-0.025em] whitespace-nowrap">{category.label}</span>
          {category.active && <div className="w-full h-0.5 bg-white mt-2 -mb-2" />}
        </button>
      ))}
    </div>
  );
}
