import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'default', // 'default' | 'co' | 'coral' | 'stone' | 'enterprise' | 'navy' | 'beginner' | 'intermediate' | 'advanced' | 'success' | 'warning' | 'dark'
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium tracking-tight border select-none transition-colors';

  const variantStyles = {
    default: 'bg-[#fafafa] text-[#525252] border-[#e5e7eb]',
    co: 'bg-[#17171c] text-white border-[#17171c] font-semibold',
    coral: 'bg-[#ff7759]/10 text-[#ff7759] border-[#ff7759]/30 font-medium',
    stone: 'bg-[#eeece7] text-[#212121] border-[#d9d9dd]',
    enterprise: 'bg-[#003c33] text-white border-[#003c33]',
    navy: 'bg-[#071829] text-white border-[#071829]',
    beginner: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    intermediate: 'bg-blue-50 text-blue-800 border-blue-200',
    advanced: 'bg-purple-50 text-purple-800 border-purple-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    dark: 'bg-[#17171c] text-white border-white/20'
  };

  return (
    <span className={twMerge(clsx(baseStyles, variantStyles[variant], className))} {...props}>
      {children}
    </span>
  );
}
