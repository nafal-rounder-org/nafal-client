'use client';

import NavigationBar from '@/components/layout/NavigationBar';
import TermsAgreementForm from '@/components/auth/TermsAgreementForm';

export default function TermsAgreementPage() {
  const handleHomeClick = () => {
    console.log('홈 버튼 클릭됨');
    window.location.href = '/';
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleNextClick = () => {
    console.log('다음 버튼 클릭됨');
    // TODO: 회원가입 완료 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-[#FFFFF5] flex flex-col">
      <NavigationBar onHome={handleHomeClick} onBack={handleBackClick} />

      <div className="flex-1 px-4 pt-6">
        {/* 제목 */}
        <div className="mb-20">
          <h1 className="text-[32px] font-bold leading-[1.4] text-black whitespace-pre-line">
            나팔 이용 약관에{'\n'}동의해 주세요
          </h1>
        </div>

        {/* 이용약관 동의 폼 */}
        <TermsAgreementForm onNext={handleNextClick} />
      </div>
    </div>
  );
}
