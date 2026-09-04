import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  variant = 'default', // 'default' | 'soft' | 'dark'
  ...props
}) {
  const baseStyles = 'rounded-[16px] transition-all duration-200';

  const variantStyles = {
    default: 'bg-white border border-[#d9d9dd] text-[#212121]',
    soft: 'bg-[#fafafa] border border-[#d9d9dd] text-[#212121]',
    stone: 'bg-[#eeece7] border border-[#d9d9dd] text-[#212121]',
    dark: 'bg-[#17171c] border border-white/10 text-white',
    enterprise: 'bg-[#003c33] border border-white/15 text-white'
  };

  const hoverStyles = hoverable
    ? 'hover:border-[#17171c] cursor-pointer active:scale-[0.99]'
    : '';

  return (
    <div
      onClick={onClick}
      className={twMerge(clsx(baseStyles, variantStyles[variant], hoverStyles, className))}
      {...props}
    >
      {children}
    </div>
  );
}
