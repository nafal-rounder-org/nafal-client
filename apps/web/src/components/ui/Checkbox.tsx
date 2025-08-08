import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({
  checked,
  onChange,
  size = 'medium',
  disabled = false,
  className = ''
}: CheckboxProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-2.5 h-2.5';
      case 'medium':
        return 'w-6 h-6';
      case 'large':
        return 'w-6 h-6';
      default:
        return 'w-6 h-6';
    }
  };

  const getCheckIconSize = () => {
    switch (size) {
      case 'small':
        return 'w-2 h-2';
      case 'medium':
        return 'w-5 h-5';
      case 'large':
        return 'w-5 h-5';
      default:
        return 'w-5 h-5';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${getSizeClasses()}
        border-2 rounded
        flex items-center justify-center
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        ${checked 
          ? 'bg-[#91C4BC] border-[#91C4BC]' 
          : 'bg-white border-[#E0E0E0]'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:border-[#91C4BC]'
        }
        ${className}
      `}
    >
      {checked && (
        <svg 
          className={`${getCheckIconSize()} text-white`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      )}
    </button>
  );
}
