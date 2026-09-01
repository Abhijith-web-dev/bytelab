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
  const baseStyles = 'rounded-[12px] transition-all duration-200';

  const variantStyles = {
    default: 'bg-white border border-[#e5e5e5] text-[#000000]',
    soft: 'bg-[#fafafa] border border-[#e5e5e5] text-[#000000]',
    dark: 'bg-[#171717] border border-white/10 text-white'
  };

  const hoverStyles = hoverable
    ? 'hover:border-[#000000]/40 cursor-pointer active:scale-[0.99]'
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
