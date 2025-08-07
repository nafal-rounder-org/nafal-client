'use client';

import React, { useState, useEffect } from 'react';
import SortModal from './SortModal';

interface SortDropdownProps {
  currentSort: 'bidCount' | 'maxBid';
  onSortChange: (sortType: 'bidCount' | 'maxBid') => void;
}

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sortOptions = [
    { value: 'bidCount', label: '입찰건 순' },
    { value: 'maxBid', label: '최고 입찰가 순' },
  ];

  const currentOption = sortOptions.find((option) => option.value === currentSort);

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOptionClick = (value: 'bidCount' | 'maxBid') => {
    onSortChange(value);
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    if (isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        {/* 드롭다운 버튼 */}
        <button
          onClick={handleButtonClick}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          <span>{currentOption?.label}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform ${isOpen && !isMobile ? 'rotate-180' : ''}`}
          >
            <path d="M4 6L8 10L12 6" stroke="#6C918B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* 데스크톱 드롭다운 메뉴 */}
        {!isMobile && isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value as 'bidCount' | 'maxBid')}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                  currentSort === option.value ? 'text-black font-medium' : 'text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* 데스크톱 오버레이 */}
        {!isMobile && isOpen && <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />}
      </div>

      {/* 모바일 모달 */}
      <SortModal
        isOpen={isMobile && isOpen}
        onClose={handleModalClose}
        currentSort={currentSort}
        onSortChange={onSortChange}
      />
    </>
  );
}
