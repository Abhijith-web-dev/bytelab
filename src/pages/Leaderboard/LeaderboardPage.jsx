import React, { useState, useEffect, useMemo } from 'react';
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
  ArrowRight
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
  const { totalPoints, streakDays, completedChapters, solvedProblems } = useProgressStore();
  const [filterSort, setFilterSort] = useState('points'); // 'points' | 'streak' | 'solved' | 'chapters'
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useSEO({
    title: 'Global & Class Leaderboard | ByteLab',
    description: 'Verified academic performance rankings, daily streak leaders, and Pyodide problem solving milestones for 19AI301.'
  });

  const solvedCount = Object.values(solvedProblems || {}).filter(p => p.passed).length;

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      // Sync current user's latest stats to leaderboard if authenticated
      if (user?.uid && !user.isAnonymous) {
        await firestoreService.updateLeaderboardEntry(user.uid, {
          displayName: user.displayName || user.email?.split('@')[0] || 'Student',
          points: totalPoints,
          score: totalPoints,
          streak: streakDays,
          solved: solvedCount,
          completedChapters: completedChapters.length
        });
      }

      const data = await firestoreService.getLeaderboard('python-programming', 50);

      // If user is logged in or active, ensure current user is accurately represented
      const currentUserUid = user?.uid || 'current_student';
      const userEntryIndex = data.findIndex(d => d.userId === currentUserUid || (user?.uid && d.userId === user.uid));

      if (user && totalPoints > 0) {
        const myEntry = {
          userId: user.uid,
          displayName: user.displayName || user.email?.split('@')[0] || 'You',
          photoURL: user.photoURL,
          points: totalPoints,
          score: totalPoints,
          streak: streakDays,
          solved: solvedCount,
          completedChapters: completedChapters.length,
          badge: totalPoints >= 1000 ? 'Algorithm Master' : (totalPoints >= 500 ? 'NumPy Ninja' : 'Active Learner'),
          isCurrentUser: true
        };

        if (userEntryIndex >= 0) {
          data[userEntryIndex] = { ...data[userEntryIndex], ...myEntry };
        } else {
          data.push(myEntry);
        }
      }

      setLeaderboardData(data);
    } catch (err) {
      console.warn('Failed to load live leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [user?.uid, totalPoints, streakDays, completedChapters.length, solvedCount]);

  // Sort and filter rankings
  const rankedList = useMemo(() => {
    let sorted = [...leaderboardData];

    if (filterSort === 'streak') {
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
  const top3 = rankedList.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
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

      <main className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-10 sm:py-14 space-y-10">
        {/* Current User Ranking Status Banner */}
        <div className="p-6 sm:p-8 rounded-[22px] bg-[#eeece7]/50 border border-[#d9d9dd] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-full bg-[#17171c] text-white flex items-center justify-center font-bold text-[20px] font-mono shrink-0 shadow-xs">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                user?.displayName?.[0]?.toUpperCase() || 'S'
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#75758a] uppercase font-semibold">Your Live Academic Standing</span>
                {myRank && (
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#17171c] text-white">
                    Rank #{myRank.rank}
                  </span>
                )}
              </div>
              <h2 className="text-[20px] font-medium text-[#17171c] leading-tight">
                {user?.displayName || (user?.email?.split('@')[0]) || 'Guest Learner'}
              </h2>
              <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-[#75758a] font-mono">
                <span>{completedChapters.length} / 46 Days</span>
                <span>•</span>
                <span className="text-[#17171c] font-semibold">{solvedCount} Solved</span>
                <span>•</span>
                <span className="text-amber-600 font-semibold flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {streakDays}d Streak
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#d9d9dd]">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-[#75758a] uppercase block font-semibold">Verified Points</span>
              <span className="text-[28px] sm:text-[32px] font-bold font-mono text-[#17171c]">
                {totalPoints} <span className="text-[15px] font-normal text-[#75758a]">pts</span>
              </span>
            </div>

            {(!user || user.isAnonymous) && (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  <span>Sign In to Claim Rank</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Podium: Top 3 Students */}
        {top3.length >= 3 && !searchQuery && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Class Podium</span>
              </h2>
              <button
                onClick={fetchLeaderboard}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-[12px] text-[#75758a] hover:text-[#17171c] cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Live Scores</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {/* Rank 2 - Silver */}
              <div className="p-6 rounded-[18px] bg-white border border-[#d9d9dd] text-center space-y-3 relative order-2 sm:order-1 hover:border-[#17171c] transition-all">
                <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[16px] border border-slate-300">
                  🥈
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#75758a]">Rank 2</span>
                  <h3 className="text-[16px] font-semibold text-[#17171c] truncate">{top3[1]?.displayName}</h3>
                  <p className="text-[11px] text-[#75758a] font-mono">{top3[1]?.badge || 'Algorithm Master'}</p>
                </div>
                <div className="pt-2 border-t border-[#d9d9dd]/60 flex items-center justify-around text-[12px] font-mono">
                  <span>{top3[1]?.points || top3[1]?.score} pts</span>
                  <span>🔥 {top3[1]?.streak || 1}d</span>
                </div>
              </div>

              {/* Rank 1 - Gold */}
              <div className="p-7 rounded-[22px] bg-[#eeece7]/40 border-2 border-amber-400/80 text-center space-y-3 relative order-1 sm:order-2 shadow-xs hover:border-amber-500 transition-all sm:-translate-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[20px] border border-amber-300 shadow-xs">
                  🥇
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                    Champion
                  </span>
                  <h3 className="text-[18px] font-bold text-[#17171c] pt-1 truncate">{top3[0]?.displayName}</h3>
                  <p className="text-[12px] text-[#75758a] font-mono">{top3[0]?.badge || 'Python Prodigy'}</p>
                </div>
                <div className="pt-3 border-t border-[#d9d9dd] flex items-center justify-around text-[13px] font-mono font-semibold">
                  <span className="text-[#17171c]">{top3[0]?.points || top3[0]?.score} pts</span>
                  <span className="text-amber-600">🔥 {top3[0]?.streak || 1}d streak</span>
                </div>
              </div>

              {/* Rank 3 - Bronze */}
              <div className="p-6 rounded-[18px] bg-white border border-[#d9d9dd] text-center space-y-3 relative order-3 hover:border-[#17171c] transition-all">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-[16px] border border-amber-200">
                  🥉
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#75758a]">Rank 3</span>
                  <h3 className="text-[16px] font-semibold text-[#17171c] truncate">{top3[2]?.displayName}</h3>
                  <p className="text-[11px] text-[#75758a] font-mono">{top3[2]?.badge || 'NumPy Ninja'}</p>
                </div>
                <div className="pt-2 border-t border-[#d9d9dd]/60 flex items-center justify-around text-[12px] font-mono">
                  <span>{top3[2]?.points || top3[2]?.score} pts</span>
                  <span>🔥 {top3[2]?.streak || 1}d</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter Controls & Search */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#d9d9dd]">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFilterSort('points')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  filterSort === 'points'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-[#eeece7]/40 text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                Top Verified XP
              </button>

              <button
                onClick={() => setFilterSort('streak')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  filterSort === 'streak'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-[#eeece7]/40 text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>Streak Masters</span>
              </button>

              <button
                onClick={() => setFilterSort('solved')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  filterSort === 'solved'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-[#eeece7]/40 text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>Problems Solved</span>
              </button>

              <button
                onClick={() => setFilterSort('chapters')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  filterSort === 'chapters'
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-[#eeece7]/40 text-[#75758a] hover:text-[#17171c]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Days Completed</span>
              </button>
            </div>

            {/* Learner Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#75758a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classmate..."
                className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#eeece7]/30 border border-[#d9d9dd] rounded-full focus:outline-none focus:border-[#17171c] text-[#17171c]"
              />
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="rounded-[18px] bg-white border border-[#d9d9dd] overflow-hidden shadow-xs">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#eeece7]/50 border-b border-[#d9d9dd] text-[#75758a] text-[12px] font-medium">
                <tr>
                  <th className="p-4 font-semibold w-16">Rank</th>
                  <th className="p-4 font-semibold">Student Learner</th>
                  <th className="p-4 font-semibold">Solved</th>
                  <th className="p-4 font-semibold">Curriculum</th>
                  <th className="p-4 font-semibold">Streak</th>
                  <th className="p-4 font-semibold text-right">Verified XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d9d9dd]/60">
                {rankedList.map((student) => {
                  const isCurrent = student.isCurrentUser;
                  const pts = student.points !== undefined ? student.points : (student.score || 0);

                  return (
                    <tr
                      key={student.userId || student.id || student.rank}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-amber-50/40 font-medium'
                          : 'hover:bg-[#eeece7]/20'
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
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${
                            isCurrent ? 'bg-[#17171c] text-white' : 'bg-[#eeece7] text-[#17171c]'
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
                        {pts} pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
