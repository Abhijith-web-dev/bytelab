import React, { useEffect } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  size = 'lg', // 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  maxWidth = '',
  className = ''
}) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-3xl lg:max-w-4xl',
    xl: 'max-w-5xl xl:max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-[96vw]'
  };

  const dialogWidth = maxWidth || (isFullscreen ? 'max-w-[98vw] w-[98vw] h-[96vh]' : sizeClasses[size] || 'max-w-4xl');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${dialogWidth} bg-white rounded-[16px] sm:rounded-[20px] shadow-2xl border border-[#d9d9dd] overflow-hidden z-10 flex flex-col max-h-[95vh] sm:max-h-[92vh] animate-in fade-in zoom-in-95 duration-150 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#eeece7]/40 border-b border-[#d9d9dd] shrink-0">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#17171c] truncate tracking-tight">
                    {title}
                  </h3>
                  {badge && (
                    <span className="shrink-0">{badge}</span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-[12px] text-[#75758a] truncate mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-[#75758a] hover:text-[#17171c] hover:bg-black/5 transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#75758a] hover:text-[#17171c] hover:bg-black/5 transition-colors cursor-pointer active:scale-95"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto touch-scroll p-3 sm:p-5 md:p-6 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
