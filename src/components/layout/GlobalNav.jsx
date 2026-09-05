import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Code2, Menu, X, User, LogOut, Award, Flame, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useUIStore } from '../../stores/uiStore.js';
import { Button } from '../ui/Button.jsx';

export function GlobalNav() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { streakDays, totalPoints } = useProgressStore();
  const { openCmdK, isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUIStore();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const navLinks = [
    { label: 'Curriculum', path: '/courses/python-programming' },
    { label: 'All Tracks', path: '/courses' },
    { label: 'Playground', path: '/practice' },
    { label: 'Assessments', path: '/tests' },
    { label: 'Analytics', path: '/progress' },
    { label: 'Rankings', path: '/leaderboard' }
  ];

  const isActive = (path) => {
    if (path === '/courses') return location.pathname === '/courses';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* DESIGN.md announcement-bar: 36px tall black bar with microcopy */}
      {showAnnouncement && (
        <div className="w-full h-[36px] bg-[#000000] text-white text-[12px] flex items-center justify-between px-4 md:px-8 border-b border-[#222222] select-none transition-all z-50">
          <div className="flex-1 text-center truncate">
            <span className="text-[#93939f] hidden sm:inline">Engineering Lab Update: </span>
            <span className="font-medium text-white">Python 19AI301 Active</span>
            <span className="mx-2 text-[#75758a]">•</span>
            <span className="text-[#93939f]">C/C++, TypeScript & Rust tracks architecture-ready</span>
            <Link
              to="/courses"
              className="ml-2.5 underline decoration-[#93939f] hover:decoration-white transition-colors text-white font-medium inline-flex items-center gap-0.5"
            >
              <span>Explore Tracks</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-[#93939f] hover:text-white p-1 ml-2 transition-colors cursor-pointer"
            aria-label="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full h-[58px] bg-white/95 backdrop-blur-md border-b border-[#d9d9dd] select-none">
        <div className="max-w-[1440px] h-full mx-auto px-4 md:px-8 flex items-center justify-between text-[14px]">
          {/* Left: Brand Logo & Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              onClick={closeMobileNav}
              className="flex items-center gap-2.5 text-[#000000] font-semibold text-[17px] tracking-tight group"
            >
              <div className="w-7 h-7 rounded-[8px] bg-[#000000] group-hover:bg-[#17171c] flex items-center justify-center text-white shadow-xs transition-colors">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-display font-semibold tracking-tight text-[18px]">ByteLab</span>
              <span className="hidden sm:inline text-[10px] font-mono tracking-widest text-[#737373] uppercase bg-[#fafafa] border border-[#e5e5e5] px-1.5 py-0.5 rounded">
                CORE
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[14px] text-[#525252]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive(link.path)
                      ? 'text-[#000000] font-semibold border-b-2 border-[#000000]'
                      : 'hover:text-[#000000]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center / Search Pill (DESIGN.md search-pill) */}
          <div className="hidden md:flex items-center justify-center">
            <button
              onClick={openCmdK}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fafafa] hover:bg-white border border-[#e5e5e5] text-[#737373] hover:text-[#000000] hover:border-[#17171c] transition-all cursor-pointer text-[13px] w-[240px] lg:w-[320px] justify-between focus:ring-2 focus:ring-[#1863dc]/40"
              title="Search curriculum & concepts (Ctrl+K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#a3a3a3]" />
                <span className="truncate">Search topics, languages & code...</span>
              </div>
              <kbd className="bg-[#e5e5e5] text-[#525252] px-1.5 py-0.5 rounded text-[10px] font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Streak & Points indicator */}
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[12px]">
                <div className="flex items-center gap-1 text-amber-500 font-semibold" title="Active Learning Streak">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{streakDays}d</span>
                </div>
                <div className="w-[1px] h-3 bg-[#e5e5e5]" />
                <div className="flex items-center gap-1 text-[#000000] font-semibold" title="Verified Points">
                  <Award className="w-3.5 h-3.5" />
                  <span>{totalPoints} pts</span>
                </div>
              </div>
            )}

            {/* Auth / Profile CTA */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-[#000000] hover:opacity-80 transition-opacity"
                >
                  <div className="w-7 h-7 rounded-full bg-[#17171c] text-white flex items-center justify-center text-[12px] font-semibold">
                    {user?.displayName?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <span className="hidden sm:inline font-medium text-[13px] truncate max-w-[100px]">
                    {user?.displayName || 'Student'}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 text-[#737373] hover:text-[#000000] rounded-full transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link to="/login" className="hidden sm:inline-block text-[13px] font-medium text-[#000000] hover:text-[#525252] px-3 py-1.5">
                  Sign in
                </Link>
                <Link to="/courses/python-programming">
                  <Button variant="primary" size="sm">
                    <span className="hidden sm:inline">Start Learning</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileNav}
              className="lg:hidden p-2 text-[#000000] hover:bg-[#fafafa] rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-black" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with DESIGN.md layout */}
      {isMobileNavOpen && (
        <div className={`fixed inset-0 ${showAnnouncement ? 'top-[94px]' : 'top-[58px]'} z-50 bg-white/98 backdrop-blur-lg border-b border-[#e5e5e5] p-6 lg:hidden overflow-y-auto animate-in slide-in-from-top-2 duration-150`}>
          <div className="flex flex-col gap-4 text-[15px]">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                closeMobileNav();
                openCmdK();
              }}
              className="flex items-center justify-between px-4 py-3 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[14px] text-[#737373] w-full"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4" />
                <span>Search topics, languages & code...</span>
              </div>
              <span className="font-mono text-[11px] bg-[#e5e5e5] px-2 py-0.5 rounded text-black font-semibold">⌘K</span>
            </button>

            {/* Language Track Badges */}
            <div className="pt-2 pb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block mb-2">Available & Planned Tracks</span>
              <div className="flex flex-wrap gap-2">
                <span className="text-[12px] px-2.5 py-1 rounded-full bg-black text-white font-medium">Python 3.11</span>
                <span className="text-[12px] px-2.5 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[#525252]">C / C++</span>
                <span className="text-[12px] px-2.5 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[#525252]">TypeScript</span>
                <span className="text-[12px] px-2.5 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[#525252]">Rust</span>
                <span className="text-[12px] px-2.5 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[#525252]">SQL</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col divide-y divide-[#f0f0f0] border-t border-b border-[#e5e5e5]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileNav}
                  className={`py-3 flex items-center justify-between min-h-[44px] ${
                    isActive(link.path) ? 'text-[#000000] font-bold' : 'text-[#525252]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#a3a3a3]" />
                </Link>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileNav}
                    className="py-2.5 px-4 rounded-full bg-[#fafafa] border border-[#e5e5e5] flex items-center gap-2.5 text-[#000000] font-medium"
                  >
                    <User className="w-4 h-4 text-black" />
                    <span>My Account & Progress</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileNav();
                    }}
                    className="py-2.5 px-4 rounded-full text-red-600 hover:bg-red-50 font-medium text-left flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/courses/python-programming"
                    onClick={closeMobileNav}
                    className="w-full text-center bg-[#000000] text-white py-3 rounded-full font-medium shadow-xs"
                  >
                    Start Learning Free
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileNav}
                    className="w-full text-center bg-white border border-[#e5e5e5] text-black py-3 rounded-full font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

