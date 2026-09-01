import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'default', // 'default' | 'co' | 'beginner' | 'intermediate' | 'advanced' | 'success' | 'warning' | 'dark'
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium tracking-tight border';

  const variantStyles = {
    default: 'bg-[#fafafa] text-[#525252] border-[#e5e5e5]',
    co: 'bg-black text-white border-black font-semibold',
    beginner: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    intermediate: 'bg-blue-50 text-blue-800 border-blue-200',
    advanced: 'bg-purple-50 text-purple-800 border-purple-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    dark: 'bg-[#171717] text-white border-white/20'
  };

  return (
    <span className={twMerge(clsx(baseStyles, variantStyles[variant], className))} {...props}>
      {children}
    </span>
  );
}
