import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Flame,
  ShieldCheck,
  Trophy,
  User,
  ArrowUp,
  Star,
  Search,
  CheckCircle2,
  Medal,
  Crown,
  Sparkles,
  RefreshCw,
  Code,
  BookOpen,
  ArrowRight,
  Timer,
  Zap,
  Activity,
  Users,
  Clock,
  TrendingUp,
  Radio
} from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { firestoreService } from '../../services/firebase/firestore.js';
import { useSEO } from '../../hooks/useSEO.js';

export function LeaderboardPage() {
  const { user } = useAuthStore();
  const {
    totalPoints,
    streakDays,
    completedChapters,
    solvedProblems,
    focusMinutes,
    cleanRunCount,
    getConcentrationMetrics
  } = useProgressStore();
  const metrics = getConcentrationMetrics();

  const [filterSort, setFilterSort] = useState('points'); // 'points' | 'focus' | 'streak' | 'solved' | 'chapters'
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  useSEO({
    title: 'Global & Class Leaderboard | ByteLab',
    description: 'Real-time verified academic performance rankings, daily streak leaders, and Pyodide problem solving milestones for 19AI301 / CS3301.'
  });

  const solvedCount = Object.values(solvedProblems || {}).filter(p => p?.passed).length;

  // Real-time synchronization hook
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    // If authenticated student, optimistically sync stats to Firestore
    if (user?.uid && !user.isAnonymous) {
      firestoreService.updateLeaderboardEntry(user.uid, {
        displayName: user.displayName || user.email?.split('@')[0] || 'Student',
        photoURL: user.photoURL || null,
        points: totalPoints,
        score: totalPoints,
        streak: streakDays,
        solved: solvedCount,
        completedChapters: completedChapters?.length || 0,
        focusMinutes: focusMinutes || 0,
        cleanRunCount: cleanRunCount || 0,
        concentrationScore: metrics.score || 0
      }).catch(err => console.debug('Optimistic leaderboard sync:', err));
    }

    // Subscribe to live updates
    const unsubscribe = firestoreService.subscribeLeaderboard(
      'python-programming',
      (liveData) => {
        if (!isMounted) return;

        let processedData = [...liveData];

        // Ensure current user entry is correctly merged and marked
        if (user && totalPoints >= 0) {
          const myEntry = {
            userId: user.uid,
            displayName: user.displayName || user.email?.split('@')[0] || 'You',
            photoURL: user.photoURL || null,
            points: totalPoints,
            score: totalPoints,
            streak: streakDays,
            solved: solvedCount,
            completedChapters: completedChapters?.length || 0,
            focusMinutes: focusMinutes || 0,
            cleanRunCount: cleanRunCount || 0,
            concentrationScore: metrics.score || 0,
            badge: totalPoints >= 1500 ? 'Python Prodigy' : (totalPoints >= 1000 ? 'Algorithm Master' : (totalPoints >= 500 ? 'NumPy Ninja' : 'Active Learner')),
            isCurrentUser: true
          };

          const userIdx = processedData.findIndex(d => d.userId === user.uid);
          if (userIdx >= 0) {
            processedData[userIdx] = { ...processedData[userIdx], ...myEntry };
          } else {
            processedData.push(myEntry);
          }
        }

        setLeaderboardData(processedData);
        setIsLoading(false);
        setIsLiveSyncing(true);
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      },
      (error) => {
        console.debug('Live sync fallback to local cache:', error);
        if (isMounted) {
          setIsLoading(false);
          setIsLiveSyncing(false);
        }
      },
      60
    );

    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [user?.uid, totalPoints, streakDays, completedChapters?.length, solvedCount, focusMinutes, cleanRunCount]);

  // Sort and filter rankings
  const rankedList = useMemo(() => {
    let sorted = [...leaderboardData];

    if (filterSort === 'focus') {
      sorted.sort((a, b) => (b.focusMinutes || 0) - (a.focusMinutes || 0));
    } else if (filterSort === 'streak') {
      sorted.sort((a, b) => (b.streak || 0) - (a.streak || 0));
    } else if (filterSort === 'solved') {
      sorted.sort((a, b) => (b.solved || 0) - (a.solved || 0));
    } else if (filterSort === 'chapters') {
      sorted.sort((a, b) => (b.completedChapters || 0) - (a.completedChapters || 0));
    } else {
      sorted.sort((a, b) => (b.points || b.score || 0) - (a.points || a.score || 0));
    }

    // Assign rank numbers based on active sort
    const ranked = sorted.map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isCurrentUser: item.isCurrentUser || (user?.uid && item.userId === user.uid)
    }));

    if (!searchQuery.trim()) return ranked;

    const q = searchQuery.toLowerCase();
    return ranked.filter(item =>
      (item.displayName && item.displayName.toLowerCase().includes(q)) ||
      (item.badge && item.badge.toLowerCase().includes(q)) ||
      (item.rollNo && item.rollNo.toLowerCase().includes(q))
    );
  }, [leaderboardData, filterSort, searchQuery, user?.uid]);

  // Find user's current ranking position
  const myRank = rankedList.find(item => item.isCurrentUser);
  const myRankIndex = rankedList.findIndex(item => item.isCurrentUser);

  // Cohort statistics summary
  const cohortStats = useMemo(() => {
    const totalLearners = rankedList.length;
    const totalFocus = rankedList.reduce((acc, curr) => acc + (curr.focusMinutes || 0), 0);
    const totalProblemsSolved = rankedList.reduce((acc, curr) => acc + (curr.solved || 0), 0);
    const avgScore = totalLearners > 0 ? Math.round(rankedList.reduce((acc, curr) => acc + (curr.points || curr.score || 0), 0) / totalLearners) : 0;

    return {
      totalLearners,
      totalFocusHours: Math.round(totalFocus / 60),
      totalProblemsSolved,
      avgScore
    };
  }, [rankedList]);

  // Student Percentile Standing
  const percentileStanding = useMemo(() => {
    if (!myRank || rankedList.length === 0) return null;
    const percentile = Math.max(1, Math.round(((rankedList.length - myRank.rank + 1) / rankedList.length) * 100));
    const topPercent = Math.max(1, Math.round((myRank.rank / rankedList.length) * 100));
    return {
      percentile,
      topPercent,
      label: topPercent <= 5 ? 'Top 5% Cohort Elite' : (topPercent <= 15 ? 'Top 15% High Performer' : (topPercent <= 30 ? 'Top 30% Active Scholar' : 'Rising Learner'))
    };
  }, [myRank, rankedList.length]);

  // Dynamic Next-Rank Rival Milestone
  const rivalMilestone = useMemo(() => {
    if (myRankIndex === -1 || !myRank) return null;
    if (myRankIndex === 0) {
      return {
        isCrown: true,
        rivalRank: 1,
        message: 'You hold Rank #1 in the cohort! Continue your daily problem solving and deep focus sessions to retain the title.',
        actionLabel: 'Enter Practice Arena'
      };
    }

    const rival = rankedList[myRankIndex - 1];

    if (filterSort === 'focus') {
      const gap = Math.max(1, (rival.focusMinutes || 0) - (myRank.focusMinutes || 0));
      return {
        rivalRank: rival.rank,
        rivalName: rival.displayName,
        message: `You are only ${gap} minute(s) of deep focus away from overtaking Rank #${rival.rank} (${rival.displayName}). Start a focus sprint!`,
        actionLabel: 'Start Focus Sprint'
      };
    }

    if (filterSort === 'streak') {
      const gap = Math.max(1, (rival.streak || 0) - (myRank.streak || 0));
      return {
        rivalRank: rival.rank,
        rivalName: rival.displayName,
        message: `You are ${gap} day(s) away from matching Rank #${rival.rank} (${rival.displayName})'s streak. Practice today to advance!`,
        actionLabel: 'Solve Challenge'
      };
    }

    if (filterSort === 'solved') {
      const gap = Math.max(1, (rival.solved || 0) - (myRank.solved || 0));
      return {
        rivalRank: rival.rank,
        rivalName: rival.displayName,
        message: `You are only ${gap} solved challenge(s) away from surpassing Rank #${rival.rank} (${rival.displayName}). Solve next problem!`,
        actionLabel: 'Solve Challenge'
      };
    }

    const gap = Math.max(5, ((rival.points || rival.score || 0) - (myRank.points || myRank.score || 0)));
    return {
      rivalRank: rival.rank,
      rivalName: rival.displayName,
      message: `You are only ${gap} XP away from overtaking Rank #${rival.rank} (${rival.displayName}). Complete a chapter or challenge to climb!`,
      actionLabel: 'Practice to Climb'
    };
  }, [rankedList, myRankIndex, myRank, filterSort]);

  const top3 = rankedList.slice(0, 3);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await firestoreService.getLeaderboard('python-programming', 60);
      setLeaderboardData(data);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn('Manual refresh note:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      <SubNavFrosted
        title="Global & Class Leaderboard"
        subtitle="19AI301 / CS3301 Verified Performance Rankings"
        breadcrumbs={[
          { label: 'Courses', path: '/courses' },
          { label: 'Leaderboard', path: '/leaderboard' }
        ]}
        ctaLabel="Practice Arena"
        ctaLink="/practice"
      />

      <main className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-8 sm:py-12 space-y-8">
        {/* Real-time Status Indicator Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] bg-white px-4 py-2.5 rounded-full border border-[#e2e2e8] shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-[#17171c]">
              {isLiveSyncing ? 'Firestore Real-Time Live Sync' : 'Offline Verified Cache Active'}
            </span>
            {lastSyncTime && (
              <span className="text-[#75758a] hidden sm:inline font-mono">
                • Synced at {lastSyncTime}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#75758a] font-mono text-[11px]">
              {cohortStats.totalLearners} Active Cohort Scholars
            </span>
            <button
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="flex items-center gap-1 text-[#17171c] hover:text-[#003c33] font-medium transition-colors cursor-pointer"
              title="Force sync latest scores"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          </div>
        </div>

        {/* Current User Standing Hero Card */}
        <div className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-br from-[#17171c] to-[#25252e] text-white border border-[#2b2b36] shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4.5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold text-[24px] font-mono shrink-0 shadow-sm">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  user?.displayName?.[0]?.toUpperCase() || 'S'
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-white/70 uppercase font-bold tracking-wider">
                    Your Academic Standing
                  </span>
                  {myRank && (
                    <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-400 text-[#17171c]">
                      Rank #{myRank.rank}
                    </span>
                  )}
                  {percentileStanding && (
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {percentileStanding.label} (Top {percentileStanding.topPercent}%)
                    </span>
                  )}
                </div>

                <h2 className="text-[22px] sm:text-[24px] font-semibold text-white tracking-tight">
                  {user?.displayName || (user?.email?.split('@')[0]) || 'Guest Learner'}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-[13px] text-white/80 font-mono">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
                    {completedChapters?.length || 0} / 46 Days
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <Code className="w-3.5 h-3.5" />
                    {solvedCount} Solved
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-orange-300">
                    <Timer className="w-3.5 h-3.5" />
                    {focusMinutes || 0}m Focus
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {streakDays}d Streak
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
              <div className="text-left lg:text-right">
                <span className="text-[11px] text-white/60 uppercase block font-semibold">Total Verified Score</span>
                <span className="text-[32px] sm:text-[36px] font-bold font-mono text-amber-300 tracking-tight">
                  {totalPoints} <span className="text-[16px] font-normal text-white/70">XP</span>
                </span>
              </div>

              {(!user || user.isAnonymous) && (
                <Link to="/login">
                  <Button variant="primary" size="sm" className="bg-white text-[#17171c] hover:bg-white/90">
                    <span>Sign In to Claim Rank</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Next-Rank Rival Milestone Banner */}
        {rivalMilestone && (
          <div className={`p-5 rounded-[20px] border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs transition-all ${
            rivalMilestone.isCrown
              ? 'bg-amber-500/10 border-amber-300/80 text-amber-950'
              : 'bg-white border-[#d9d9dd]'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#17171c] text-white flex items-center justify-center font-bold text-[18px] shrink-0 shadow-xs">
                {rivalMilestone.isCrown ? '👑' : '🎯'}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#75758a] font-bold">
                    {rivalMilestone.isCrown ? 'Championship Standing' : `Target: Rank #${rivalMilestone.rivalRank}`}
                  </span>
                  {!rivalMilestone.isCrown && (
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-semibold">
                      Next Milestone
                    </span>
                  )}
                </div>
                <p className="text-[13px] sm:text-[14px] text-[#17171c] font-medium leading-snug">
                  {rivalMilestone.message}
                </p>
              </div>
            </div>
            <Link to="/practice" className="shrink-0 w-full sm:w-auto">
              <Button variant="primary" size="sm" className="w-full sm:w-auto">
                <span>{rivalMilestone.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Academic Cohort Analytics Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e2e2e8] space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-[#75758a] text-[12px] font-medium">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Cohort Scholars</span>
            </div>
            <p className="text-[22px] sm:text-[26px] font-bold font-mono text-[#17171c]">
              {cohortStats.totalLearners}
            </p>
            <span className="text-[11px] text-[#75758a]">Active enrolled students</span>
          </div>

          <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e2e2e8] space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-[#75758a] text-[12px] font-medium">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Deep Work Logged</span>
            </div>
            <p className="text-[22px] sm:text-[26px] font-bold font-mono text-[#003c33]">
              {cohortStats.totalFocusHours}h
            </p>
            <span className="text-[11px] text-[#75758a]">Verified Pomodoro focus</span>
          </div>

          <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e2e2e8] space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-[#75758a] text-[12px] font-medium">
              <Code className="w-4 h-4 text-emerald-600" />
              <span>Code Challenges</span>
            </div>
            <p className="text-[22px] sm:text-[26px] font-bold font-mono text-[#17171c]">
              {cohortStats.totalProblemsSolved}
            </p>
            <span className="text-[11px] text-[#75758a]">Passing test executions</span>
          </div>

          <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e2e2e8] space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-[#75758a] text-[12px] font-medium">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Cohort Avg Score</span>
            </div>
            <p className="text-[22px] sm:text-[26px] font-bold font-mono text-amber-600">
              {cohortStats.avgScore} <span className="text-[13px] font-normal text-[#75758a]">pts</span>
            </p>
            <span className="text-[11px] text-[#75758a]">Benchmark average</span>
          </div>
        </div>

        {/* Podium: Real Students Only */}
        {top3.length > 0 && !searchQuery && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-[#17171c] tracking-tight flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Class Podium</span>
              </h2>
              <span className="text-[12px] text-[#75758a] font-mono">
                {top3.length === 1 ? 'Top 1 Academic Leader' : `Top ${top3.length} Academic Leaders`}
              </span>
            </div>

            <div className={`grid gap-4 items-end ${
              top3.length === 1 
                ? 'grid-cols-1 max-w-md mx-auto' 
                : top3.length === 2 
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' 
                  : 'grid-cols-1 sm:grid-cols-3'
            }`}>
              {/* Rank 2 - Silver (if 2+ students) */}
              {top3.length >= 2 && (
                <div className="p-6 rounded-[20px] bg-white border border-[#d9d9dd] text-center space-y-3 relative order-2 sm:order-1 hover:border-[#17171c] hover:shadow-xs transition-all">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-[18px] border border-slate-300 shadow-2xs">
                    🥈
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      Rank 2 • Silver
                    </span>
                    <h3 className="text-[17px] font-semibold text-[#17171c] pt-1 truncate">{top3[1]?.displayName}</h3>
                    <p className="text-[11px] text-[#75758a] font-mono">{top3[1]?.badge || 'Algorithm Master'}</p>
                  </div>
                  <div className="pt-3 border-t border-[#d9d9dd]/60 flex items-center justify-around text-[12px] font-mono">
                    <span className="font-bold text-[#17171c]">{top3[1]?.points || top3[1]?.score} pts</span>
                    <span>⏱️ {top3[1]?.focusMinutes || 0}m</span>
                    <span className="text-amber-600">🔥 {top3[1]?.streak || 1}d</span>
                  </div>
                </div>
              )}

              {/* Rank 1 - Gold (always rendered if top3.length >= 1) */}
              <div className={`p-7 rounded-[24px] bg-gradient-to-b from-[#fefbf6] to-[#f7f2ea] border-2 border-amber-400 text-center space-y-3 relative shadow-sm hover:border-amber-500 transition-all ${
                top3.length >= 3 ? 'order-1 sm:order-2 sm:-translate-y-2' : (top3.length === 2 ? 'order-1' : 'order-1')
              }`}>
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-200 to-amber-400 text-amber-950 flex items-center justify-center font-bold text-[22px] border-2 border-amber-300 shadow-xs">
                  🥇
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-0.5 rounded-full">
                    👑 Champion • Rank 1
                  </span>
                  <h3 className="text-[19px] font-bold text-[#17171c] pt-1 truncate">{top3[0]?.displayName}</h3>
                  <p className="text-[12px] text-[#75758a] font-mono font-medium">{top3[0]?.badge || 'Python Prodigy'}</p>
                </div>
                <div className="pt-3.5 border-t border-amber-200/80 flex items-center justify-around text-[13px] font-mono font-semibold">
                  <span className="text-[#17171c]">{top3[0]?.points || top3[0]?.score} pts</span>
                  <span className="text-[#003c33]">⏱️ {top3[0]?.focusMinutes || 0}m focus</span>
                  <span className="text-amber-600">🔥 {top3[0]?.streak || 1}d streak</span>
                </div>
              </div>

              {/* Rank 3 - Bronze (if 3+ students) */}
              {top3.length >= 3 && (
                <div className="p-6 rounded-[20px] bg-white border border-[#d9d9dd] text-center space-y-3 relative order-3 hover:border-[#17171c] hover:shadow-xs transition-all">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-[18px] border border-amber-200 shadow-2xs">
                    🥉
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Rank 3 • Bronze
                    </span>
                    <h3 className="text-[17px] font-semibold text-[#17171c] pt-1 truncate">{top3[2]?.displayName}</h3>
                    <p className="text-[11px] text-[#75758a] font-mono">{top3[2]?.badge || 'NumPy Ninja'}</p>
                  </div>
                  <div className="pt-3 border-t border-[#d9d9dd]/60 flex items-center justify-around text-[12px] font-mono">
                    <span className="font-bold text-[#17171c]">{top3[2]?.points || top3[2]?.score} pts</span>
                    <span>⏱️ {top3[2]?.focusMinutes || 0}m</span>
                    <span className="text-amber-600">🔥 {top3[2]?.streak || 1}d</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Filter Controls & Search */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#d9d9dd]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilterSort('points')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  filterSort === 'points'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-white border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                Top Verified XP
              </button>

              <button
                onClick={() => setFilterSort('focus')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterSort === 'focus'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-white border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <Timer className="w-3.5 h-3.5 text-orange-500" />
                <span>Deep Focus</span>
              </button>

              <button
                onClick={() => setFilterSort('streak')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterSort === 'streak'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-white border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>Streak Masters</span>
              </button>

              <button
                onClick={() => setFilterSort('solved')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterSort === 'solved'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-white border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>Problems Solved</span>
              </button>

              <button
                onClick={() => setFilterSort('chapters')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterSort === 'chapters'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-white border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Curriculum Days</span>
              </button>
            </div>

            {/* Learner Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#75758a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classmate name or badge..."
                className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-white border border-[#d9d9dd] rounded-full focus:outline-none focus:border-[#17171c] text-[#17171c] shadow-2xs"
              />
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="rounded-[20px] bg-white border border-[#d9d9dd] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#f7f7f9] border-b border-[#d9d9dd] text-[#75758a] text-[12px] font-semibold">
                  <tr>
                    <th className="p-4 w-16">Rank</th>
                    <th className="p-4">Student Scholar</th>
                    <th className="p-4">Deep Focus</th>
                    <th className="p-4">Solved</th>
                    <th className="p-4">Curriculum</th>
                    <th className="p-4">Streak</th>
                    <th className="p-4 text-right">Verified XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e8ed]">
                  {rankedList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-[#75758a]">
                        {isLoading ? 'Connecting to live cohort stream...' : 'No matching students found.'}
                      </td>
                    </tr>
                  ) : (
                    rankedList.map((student) => {
                      const isCurrent = student.isCurrentUser;
                      const pts = student.points !== undefined ? student.points : (student.score || 0);

                      return (
                        <tr
                          key={student.userId || student.id || student.rank}
                          className={`transition-colors ${
                            isCurrent
                              ? 'bg-amber-50/60 font-medium'
                              : 'hover:bg-[#fcfcfd]'
                          }`}
                        >
                          <td className="p-4 font-mono font-bold">
                            {student.rank === 1 ? (
                              <span className="text-[16px]">🥇 1</span>
                            ) : student.rank === 2 ? (
                              <span className="text-[16px]">🥈 2</span>
                            ) : student.rank === 3 ? (
                              <span className="text-[16px]">🥉 3</span>
                            ) : (
                              <span className="text-[#75758a]">#{student.rank}</span>
                            )}
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${
                                isCurrent ? 'bg-[#17171c] text-white shadow-xs' : 'bg-[#e8e8ed] text-[#17171c]'
                              }`}>
                                {student.displayName?.[0]?.toUpperCase() || 'S'}
                              </div>
                              <div>
                                <div className="font-semibold text-[#17171c] flex items-center gap-1.5">
                                  <span>{student.displayName}</span>
                                  {isCurrent && (
                                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#17171c] text-white">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-[#75758a] font-mono">
                                  {student.rollNo ? `${student.rollNo} • ` : ''}{student.badge || 'Active Learner'}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 font-mono font-medium text-[#003c33]">
                            {student.focusMinutes || 0}m
                          </td>

                          <td className="p-4 font-mono text-[#17171c]">
                            {student.solved || 0} Problems
                          </td>

                          <td className="p-4 font-mono text-[#75758a]">
                            {student.completedChapters || 0} / 46 Days
                          </td>

                          <td className="p-4">
                            <span className="text-amber-600 font-semibold flex items-center gap-1 font-mono">
                              <Flame className="w-3.5 h-3.5 fill-current" />
                              <span>{student.streak || 1}d</span>
                            </span>
                          </td>

                          <td className="p-4 text-right font-mono font-bold text-[#17171c] text-[14px]">
                            {pts} <span className="text-[12px] font-normal text-[#75758a]">pts</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
