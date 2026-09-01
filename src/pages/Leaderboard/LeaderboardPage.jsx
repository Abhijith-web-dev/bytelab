import React, { useState } from 'react';
import { Award, Flame, ShieldCheck, Trophy, User, ArrowUp, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';

export function LeaderboardPage() {
  const { user } = useAuthStore();
  const { totalPoints, streakDays, completedChapters } = useProgressStore();
  const [filterPeriod, setFilterPeriod] = useState('all-time'); // 'weekly' | 'all-time'

  const mockLeaderboard = [
    { rank: 1, name: 'Ananya S.', rollNo: '23AI014', points: 1450, streak: 28, solved: 24, badge: 'Python Prodigy' },
    { rank: 2, name: 'Rohan M.', rollNo: '23AI042', points: 1320, streak: 21, solved: 22, badge: 'Algorithm Master' },
    { rank: 3, name: 'Kavya R.', rollNo: '23AI008', points: 1180, streak: 19, solved: 20, badge: 'NumPy Ninja' },
    { rank: 4, name: 'Dev P.', rollNo: '23AI031', points: 950, streak: 14, solved: 17, badge: 'Code Explorer' },
    { rank: 5, name: 'Pooja K.', rollNo: '23AI055', points: 880, streak: 12, solved: 15, badge: 'Syntax Specialist' },
    { rank: 6, name: 'Siddharth T.', rollNo: '23AI029', points: 740, streak: 9, solved: 12, badge: 'Active Learner' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Class Leaderboard & Rankings"
        subtitle="19AI301 Verified Performance"
        ctaLabel="Practice Now"
        ctaLink="/practice"
      />

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-10 space-y-8">
        {/* Your Current Rank Card */}
        <div className="p-6 rounded-[12px] bg-[#171717] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-[18px]">
              {user?.displayName?.[0]?.toUpperCase() || 'S'}
            </div>
            <div>
              <span className="text-[12px] text-[#a3a3a3] uppercase font-semibold">Your Learning Stats</span>
              <h2 className="text-[18px] font-semibold">{user?.displayName || 'Student Learner'}</h2>
              <div className="flex items-center gap-3 text-[13px] text-white/80 pt-0.5">
                <span>{completedChapters.length} / 27 Topics</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">{streakDays} Day Streak 🔥</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[12px] text-[#a3a3a3] block uppercase font-semibold">Verified Score</span>
            <span className="text-[28px] font-bold font-mono text-white">{totalPoints} pts</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e5e5e5]">
          <h2 className="text-[18px] font-semibold text-[#000000] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-black" />
            <span>Class Rankings (2026 Batch)</span>
          </h2>

          <div className="flex gap-1 bg-[#fafafa] p-1 rounded-full text-[12px] border border-[#e5e5e5]">
            <button
              onClick={() => setFilterPeriod('all-time')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                filterPeriod === 'all-time' ? 'bg-black text-white font-semibold shadow-xs' : 'text-[#737373]'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setFilterPeriod('weekly')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                filterPeriod === 'weekly' ? 'bg-black text-white font-semibold shadow-xs' : 'text-[#737373]'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-[12px] bg-white border border-[#e5e5e5] overflow-hidden shadow-xs">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#737373] text-[12px]">
              <tr>
                <th className="p-4 font-semibold w-16">Rank</th>
                <th className="p-4 font-semibold">Student</th>
                <th className="p-4 font-semibold">Solved</th>
                <th className="p-4 font-semibold">Streak</th>
                <th className="p-4 font-semibold text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {mockLeaderboard.map((student) => (
                <tr key={student.rank} className="hover:bg-[#fafafa] transition-colors">
                  <td className="p-4 font-mono font-bold">
                    {student.rank === 1 ? '🥇 1' : student.rank === 2 ? '🥈 2' : student.rank === 3 ? '🥉 3' : `#${student.rank}`}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-black">{student.name}</div>
                    <div className="text-[12px] text-[#737373] font-mono">{student.rollNo} • {student.badge}</div>
                  </td>
                  <td className="p-4 font-mono text-black">{student.solved} Problems</td>
                  <td className="p-4">
                    <span className="text-amber-600 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{student.streak}d</span>
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-black text-[15px]">
                    {student.points} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
