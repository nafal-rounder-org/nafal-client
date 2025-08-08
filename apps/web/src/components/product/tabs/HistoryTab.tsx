'use client';

interface HistoryTabProps {
  productId: string;
}

export function HistoryTab({ productId }: HistoryTabProps) {
  // TODO: 실제 상품 데이터로 교체
  const history = {
    eventName: '총천연색 필름',
    description:
      '이 상품은 팝업 스토어에서 전시되었던 총천연색 필름입니다. 환경 친화적인 소재로 제작되어 지속가능한 미래를 위한 선택입니다.',
    tags: ['팝업 스토어', '전시', '환경 친화', '지속가능'],
  };

  return (
    <div className="bg-white p-6 space-y-6">
      {/* 상품 설명 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">{history.eventName}</h3>
        <p className="text-base text-black leading-relaxed">{history.description}</p>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {history.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-[#F7F7EB] text-sm text-black rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* 추가 콘텐츠 */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-black">상품 관련 정보</h4>
        <div className="space-y-2 text-sm text-[#616161]">
          <p>• 팝업 스토어에서 전시된 경험</p>
          <p>• 환경 친화적 소재 사용</p>
          <p>• 지속가능한 미래를 위한 선택</p>
        </div>
      </div>
    </div>
  );
}
