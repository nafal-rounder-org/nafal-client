'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

interface TermsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  termId: string;
}

// 약관 목업 데이터
const termsData = {
  age: {
    title: '만 19세 이상입니다',
    content: `본 서비스는 만 19세 이상의 성인만 이용할 수 있습니다.

연령 확인을 위해 본인인증이 필요하며, 미성년자의 경우 법정대리인의 동의가 필요합니다.

만 19세 미만인 경우 서비스 이용이 제한되며, 관련 법령에 따라 처벌받을 수 있습니다.`
  },
  terms: {
    title: '이용약관',
    content: `제1조 (목적)
본 약관은 나팔(이하 "회사")이 제공하는 온라인 경매 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"란 회사가 제공하는 온라인 경매 플랫폼을 의미합니다.
2. "회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 의미합니다.
3. "경매"란 회원이 서비스를 통해 상품을 판매하거나 구매하는 행위를 의미합니다.

제3조 (약관의 효력 및 변경)
1. 본 약관은 서비스 이용 신청 시 효력이 발생합니다.
2. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 고지합니다.`
  },
  auction: {
    title: '온라인 경매 약관',
    content: `제1조 (경매 참여 자격)
1. 만 19세 이상의 성인만 경매에 참여할 수 있습니다.
2. 회원가입 및 본인인증이 완료된 회원만 경매에 참여할 수 있습니다.

제2조 (입찰 규칙)
1. 입찰은 최소 단위로만 가능합니다.
2. 입찰 후 취소는 불가능합니다.
3. 낙찰 시 즉시 결제가 진행됩니다.

제3조 (낙찰 및 결제)
1. 최고가 입찰자가 낙찰됩니다.
2. 낙찰 후 24시간 내 결제를 완료해야 합니다.
3. 결제 미완료 시 입찰이 취소될 수 있습니다.

제4조 (배송 및 반품)
1. 낙찰 상품은 결제 완료 후 3-5일 내 배송됩니다.
2. 상품 하자 시 7일 내 반품 신청이 가능합니다.`
  },
  privacy: {
    title: '개인정보 수집 및 이용 동의',
    content: `1. 수집하는 개인정보 항목
- 필수항목: 이름, 이메일, 휴대폰번호, 생년월일
- 선택항목: 주소, 관심 카테고리

2. 개인정보의 수집 및 이용목적
- 서비스 제공 및 계정 관리
- 경매 진행 및 결제 처리
- 고객 상담 및 문의 응대
- 서비스 개선 및 신규 서비스 개발

3. 개인정보의 보유 및 이용기간
- 회원 탈퇴 시까지 (단, 관련 법령에 따라 보존이 필요한 경우 해당 기간까지)

4. 개인정보의 파기
- 회원 탈퇴 시 즉시 파기
- 전자적 파일 형태로 저장된 개인정보는 복구 불가능한 방법으로 영구 삭제`
  },
  marketing: {
    title: '홍보 및 마케팅을 위한 정보 이용 동의',
    content: `1. 마케팅 정보 이용 목적
- 신규 서비스 및 이벤트 안내
- 맞춤형 상품 추천
- 서비스 이용 통계 및 분석

2. 이용하는 개인정보 항목
- 이름, 이메일, 휴대폰번호
- 서비스 이용 기록 및 관심사

3. 이용 기간
- 동의 철회 시까지

4. 동의 철회 방법
- 설정 > 개인정보 > 마케팅 정보 수신 동의 해제
- 고객센터를 통한 동의 철회 요청`
  },
  marketingReceive: {
    title: '마케팅 정보 수신 동의',
    content: `1. 수신 채널
- 이메일: 이벤트, 할인 정보, 신규 서비스 안내
- SMS: 긴급 공지, 입찰 알림, 낙찰 안내
- 앱 푸시: 실시간 알림, 경매 진행 상황

2. 수신 정보 내용
- 신규 상품 등록 알림
- 관심 상품 입찰 현황
- 이벤트 및 할인 정보
- 서비스 공지사항

3. 수신 거부 방법
- 각 채널별 개별 설정 가능
- 설정 > 알림 설정에서 수신 거부

4. 수신 동의 철회
- 언제든지 설정에서 동의를 철회할 수 있습니다.`
  }
};

export default function TermsDetailModal({ isOpen, onClose, termId }: TermsDetailModalProps) {
  const termData = termsData[termId as keyof typeof termsData];
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isOpen || !termData) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={handleClose}
      />
      
      {/* 모달 컨텐츠 - 하단에서 슬라이드 업 */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] h-[85vh] overflow-hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">{termData.title}</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="px-4 py-6 overflow-y-auto h-[calc(85vh-160px)]">
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {termData.content}
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-4 py-6 pb-8 border-t border-gray-200">
          <Button
            onClick={handleClose}
            variant="primary"
            className="w-full"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
} 