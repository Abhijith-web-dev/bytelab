import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { useUIStore } from '../../stores/uiStore.js';

export function SubNavFrosted({
  title,
  subtitle,
  breadcrumbs = [],
  ctaLabel,
  ctaLink,
  onCtaClick,
  rightElement
}) {
  const { isFocusMode } = useUIStore();
  
  return (
    <div className={`sticky ${isFocusMode ? 'top-0' : 'top-[58px]'} z-30 w-full h-[52px] bg-white/95 backdrop-blur-md border-b border-[#d9d9dd] select-none transition-all`}>
      <div className="max-w-[1440px] h-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Title and Breadcrumbs */}
        <div className="flex items-center gap-2 overflow-hidden">
          {breadcrumbs.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 text-[13px] text-[#75758a] mr-2 shrink-0">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path || idx}>
                  <Link to={crumb.path} className="hover:text-[#17171c] transition-colors truncate max-w-[120px]">
                    {crumb.label}
                  </Link>
                  {idx < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#93939f] shrink-0" />
                  )}
                </React.Fragment>
              ))}
              <ChevronRight className="w-3.5 h-3.5 text-[#93939f] shrink-0" />
            </div>
          )}

          <div className="flex items-center gap-2 truncate">
            <h1 className="text-[16px] sm:text-[18px] font-semibold text-[#17171c] tracking-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <span className="hidden md:inline-block text-[13px] text-[#75758a] font-normal truncate">
                • {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {rightElement}
          {ctaLabel && (
            ctaLink ? (
              <Link to={ctaLink}>
                <Button variant="primary" size="sm">
                  {ctaLabel}
                </Button>
              </Link>
            ) : (
              <Button variant="primary" size="sm" onClick={onCtaClick}>
                {ctaLabel}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
