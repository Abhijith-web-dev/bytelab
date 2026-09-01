import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Code2, Menu, X, User, LogOut, Award, Flame, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useUIStore } from '../../stores/uiStore.js';
import { Button } from '../ui/Button.jsx';

export function GlobalNav() {
  const location = useLocation();
  const { user, isAuthenticated, isGuest, logout } = useAuthStore();
  const { streakDays, totalPoints } = useProgressStore();
  const { openCmdK, isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUIStore();

  const navLinks = [
    { label: 'Curriculum', path: '/courses/python-programming' },
    { label: 'Courses', path: '/courses' },
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
      <header className="sticky top-0 z-40 w-full h-[56px] bg-white border-b border-[#e5e5e5] select-none">
        <div className="max-w-[1440px] h-full mx-auto px-4 md:px-8 flex items-center justify-between text-[14px]">
          {/* Left: Brand Logo & Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              onClick={closeMobileNav}
              className="flex items-center gap-2.5 text-[#000000] font-semibold text-[17px] tracking-tight"
            >
              <div className="w-7 h-7 rounded-[8px] bg-[#000000] flex items-center justify-center text-white shadow-xs">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-display">ByteLab</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[14px] text-[#525252]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive(link.path)
                      ? 'text-[#000000] font-semibold'
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
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fafafa] hover:bg-white border border-[#e5e5e5] text-[#737373] hover:text-[#000000] transition-colors cursor-pointer text-[13px] w-[240px] lg:w-[320px] justify-between focus:ring-2 focus:ring-[#3b82f6]/50"
              title="Search curriculum & concepts (Ctrl+K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#a3a3a3]" />
                <span>Search topics & concepts...</span>
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
                  <div className="w-7 h-7 rounded-full bg-[#171717] text-white flex items-center justify-center text-[12px] font-semibold">
                    {user?.displayName?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <span className="hidden sm:inline font-medium text-[13px] truncate max-w-[100px]">
                    {user?.displayName || 'Student'}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 text-[#737373] hover:text-[#000000] rounded-full transition-colors"
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
              className="lg:hidden p-1.5 text-[#000000] hover:bg-[#fafafa] rounded-full"
              aria-label="Toggle Navigation"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 top-[56px] z-30 bg-white border-b border-[#e5e5e5] p-6 lg:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-4 text-[16px]">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                closeMobileNav();
                openCmdK();
              }}
              className="flex items-center justify-between px-4 py-2.5 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[14px] text-[#737373]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Search curriculum...</span>
              </div>
              <span className="font-mono text-[11px]">⌘K</span>
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileNav}
                className={`py-2 border-b border-[#e5e5e5] ${
                  isActive(link.path) ? 'text-[#000000] font-bold' : 'text-[#525252]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileNav}
                    className="py-2 flex items-center gap-2 text-[#000000] font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>My Account & Progress</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileNav();
                    }}
                    className="py-2 flex items-center gap-2 text-red-600 font-medium text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileNav}
                  className="w-full text-center bg-[#000000] text-white py-2.5 rounded-full font-medium"
                >
                  Sign In / Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
