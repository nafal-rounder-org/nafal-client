'use client';

import { useState, useEffect } from 'react';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import TermsDetailModal from './TermsDetailModal';

interface TermsAgreementFormProps {
  onNext: () => void;
}

interface TermItem {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
}

interface MarketingChannel {
  id: string;
  label: string;
  checked: boolean;
}

export default function TermsAgreementForm({ onNext }: TermsAgreementFormProps) {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState('');

  // 약관 항목들
  const [terms, setTerms] = useState<TermItem[]>([
    { id: 'age', label: '[필수] 만 19세 이상입니다', required: true, checked: false },
    { id: 'terms', label: '[필수] 이용약관 동의', required: true, checked: false },
    { id: 'auction', label: '[필수] 온라인 경매 약관 동의', required: true, checked: false },
    { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의', required: true, checked: false },
    { id: 'marketing', label: '[선택] 홍보 및 마케팅을 위한 정보 이용 동의', required: false, checked: false },
    { id: 'marketingReceive', label: '[선택] 마케팅 정보 수신 동의', required: false, checked: false },
  ]);

  // 마케팅 수신 채널들
  const [marketingChannels, setMarketingChannels] = useState<MarketingChannel[]>([
    { id: 'email', label: '이메일', checked: false },
    { id: 'sms', label: 'SMS', checked: false },
    { id: 'push', label: '앱 푸시', checked: false },
  ]);

  // 전체 동의 상태
  const [agreeAll, setAgreeAll] = useState(false);

  // 필수 약관 동의 여부 확인
  const requiredTermsAgreed = terms
    .filter(term => term.required)
    .every(term => term.checked);

  // 다음 버튼 활성화 여부
  const isNextButtonEnabled = requiredTermsAgreed;

  // 전체 동의 처리
  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setTerms(prev => prev.map(term => ({ ...term, checked })));
    setMarketingChannels(prev => prev.map(channel => ({ ...channel, checked })));
  };

  // 개별 약관 동의 처리
  const handleTermChange = (id: string, checked: boolean) => {
    setTerms(prev => prev.map(term => 
      term.id === id ? { ...term, checked } : term
    ));
  };

  // 마케팅 수신 동의 처리
  const handleMarketingReceiveChange = (checked: boolean) => {
    setTerms(prev => prev.map(term => 
      term.id === 'marketingReceive' ? { ...term, checked } : term
    ));
    
    // 마케팅 수신 동의가 해제되면 모든 채널도 해제
    if (!checked) {
      setMarketingChannels(prev => prev.map(channel => ({ ...channel, checked: false })));
    }
  };

  // 마케팅 채널 동의 처리
  const handleMarketingChannelChange = (id: string, checked: boolean) => {
    setMarketingChannels(prev => prev.map(channel => 
      channel.id === id ? { ...channel, checked } : channel
    ));
  };

  // 전체 동의 상태 업데이트
  useEffect(() => {
    const allTermsChecked = terms.every(term => term.checked);
    const allChannelsChecked = marketingChannels.every(channel => channel.checked);
    setAgreeAll(allTermsChecked && allChannelsChecked);
  }, [terms, marketingChannels]);

  // 약관 상세 보기
  const handleViewTerms = (termId: string) => {
    setSelectedTermId(termId);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTermId('');
  };

  return (
    <div className="space-y-6">
      {/* 전체 동의 */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={agreeAll}
          onChange={handleAgreeAll}
          size="large"
        />
        <span className="text-base font-bold text-black">전체 동의하기</span>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-[#E0E0E0]"></div>

      {/* 개별 약관들 */}
      <div className="space-y-4">
        {terms.map((term) => (
          <div key={term.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={term.checked}
                onChange={(checked) => handleTermChange(term.id, checked)}
                size="medium"
              />
              <button
                onClick={() => handleViewTerms(term.id)}
                className="text-left"
              >
                <span className={`text-sm ${term.required ? 'text-[#616161]' : 'text-[#616161]'}`}>
                  {term.label}
                </span>
              </button>
            </div>
            
            {/* 화살표 아이콘 (약관 상세 보기) */}
            <button
              onClick={() => handleViewTerms(term.id)}
              className="p-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="#616161"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 마케팅 수신 동의가 체크된 경우 채널 선택 표시 */}
      {terms.find(t => t.id === 'marketingReceive')?.checked && (
        <div className="ml-8">
          <div className="flex items-center gap-3">
            {marketingChannels.map((channel) => (
              <div key={channel.id} className="flex items-center gap-1">
                <Checkbox
                  checked={channel.checked}
                  onChange={(checked) => handleMarketingChannelChange(channel.id, checked)}
                  size="small"
                />
                <span className="text-xs text-[#616161]">{channel.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 다음 버튼 */}
      <div className="pt-6">
        <Button
          onClick={onNext}
          disabled={!isNextButtonEnabled}
          variant={isNextButtonEnabled ? 'primary' : 'disabled'}
          className="w-full"
        >
          다음
        </Button>
      </div>

      {/* 약관 상세 모달 */}
      <TermsDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        termId={selectedTermId}
      />
    </div>
  );
}
