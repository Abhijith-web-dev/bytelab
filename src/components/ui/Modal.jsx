import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-xl'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative w-full ${maxWidth} bg-white rounded-[18px] shadow-2xl border border-[#e0e0e0] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
            <h3 className="text-[17px] font-semibold text-[#1d1d1f]">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
