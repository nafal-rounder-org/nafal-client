'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHomeStore } from '@/stores/homeStore';
import { useRankingStore } from '@/stores/rankingStore';
import { NavigationBar } from '@/components/layout/NavigationBar';
import CategoryBar from './CategoryBar';
import BannerSection from './BannerSection';
import WishlistSection from './WishlistSection';
import RecommendationSection from './RecommendationSection';
import NewSection from './NewSection';
import RankingSection from './RankingSection';
import MenuBar from './MenuBar';
import RefreshButton from './RefreshButton';

interface HomeScreenProps {
  defaultTab?: 'recommend' | 'new' | 'ranking' | 'upcoming' | 'ending' | 'ended';
}

export default function HomeScreen({ defaultTab = 'recommend' }: HomeScreenProps) {
  const router = useRouter();
  const { activeTab, newRefreshTime, newIsLoading, setNewRefreshTime, setNewIsLoading, setActiveTab } = useHomeStore();
  const {
    refreshTime: rankingRefreshTime,
    isLoading: rankingIsLoading,
    refreshData: rankingRefreshData,
  } = useRankingStore();

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

  // defaultTab에 따라 초기 탭 설정
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, setActiveTab]);

  // 새로고침 시간 업데이트 (1분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
      setNewRefreshTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [setNewRefreshTime]);

  // 새로고침 핸들러
  const handleRefresh = async () => {
    if (activeTab === 'new') {
      setNewIsLoading(true);
      try {
        // TODO: 실제 API 호출로 교체
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNewRefreshTime(new Date());
        console.log('신규 탭 데이터 새로고침 완료');
      } catch (error) {
        console.error('신규 탭 새로고침 실패:', error);
      } finally {
        setNewIsLoading(false);
      }
    } else if (activeTab === 'ranking') {
      try {
        await rankingRefreshData();
        console.log('랭킹 탭 데이터 새로고침 완료');
      } catch (error) {
        console.error('랭킹 탭 새로고침 실패:', error);
      }
    } else {
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
    // 상품 상세 페이지로 이동
    router.push(`/product/${productId}`);
  };

  // 탭별 콘텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'new':
        return (
          <div className="pb-24">
            <NewSection />
          </div>
        );
      case 'ranking':
        return (
          <div className="pb-24">
            <RankingSection onProductClick={handleProductClick} onLikeToggle={handleLikeToggle} />
          </div>
        );
      case 'recommend':
      default:
        return (
          <div className="px-4 pb-24">
            {hasWishlist && <WishlistSection onProductClick={handleProductClick} onLikeToggle={handleLikeToggle} />}
            <RecommendationSection onProductClick={handleProductClick} onLikeToggle={handleLikeToggle} />
          </div>
        );
    }
  };

  // 새로고침 버튼 표시 여부
  const shouldShowRefreshButton = activeTab === 'new' || activeTab === 'recommend' || activeTab === 'ranking';

  // 현재 탭에 따른 새로고침 시간과 로딩 상태
  const getCurrentRefreshTime = () => {
    switch (activeTab) {
      case 'new':
        return newRefreshTime;
      case 'ranking':
        return rankingRefreshTime;
      default:
        return refreshTime;
    }
  };

  const getCurrentIsLoading = () => {
    switch (activeTab) {
      case 'new':
        return newIsLoading;
      case 'ranking':
        return rankingIsLoading;
      default:
        return isLoading;
    }
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
      <NavigationBar variant="home" />

      {/* 카테고리 바 */}
      <CategoryBar />

      {/* 배너 섹션 (추천 탭에서만 표시) */}
      {activeTab === 'recommend' && <BannerSection />}

      {/* 메인 콘텐츠 */}
      {renderContent()}

      {/* 메뉴 바 */}
      <MenuBar />

      {/* 새로고침 버튼 */}
      {shouldShowRefreshButton && (
        <RefreshButton
          refreshTime={getCurrentRefreshTime()}
          isLoading={getCurrentIsLoading()}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}
