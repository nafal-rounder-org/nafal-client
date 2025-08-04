'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CarrierSelectionModal from './CarrierSelectionModal';

interface IdentityVerificationInputFormProps {
  onNext: () => void;
}

export default function IdentityVerificationInputForm({ onNext }: IdentityVerificationInputFormProps) {
  // 모달 상태
  const [isCarrierModalOpen, setIsCarrierModalOpen] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('SKT');

  // 입력 필드 상태
  const [formData, setFormData] = useState({
    name: '유아영',
    birthDate: '000503',
    birthDateMasked: '1234567', // 테스트용 고정값 (마스킹으로 표시됨)
    phoneNumber: '',
    verificationCode: '123456', // 테스트용 고정값
  });

  // 인증 관련 상태
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  // 통신사 선택 모달 열기
  const handleCarrierSelect = () => {
    setIsCarrierModalOpen(true);
  };

  // 통신사 선택 처리
  const handleCarrierSelectComplete = (carrierId: string) => {
    const carrierNames = {
      skt: 'SKT',
      lg: 'LG U+',
      kt: 'KT',
      mvno: '알뜰폰',
    };
    setSelectedCarrier(carrierNames[carrierId as keyof typeof carrierNames] || 'SKT');
  };

  // 통신사 선택 모달 닫기
  const handleCloseCarrierModal = () => {
    setIsCarrierModalOpen(false);
  };

  // 입력 필드 변경 처리
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 인증번호 입력 시 오류 상태 체크
    if (field === 'verificationCode') {
      if (value.length === 6) {
        setVerificationError(checkVerificationError(value));
      } else {
        setVerificationError(false);
      }
    }
  };

  // 인증 요청 처리
  const handleVerificationRequest = () => {
    console.log('인증 요청:', { selectedCarrier, phoneNumber: formData.phoneNumber });
    setIsVerificationRequested(true);
    setVerificationTimer(180); // 3분 타이머
    // TODO: 실제 인증 요청 API 호출
  };

  // 다음 버튼 클릭 처리
  const handleNextClick = async () => {
    if (!isNextButtonEnabled) return;

    setIsLoading(true);

    try {
      // TODO: 실제 본인인증 API 호출
      console.log('본인인증 요청:', {
        name: formData.name,
        birthDate: formData.birthDate,
        birthDateMasked: formData.birthDateMasked,
        phoneNumber: formData.phoneNumber,
        verificationCode: formData.verificationCode,
        carrier: selectedCarrier,
      });

      // API 응답을 시뮬레이션하기 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 성공 시 닉네임 설정 페이지로 이동
      window.location.href = '/signup/nickname';
    } catch (error) {
      console.error('본인인증 실패:', error);
      // TODO: 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  // 타이머 관리
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (verificationTimer > 0) {
      interval = setInterval(() => {
        setVerificationTimer((prev) => {
          if (prev <= 1) {
            setIsVerificationRequested(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verificationTimer]);

  // 타이머 포맷팅
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 유효성 검사 함수들
  const isValidName = (name: string) => name.length >= 2;
  const isValidBirthDate = (birthDate: string) => /^\d{6}$/.test(birthDate);
  const isValidBirthDateMasked = (birthDateMasked: string) => /^\d{7}$/.test(birthDateMasked);
  const isValidPhoneNumber = (phoneNumber: string) => /^\d{10,11}$/.test(phoneNumber.replace(/\D/g, ''));
  const isValidVerificationCode = (code: string) => /^\d{6}$/.test(code);

  // 인증번호 오류 체크 (임시로 특정 조건으로 설정)
  const checkVerificationError = (code: string) => {
    // 임시 조건: 인증번호가 6자리이고 "123456"이 아닌 경우 오류
    return code.length === 6 && code !== '123456';
  };

  // 단계별 활성화 조건
  const isStep1Complete = isValidName(formData.name);
  const isStep2Complete =
    isStep1Complete && isValidBirthDate(formData.birthDate) && isValidBirthDateMasked(formData.birthDateMasked);
  const isStep3Complete = isStep2Complete && isValidPhoneNumber(formData.phoneNumber);
  const isStep4Complete = isStep3Complete && isValidVerificationCode(formData.verificationCode) && !verificationError;

  // 다음 버튼 활성화 조건
  const isNextButtonEnabled = isStep4Complete && !isLoading;

  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* 이름 입력 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-base text-black">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-3 border border-[#E0E0E0] text-base text-black bg-white h-12"
          placeholder="이름을 입력하세요"
        />
      </div>

      {/* 생년월일 입력 - 이름 입력 후에만 표시 */}
      {isValidName(formData.name) && (
        <div className="flex flex-col gap-2">
          <label htmlFor="birthDate" className="text-base text-black">
            생년월일
          </label>
          <div className="flex items-center gap-2">
            <input
              id="birthDate"
              name="birthDate"
              type="text"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-[45%] px-3 py-3 border border-[#E0E0E0] text-base text-black bg-white text-center h-12"
              placeholder="000000"
              maxLength={6}
            />
            <span className="text-base text-[#9E9E9E] px-1">-</span>
            <input
              id="birthDateMasked"
              name="birthDateMasked"
              type="text"
              value={formData.birthDateMasked || ''}
              onChange={(e) => handleInputChange('birthDateMasked', e.target.value)}
              className="w-[45%] px-3 py-3 border border-[#E0E0E0] text-base text-black bg-white text-center h-12"
              placeholder="••••••••"
              maxLength={7}
              aria-label="주민번호 뒷자리"
              style={
                {
                  WebkitTextSecurity: 'disc',
                  textSecurity: 'disc',
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      )}

      {/* 휴대폰 번호 입력 - 생년월일 입력 후에만 표시 */}
      {isStep2Complete && (
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="text-base text-black">
            휴대폰 번호
          </label>
          <div className="flex gap-2">
            {/* 통신사 선택 */}
            <button
              type="button"
              onClick={handleCarrierSelect}
              className="flex items-center justify-center gap-1 px-3 py-3 border border-[#9E9E9E] bg-white w-[25%] h-12"
              aria-label="통신사 선택"
            >
              <span className={`text-sm ${selectedCarrier === 'SKT' ? 'text-black' : 'text-[#9E9E9E]'}`}>
                {selectedCarrier}
              </span>
              <Icon name="chevron-right" className="w-3 h-3 text-[#616161]" />
            </button>

            {/* 휴대폰 번호 입력 */}
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-[45%] px-3 py-3 border border-[#9E9E9E] text-base text-black bg-white h-12"
              placeholder="휴대폰 번호"
            />

            {/* 인증 요청 버튼 */}
            <button
              type="button"
              onClick={handleVerificationRequest}
              disabled={isVerificationRequested}
              className={`w-[25%] px-2 py-3 text-sm border whitespace-nowrap h-12 ${
                isVerificationRequested
                  ? 'text-[#9E9E9E] bg-gray-100 border-[#E0E0E0]'
                  : 'text-[#212121] bg-white border-[#9E9E9E]'
              }`}
            >
              {isVerificationRequested ? '재요청' : '인증요청'}
            </button>
          </div>
        </div>
      )}

      {/* 인증번호 입력 - 휴대폰 번호 입력 후에만 표시 */}
      {isStep3Complete && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="verificationCode" className="text-base text-black">
              인증번호
            </label>
            <span className="text-sm text-[#9E9E9E]">
              {isVerificationRequested ? formatTimer(verificationTimer) : ''}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              value={formData.verificationCode}
              onChange={(e) => handleInputChange('verificationCode', e.target.value)}
              className={`w-full px-4 py-3 border text-base bg-white h-12 ${
                verificationError ? 'border-[#FF5142] text-[#FF5142]' : 'border-[#E0E0E0] text-black'
              }`}
              placeholder="인증번호를 입력하세요"
              maxLength={6}
            />
            {verificationError && (
              <p className="text-xs text-[#FF5142] leading-[1.4]">유효하지 않은 인증번호입니다. 다시 시도해 주세요.</p>
            )}
          </div>
        </div>
      )}

      {/* 하단 버튼 - 고정 배치 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFFFF5] border-t border-[#E0E0E0]">
        <Button
          onClick={handleNextClick}
          disabled={!isNextButtonEnabled}
          variant={isNextButtonEnabled ? 'primary' : 'disabled'}
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" />
              <span>처리 중...</span>
            </div>
          ) : (
            '다음'
          )}
        </Button>
      </div>

      {/* 통신사 선택 모달 */}
      <CarrierSelectionModal
        isOpen={isCarrierModalOpen}
        onClose={handleCloseCarrierModal}
        onSelectCarrier={handleCarrierSelectComplete}
      />

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  );
}
