'use client';

import Icon from '@/components/ui/Icon';
import HeartIcon from '@/components/ui/HeartIcon';

interface ProductInfoProps {
  productId: string;
  onBiddingCountClick: () => void;
  onLikeClick: () => void;
}

export function ProductInfo({ productId, onBiddingCountClick, onLikeClick }: ProductInfoProps) {
  // TODO: 실제 상품 데이터로 교체
  const getProductData = (id: string) => {
    const products = {
      rec1: {
        brand: 'Nafal',
        name: '총천연색 필름 - 팝업 스토어 전시품',
        currentPrice: '150,000',
        biddingCount: '12',
        remainingTime: '24:30:00',
        eventName: '총천연색 필름',
        eventDescription: '팝업 스토어 폐기물',
        likeCount: '10.9K',
      },
      rec2: {
        brand: 'EcoArt',
        name: '환경 친화적 소재 제품',
        currentPrice: '89,000',
        biddingCount: '8',
        remainingTime: '48:15:00',
        eventName: '지속가능한 미래',
        eventDescription: '환경 보호 프로젝트',
        likeCount: '5.2K',
      },
      rec3: {
        brand: 'ArtStudio',
        name: '한정판 아트워크',
        currentPrice: '230,000',
        biddingCount: '15',
        remainingTime: '12:45:00',
        eventName: '아티스트 콜라보레이션',
        eventDescription: '한정판 아트워크',
        likeCount: '15.7K',
      },
      rec4: {
        brand: 'Upcycle',
        name: '업사이클링 제품',
        currentPrice: '67,000',
        biddingCount: '5',
        remainingTime: '72:20:00',
        eventName: '업사이클링 프로젝트',
        eventDescription: '재활용 소재 제품',
        likeCount: '3.8K',
      },
    };

    return (
      products[id as keyof typeof products] || {
        brand: '브랜드명',
        name: '제품명',
        currentPrice: '000,000',
        biddingCount: '00',
        remainingTime: '00:00:00',
        eventName: '총천연색 필름',
        eventDescription: '팝업 스토어 폐기물',
        likeCount: '10.9K',
      }
    );
  };

  const product = getProductData(productId);

  return (
    <div className="bg-[#F7F7EB] px-6 py-4 space-y-2">
      {/* 브랜드명 */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-[#9E9E9E]">{product.brand}</span>
        <Icon name="chevron-down" strokeColor="#9E9E9E" strokeWidth={1} />
      </div>

      {/* 제품명 */}
      <div className="flex items-center">
        <span className="text-base text-black">{product.name}</span>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-[#E0E0E0]" />

      {/* 가격 및 입찰 정보 */}
      <div className="flex justify-between items-center">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base text-[#616161]">현재가</span>
            <span className="text-[22px] font-bold text-black">{product.currentPrice}원</span>
          </div>
        </div>

        <button
          onClick={onBiddingCountClick}
          className="flex items-center gap-2 px-3 py-2 bg-[#E8FCF9] border border-[#E0E0E0] rounded"
        >
          <span className="text-sm font-semibold text-[#616161]">{product.biddingCount}건 입찰</span>
          <Icon name="chevron-down" strokeColor="#616161" strokeWidth={1} />
        </button>
      </div>

      {/* 남은 시간 */}
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-[#FF5142]">{product.remainingTime}</span>
        <span className="text-base text-[#616161]">남음</span>
      </div>

      {/* 행사 정보 */}
      <div className="bg-white border border-[#E0E0E0] rounded-[10px] p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* 행사 이미지 */}
            <div className="w-12 h-12 bg-[#E0E0E0] rounded-full" />

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-sm text-black">{product.eventName}</span>
                <div className="w-4 h-4 bg-[#E8FCF9] rounded-full flex items-center justify-center">
                  <Icon name="check" strokeColor="#91C4BC" strokeWidth={1} />
                </div>
              </div>
              <span className="text-sm text-black opacity-50">{product.eventDescription}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button onClick={onLikeClick} className="w-6 h-6 flex items-center justify-center">
              <HeartIcon strokeColor="#9E9E9E" strokeWidth={1.5} />
            </button>
            <span className="text-[10px] text-black opacity-50">{product.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
