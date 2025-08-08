'use client';

import { useState, useEffect } from 'react';
import { TabBar } from './TabBar';
import { HistoryTab } from './tabs/HistoryTab';
import { BasicInfoTab } from './tabs/BasicInfoTab';
import { ExpectedEffectTab } from './tabs/ExpectedEffectTab';
import { DetailInfoTab } from './tabs/DetailInfoTab';

interface ProductTabsProps {
  productId: string;
}

type TabType = 'history' | 'basic' | 'expected' | 'detail';

export function ProductTabs({ productId }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [isTabBarFixed, setIsTabBarFixed] = useState(false);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 탭 바가 고정될 위치 (상품 정보 섹션 끝)
      const tabBarOffset = 600; // TODO: 실제 위치로 조정
      setIsTabBarFixed(scrollY > tabBarOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'history', label: '히스토리' },
    { id: 'basic', label: '기본 정보' },
    { id: 'expected', label: '기대 효과' },
    { id: 'detail', label: '상세 정보' },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryTab productId={productId} />;
      case 'basic':
        return <BasicInfoTab productId={productId} />;
      case 'expected':
        return <ExpectedEffectTab productId={productId} />;
      case 'detail':
        return <DetailInfoTab productId={productId} />;
      default:
        return <HistoryTab productId={productId} />;
    }
  };

  return (
    <div className="relative">
      {/* 고정된 탭 바 */}
      {isTabBarFixed && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E0E0E0]">
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId as TabType)} />
        </div>
      )}

      {/* 일반 탭 바 */}
      {!isTabBarFixed && <TabBar tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId as TabType)} />}

      {/* 탭 콘텐츠 */}
      <div className={isTabBarFixed ? 'pt-14' : ''}>{renderTabContent()}</div>
    </div>
  );
}
