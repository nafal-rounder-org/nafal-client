'use client';

import { useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface BiddingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

interface BiddingHistory {
  id: string;
  bidder: string;
  bidTime: string;
  bidAmount: string;
  isCurrentBid: boolean;
}

export function BiddingHistoryModal({ isOpen, onClose, productId }: BiddingHistoryModalProps) {
  // TODO: 실제 입찰 내역 데이터로 교체
  const biddingHistory: BiddingHistory[] = [
    {
      id: '1',
      bidder: '1번 입찰자',
      bidTime: '2025.00.00 00:00:00',
      bidAmount: '95,000원',
      isCurrentBid: true,
    },
    {
      id: '2',
      bidder: '2번 입찰자',
      bidTime: '2025.00.00 00:00:00',
      bidAmount: '95,000원',
      isCurrentBid: true,
    },
    {
      id: '3',
      bidder: '3번 입찰자',
      bidTime: '2025.00.00 00:00:00',
      bidAmount: '95,000원',
      isCurrentBid: true,
    },
    {
      id: '4',
      bidder: '3번 입찰자',
      bidTime: '2025.00.00 00:00:00',
      bidAmount: '95,000원',
      isCurrentBid: true,
    },
    {
      id: '5',
      bidder: '3번 입찰자',
      bidTime: '2025-00-00 00:00',
      bidAmount: '95,000원',
      isCurrentBid: false,
    },
  ];

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50" onClick={onClose} />

      {/* 모달 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-50 max-h-[75vh] overflow-hidden">
        {/* 모달 헤더 */}
        <div className="p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold text-black">입찰 내역</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
              <Icon name="close" strokeColor="#000000" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* 입찰 내역 목록 */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {biddingHistory.map((bid, index) => (
            <div
              key={bid.id}
              className={`p-4 rounded-lg border ${bid.isCurrentBid ? 'bg-[#FAFAFA] shadow-sm' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-base font-bold text-black">{bid.bidder}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#9E9E9E]">입찰 시간</span>
                      <span className="text-sm font-bold text-black">{bid.bidTime}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#9E9E9E]">입찰가</span>
                      <span className="text-sm font-bold text-black">{bid.bidAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
