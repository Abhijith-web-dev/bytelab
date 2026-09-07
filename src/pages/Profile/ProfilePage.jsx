import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  LogOut,
  Award,
  Flame,
  CheckCircle2,
  ShieldCheck,
  Database,
  RotateCcw,
  Download,
  Timer,
  Sparkles,
  Brain,
  Zap,
  Code,
  Trophy,
  Target,
  ChevronRight,
  AlertTriangle,
  ExternalLink,
  Lock,
  Gauge
} from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore, BADGE_CATALOG, LEVEL_TIERS } from '../../stores/progressStore.js';
import { getAllProblems } from '../../content/loader/index.js';
import { useSEO } from '../../hooks/useSEO.js';

export function ProfilePage() {
  const { user, isGuest, logout } = useAuthStore();
  const {
    completedChapters,
    solvedProblems,
    totalPoints,
    streakDays,
    focusMinutes,
    todayFocusMinutes,
    dailyFocusTargetMinutes,
    focusSessionsCompleted,
    cleanRunCount,
    totalCodeRuns,
    unlockedBadges,
    setDailyFocusTarget,
    getConcentrationMetrics,
    getUserLevel,
    getOutcomeMastery,
    getCourseCompletionPercentage,
    exportLocalData,
    resetProgress
  } = useProgressStore();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useSEO({
    title: 'Student Academic Portfolio & Concentration Analytics | ByteLab',
    description: 'Personal deliberate practice stats, level milestones, Course Outcome syllabus mastery, and achievement badges.'
  });

  const concentration = getConcentrationMetrics();
  const userLevel = getUserLevel();
  const coStats = getOutcomeMastery();
  const completionPercent = getCourseCompletionPercentage();
  const allProblems = getAllProblems('python-programming');

  const solvedList = Object.entries(solvedProblems || {})
    .filter(([_, data]) => data.passed)
    .map(([id, data]) => {
      const p = allProblems.find(item => item.id === id);
      return {
        id,
        title: p?.title || id,
        difficulty: p?.difficulty || 'practice',
        attempts: data.attempts || 1,
        bestCode: data.bestCode || '',
        updatedAt: data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'Recent'
      };
    });

  const handleExportData = () => {
    try {
      const dataStr = exportLocalData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bytelab-progress-${user?.displayName || 'student'}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error('Failed to export data', e);
    }
  };

  const handleConfirmReset = () => {
    resetProgress(true);
    setShowResetConfirm(false);
  };

  // Helper to render icon for badge
  const renderBadgeIcon = (iconName, isUnlocked) => {
    const iconClass = `w-5 h-5 ${isUnlocked ? 'text-amber-600' : 'text-[#75758a]'}`;
    switch (iconName) {
      case 'Timer': return <Timer className={iconClass} />;
      case 'Flame': return <Flame className={iconClass} />;
      case 'Brain': return <Brain className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Code': return <Code className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'Trophy': return <Trophy className={iconClass} />;
      case 'Award': return <Award className={iconClass} />;
      case 'Gauge': return <Gauge className={iconClass} />;
      case 'Sparkles':
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Student Command Center"
        subtitle={user?.displayName ? `${user.displayName} • Level ${userLevel.level} ${userLevel.title}` : 'Deliberate Practice Portfolio'}
        ctaLabel="Sign Out"
        onCtaClick={logout}
      />

      <main className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-10 space-y-10">
        {/* Top: Identity & Level Progress Card */}
        <div className="p-6 sm:p-8 rounded-[22px] bg-[#fafafa] border border-[#d9d9dd] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#17171c] text-white flex items-center justify-center font-bold text-[24px] font-mono shrink-0 shadow-xs">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user?.displayName?.[0]?.toUpperCase() || 'S'
                )}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-[22px] font-bold text-[#17171c] leading-tight">
                    {user?.displayName || 'Guest Learner'}
                  </h1>
                  <Badge variant={isGuest ? 'stone' : 'coral'}>
                    {isGuest ? 'Offline Guest Mode' : 'Verified Student'}
                  </Badge>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#17171c] text-white font-semibold">
                    Level {userLevel.level} • {userLevel.title}
                  </span>
                </div>
                <p className="text-[13px] text-[#75758a] font-mono">
                  {user?.email || 'local-first-storage@bytelab.local'}
                </p>
                <div className="text-[12px] text-[#75758a]">
                  Department of AI & Data Science • 19AI301 Python Programming
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link to="/leaderboard">
                <Button variant="secondary" size="sm">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Leaderboard</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-[#75758a] hover:text-[#17171c]">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Level XP Progress Bar */}
          <div className="pt-4 border-t border-[#d9d9dd] space-y-2">
            <div className="flex items-center justify-between text-[12px] font-mono">
              <span className="text-[#75758a]">
                Tier Progress: <strong className="text-[#17171c]">{userLevel.currentXP} XP</strong>
              </span>
              <span className="text-[#75758a]">
                {userLevel.nextLevelXP
                  ? `${userLevel.xpRemaining} XP to Level ${userLevel.level + 1}`
                  : 'Max Level Attained 🏆'}
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#eeece7] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-amber-500 to-[#ff7759] rounded-full transition-all duration-500"
                style={{ width: `${userLevel.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section 1: Concentration & Deliberate Practice Analytics */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#ff7759]" />
              <span>Concentration & Deliberate Practice Analytics</span>
            </h2>
            <span className="text-[12px] font-mono text-[#75758a]">Real-Time Cognitive Metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Concentration Index Score */}
            <div className="p-5 rounded-[18px] bg-white border border-[#d9d9dd] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase font-semibold text-[#75758a] tracking-wider">
                  Concentration Index
                </span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-[32px] font-bold font-mono text-[#17171c] leading-none">
                {concentration.score}%
              </div>
              <div className="text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                {concentration.rating}
              </div>
              <p className="text-[11px] text-[#75758a] pt-1">
                Weighted by clean runs, daily goal completion, and deep sessions.
              </p>
            </div>

            {/* Daily Target & Goal Changer */}
            <div className="p-5 rounded-[18px] bg-white border border-[#d9d9dd] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase font-semibold text-[#75758a] tracking-wider">
                  Daily Focus Goal
                </span>
                <Target className="w-4 h-4 text-[#003c33]" />
              </div>
              <div className="text-[32px] font-bold font-mono text-[#17171c] leading-none">
                {concentration.todayFocusMinutes} <span className="text-[16px] text-[#75758a] font-normal">/ {concentration.dailyFocusTargetMinutes}m</span>
              </div>
              <div className="w-full h-1.5 bg-[#eeece7] rounded-full overflow-hidden my-1">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${concentration.targetProgress}%` }}
                />
              </div>
              {/* Target Preset Buttons */}
              <div className="flex items-center gap-1 pt-1 text-[11px]">
                <span className="text-[#75758a] mr-1">Goal:</span>
                {[15, 25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDailyFocusTarget(mins)}
                    className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      dailyFocusTargetMinutes === mins
                        ? 'bg-[#17171c] text-white font-semibold'
                        : 'bg-[#eeece7]/60 text-[#75758a] hover:text-[#17171c]'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Total Focus & Completed Sessions */}
            <div className="p-5 rounded-[18px] bg-white border border-[#d9d9dd] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase font-semibold text-[#75758a] tracking-wider">
                  Deep Work Volume
                </span>
                <Timer className="w-4 h-4 text-[#ff7759]" />
              </div>
              <div className="text-[32px] font-bold font-mono text-[#17171c] leading-none">
                {concentration.focusMinutes} <span className="text-[16px] text-[#75758a] font-normal">mins</span>
              </div>
              <div className="text-[12px] text-[#17171c] font-medium">
                {concentration.focusSessionsCompleted} completed Pomodoro sprints
              </div>
              <p className="text-[11px] text-[#75758a] pt-1">
                Distraction-free coding sessions in the Practice Playground.
              </p>
            </div>

            {/* Clean Run Accuracy */}
            <div className="p-5 rounded-[18px] bg-white border border-[#d9d9dd] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase font-semibold text-[#75758a] tracking-wider">
                  Clean Run Accuracy
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-[32px] font-bold font-mono text-emerald-600 leading-none">
                {concentration.cleanAccuracy}%
              </div>
              <div className="text-[12px] text-[#75758a] font-mono">
                {concentration.cleanRunCount} clean / {concentration.totalCodeRuns} runs
              </div>
              <p className="text-[11px] text-[#75758a] pt-1">
                Zero syntax or runtime error passes during execution.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Course Outcome Mastery (CO1 - CO5) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>Anna University Syllabus & Outcome Mastery</span>
            </h2>
            <span className="text-[12px] font-mono text-[#75758a]">
              Overall Progress: {completionPercent}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {Object.entries(coStats).map(([coKey, data]) => (
              <div key={coKey} className="p-4 rounded-[18px] bg-white border border-[#d9d9dd] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-[14px] text-[#17171c]">{coKey}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#eeece7] text-[#75758a]">
                    {data.bloom}
                  </span>
                </div>
                <div className="text-[22px] font-bold font-mono text-[#17171c]">
                  {data.percent}%
                </div>
                <div className="w-full h-1.5 bg-[#eeece7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${data.percent}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#75758a] font-mono">
                  {data.completed} / {data.total} Chapters
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Badge & Achievement Showcase */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Achievement Showcase</span>
            </h2>
            <span className="text-[12px] font-mono text-[#75758a]">
              {unlockedBadges.length} / {BADGE_CATALOG.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {BADGE_CATALOG.map((b) => {
              const isUnlocked = unlockedBadges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-[18px] border transition-all space-y-2 relative overflow-hidden ${
                    isUnlocked
                      ? 'bg-white border-amber-300 shadow-2xs hover:border-amber-400'
                      : 'bg-[#fafafa] border-[#d9d9dd]/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isUnlocked ? 'bg-amber-50 border border-amber-200' : 'bg-[#eeece7]'
                    }`}>
                      {renderBadgeIcon(b.icon, isUnlocked)}
                    </div>
                    {isUnlocked ? (
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Earned ✓
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#75758a]" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h3 className={`text-[13px] font-bold ${isUnlocked ? 'text-[#17171c]' : 'text-[#75758a]'}`}>
                      {b.title}
                    </h3>
                    <p className="text-[11px] text-[#75758a] leading-tight">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Solved Problem Portfolio */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-600" />
              <span>Solved Problem Portfolio</span>
            </h2>
            <Link to="/practice" className="text-[12px] font-medium text-[#ff7759] hover:underline flex items-center gap-1">
              <span>Open Arena</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {solvedList.length > 0 ? (
            <div className="rounded-[18px] bg-white border border-[#d9d9dd] overflow-hidden shadow-xs divide-y divide-[#d9d9dd]/60">
              {solvedList.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#eeece7]/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#17171c]">{item.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#75758a] font-mono">
                        <span className="capitalize">{item.difficulty}</span>
                        <span>•</span>
                        <span>{item.attempts} attempts</span>
                        <span>•</span>
                        <span>Passed on {item.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/practice/${item.id}`}>
                    <Button variant="secondary" size="sm">
                      <span>Review Code</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-[18px] bg-[#fafafa] border border-[#d9d9dd] text-center space-y-3">
              <Code className="w-8 h-8 mx-auto text-[#75758a]" />
              <div className="space-y-1">
                <h3 className="text-[15px] font-semibold text-[#17171c]">No Problems Solved Yet</h3>
                <p className="text-[13px] text-[#75758a] max-w-[420px] mx-auto">
                  Launch the practice arena and solve challenges directly in Python 3.11 with the time-traveler debugger and AI hints!
                </p>
              </div>
              <Link to="/practice">
                <Button variant="primary" size="sm">
                  <span>Start Practicing Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Section 5: Offline & Local Data Persistence & Sovereign Controls */}
        <section className="p-6 sm:p-8 rounded-[22px] bg-[#fafafa] border border-[#d9d9dd] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-[16px] font-semibold text-[#17171c]">
                  Local-First Data Storage & Sovereign Controls
                </h2>
              </div>
              <p className="text-[13px] text-[#75758a] max-w-[620px] leading-relaxed">
                ByteLab LMS is built with client-side privacy. All Python code execution, focus sessions, test submissions, and badges are cached locally in your browser's IndexedDB and localStorage.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="secondary" size="sm" onClick={handleExportData}>
                <Download className="w-3.5 h-3.5 text-[#17171c]" />
                <span>Export Data (JSON)</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResetConfirm(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Practice Data</span>
              </Button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 rounded-[12px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full learning portfolio successfully exported as JSON backup!</span>
            </div>
          )}

          {/* Reset Confirmation Modal */}
          {showResetConfirm && (
            <div className="p-4 rounded-[16px] bg-red-50 border border-red-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-red-800 font-semibold text-[14px]">
                <AlertTriangle className="w-4 h-4" />
                <span>Confirm Reset All Local Practice & Progress?</span>
              </div>
              <p className="text-[12px] text-red-700 leading-relaxed">
                This will reset your completed lessons, solved challenges, focus minutes, and badges to default. Export a JSON backup first if you need to keep your records.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleConfirmReset}
                  className="px-3 py-1 rounded-full bg-red-600 text-white font-medium text-[12px] hover:bg-red-700 cursor-pointer"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 rounded-full bg-white border border-[#d9d9dd] text-[#17171c] font-medium text-[12px] hover:bg-[#eeece7]/40 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

