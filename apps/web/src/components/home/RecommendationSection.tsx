'use client';

import React from 'react';
import ProductCard from './ProductCard';

interface RecommendationSectionProps {
  onProductClick: (productId: string) => void;
  onLikeToggle: (productId: string) => void;
}

export default function RecommendationSection({ onProductClick, onLikeToggle }: RecommendationSectionProps) {
  // TODO: 실제 API에서 추천 상품 데이터 가져오기
  const recommendedProducts = [
    {
      id: 'rec1',
      name: '추천 상품 1',
      eventName: '경매 이벤트 1',
      currentPrice: 150000,
      bidCount: 12,
      remainingTime: '24시간 30분',
      imageUrl: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=추천상품1',
      isLiked: false,
    },
    {
      id: 'rec2',
      name: '추천 상품 2',
      eventName: '경매 이벤트 2',
      currentPrice: 89000,
      bidCount: 8,
      remainingTime: '48시간 15분',
      imageUrl: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=추천상품2',
      isLiked: true,
    },
    {
      id: 'rec3',
      name: '추천 상품 3',
      eventName: '경매 이벤트 3',
      currentPrice: 230000,
      bidCount: 15,
      remainingTime: '12시간 45분',
      imageUrl: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=추천상품3',
      isLiked: false,
    },
    {
      id: 'rec4',
      name: '추천 상품 4',
      eventName: '경매 이벤트 4',
      currentPrice: 67000,
      bidCount: 5,
      remainingTime: '72시간 20분',
      imageUrl: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=추천상품4',
      isLiked: false,
    },
  ];

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">추천 상품</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700">더보기</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="tile"
            onClick={() => onProductClick(product.id)}
            onLikeToggle={onLikeToggle}
          />
        ))}
      </div>
    </section>
  );
}
