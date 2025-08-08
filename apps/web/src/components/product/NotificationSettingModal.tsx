'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface NotificationSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

interface NotificationTime {
  id: string;
  label: string;
  value: number; // 분 단위
}

export function NotificationSettingModal({ isOpen, onClose, productId }: NotificationSettingModalProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableTimes: NotificationTime[] = [
    { id: '10', label: '10분 전', value: 10 },
    { id: '30', label: '30분 전', value: 30 },
    { id: '60', label: '1시간 전', value: 60 },
    { id: '240', label: '4시간 전', value: 240 },
    { id: '720', label: '12시간 전', value: 720 },
  ];

  const handleTimeSelect = (timeId: string) => {
    if (selectedTimes.includes(timeId)) {
      setSelectedTimes(selectedTimes.filter((id) => id !== timeId));
    } else if (selectedTimes.length < 3) {
      setSelectedTimes([...selectedTimes, timeId]);
    }
  };

  const handleTimeRemove = (timeId: string) => {
    setSelectedTimes(selectedTimes.filter((id) => id !== timeId));
  };

  const handleComplete = () => {
    // TODO: 알림 설정 저장
    console.log('Selected times:', selectedTimes);
    onClose();
  };

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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-50 w-[300px] max-h-[280px] overflow-hidden">
        {/* 모달 헤더 */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
              <Icon name="close" strokeColor="#000000" strokeWidth={2} />
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-black">입찰 종료 전 알림을 드릴게요</h2>
            <p className="text-base text-[#202020] opacity-50">원하는 알림시간을 선택해 주세요 (최대 3개)</p>
          </div>
        </div>

        {/* 알림 시간 선택 */}
        <div className="px-6 pb-4">
          <div className="border border-[#E0E0E0] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 overflow-x-auto">
                {selectedTimes.map((timeId) => {
                  const time = availableTimes.find((t) => t.id === timeId);
                  return time ? (
                    <div
                      key={timeId}
                      className="flex items-center gap-1 px-3 py-2 bg-[#E0E0E0] rounded-full whitespace-nowrap"
                    >
                      <span className="text-sm text-black">{time.label}</span>
                      <button
                        onClick={() => handleTimeRemove(timeId)}
                        className="w-4 h-4 flex items-center justify-center"
                      >
                        <Icon name="close" strokeColor="#BDBDBD" strokeWidth={1} />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>

              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-5 h-5 flex items-center justify-center"
              >
                <Icon name="chevron-down" strokeColor="#91C4BC" strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* 드롭다운 */}
          {isDropdownOpen && (
            <div className="mt-2 border border-[#E0E0E0] rounded-lg overflow-hidden">
              {availableTimes.map((time) => (
                <button
                  key={time.id}
                  onClick={() => handleTimeSelect(time.id)}
                  disabled={selectedTimes.length >= 3 && !selectedTimes.includes(time.id)}
                  className={`w-full px-4 py-3 text-left text-sm ${
                    selectedTimes.includes(time.id)
                      ? 'bg-[#E0E0E0] text-black'
                      : selectedTimes.length >= 3
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 완료 버튼 */}
        <div className="px-6 pb-6">
          <button onClick={handleComplete} className="w-full py-3 bg-[#A3DDD4] text-white font-bold text-sm rounded">
            완료
          </button>
        </div>
      </div>
    </>
  );
}
