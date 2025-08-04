'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 첫 번째 원 */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-[#E0E0E0] animate-pulse`}
        style={{
          animationDelay: '0ms',
          animationDuration: '1.2s',
        }}
      />

      {/* 두 번째 원 */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-[#F4FEFC] animate-pulse`}
        style={{
          animationDelay: '200ms',
          animationDuration: '1.2s',
        }}
      />

      {/* 세 번째 원 */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-[#B5F5EB] animate-pulse`}
        style={{
          animationDelay: '400ms',
          animationDuration: '1.2s',
        }}
      />
    </div>
  );
}
