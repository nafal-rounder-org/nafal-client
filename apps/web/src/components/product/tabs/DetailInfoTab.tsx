'use client';

interface DetailInfoTabProps {
  productId: string;
}

export function DetailInfoTab({ productId }: DetailInfoTabProps) {
  // TODO: 실제 상품 데이터로 교체
  const detailInfo = {
    title: '상세 정보',
    description:
      '이 상품은 팝업 스토어에서 전시되었던 총천연색 필름입니다. 환경 친화적인 소재로 제작되어 지속가능한 미래를 위한 선택입니다.',
    images: ['/assets/product-detail-1.jpg', '/assets/product-detail-2.jpg', '/assets/product-detail-3.jpg'],
  };

  return (
    <div className="bg-white p-6 space-y-6">
      {/* 상세 정보 제목 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">{detailInfo.title}</h3>
        <p className="text-base text-black leading-relaxed">{detailInfo.description}</p>
      </div>

      {/* 상세 이미지 갤러리 */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-black">상품 이미지</h4>
        <div className="space-y-3">
          {detailInfo.images.map((image, index) => (
            <div key={index} className="w-full h-48 bg-[#F0F0F0] rounded-lg flex items-center justify-center">
              <span className="text-sm text-[#9E9E9E]">상품 이미지 {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 상세 정보 */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-black">제작 과정</h4>
        <div className="space-y-3 text-sm text-[#616161] leading-relaxed">
          <p>
            이 상품은 환경 친화적인 소재를 사용하여 제작되었습니다. 팝업 스토어에서 전시된 경험을 바탕으로 지속가능한
            미래를 위한 소비 문화를 확산하고자 합니다.
          </p>
          <p>
            천연 소재를 사용하여 환경에 미치는 영향을 최소화했으며, 재활용 가능한 포장재를 사용하여 추가적인 환경 보호에
            기여합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
