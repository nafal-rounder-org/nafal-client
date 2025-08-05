'use client';

import React from 'react';
import ProductCard from './ProductCard';

interface WishlistSectionProps {
  onProductClick?: (productId: string) => void;
  onLikeToggle?: (productId: string) => void;
}

// 임시 데이터
const mockWishlistProducts = [
  {
    id: '1',
    name: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 150000,
    bidCount: 5,
    remainingTime: '2시간 남음',
    imageUrl: '/api/placeholder/300/200',
    isLiked: true,
  },
  {
    id: '2',
    name: '팝마트 라부부 더 몬스터즈 하이라이트 시리즈 행운 키링 (개봉 박스)',
    eventName: '입점행사명',
    currentPrice: 89000,
    bidCount: 12,
    remainingTime: '1일 남음',
    imageUrl: '/api/placeholder/300/200',
    isLiked: false,
  },
  {
    id: '3',
    name: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 150000,
    bidCount: 5,
    remainingTime: '2시간 남음',
    imageUrl: '/api/placeholder/300/200',
    isLiked: true,
  },
  {
    id: '4',
    name: '팝마트 라부부 더 몬스터즈 하이라이트 시리즈 행운 키링 (개봉 박스)',
    eventName: '입점행사명',
    currentPrice: 89000,
    bidCount: 12,
    remainingTime: '1일 남음',
    imageUrl: '/api/placeholder/300/200',
    isLiked: false,
  },
];

export default function WishlistSection({ onProductClick, onLikeToggle }: WishlistSectionProps) {
  const handleProductClick = (productId: string) => {
    onProductClick?.(productId);
  };

  const handleLikeToggle = (productId: string) => {
    onLikeToggle?.(productId);
  };

  const handleMoreClick = () => {
    // TODO: 최근 담은 위시리스트 페이지로 이동
    console.log('더보기 클릭');
  };

  return (
    <div className="mb-4">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center py-4">
        <h2 className="text-[22px] font-bold text-black leading-[1.4] tracking-[-0.013636em]">최근 담은 위시리스트</h2>
        <button
          onClick={handleMoreClick}
          className="flex items-center gap-1 text-xs text-[#616161] leading-[1.4] tracking-[-0.016667em]"
        >
          더보기
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4L10 8L6 12" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* 상품 리스트 */}
      <div className="space-y-4">
        {/* 타일형 상품들 (2열 그리드) */}
        <div className="grid grid-cols-2 gap-4">
          {mockWishlistProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="tile"
              onClick={() => handleProductClick(product.id)}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>

        {/* 리스트형 상품들 */}
        <div className="space-y-4">
          {mockWishlistProducts.slice(4, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="list"
              onClick={() => handleProductClick(product.id)}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
