'use client';

import { useState } from 'react';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import IdentityVerificationDetailModal from './IdentityVerificationDetailModal';

interface IdentityVerificationFormProps {
  onComplete: () => void;
}

interface TermItem {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
}

export default function IdentityVerificationForm({ onComplete }: IdentityVerificationFormProps) {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState('');

  const [terms, setTerms] = useState<TermItem[]>([
    {
      id: 'phone-verification',
      label: '[필수] 휴대폰 본인 인증 서비스 이용약관 동의',
      required: true,
      checked: false,
    },
    {
      id: 'carrier-terms',
      label: '[필수] 휴대폰 통신사 이용약관 동의',
      required: true,
      checked: false,
    },
    {
      id: 'privacy-agreement',
      label: '[필수] 개인정보 제공 및 이용 동의',
      required: true,
      checked: false,
    },
    {
      id: 'unique-identifier',
      label: '[필수] 고유식별정보 처리',
      required: true,
      checked: false,
    },
  ]);

  // 전체 동의 상태 계산
  const allChecked = terms.every(term => term.checked);
  const allRequiredChecked = terms.filter(term => term.required).every(term => term.checked);

  // 전체 동의/해제 처리
  const handleAllTermsChange = (checked: boolean) => {
    setTerms(prev => prev.map(term => ({ ...term, checked })));
  };

  // 개별 약관 동의/해제 처리
  const handleTermChange = (id: string, checked: boolean) => {
    setTerms(prev => prev.map(term => 
      term.id === id ? { ...term, checked } : term
    ));
  };

  // 약관 상세보기 처리
  const handleTermDetail = (id: string) => {
    setSelectedTermId(id);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTermId('');
  };

  // 약관 동의 완료 처리
  const handleVerificationClick = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 전체 동의 섹션 */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allChecked}
            onChange={handleAllTermsChange}
            className="w-6 h-6"
          />
          <span className="text-base font-bold text-black">
            본인 인증 서비스 약관 전체 동의
          </span>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#E0E0E0] w-full" />

        {/* 개별 약관 목록 */}
        <div className="flex flex-col gap-4">
          {terms.map((term) => (
            <div key={term.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={term.checked}
                  onChange={(checked) => handleTermChange(term.id, checked)}
                  className="w-6 h-6"
                />
                <button
                  onClick={() => handleTermDetail(term.id)}
                  className="text-left"
                >
                  <span className={`text-sm ${term.required ? 'text-[#616161]' : 'text-[#616161]'}`}>
                    {term.label}
                  </span>
                </button>
              </div>
              <button
                onClick={() => handleTermDetail(term.id)}
                className="w-4 h-4 flex items-center justify-center"
              >
                <Icon name="chevron-right" className="w-4 h-4 text-[#616161]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-auto pt-8">
        <Button
          onClick={handleVerificationClick}
          disabled={!allRequiredChecked}
          variant={allRequiredChecked ? 'primary' : 'disabled'}
          size="lg"
          className="w-full"
        >
          본인인증 하러가기
        </Button>
      </div>

      {/* 약관 상세 모달 */}
      <IdentityVerificationDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        termId={selectedTermId}
      />
    </div>
  );
}
