'use client';

import HeartIcon from '@/components/ui/HeartIcon';
import Icon from '@/components/ui/Icon';
import ShareIcon from '@/components/ui/ShareIcon';

interface BiddingNavigationProps {
  productId: string;
  onLikeClick: () => void;
}

export function BiddingNavigation({ productId, onLikeClick }: BiddingNavigationProps) {
  const handleShareClick = () => {
    // TODO: 공유 기능 구현
    console.log('Share clicked');
  };

  const handleBiddingClick = () => {
    // TODO: 입찰하기 기능 구현
    console.log('Bidding clicked');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] px-4 py-4">
      <div className="flex items-center justify-between">
        {/* 좋아요 및 공유 버튼 */}
        <div className="flex items-center gap-6">
          <button onClick={onLikeClick} className="w-6 h-6 flex items-center justify-center">
            <HeartIcon strokeColor="#000000" strokeWidth={1.5} />
          </button>

          <button onClick={handleShareClick} className="w-6 h-6 flex items-center justify-center">
            <ShareIcon strokeColor="#000000" strokeWidth={1.5} />
          </button>
        </div>

        {/* 입찰하기 버튼 */}
        <button onClick={handleBiddingClick} className="bg-black text-white px-16 py-4 rounded font-bold text-base">
          입찰하기
        </button>
      </div>
    </div>
  );
}
