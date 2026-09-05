import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, CheckCircle2, ShieldCheck, Mail, Lock, User, Eye, EyeOff, X, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button.jsx';
import { useAuthStore } from '../../stores/authStore.js';

function isCourseOrDayRoute(pathname) {
  if (!pathname) return false;
  // Explicitly match specific course, unit, and chapter/day pages
  const isSpecificCourse = pathname.startsWith('/courses/') && pathname.length > '/courses/'.length;
  // Also match practice and test assessment sessions
  const isPracticeOrTest = pathname.startsWith('/practice') || pathname.startsWith('/tests');

  return isSpecificCourse || isPracticeOrTest;
}

export function AuthEngagementModal() {
  const location = useLocation();
  const { isAuthenticated, isGuest, loginWithGoogle, loginWithEmail, registerWithEmail } = useAuthStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('google'); // 'google' | 'email-signin' | 'email-signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [triggerReason, setTriggerReason] = useState('time'); // 'time' | 'quiz' | 'test' | 'save'

  // Automatically close if user navigates away from course content / day pages
  useEffect(() => {
    if (!isCourseOrDayRoute(location.pathname)) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // 2-minute timer for guest users - strictly scoped to course/days content
  useEffect(() => {
    // If logged in as non-guest or not on a course/day route, do not prompt
    if ((isAuthenticated && !isGuest) || !isCourseOrDayRoute(location.pathname)) {
      setIsOpen(false);
      return;
    }

    const SNOOZE_KEY = 'bytelab_auth_snooze_until';
    const SESSION_START_KEY = 'bytelab_session_start_time';

    const now = Date.now();
    let sessionStart = sessionStorage.getItem(SESSION_START_KEY);
    if (!sessionStart) {
      sessionStart = String(now);
      sessionStorage.setItem(SESSION_START_KEY, sessionStart);
    }

    const elapsedMs = now - parseInt(sessionStart, 10);
    const TWO_MINUTES_MS = 120 * 1000;
    const remainingTime = Math.max(0, TWO_MINUTES_MS - elapsedMs);

    const timer = setTimeout(() => {
      // Re-verify that user is currently on a course content or day page
      if (!isCourseOrDayRoute(window.location.pathname)) {
        return;
      }
      const snoozeUntil = sessionStorage.getItem(SNOOZE_KEY);
      if (snoozeUntil && Date.now() < parseInt(snoozeUntil, 10)) {
        return;
      }
      if (!isAuthenticated || isGuest) {
        setTriggerReason('time');
        setIsOpen(true);
      }
    }, remainingTime);

    // Also listen to explicit custom events from quizzes or tests
    const handleExplicitPrompt = (e) => {
      if (isCourseOrDayRoute(window.location.pathname) && (!isAuthenticated || isGuest)) {
        setTriggerReason(e?.detail?.reason || 'quiz');
        setIsOpen(true);
      }
    };

    window.addEventListener('open-auth-prompt', handleExplicitPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-auth-prompt', handleExplicitPrompt);
    };
  }, [isAuthenticated, isGuest, location.pathname]);

  const handleSnooze = () => {
    // Snooze for 5 minutes
    const fiveMinutes = Date.now() + 5 * 60 * 1000;
    sessionStorage.setItem('bytelab_auth_snooze_until', String(fiveMinutes));
    setIsOpen(false);
    setError(null);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogle();
      if (res?.success) {
        toast.success(`Welcome, ${res.user?.displayName || 'Student'}! Progress synced.`);
        setIsOpen(false);
      }
    } catch (err) {
      setError(err.message || 'Google sign-in was interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      if (mode === 'email-signup') {
        const res = await registerWithEmail(email, password, name);
        if (res?.success) {
          toast.success('Account created! Your learning progress is now safely synced.');
          setIsOpen(false);
        }
      } else {
        const res = await loginWithEmail(email, password);
        if (res?.success) {
          toast.success(`Welcome back, ${res.user?.displayName || 'Student'}!`);
          setIsOpen(false);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || (isAuthenticated && !isGuest) || !isCourseOrDayRoute(location.pathname)) {
    return null;
  }

  const getHeading = () => {
    if (triggerReason === 'quiz') return 'Save Your Quiz Score & Progress';
    if (triggerReason === 'test') return 'Sync Your Assessment Certification';
    if (triggerReason === 'save') return 'Keep Your Custom Python Code Safe';
    return 'Save Your 46-Day Learning Progress';
  };

  const getSubheading = () => {
    if (triggerReason === 'quiz') {
      return 'Sign in to record your answers, earn XP points, and preserve your question review history.';
    }
    return "You've been studying on ByteLab. Sign in to save your learning streak, quiz scores, and sync code across devices.";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-[480px] bg-white rounded-[22px] border border-[#d9d9dd] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Close / Snooze Button */}
        <button
          onClick={handleSnooze}
          className="absolute top-4 right-4 p-2 rounded-full text-[#75758a] hover:text-[#17171c] hover:bg-[#eeece7]/50 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eeece7]/60 border border-[#d9d9dd] text-[12px] font-medium text-[#17171c]">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7759] fill-current" />
            <span>ByteLab Cloud Sync</span>
          </div>

          <h2 className="text-[22px] sm:text-[24px] font-medium text-[#17171c] tracking-tight leading-snug">
            {getHeading()}
          </h2>

          <p className="text-[13px] text-[#75758a] leading-relaxed">
            {getSubheading()}
          </p>
        </div>

        {/* Value Points */}
        <div className="space-y-2 py-1 text-[12px] text-[#212121]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Automatic synchronization with your student profile</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Preserve quiz answer keys, predictions, and test scores</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Daily learning streak tracking & leaderboard rankings</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[12px] text-[12px] text-red-800 leading-snug">
            {error}
          </div>
        )}

        {/* Main 1-Click Google Sign In */}
        <div className="space-y-3">
          <Button
            variant="secondary"
            size="lg"
            className="w-full flex items-center justify-center gap-3 py-3 border-[#d9d9dd] hover:border-[#17171c] bg-white text-[#17171c] shadow-xs cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-semibold text-[13px]">
              {loading ? 'Connecting...' : 'Continue with Google in 1-Click'}
            </span>
          </Button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-[#d9d9dd] w-full" />
            <span className="bg-white px-3 text-[11px] text-[#75758a] uppercase font-mono absolute">
              or use email
            </span>
          </div>

          {/* Email form toggle */}
          {mode === 'google' ? (
            <div className="flex gap-2">
              <Button
                variant="stone"
                size="sm"
                className="w-1/2 text-[12px]"
                onClick={() => setMode('email-signin')}
              >
                <Mail className="w-3.5 h-3.5 mr-1" />
                <span>Sign In with Email</span>
              </Button>
              <Button
                variant="stone"
                size="sm"
                className="w-1/2 text-[12px]"
                onClick={() => setMode('email-signup')}
              >
                <User className="w-3.5 h-3.5 mr-1" />
                <span>Create Account</span>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {mode === 'email-signup' && (
                <div>
                  <label className="text-[11px] font-medium text-[#75758a] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Kumar"
                    className="w-full px-3.5 py-2 text-[13px] bg-white border border-[#d9d9dd] rounded-[10px] focus:outline-none focus:border-[#17171c]"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-medium text-[#75758a] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  required
                  className="w-full px-3.5 py-2 text-[13px] bg-white border border-[#d9d9dd] rounded-[10px] focus:outline-none focus:border-[#17171c]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#75758a] block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2 pr-9 text-[13px] bg-white border border-[#d9d9dd] rounded-[10px] focus:outline-none focus:border-[#17171c]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#93939f] hover:text-[#17171c]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'email-signin' ? 'email-signup' : 'email-signin')}
                  className="text-[11px] text-[#75758a] hover:text-[#17171c] underline"
                >
                  {mode === 'email-signin' ? "Don't have an account? Sign Up" : 'Have an account? Sign In'}
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={loading}
                >
                  <span>{loading ? 'Processing...' : (mode === 'email-signup' ? 'Create Account' : 'Sign In')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Dismiss / Snooze */}
        <div className="pt-2 border-t border-[#d9d9dd] flex items-center justify-between text-[11px] text-[#75758a]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free & secure student access</span>
          </span>
          <button
            onClick={handleSnooze}
            className="hover:text-[#17171c] hover:underline cursor-pointer font-medium"
          >
            Continue as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}
