'use client';

interface NavigationBarProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  onBack?: () => void;
  onHome?: () => void;
}

export default function NavigationBar({
  showBackButton = true,
  showHomeButton = true,
  onBack,
  onHome,
}: NavigationBarProps) {
  return (
    <div className="h-14 bg-transparent flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center"
          >
            <img
              src="/assets/ic-arrow.svg"
              alt="뒤로가기"
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
            />
          </button>
        )}
      </div>

      {showHomeButton && (
        <button
          onClick={onHome}
          className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center"
        >
          <img
            src="/assets/ic-home.svg"
            alt="홈"
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
          />
        </button>
      )}
    </div>
  );
}
