import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, BookOpen, Code, Layers, FileText, ArrowRight, X } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore.js';
import { buildSearchIndex } from '../../content/loader/index.js';

export function CommandPalette() {
  const navigate = useNavigate();
  const { isCmdKOpen, closeCmdK } = useUIStore();
  const [query, setQuery] = useState('');

  const searchItems = useMemo(() => buildSearchIndex('python-programming'), []);

  const fuse = useMemo(() => {
    return new Fuse(searchItems, {
      keys: ['title', 'description', 'tags', 'type'],
      threshold: 0.35,
      ignoreLocation: true
    });
  }, [searchItems]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return searchItems.slice(0, 8); // Default suggested items
    }
    return fuse.search(query).map(r => r.item).slice(0, 10);
  }, [query, fuse, searchItems]);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        useUIStore.getState().toggleCmdK();
      }
      if (e.key === 'Escape' && isCmdKOpen) {
        closeCmdK();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCmdKOpen, closeCmdK]);

  if (!isCmdKOpen) return null;

  const handleSelect = (url) => {
    closeCmdK();
    setQuery('');
    navigate(url);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Unit': return <Layers className="w-4 h-4 text-blue-500" />;
      case 'Chapter': return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'Practice Problem': return <Code className="w-4 h-4 text-purple-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCmdK}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[18px] shadow-2xl border border-[#e0e0e0] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#e0e0e0] bg-[#fafafc]">
          <Search className="w-5 h-5 text-[#7a7a7a] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search lessons, concepts, exercises (e.g. 'recursion', 'numpy', 'matrix')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 text-[16px] text-[#1d1d1f] bg-transparent outline-none placeholder-[#a1a1a6]"
          />
          <button
            onClick={closeCmdK}
            className="p-1 text-[#7a7a7a] hover:text-[#1d1d1f] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  className="w-full flex items-center justify-between p-3 rounded-[10px] text-left hover:bg-[#f5f5f7] transition-colors group cursor-pointer"
                >
                  <div className="flex items-start gap-3 overflow-hidden">
                    <div className="mt-0.5 p-1.5 rounded-[6px] bg-white border border-[#e0e0e0] shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="truncate">
                      <div className="text-[14px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] flex items-center gap-2">
                        <span className="truncate">{item.title}</span>
                        <span className="text-[11px] font-normal text-[#7a7a7a] bg-[#f0f0f0] px-1.5 py-0.2 rounded shrink-0">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#7a7a7a] truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#a1a1a6] opacity-0 group-hover:opacity-100 group-hover:text-[#0066cc] transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[#7a7a7a]">
              <p className="text-[15px] font-medium text-[#1d1d1f]">No matching results</p>
              <p className="text-[13px] mt-1">Try searching for keywords like "recursion", "list", "lambda", "gcd", or "pandas"</p>
            </div>
          )}
        </div>

        {/* Footer Meta */}
        <div className="px-4 py-2.5 bg-[#f5f5f7] border-t border-[#e0e0e0] flex items-center justify-between text-[11px] text-[#7a7a7a]">
          <span>Use <b>↑ ↓</b> to navigate, <b>ESC</b> to close</span>
          <span><b>27</b> Chapters • <b>60</b> Periods Curriculum</span>
        </div>
      </div>
    </div>
  );
}
