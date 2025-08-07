'use client';

import React, { useEffect } from 'react';
import { useRankingStore } from '@/stores/rankingStore';
import SortDropdown from './SortDropdown';
import CategoryFilter from './CategoryFilter';
import RankingProductCard from './RankingProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface RankingSectionProps {
  onProductClick: (productId: string) => void;
  onLikeToggle: (productId: string) => void;
}

export default function RankingSection({ onProductClick, onLikeToggle }: RankingSectionProps) {
  const {
    products,
    selectedCategories,
    sortType,
    isLoading,
    error,
    setSelectedCategories,
    setSortType,
    fetchRankingProducts,
    sortProducts,
    filterProducts,
  } = useRankingStore();

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchRankingProducts();
  }, [fetchRankingProducts]);

  // 정렬 타입 변경 핸들러
  const handleSortChange = (newSortType: 'bidCount' | 'maxBid') => {
    setSortType(newSortType);
  };

  // 카테고리 필터 변경 핸들러
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  // 정렬 및 필터링된 상품 목록
  const sortedProducts = sortProducts();
  const filteredProducts = filterProducts();
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : sortedProducts;

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="w-full">
        <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
        <div className="flex justify-between items-center px-4 py-4">
          <h1 className="text-[22px] font-bold text-black">인기 베스트</h1>
          <SortDropdown currentSort={sortType} onSortChange={handleSortChange} />
        </div>
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="w-full">
        <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
        <div className="flex justify-between items-center px-4 py-4">
          <h1 className="text-[22px] font-bold text-black">인기 베스트</h1>
          <SortDropdown currentSort={sortType} onSortChange={handleSortChange} />
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchRankingProducts}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 카테고리 필터 */}
      <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />

      {/* 제목 및 정렬 섹션 */}
      <div className="flex justify-between items-center px-4 py-4">
        <h1 className="text-[22px] font-bold text-black">인기 베스트</h1>
        <SortDropdown currentSort={sortType} onSortChange={handleSortChange} />
      </div>

      {/* 상품 목록 */}
      <div className="px-4">
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {displayProducts.map((product) => (
              <RankingProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onLikeToggle={onLikeToggle}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-gray-500">선택된 카테고리에 해당하는 상품이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">다른 카테고리를 선택해보세요.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
