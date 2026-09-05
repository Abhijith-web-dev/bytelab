import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Code2,
  Menu,
  X,
  User,
  LogOut,
  Award,
  Flame,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Layers,
  Terminal,
  FileCheck,
  Trophy,
  BarChart3,
  Newspaper,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useUIStore } from '../../stores/uiStore.js';
import { Button } from '../ui/Button.jsx';

export function GlobalNav() {
  const location = useLocation();
  const { user, isAuthenticated, isGuest, logout } = useAuthStore();
  const { streakDays, totalPoints } = useProgressStore();
  const { openCmdK, isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUIStore();
  
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'curriculum' | 'assessments' | 'profile' | null
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navRef = useRef(null);

  // Close dropdowns on outside click or route change
  useEffect(() => {
    setActiveDropdown(null);
    setProfileMenuOpen(false);
    closeMobileNav();
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === '/courses') return location.pathname === '/courses';
    return location.pathname.startsWith(path);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
    setProfileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar: 36px with clean highlight */}
      {showAnnouncement && (
        <div className="w-full h-[36px] bg-[#17171c] text-white text-[12px] flex items-center justify-between px-4 md:px-8 border-b border-[#2e2e38] select-none transition-all z-50">
          <div className="flex-1 text-center truncate flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#ff7759] text-white text-[10px] font-bold px-2 py-0.2 rounded-full font-mono">
              NEW
            </span>
            <span className="text-[#93939f] hidden sm:inline">Engineering Curriculum: </span>
            <span className="font-semibold text-white">46-Day Python Master Plan Active</span>
            <span className="mx-1 text-[#75758a] hidden md:inline">•</span>
            <span className="text-[#93939f] hidden md:inline">Pyodide 3.11 WASM Runtime</span>
            <Link
              to="/courses/python-programming"
              className="ml-2 underline decoration-[#75758a] hover:decoration-white transition-colors text-white font-medium inline-flex items-center gap-0.5"
            >
              <span>Explore Syllabus</span>
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

      {/* Main Top Header Navbar */}
      <header
        ref={navRef}
        className="sticky top-0 z-40 w-full h-[60px] bg-white/95 backdrop-blur-md border-b border-[#d9d9dd] select-none"
      >
        <div className="max-w-[1440px] h-full mx-auto px-4 md:px-8 flex items-center justify-between text-[14px]">
          {/* Left: Brand Logo & Desktop Dropdown Menus */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              onClick={closeMobileNav}
              className="flex items-center gap-2.5 text-[#17171c] font-semibold text-[17px] tracking-tight group"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[#17171c] group-hover:bg-[#000000] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold tracking-tight text-[18px] text-[#17171c]">ByteLab</span>
                <span className="text-[10px] font-mono tracking-widest text-[#75758a] uppercase bg-[#eeece7]/60 border border-[#d9d9dd] px-1.5 py-0.2 rounded font-semibold">
                  3.11
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Rich Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] text-[#525252]">
              {/* Dropdown 1: Curriculum & Tracks */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('curriculum')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    activeDropdown === 'curriculum' || location.pathname.startsWith('/courses')
                      ? 'bg-[#eeece7]/70 text-[#17171c] font-semibold'
                      : 'hover:bg-[#eeece7]/40 text-[#525252] hover:text-[#17171c]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Curriculum</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'curriculum' ? 'rotate-180 text-[#17171c]' : 'text-[#93939f]'}`} />
                </button>

                {/* Dropdown Content */}
                {activeDropdown === 'curriculum' && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-[360px] bg-white rounded-[18px] border border-[#d9d9dd] shadow-xl p-3 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#93939f] font-semibold">
                      Interactive Learning Tracks
                    </div>

                    <Link
                      to="/courses/python-programming"
                      className="p-2.5 rounded-[12px] hover:bg-[#eeece7]/50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#17171c] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-semibold text-[#17171c] group-hover:underline flex items-center gap-1.5">
                          <span>Python 19AI301 (46 Days)</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-mono font-medium">Active</span>
                        </div>
                        <p className="text-[11px] text-[#75758a] leading-relaxed">
                          5-unit university syllabus with NumPy, pandas, and Pyodide WASM runtime.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/courses"
                      className="p-2.5 rounded-[12px] hover:bg-[#eeece7]/50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#eeece7] text-[#17171c] flex items-center justify-center shrink-0 mt-0.5">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-semibold text-[#17171c] group-hover:underline">
                          All Language Tracks
                        </div>
                        <p className="text-[11px] text-[#75758a] leading-relaxed">
                          Explore C/C++, Rust, TypeScript, and SQL systems architectures.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/practice"
                      className="p-2.5 rounded-[12px] hover:bg-[#eeece7]/50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#eeece7] text-[#1863dc] flex items-center justify-center shrink-0 mt-0.5">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-semibold text-[#17171c] group-hover:underline">
                          Practice Playground & IDE
                        </div>
                        <p className="text-[11px] text-[#75758a] leading-relaxed">
                          Hands-on coding sandbox with live stack error diagnostics.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Dropdown 2: Assessments & Analytics */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('assessments')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    activeDropdown === 'assessments' || location.pathname.startsWith('/tests') || location.pathname.startsWith('/progress') || location.pathname.startsWith('/leaderboard')
                      ? 'bg-[#eeece7]/70 text-[#17171c] font-semibold'
                      : 'hover:bg-[#eeece7]/40 text-[#525252] hover:text-[#17171c]'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-[#ff7759]" />
                  <span>Assessments</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activeDropdown === 'assessments' ? 'rotate-180 text-[#17171c]' : 'text-[#93939f]'}`} />
                </button>

                {/* Dropdown Content */}
                {activeDropdown === 'assessments' && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-[360px] bg-white rounded-[18px] border border-[#d9d9dd] shadow-xl p-3 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#93939f] font-semibold">
                      Assessments & Rankings
                    </div>

                    <Link
                      to="/tests"
                      className="p-2.5 rounded-[12px] hover:bg-[#eeece7]/50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#eeece7] text-[#ff7759] flex items-center justify-center shrink-0 mt-0.5">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-semibold text-[#17171c] group-hover:underline">
                          Chapter & Unit Tests
                        </div>
                        <p className="text-[11px] text-[#75758a] leading-relaxed">
                          Randomized questions mapped to Bloom's taxonomy & Course Outcomes.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/leaderboard"
                      className="p-2.5 rounded-[12px] hover:bg-[#eeece7]/50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#eeece7] text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-semibold text-[#17171c] group-hover:underline">
                          Global Leaderboard
                        </div>
                        <p className="text-[11px] text-[#75758a] leading-relaxed">
                          Compare learning streaks, XP points, and verified test scores.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/progress"
                      className="p-2.5 rounded-[12px] hover:bg-[#eeece7]/50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#eeece7] text-[#003c33] flex items-center justify-center shrink-0 mt-0.5">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-semibold text-[#17171c] group-hover:underline">
                          Outcome Analytics
                        </div>
                        <p className="text-[11px] text-[#75758a] leading-relaxed">
                          Inspect your CO1–CO5 syllabus mastery and lecture completion rates.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Link 3: Developer Blog */}
              <Link
                to="/blog"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                  location.pathname.startsWith('/blog')
                    ? 'bg-[#eeece7]/70 text-[#17171c] font-semibold'
                    : 'hover:bg-[#eeece7]/40 text-[#525252] hover:text-[#17171c]'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Blog</span>
              </Link>
            </nav>
          </div>

          {/* Center: Command+K Quick Search Pill */}
          <div className="hidden md:flex items-center justify-center">
            <button
              onClick={openCmdK}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fafafa] hover:bg-white border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c] hover:border-[#17171c] transition-all cursor-pointer text-[13px] w-[240px] lg:w-[320px] justify-between shadow-2xs hover:shadow-xs group"
              title="Search curriculum & concepts (Ctrl+K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-[#93939f] group-hover:text-[#17171c]" />
                <span className="truncate">Search 46 days, topics, code...</span>
              </div>
              <kbd className="bg-[#eeece7] text-[#17171c] px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border border-[#d9d9dd]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Streak Stats, Auth & Primary Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Logged-In Streak & Points Pill */}
            {isAuthenticated && !isGuest && (
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#fafafa] border border-[#d9d9dd] text-[12px]">
                <div className="flex items-center gap-1 text-amber-600 font-semibold" title="Active Learning Streak">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{streakDays}d</span>
                </div>
                <div className="w-[1px] h-3 bg-[#d9d9dd]" />
                <div className="flex items-center gap-1 text-[#17171c] font-semibold" title="Total Points">
                  <Award className="w-3.5 h-3.5 text-[#ff7759]" />
                  <span>{totalPoints} pts</span>
                </div>
              </div>
            )}

            {/* Auth / Account Profile Button */}
            {isAuthenticated && !isGuest ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1 pr-2 rounded-full border border-[#d9d9dd] hover:border-[#17171c] bg-white transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#17171c] text-white flex items-center justify-center text-[12px] font-bold shadow-xs">
                    {user?.displayName?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <span className="hidden sm:inline font-medium text-[13px] text-[#17171c] truncate max-w-[90px]">
                    {user?.displayName || 'Student'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#75758a]" />
                </button>

                {/* Profile Flyout Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white rounded-[16px] border border-[#d9d9dd] shadow-xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="px-3 py-2 border-b border-[#d9d9dd]/60 space-y-0.5">
                      <div className="text-[13px] font-semibold text-[#17171c] truncate">
                        {user?.displayName || 'Student Account'}
                      </div>
                      <div className="text-[11px] text-[#75758a] truncate">
                        {user?.email || 'Logged in'}
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-[13px] text-[#212121] hover:bg-[#eeece7]/50 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#75758a]" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/progress"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-[13px] text-[#212121] hover:bg-[#eeece7]/50 transition-colors"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-[#75758a]" />
                      <span>Learning Analytics</span>
                    </Link>

                    <div className="border-t border-[#d9d9dd]/60 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-[10px] text-[13px] text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center px-3 py-1.5 text-[13px] font-medium text-[#17171c] hover:text-black hover:bg-[#eeece7]/50 rounded-full transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/courses/python-programming">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-1.5 shadow-xs hover:shadow transition-all px-3.5 py-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current text-[#ff7759]" />
                    <span className="font-medium text-[13px]">Start 46-Day Plan</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileNav}
              className="lg:hidden p-2 text-[#17171c] hover:bg-[#eeece7]/50 rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Rich Hierarchical Categories */}
      {isMobileNavOpen && (
        <div className={`fixed inset-0 ${showAnnouncement ? 'top-[96px]' : 'top-[60px]'} z-50 bg-white/98 backdrop-blur-lg border-b border-[#d9d9dd] p-6 lg:hidden overflow-y-auto animate-in slide-in-from-top-2 duration-150`}>
          <div className="flex flex-col gap-5 text-[14px]">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                closeMobileNav();
                openCmdK();
              }}
              className="flex items-center justify-between px-4 py-3 rounded-full bg-[#fafafa] border border-[#d9d9dd] text-[13px] text-[#75758a] w-full shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#93939f]" />
                <span>Search 46 days, topics & code...</span>
              </div>
              <span className="font-mono text-[10px] bg-[#eeece7] px-2 py-0.5 rounded text-[#17171c] font-semibold border border-[#d9d9dd]">⌘K</span>
            </button>

            {/* Curriculum Category */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#93939f] font-semibold block">
                Learning & Courses
              </span>
              <div className="space-y-1">
                <Link
                  to="/courses/python-programming"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] bg-[#eeece7]/40 border border-[#d9d9dd] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-[#17171c]" />
                    <div>
                      <div className="font-semibold text-[#17171c] text-[13px]">Python 19AI301 (46-Day)</div>
                      <div className="text-[11px] text-[#75758a]">5 units • Pyodide 3.11 Runtime</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>

                <Link
                  to="/courses"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] hover:bg-[#fafafa] border border-[#d9d9dd]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-[#75758a]" />
                    <span className="font-medium text-[#212121]">All Language Tracks</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>

                <Link
                  to="/practice"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] hover:bg-[#fafafa] border border-[#d9d9dd]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-[#1863dc]" />
                    <span className="font-medium text-[#212121]">Practice Playground IDE</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>
              </div>
            </div>

            {/* Assessment & Analytics Category */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#93939f] font-semibold block">
                Assessments & Analytics
              </span>
              <div className="space-y-1">
                <Link
                  to="/tests"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] hover:bg-[#fafafa] border border-[#d9d9dd]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4 text-[#ff7759]" />
                    <span className="font-medium text-[#212121]">Chapter & Unit Tests</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>

                <Link
                  to="/leaderboard"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] hover:bg-[#fafafa] border border-[#d9d9dd]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-[#212121]">Global Leaderboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>

                <Link
                  to="/progress"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] hover:bg-[#fafafa] border border-[#d9d9dd]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-[#003c33]" />
                    <span className="font-medium text-[#212121]">Outcome Mastery Analytics</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>

                <Link
                  to="/blog"
                  onClick={closeMobileNav}
                  className="p-3 rounded-[12px] hover:bg-[#fafafa] border border-[#d9d9dd]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Newspaper className="w-4 h-4 text-[#75758a]" />
                    <span className="font-medium text-[#212121]">Developer Blog (Abhijith S)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#93939f]" />
                </Link>
              </div>
            </div>

            {/* Mobile Bottom Auth CTAs */}
            <div className="pt-2 flex flex-col gap-2.5 border-t border-[#d9d9dd]">
              {isAuthenticated && !isGuest ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileNav}
                    className="py-2.5 px-4 rounded-full bg-[#eeece7]/50 border border-[#d9d9dd] flex items-center gap-2.5 text-[#17171c] font-medium"
                  >
                    <User className="w-4 h-4 text-[#17171c]" />
                    <span>My Profile & Progress</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileNav();
                    }}
                    className="py-2.5 px-4 rounded-full text-red-600 hover:bg-red-50 font-medium text-left flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    to="/courses/python-programming"
                    onClick={closeMobileNav}
                    className="w-full text-center bg-[#17171c] hover:bg-black text-white py-3 rounded-full font-semibold shadow-xs flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#ff7759] fill-current" />
                    <span>Start 46-Day Plan Free</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileNav}
                    className="w-full text-center bg-white border border-[#d9d9dd] text-[#17171c] hover:border-[#17171c] py-2.5 rounded-full font-medium"
                  >
                    Sign In to Account
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


