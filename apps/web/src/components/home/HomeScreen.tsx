'use client';

import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/layout/NavigationBar';
import CategoryBar from './CategoryBar';
import BannerSection from './BannerSection';
import WishlistSection from './WishlistSection';
import RecommendationSection from './RecommendationSection';
import MenuBar from './MenuBar';
import RefreshButton from './RefreshButton';

export default function HomeScreen() {
  // 상태 관리
  const [hasWishlist, setHasWishlist] = useState(true);
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  // 새로고침 시간 업데이트 (1분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 새로고침 핸들러
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRefreshTime(new Date());
      console.log('데이터 새로고침 완료');
    } catch (error) {
      console.error('새로고침 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 찜하기 토글 핸들러
  const handleLikeToggle = async (productId: string) => {
    try {
      // TODO: 실제 찜하기 API 호출로 교체
      console.log('찜하기 토글:', productId);
    } catch (error) {
      console.error('찜하기 토글 실패:', error);
    }
  };

  // 상품 클릭 핸들러
  const handleProductClick = (productId: string) => {
    // TODO: 상품 상세 페이지로 이동
    console.log('상품 클릭:', productId);
  };

  return (
    <div
      className="min-h-screen bg-[#FFFFF5]"
      style={{
        paddingTop: isMobile ? 'env(safe-area-inset-top, 44px)' : '0px',
        paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 34px)' : '0px',
        paddingLeft: isMobile ? 'env(safe-area-inset-left, 0px)' : '0px',
        paddingRight: isMobile ? 'env(safe-area-inset-right, 0px)' : '0px',
      }}
    >
      {/* 네비게이션 바 */}
      <NavigationBar />

      {/* 카테고리 바 */}
      <CategoryBar />

      {/* 배너 섹션 */}
      <BannerSection />

      {/* 메인 콘텐츠 */}
      <div className="px-4 pb-24">
        {hasWishlist && <WishlistSection onProductClick={handleProductClick} onLikeToggle={handleLikeToggle} />}
        <RecommendationSection onProductClick={handleProductClick} onLikeToggle={handleLikeToggle} />
      </div>

      {/* 메뉴 바 */}
      <MenuBar />

      {/* 새로고침 버튼 */}
      <RefreshButton refreshTime={refreshTime} isLoading={isLoading} onRefresh={handleRefresh} />
    </div>
  );
}
