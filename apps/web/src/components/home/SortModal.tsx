'use client';

import React, { useEffect, useState } from 'react';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: 'bidCount' | 'maxBid';
  onSortChange: (sortType: 'bidCount' | 'maxBid') => void;
}

export default function SortModal({ isOpen, onClose, currentSort, onSortChange }: SortModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sortOptions = [
    { value: 'bidCount', label: '입찰건 순' },
    { value: 'maxBid', label: '최고 입찰가 순' },
  ];

  const handleOptionClick = (value: 'bidCount' | 'maxBid') => {
    onSortChange(value);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // 약간의 지연 후 애니메이션 시작
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* 모달 */}
      <div
        className={`fixed bottom-0 bg-white rounded-t-[20px] z-50 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          width: '390px',
          height: '220px',
          left: 'calc(50% - 390px/2)',
        }}
      >
        <div
          className="flex flex-col items-start h-full"
          style={{
            padding: '48px 0px',
            gap: '24px',
          }}
        >
          {/* 구분선 */}
          <div className="flex justify-center w-full">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* 정렬 옵션들 */}
          <div
            className="flex flex-col justify-center items-center w-full"
            style={{
              padding: '8px 24px',
              height: '124px',
            }}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value as 'bidCount' | 'maxBid')}
                className="w-full flex justify-start items-center transition-colors"
                style={{
                  fontFamily: 'Pretendard Variable',
                  fontSize: '16px',
                  lineHeight: '140%',
                  letterSpacing: '-0.25px',
                  width: '342px',
                  height: '54px',
                  padding: '16px 0px',
                  color: currentSort === option.value ? '#000000' : '#9E9E9E',
                  fontWeight: currentSort === option.value ? '700' : '400',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
