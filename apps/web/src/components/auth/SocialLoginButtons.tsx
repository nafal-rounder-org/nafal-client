'use client';

import SocialLoginButton from './SocialLoginButton';

export default function SocialLoginButtons() {
  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
  };

  const handleNaverLogin = () => {
    console.log('네이버 로그인');
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인');
  };

  const handleAppleLogin = () => {
    console.log('애플 로그인');
  };

  const handleEmailLogin = () => {
    console.log('이메일 로그인');
  };

  return (
    <div className="flex flex-col gap-2 px-4">
      {/* 피그마: 8px 간격, x: 16 위치 */}
      <SocialLoginButton
        provider="kakao"
        onClick={handleKakaoLogin}
        variant="filled"
      />
      <SocialLoginButton
        provider="naver"
        onClick={handleNaverLogin}
        variant="filled"
      />
      <SocialLoginButton
        provider="google"
        onClick={handleGoogleLogin}
        variant="outlined"
      />
      <SocialLoginButton
        provider="apple"
        onClick={handleAppleLogin}
        variant="outlined"
      />
      <SocialLoginButton
        provider="email"
        onClick={handleEmailLogin}
        variant="outlined"
      />
    </div>
  );
}
