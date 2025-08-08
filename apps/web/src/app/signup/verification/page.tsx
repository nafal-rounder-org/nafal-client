'use client';

import { useState } from 'react';
import { NavigationBar } from '@/components/layout/NavigationBar';
import IdentityVerificationForm from '@/components/auth/IdentityVerificationForm';
import IdentityVerificationInputForm from '@/components/auth/IdentityVerificationInputForm';

export default function IdentityVerificationPage() {
  const [currentStep, setCurrentStep] = useState("terms");

  const handleHomeClick = () => {
    console.log('홈 버튼 클릭됨');
    window.location.href = '/';
  };

  const handleBackClick = () => {
    if (currentStep === 'input') {
      setCurrentStep('terms');
    } else {
      window.history.back();
    }
  };

  const handleTermsComplete = () => {
    setCurrentStep('input');
  };

  const handleInputComplete = () => {
    console.log('본인인증 완료');
    // 닉네임 설정 페이지로 이동 (IdentityVerificationInputForm 컴포넌트에서 직접 처리)
  };

  return (
    <div className="min-h-screen bg-[#FFFFF5] flex flex-col">
      <NavigationBar />

      <div className="flex-1 px-4 pt-6">
        {/* 제목 - 약관 동의 단계에서만 표시 */}
        {currentStep === 'terms' && (
          <div className="mb-12">
            <h1 className="text-[32px] font-bold leading-[1.4] text-black whitespace-pre-line">
              본인확인을 위해{'\n'}인증을 진행해 주세요
            </h1>
          </div>
        )}

        {/* 단계별 폼 렌더링 */}
        {currentStep === 'terms' ? (
          <IdentityVerificationForm onComplete={handleTermsComplete} />
        ) : (
          <IdentityVerificationInputForm onNext={handleInputComplete} />
        )}
      </div>
    </div>
  );
}
