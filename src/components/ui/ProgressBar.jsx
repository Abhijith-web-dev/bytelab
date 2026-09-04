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
  barColor = 'bg-[#17171c]'
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3.5'
  };

  return (
    <div className={twMerge('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-[12px] font-medium text-[#75758a]">
          <span>{label}</span>
          <span className="font-mono text-[#212121]">{percentage}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-[#eeece7] rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={clsx('h-full transition-all duration-500 ease-out rounded-full', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
