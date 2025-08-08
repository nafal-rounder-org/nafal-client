'use client';

import { useState } from 'react';
// import StatusBar from '@/components/layout/StatusBar';
import { NavigationBar } from '@/components/layout/NavigationBar';
import { ProductHeader } from './ProductHeader';
import { ProductInfo } from './ProductInfo';
import { ProductTabs } from './ProductTabs';
import { BiddingNavigation } from './BiddingNavigation';
import { BiddingHistoryModal } from './BiddingHistoryModal';
import { NotificationSettingModal } from './NotificationSettingModal';

interface ProductDetailLayoutProps {
  productId: string;
}

export function ProductDetailLayout({ productId }: ProductDetailLayoutProps) {
  const [isBiddingHistoryOpen, setIsBiddingHistoryOpen] = useState(false);
  const [isNotificationSettingOpen, setIsNotificationSettingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFF5]">
      <NavigationBar variant="detail" showSearchButton showNotificationButton />

      <div className="flex flex-col">
        {/* 상품 이미지 섹션 */}
        <ProductHeader productId={productId} />

        {/* 상품 기본 정보 */}
        <ProductInfo
          productId={productId}
          onBiddingCountClick={() => setIsBiddingHistoryOpen(true)}
          onLikeClick={() => setIsNotificationSettingOpen(true)}
        />

        {/* 탭 네비게이션 */}
        <ProductTabs productId={productId} />

        {/* 하단 여백 */}
        <div className="h-24" />
      </div>

      {/* 하단 입찰 네비게이션 */}
      <BiddingNavigation productId={productId} onLikeClick={() => setIsNotificationSettingOpen(true)} />

      {/* 입찰 내역 모달 */}
      <BiddingHistoryModal
        isOpen={isBiddingHistoryOpen}
        onClose={() => setIsBiddingHistoryOpen(false)}
        productId={productId}
      />

      {/* 알림 설정 모달 */}
      <NotificationSettingModal
        isOpen={isNotificationSettingOpen}
        onClose={() => setIsNotificationSettingOpen(false)}
        productId={productId}
      />
    </div>
  );
}
