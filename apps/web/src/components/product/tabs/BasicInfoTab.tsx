'use client';

interface BasicInfoTabProps {
  productId: string;
}

export function BasicInfoTab({ productId }: BasicInfoTabProps) {
  // TODO: 실제 상품 데이터로 교체
  const basicInfo = {
    productName: '총천연색 필름',
    size: '100cm x 100cm',
    condition: '새상품',
    material: '천연 소재',
    location: '실내',
    edition: '한정판',
    shipping: '무료배송',
  };

  const infoItems = [
    { label: '제품명', value: basicInfo.productName },
    { label: '사이즈', value: basicInfo.size },
    { label: '상태', value: basicInfo.condition },
    { label: '재질', value: basicInfo.material },
    { label: '사용 위치', value: basicInfo.location },
    { label: '에디션', value: basicInfo.edition },
    { label: '배송', value: basicInfo.shipping },
  ];

  return (
    <div className="bg-white p-6 space-y-6">
      {/* 기본 정보 테이블 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">기본 정보</h3>
        <div className="space-y-3">
          {infoItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
              <span className="text-sm text-[#9E9E9E]">{item.label}</span>
              <span className="text-sm text-black font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 설명 */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-black">상품 설명</h4>
        <div className="space-y-3 text-sm text-[#616161] leading-relaxed">
          <p>
            이 상품은 팝업 스토어에서 전시되었던 총천연색 필름입니다. 천연 소재로 제작되어 환경에 친화적이며, 실내에서
            사용하기에 적합합니다.
          </p>
          <p>한정판으로 제작되어 희소성이 있으며, 무료배송으로 제공됩니다.</p>
        </div>
      </div>
    </div>
  );
}
