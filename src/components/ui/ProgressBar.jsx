import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function ProgressBar({
  value = 0,
  max = 100,
  showLabel = false,
  label = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  barColor = 'bg-[#0066cc]'
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={twMerge('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-[13px] text-[#7a7a7a]">
          <span>{label}</span>
          <span className="font-medium text-[#1d1d1f]">{percentage}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-[#f0f0f0] rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={clsx('h-full transition-all duration-500 ease-out rounded-full', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
