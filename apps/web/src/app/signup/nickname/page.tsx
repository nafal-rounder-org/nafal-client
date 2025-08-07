'use client';

import { NavigationBar } from '@/components/layout/NavigationBar';

export default function NicknamePage() {
  const handleHomeClick = () => {
    console.log('홈 버튼 클릭됨');
    window.location.href = '/';
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#FFFFF5] flex flex-col">
      <NavigationBar />

      <div className="flex-1 px-4 pt-6">
        {/* 제목 */}
        <div className="mb-12">
          <h1 className="text-[32px] font-bold leading-[1.4] text-black whitespace-pre-line">
            닉네임을{'\n'}설정해 주세요
          </h1>
        </div>

        {/* 임시 내용 */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#E0E0E0]">
            <p className="text-base text-black">Lorem, ipsum dolor.</p>
            <p className="text-sm text-[#616161] mt-2">TBD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
