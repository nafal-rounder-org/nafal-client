'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

interface EmailLoginFormProps {
  onLogin?: (email: string, password: string) => void;
  onSignup?: () => void;
  onBack?: () => void;
}

export default function EmailLoginForm({ onLogin, onSignup, onBack }: EmailLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    // 오류 상태 초기화
    setEmailError('');
    setPasswordError('');
    setHasError(false);

    let hasValidationError = false;

    // 이메일 검증
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      hasValidationError = true;
    } else if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요');
      hasValidationError = true;
    }

    // 비밀번호 검증
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      hasValidationError = true;
    } else if (!validatePassword(password)) {
      setPasswordError('이메일 또는 비밀번호를 다시 확인해주세요');
      hasValidationError = true;
    }

    if (hasValidationError) {
      return;
    }

    // 로그인 처리
    onLogin?.(email, password);
  };

  // FIXME: 비밀번호 검증
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError('이메일 또는 비밀번호를 다시 확인해주세요');
    } else {
      setPasswordError('');
    }
  };

  const handleSignup = () => {
    onSignup?.();
  };

  return (
    <div className="px-4 space-y-4 max-w-[358px] mx-auto w-full">
      {/* 이메일 입력 필드 */}
      <div className="space-y-2">
        <label className="text-base text-black font-normal">이메일</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full h-[56px] px-4 border rounded-none bg-white text-base text-black focus:outline-none font-normal ${
              emailError ? 'border-[#FF5142]' : 'border-[#E0E0E0] focus:border-black'
            }`}
          />
        </div>
        <div className="h-4">
          {emailError && (
            <p className="text-xs text-[#FF5142]">{emailError}</p>
          )}
        </div>
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="space-y-2">
        <label className="text-base text-black font-normal">비밀번호</label>
        <div className="relative">
          <input
            type={showPassword ? 'password' : 'text'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className={`w-full h-[56px] px-4 pr-12 border rounded-none bg-white text-base text-black focus:outline-none font-normal ${
              passwordError || hasError ? 'border-[#FF5142]' : 'border-[#E0E0E0] focus:border-black'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center"
          >
            <Icon 
              name={showPassword ? "eye" : "eye-off"} 
              size={24}
              className="text-[#9E9E9E]" 
            />
          </button>
        </div>
        <div className="h-4">
          {passwordError && (
            <p className="text-xs text-[#FF5142]">{passwordError}</p>
          )}
          {hasError && !passwordError && (
            <p className="text-xs text-[#FF5142]">
              이메일 또는 비밀번호를 다시 확인해주세요
            </p>
          )}
        </div>
      </div>

      {/* 자동 로그인 체크박스 */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setAutoLogin(!autoLogin)}
          className="w-6 h-6 flex items-center justify-center"
        >
          <Icon 
            name={autoLogin ? "checkbox-checked" : "checkbox-unchecked"} 
            size={24}
          />
        </button>
        <span className="text-sm text-[#9E9E9E] font-normal">자동 로그인</span>
      </div>

      {/* 회원가입 링크 */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <span className="text-sm text-black font-normal">나팔이 처음이신가요?</span>
        <button
          onClick={handleSignup}
          className="text-sm text-black underline font-normal"
        >
          회원가입 하기
        </button>
      </div>

      {/* 로그인 버튼 */}
      <div className="pt-2">
        <Button
          onClick={handleLogin}
          className="w-full h-[56px] bg-black text-white font-bold text-base hover:bg-gray-800 transition-colors rounded-none"
        >
          로그인
        </Button>
      </div>
    </div>
  );
}
