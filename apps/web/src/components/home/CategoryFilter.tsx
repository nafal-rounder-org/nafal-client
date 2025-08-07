'use client';

import React from 'react';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const categories = ['최애의 아이템', '위대한 쇼룸', '0번째 작품', '관계자 외 출입 가능'];

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <button
            key={category}
            onClick={() => handleCategoryToggle(category)}
            className={`flex-shrink-0 flex items-center px-2.5 py-2 gap-1 h-9 transition-colors ${
              isSelected ? 'bg-white border border-black text-black' : 'bg-white border border-gray-300 text-gray-500'
            }`}
            style={{
              fontFamily: 'Pretendard Variable',
              fontSize: '14px',
              lineHeight: '140%',
              letterSpacing: '-0.2px',
              textAlign: 'center' as const,
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
