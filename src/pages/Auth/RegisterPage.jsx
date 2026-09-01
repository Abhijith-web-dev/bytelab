import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, UserCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { useAuthStore } from '../../stores/authStore.js';

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerWithEmail, loginAsGuest, authLoading, authError } = useAuthStore();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await registerWithEmail(email, password, displayName);
      navigate('/courses/python-programming');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate('/courses/python-programming');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-[8px] bg-black text-white flex items-center justify-center mx-auto shadow-xs">
            <Code2 className="w-5 h-5" />
          </div>
          <h1 className="text-[24px] font-semibold text-black tracking-tight">Create your Account</h1>
          <p className="text-[14px] text-[#737373]">19AI301 / CS3301 Python Learning Platform</p>
        </div>

        <div className="p-6 rounded-[12px] bg-white border border-[#e5e5e5] space-y-4 shadow-xs">
          {(errorMsg || authError) && (
            <div className="p-3 bg-red-50 text-red-700 text-[13px] rounded-[8px] border border-red-200">
              {errorMsg || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-black">Full Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ananya Sharma"
                className="w-full px-3.5 py-2 rounded-[8px] text-[14px] border border-[#e5e5e5] bg-[#fafafa] text-black focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-black">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@bytelab.edu"
                className="w-full px-3.5 py-2 rounded-[8px] text-[14px] border border-[#e5e5e5] bg-[#fafafa] text-black focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-black">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-[8px] text-[14px] border border-[#e5e5e5] bg-[#fafafa] text-black focus:outline-none focus:border-black"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={authLoading}
              className="w-full py-2.5"
            >
              {authLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5e5e5]" />
            </div>
            <div className="relative flex justify-center text-[12px] uppercase">
              <span className="bg-white px-2 text-[#a3a3a3]">or continue without account</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleGuest}
            className="w-full py-2.5 text-[14px]"
          >
            <UserCheck className="w-4 h-4" />
            <span>Continue as Guest (Offline Mode)</span>
          </Button>
        </div>

        <div className="text-center text-[13px] text-[#737373]">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
