'use client';

import { useEffect, useState } from 'react';

interface CarrierSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCarrier: (carrier: string) => void;
}

// 통신사 목록
const carriers = [
  { id: 'skt', name: 'SKT', isSelected: false },
  { id: 'lg', name: 'LG U+', isSelected: false },
  { id: 'kt', name: 'KT', isSelected: false },
  { id: 'mvno', name: '알뜰폰', isSelected: false },
];

export default function CarrierSelectionModal({ isOpen, onClose, onSelectCarrier }: CarrierSelectionModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('skt');

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // 애니메이션을 위한 지연
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 모달 닫기 처리 (애니메이션 포함)
  const handleClose = () => {
    setIsVisible(false);

    // 애니메이션 완료 후 모달 닫기
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // 통신사 선택 처리
  const handleCarrierSelect = (carrierId: string) => {
    setSelectedCarrier(carrierId);
    onSelectCarrier(carrierId);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 배경 오버레이 - dim 처리 추가 */}
      <div className="absolute inset-0 bg-black bg-opacity-30" onClick={handleClose} />

      {/* 모달 컨텐츠 - 하단에서 슬라이드 업 */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] h-[328px] overflow-hidden transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* 드래그 핸들 */}
        <div className="flex justify-center pt-5 pb-4">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* 통신사 목록 */}
        <div className="px-6 py-12">
          <div className="space-y-0">
            {carriers.map((carrier) => (
              <button
                key={carrier.id}
                onClick={() => handleCarrierSelect(carrier.id)}
                className="w-full text-left py-4 px-0 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <span
                  className={`text-base ${selectedCarrier === carrier.id ? 'text-black font-bold' : 'text-gray-500'}`}
                >
                  {carrier.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
