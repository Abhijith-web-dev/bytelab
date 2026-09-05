import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, ArrowRight, ShieldCheck, UserCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useSEO } from '../../hooks/useSEO.js';

export function RegisterPage() {
  useSEO({
    title: 'Create Account | ByteLab Core',
    description: 'Join ByteLab to master computer science with in-browser WebAssembly execution and cloud progress synchronization.'
  });

  const navigate = useNavigate();
  const { registerWithEmail, loginWithGoogle, loginAsGuest, isLoading, authError, clearError } = useAuthStore();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }
    try {
      await registerWithEmail(email, password, displayName);
      navigate('/courses/python-programming');
    } catch (err) {
      setLocalError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError('');
    clearError();
    try {
      await loginWithGoogle();
      navigate('/courses/python-programming');
    } catch (err) {
      setLocalError(err.message || 'Google sign-up was cancelled or failed.');
    }
  };

  const handleGuest = async () => {
    setLocalError('');
    clearError();
    try {
      await loginAsGuest();
      navigate('/courses/python-programming');
    } catch (err) {
      setLocalError('Guest session could not be initialized.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#fafafa] flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      <div className="w-full max-w-[420px] space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 text-[#000000] font-semibold text-[19px] tracking-tight group">
            <div className="w-9 h-9 rounded-[10px] bg-[#000000] group-hover:bg-[#17171c] flex items-center justify-center text-white shadow-xs transition-colors">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-display font-semibold tracking-tight text-[20px]">ByteLab</span>
          </Link>
          <h1 className="text-[24px] sm:text-[26px] font-semibold text-[#000000] tracking-tight">
            Create your Account
          </h1>
          <p className="text-[13px] text-[#75758a]">
            19AI301 / CS3301 Systems & Multi-Language Curriculum
          </p>
        </div>

        {/* Card Container */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-white border border-[#d9d9dd] space-y-5 shadow-xs">
          {/* Error Banner */}
          {(localError || authError) && (
            <div className="p-3.5 bg-red-50 text-red-800 text-[13px] rounded-[10px] border border-red-200 flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-snug">{localError || authError}</div>
            </div>
          )}

          {/* 1-Click Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-white hover:bg-[#fafafa] active:bg-[#eeece7] border border-[#d9d9dd] hover:border-[#17171c] text-[#212121] text-[14px] font-medium transition-all duration-150 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#d9d9dd]" />
            <span className="bg-white px-3 text-[11px] font-mono uppercase text-[#93939f] tracking-wider absolute">
              or register with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#212121]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ananya Sharma"
                autoComplete="name"
                className="w-full px-3.5 py-2.5 rounded-[10px] text-[14px] border border-[#d9d9dd] bg-white text-[#212121] placeholder-[#93939f] focus:outline-none focus:border-[#17171c] focus:ring-1 focus:ring-[#17171c] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#212121]">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                autoComplete="email"
                className="w-full px-3.5 py-2.5 rounded-[10px] text-[14px] border border-[#d9d9dd] bg-white text-[#212121] placeholder-[#93939f] focus:outline-none focus:border-[#17171c] focus:ring-1 focus:ring-[#17171c] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#212121]">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-[10px] text-[14px] border border-[#d9d9dd] bg-white text-[#212121] placeholder-[#93939f] focus:outline-none focus:border-[#17171c] focus:ring-1 focus:ring-[#17171c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#93939f] hover:text-[#17171c] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full py-2.5 text-[14px] mt-2 shadow-xs"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Guest Mode Option */}
          <div className="pt-2 border-t border-[#f0f0f0]">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleGuest}
              className="w-full py-2 text-[13px] text-[#525252] border-[#d9d9dd] hover:text-[#17171c]"
            >
              <UserCheck className="w-4 h-4" />
              <span>Continue as Guest (Local Offline Mode)</span>
            </Button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-[13px] text-[#75758a]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#000000] font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
