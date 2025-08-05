'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import LikeButton from './LikeButton';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
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
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle?.(product.id);
  };

  const renderImage = () => {
    return (
      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onError={() => {
          // 에러 시 기본 이미지 표시
          console.error('이미지 로드 실패:', product.imageUrl);
        }}
      />
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
            <div className="text-sm text-black leading-[1.4] line-clamp-2">{product.title}</div>
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
          <div className="text-sm text-black leading-[1.4] line-clamp-2">{product.title}</div>
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
