'use client';

import { useState } from 'react';
import { NavigationBar } from '@/components/layout/NavigationBar';
import BrandingSection from '@/components/auth/BrandingSection';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import BottomLinks from '@/components/auth/BottomLinks';

export default function LoginPage() {
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  const handleEmailLoginClick = () => {
    setShowEmailLogin(true);
  };

  const handleBackToSocial = () => {
    setShowEmailLogin(false);
  };

  const handleHomeClick = () => {
    console.log('홈 버튼 클릭됨');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#FFFFF5] flex flex-col">
      <NavigationBar />

      <div className="flex-1 relative">
        {!showEmailLogin ? (
          <>
            {/* 소셜 로그인 화면 */}
            <div className="absolute top-[12%] left-0 right-0">
              <BrandingSection />
            </div>

            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
              <SocialLoginButtons onEmailLogin={handleEmailLoginClick} />
            </div>

            <div className="absolute bottom-[15.25%] left-0 right-0">
              <BottomLinks />
            </div>
          </>
        ) : (
          <>
            {/* 이메일 로그인 화면 */}
            <div className="absolute top-[12%] left-0 right-0">
              <div className="px-4">
                <h1 className="text-[32px] font-bold leading-[1.4] text-black whitespace-pre-line">
                  나팔에{'\n'}오신 것을 환영해요!
                </h1>
              </div>
            </div>

            <div className="absolute top-[28%] left-0 right-0">
              <EmailLoginForm onBack={handleBackToSocial} />
            </div>

            <div className="absolute bottom-[8%] left-0 right-0">
              <BottomLinks />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
