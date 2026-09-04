import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'pill-outline' | 'pill-on-dark' | 'coral' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center select-none font-medium transition-all duration-150 btn-press cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1863dc]/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none rounded-full';

  const sizeStyles = {
    sm: 'text-[13px] px-3.5 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-[14px] px-5 py-2 gap-2 min-h-[38px]',
    lg: 'text-[15px] px-6 py-2.5 gap-2.5 min-h-[44px]'
  };

  const variantStyles = {
    // Universal Near-Black Pill (DESIGN.md button-primary)
    primary: 'bg-[#17171c] hover:bg-[#000000] active:bg-[#000000] text-white shadow-xs',
    // Secondary Outlined Pill on Light Canvas
    secondary: 'bg-white hover:bg-[#fafafa] text-[#212121] border border-[#d9d9dd] hover:border-[#17171c] active:bg-[#eeece7]',
    // Outlined Pill with Dark Stroke (DESIGN.md button-pill-outline)
    'pill-outline': 'bg-transparent hover:bg-[#17171c] text-[#17171c] hover:text-white border border-[#17171c]',
    // White Pill on Dark Canvas (DESIGN.md pill-on-dark)
    'pill-on-dark': 'bg-white hover:bg-[#eeece7] text-[#17171c] font-medium active:bg-[#d9d9dd] shadow-xs',
    // Coral Pill (DESIGN.md coral taxonomy CTA)
    coral: 'bg-[#ff7759] hover:bg-[#f06748] text-white font-medium shadow-xs',
    // Ghost Minimal Button
    ghost: 'bg-transparent hover:bg-black/5 text-[#212121] border-0',
    // Danger Action Button
    danger: 'bg-[#b30000] hover:bg-[#990000] text-white shadow-xs'
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
