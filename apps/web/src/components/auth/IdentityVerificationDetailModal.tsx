'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

interface IdentityVerificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  termId: string;
}

// 본인인증 약관 목업 데이터
const identityVerificationTermsData = {
  'phone-verification': {
    title: '휴대폰 본인 인증 서비스 이용약관',
    content: `제1조 (목적)
본 약관은 휴대폰 본인 인증 서비스(이하 "서비스")의 이용과 관련하여 서비스 제공자와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (서비스 내용)
1. 본 서비스는 휴대폰 번호를 통한 본인 확인 서비스입니다.
2. 이용자는 본인의 휴대폰 번호를 입력하여 인증을 진행할 수 있습니다.
3. 인증 과정에서 SMS 인증번호가 발송됩니다.

제3조 (이용자의 의무)
1. 이용자는 본인의 실제 휴대폰 번호를 정확히 입력해야 합니다.
2. 타인의 휴대폰 번호를 무단으로 사용하여서는 안 됩니다.
3. 인증번호는 본인만 확인하고 타인에게 노출하지 않아야 합니다.

제4조 (개인정보 보호)
1. 수집된 개인정보는 본인 인증 목적으로만 사용됩니다.
2. 인증 완료 후 인증번호는 즉시 삭제됩니다.
3. 개인정보 처리에 관한 사항은 개인정보처리방침을 따릅니다.`
  },
  'carrier-terms': {
    title: '휴대폰 통신사 이용약관',
    content: `제1조 (통신사 서비스 이용)
1. 본 서비스는 각 통신사(SKT, KT, LG U+)의 본인 인증 서비스를 이용합니다.
2. 이용자는 본인이 가입한 통신사의 서비스를 통해 인증을 진행합니다.

제2조 (통신사별 인증 방식)
1. SKT: 휴대폰 번호 + 생년월일
2. KT: 휴대폰 번호 + 생년월일
3. LG U+: 휴대폰 번호 + 생년월일

제3조 (인증 정보 제공)
1. 통신사는 본인 인증을 위해 다음 정보를 제공합니다:
   - 휴대폰 번호
   - 생년월일
   - 성명
   - 성별
2. 제공된 정보는 본인 인증 목적으로만 사용됩니다.

제4조 (통신사 책임)
1. 통신사는 본인 인증 서비스의 정확성을 보장합니다.
2. 통신사 서비스 장애 시 인증이 지연될 수 있습니다.
3. 통신사는 개인정보 보호를 위해 최선을 다합니다.`
  },
  'privacy-agreement': {
    title: '개인정보 제공 및 이용 동의',
    content: `1. 개인정보 제공 목적
- 본인 인증 및 신원 확인
- 서비스 이용 자격 검증
- 부정 이용 방지

2. 제공하는 개인정보 항목
- 휴대폰 번호
- 생년월일
- 성명
- 성별
- 통신사 정보

3. 개인정보 제공 대상
- 본인 인증 서비스 제공업체
- 통신사 (SKT, KT, LG U+)

4. 개인정보 보유 및 이용기간
- 인증 완료 후 즉시 파기
- 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간까지

5. 동의 거부권 및 거부 시 불이익
- 동의를 거부할 수 있습니다.
- 동의 거부 시 본인 인증 서비스를 이용할 수 없습니다.
- 본인 인증이 필요한 서비스 이용이 제한됩니다.

6. 개인정보 처리 위탁
- 본인 인증 서비스는 외부 업체에 위탁하여 처리됩니다.
- 위탁업체는 개인정보 보호를 위해 최선을 다합니다.`
  },
  'unique-identifier': {
    title: '고유식별정보 처리',
    content: `1. 고유식별정보 처리 목적
- 본인 인증 및 신원 확인
- 부정 이용 방지 및 사기 방지
- 서비스 이용 자격 검증

2. 처리하는 고유식별정보
- 주민등록번호 (생년월일, 성별 정보)
- 휴대폰 번호

3. 고유식별정보 처리 방식
- 주민등록번호: 생년월일과 성별 정보만 추출하여 처리
- 휴대폰 번호: 본인 인증을 통한 확인

4. 고유식별정보 보호 조치
- 암호화를 통한 안전한 전송
- 접근 권한 제한
- 처리 기록 보관 및 관리

5. 고유식별정보 보유 기간
- 본인 인증 완료 후 즉시 파기
- 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간까지

6. 고유식별정보 처리 동의
- 본 동의는 고유식별정보 처리에 대한 동의입니다.
- 동의를 거부할 수 있으며, 거부 시 본인 인증 서비스를 이용할 수 없습니다.

7. 고유식별정보 처리 위탁
- 본인 인증 서비스 제공업체에 위탁하여 처리됩니다.
- 위탁업체는 고유식별정보 보호를 위해 최선을 다합니다.`
  }
};

export default function IdentityVerificationDetailModal({ isOpen, onClose, termId }: IdentityVerificationDetailModalProps) {
  const termData = identityVerificationTermsData[termId as keyof typeof identityVerificationTermsData];
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
      {/* 배경 오버레이 - dim 처리 제거 */}
      <div 
        className="absolute inset-0"
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
