'use client';

import NavigationBar from '@/components/layout/NavigationBar';
import BrandingSection from '@/components/auth/BrandingSection';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import BottomLinks from '@/components/auth/BottomLinks';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FFFFF5] flex flex-col">
      <NavigationBar />

      <div className="flex-1 relative">
        <div className="absolute top-[12%] left-0 right-0">
          <BrandingSection />
        </div>

        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
          <SocialLoginButtons />
        </div>

        <div className="absolute bottom-[15.25%] left-0 right-0">
          <BottomLinks />
        </div>
      </div>
    </div>
  );
}
