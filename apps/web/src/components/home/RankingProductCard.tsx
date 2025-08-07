'use client';

import React from 'react';
import { RankingProduct } from '@/stores/rankingStore';
import RankBadge from '@/components/ui/RankBadge';
import HeartIcon from '@/components/ui/HeartIcon';

interface RankingProductCardProps {
  product: RankingProduct;
  onProductClick: (productId: string) => void;
  onLikeToggle: (productId: string) => void;
}

export default function RankingProductCard({ product, onProductClick, onLikeToggle }: RankingProductCardProps) {
  const handleCardClick = () => {
    onProductClick(product.id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle(product.id);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const generatePlaceholderImage = (text: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 100, 100);
    }
    return canvas.toDataURL();
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="relative h-[171px] bg-gray-200">
        <img
          src={product.imageUrl || generatePlaceholderImage('상품 이미지')}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = generatePlaceholderImage('이미지 로드 실패');
          }}
        />

        {/* 랭크 뱃지 */}
        <div className="absolute top-2 left-2">
          <RankBadge rank={product.rank} />
        </div>

        {/* 찜하기 버튼 */}
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 p-1 bg-white bg-opacity-80 rounded-full transition-colors hover:bg-opacity-100"
        >
          <HeartIcon isLiked={product.isLiked} />
        </button>
      </div>

      <div className="p-3">
        {/* 입찰 건수 */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">입찰 {product.bidCount}건</span>
          <span className="text-xs text-red-500">{product.remainingTime}</span>
        </div>

        {/* 상품명 */}
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

        {/* 이벤트명 */}
        <p className="text-xs text-gray-500 mb-2">{product.eventName}</p>

        {/* 현재가 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">{formatPrice(product.currentPrice)}원</span>
        </div>
      </div>
    </div>
  );
}
