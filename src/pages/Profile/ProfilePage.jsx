import React from 'react';
import { User, LogOut, Award, Flame, CheckCircle2, ShieldCheck, Database, RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';

export function ProfilePage() {
  const { user, isGuest, logout } = useAuthStore();
  const {
    completedChapters,
    solvedProblems,
    coMastery,
    totalPoints,
    streakDays,
    testHistory,
    getCourseCompletionPercentage
  } = useProgressStore();

  const completionPercent = getCourseCompletionPercentage();
  const solvedCount = Object.values(solvedProblems).filter(p => p.passed).length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Student Profile & Settings"
        subtitle={user?.displayName || 'Learner'}
        ctaLabel="Sign Out"
        onCtaClick={logout}
      />

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-10 space-y-8">
        {/* User Identity Card */}
        <div className="p-6 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-bold text-[24px]">
              {user?.displayName?.[0]?.toUpperCase() || 'S'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[20px] font-semibold text-black">{user?.displayName || 'Guest Learner'}</h1>
                <Badge variant={isGuest ? 'default' : 'co'}>{isGuest ? 'Offline Guest' : 'Verified Student'}</Badge>
              </div>
              <p className="text-[13px] text-[#737373]">{user?.email || 'local-guest-mode@bytelab.local'}</p>
              <div className="text-[12px] text-[#a3a3a3]">Department of AI & Data Science • 2026 Batch</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5] space-y-1 shadow-xs">
            <span className="text-[12px] text-[#737373] uppercase font-semibold">Total Verified Points</span>
            <div className="text-[28px] font-bold font-mono text-black">{totalPoints} pts</div>
          </div>
          <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5] space-y-1 shadow-xs">
            <span className="text-[12px] text-[#737373] uppercase font-semibold">Problems Solved</span>
            <div className="text-[28px] font-bold font-mono text-black">{solvedCount} / 27</div>
          </div>
          <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5] space-y-1 shadow-xs">
            <span className="text-[12px] text-[#737373] uppercase font-semibold">Active Streak</span>
            <div className="text-[28px] font-bold font-mono text-amber-600">{streakDays} Days 🔥</div>
          </div>
        </div>

        {/* Offline & Local Data Persistence */}
        <div className="p-6 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-[16px] font-semibold text-black">Local-First Storage & Offline Safety</h2>
          </div>
          <p className="text-[13px] text-[#525252] leading-relaxed">
            ByteLab LMS runs locally without required backend connections. All code execution occurs in client-side WebAssembly. Progress, points, code drafts, and assessment records are automatically persisted in your browser's IndexedDB and localStorage.
          </p>
        </div>
      </main>
    </div>
  );
}
