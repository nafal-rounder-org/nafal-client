'use client';

import React, { useState } from 'react';
import LikeButton from './LikeButton';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    eventName: string;
    currentPrice: number;
    bidCount: number;
    remainingTime: string;
    imageUrl: string;
    isLiked: boolean;
  };
  variant?: 'tile' | 'list';
  onClick?: () => void;
  onLikeToggle?: (productId: string) => void;
}

export default function ProductCard({ product, variant = 'tile', onClick, onLikeToggle }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle?.(product.id);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const renderImage = () => {
    if (imageError) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">이미지 없음</span>
        </div>
      );
    }

    return (
      <>
        {imageLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </>
    );
  };

  if (variant === 'list') {
    return (
      <div
        className="flex bg-white border border-[#E0E0E0] cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        {/* 이미지 영역 */}
        <div className="relative w-[138px] h-[138px] bg-gray-200">
          {renderImage()}
          <LikeButton isLiked={product.isLiked} onClick={handleLikeClick} className="absolute bottom-2 right-2" />
        </div>

        {/* 정보 영역 */}
        <div className="flex-1 p-4">
          <div className="mb-2">
            <div className="text-xs font-semibold text-[#9E9E9E] mb-1">{product.eventName}</div>
            <div className="text-sm text-black leading-[1.4] line-clamp-2">{product.name}</div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-[#616161]">현재가</span>
            <span className="text-base font-bold text-black">{product.currentPrice.toLocaleString()}원</span>
          </div>

          <div className="flex gap-2">
            <div className="bg-[#A3DDD4] text-xs font-semibold text-[#9E9E9E] px-3 py-1 rounded">
              {product.bidCount}건 입찰
            </div>
            <div className="bg-[#E8FCF9] text-xs font-semibold text-[#6C918B] px-3 py-1 rounded">
              {product.remainingTime}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 타일형 (기본)
  return (
    <div
      className="bg-white border border-[#E0E0E0] cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* 이미지 영역 */}
      <div className="relative h-[171px] bg-gray-200">
        {renderImage()}

        {/* 입찰 정보 라벨 */}
        <div className="absolute top-2 right-2 bg-[#F4FEFC] text-xs font-semibold text-[#212121] px-3 py-1 rounded">
          {product.bidCount}건 입찰
        </div>

        {/* 찜하기 버튼 */}
        <LikeButton isLiked={product.isLiked} onClick={handleLikeClick} className="absolute bottom-2 right-2" />
      </div>

      {/* 정보 영역 */}
      <div className="p-2">
        <div className="mb-2">
          <div className="text-xs font-semibold text-[#9E9E9E] mb-1">{product.eventName}</div>
          <div className="text-sm text-black leading-[1.4] line-clamp-2">{product.name}</div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-[#616161]">현재가</span>
          <span className="text-base font-bold text-black">{product.currentPrice.toLocaleString()}원</span>
        </div>

        <div className="bg-[#E8FCF9] text-xs font-semibold text-[#6C918B] px-3 py-1 rounded text-center">
          {product.remainingTime}
        </div>
      </div>
    </div>
  );
}
