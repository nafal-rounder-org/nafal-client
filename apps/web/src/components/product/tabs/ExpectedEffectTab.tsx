'use client';

interface ExpectedEffectTabProps {
  productId: string;
}

export function ExpectedEffectTab({ productId }: ExpectedEffectTabProps) {
  return (
    <div className="bg-white p-6 space-y-6">
      {/* 기대 효과 섹션 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">작지만 분명한</h3>
        <div className="space-y-4">
          <div className="bg-[#F7F7EB] p-4 rounded-lg">
            <h4 className="text-base font-semibold text-black mb-2">탄소 배출 감소 효과</h4>
            <p className="text-sm text-[#616161] leading-relaxed">
              이 상품을 구매하시면 약 2.5kg의 탄소 배출을 줄일 수 있습니다. 이는 나무 1그루가 1년간 흡수하는 탄소량과
              비슷한 수치입니다.
            </p>
          </div>

          <div className="bg-[#F7F7EB] p-4 rounded-lg">
            <h4 className="text-base font-semibold text-black mb-2">환경 보호 기여</h4>
            <p className="text-sm text-[#616161] leading-relaxed">
              천연 소재 사용으로 인한 환경 오염 감소와 지속가능한 소비 문화 확산에 기여합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-black">환경 영향</h4>
        <div className="space-y-3 text-sm text-[#616161]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#91C4BC] rounded-full"></span>
            <span>플라스틱 사용량 감소</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#91C4BC] rounded-full"></span>
            <span>재활용 가능한 소재</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#91C4BC] rounded-full"></span>
            <span>생분해성 소재 사용</span>
          </div>
        </div>
      </div>
    </div>
  );
}
