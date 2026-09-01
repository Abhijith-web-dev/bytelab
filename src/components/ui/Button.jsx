import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'pill-on-dark' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center select-none font-medium transition-all duration-150 btn-press cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none rounded-full';

  const sizeStyles = {
    sm: 'text-[13px] px-3.5 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-[14px] px-5 py-2 gap-2 min-h-[36px]',
    lg: 'text-[15px] px-6 py-2.5 gap-2.5 min-h-[44px]'
  };

  const variantStyles = {
    // Universal Primary Black Pill ({colors.primary})
    primary: 'bg-[#000000] hover:bg-[#171717] active:bg-[#090909] text-white shadow-xs',
    // Secondary Outline Pill on Light Canvas
    secondary: 'bg-white hover:bg-[#fafafa] text-[#000000] border border-[#d4d4d4] active:bg-[#f0f0f0]',
    // Pill On Dark Surface
    'pill-on-dark': 'bg-white hover:bg-[#f5f5f5] text-[#000000] active:bg-[#e5e5e5]',
    // Ghost Minimal Button
    ghost: 'bg-transparent hover:bg-black/5 text-[#000000] border-0',
    // Danger Action Button
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
