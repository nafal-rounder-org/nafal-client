'use client';

interface ProductHeaderProps {
  productId: string;
}

export function ProductHeader({ productId }: ProductHeaderProps) {
  // TODO: 실제 상품 데이터로 교체
  const getProductImage = (id: string) => {
    const images = {
      rec1: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center',
      rec2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
      rec3: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
      rec4: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop&crop=center',
    };

    return images[id as keyof typeof images] || '/assets/product-placeholder.jpg';
  };

  const productImage = getProductImage(productId);

  return (
    <div className="relative w-full h-[390px] bg-white">
      {/* 상품 이미지 */}
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${productImage})` }}
      />

      {/* 상단 그라데이션 오버레이 */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* 하단 그라데이션 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

      {/* 남은 시간 표시 (우측 상단) */}
      <div className="absolute top-0 right-0">
        <div className="bg-[#E8FCF9] px-6 py-1">
          <span className="text-[#91C4BC] font-bold text-base">0일 남음</span>
        </div>
      </div>
    </div>
  );
}
