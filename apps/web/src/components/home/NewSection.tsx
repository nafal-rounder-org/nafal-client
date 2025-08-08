'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useHomeStore } from '@/stores/homeStore';
import ProductCard from './ProductCard';

// 목업 데이터
const mockProducts = [
  {
    id: '1',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 150000,
    bidCount: 5,
    remainingTime: '2시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=358&h=256&fit=crop&crop=center',
    isLiked: false,
    category: ['favorite', 'showroom'],
  },
  {
    id: '2',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 250000,
    bidCount: 12,
    remainingTime: '5시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center',
    isLiked: true,
    category: ['artwork', 'access'],
  },
  {
    id: '3',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 180000,
    bidCount: 8,
    remainingTime: '1시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=center',
    isLiked: false,
    category: ['favorite'],
  },
  {
    id: '4',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 320000,
    bidCount: 15,
    remainingTime: '3시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop&crop=center',
    isLiked: true,
    category: ['showroom', 'artwork'],
  },
  {
    id: '5',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 95000,
    bidCount: 3,
    remainingTime: '8시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center',
    isLiked: false,
    category: ['access'],
  },
  {
    id: '6',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 420000,
    bidCount: 20,
    remainingTime: '1시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center',
    isLiked: true,
    category: ['favorite', 'artwork'],
  },
  {
    id: '7',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 280000,
    bidCount: 7,
    remainingTime: '4시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=center',
    isLiked: false,
    category: ['showroom'],
  },
  {
    id: '8',
    title: '베이컨트 아카이브 아일렛 스크런치 마젠타',
    eventName: '입점행사명',
    currentPrice: 190000,
    bidCount: 11,
    remainingTime: '6시간 남음',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop&crop=center',
    isLiked: true,
    category: ['artwork', 'access'],
  },
];

export default function NewSection() {
  const { newProducts, setNewProducts, toggleProductLike } = useHomeStore();

  // 초기 데이터 로드
  useEffect(() => {
    if (newProducts.length === 0) {
      setNewProducts(mockProducts);
    }
  }, [newProducts.length, setNewProducts]);

  // 모든 상품 표시 (카테고리 필터링 없음)
  const filteredProducts = newProducts;

  const handleProductClick = (productId: string) => {
    // TODO: 상품 상세 페이지로 이동
    console.log('상품 클릭:', productId);
  };

  const handleLikeToggle = (productId: string) => {
    toggleProductLike(productId);
  };

  return (
    <div>
      {/* 제목 섹션 */}
      <div className="px-4 py-4">
        <h2 className="text-[22px] font-bold text-black text-left leading-[1.4] tracking-[-1.3636364178224043%]">
          새로 공개된 인기 경매
        </h2>
      </div>

      {/* 상품 목록 */}
      <div className="px-4">
        {/* 첫 번째 상품 - 큰 이미지 */}
        {filteredProducts.length > 0 && (
          <div className="mb-4">
            <div
              className="relative w-full h-[256px] rounded cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => handleProductClick(filteredProducts[0].id)}
            >
              <Image
                src={filteredProducts[0].imageUrl}
                alt={filteredProducts[0].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onError={() => {
                  console.error('이미지 로드 실패:', filteredProducts[0].imageUrl);
                }}
              />
            </div>
          </div>
        )}

        {/* 나머지 상품들 - 2열 그리드 */}
        {filteredProducts.length > 1 && (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.slice(1).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="tile"
                onClick={() => handleProductClick(product.id)}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">상품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
