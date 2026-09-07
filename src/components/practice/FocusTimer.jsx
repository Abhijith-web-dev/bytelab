import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, Flame, CheckCircle2, Volume2, VolumeX, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore } from '../../stores/progressStore.js';

const MODES = [
  { id: 'sprint15', label: '15m Sprint', minutes: 15 },
  { id: 'pomodoro25', label: '25m Focus', minutes: 25 },
  { id: 'flow45', label: '45m Deep Flow', minutes: 45 },
  { id: 'stopwatch', label: 'Stopwatch', minutes: 0 }
];

export function FocusTimer({ className = '' }) {
  const { logFocusSession, getConcentrationMetrics, todayFocusMinutes, dailyFocusTargetMinutes } = useProgressStore();
  const metrics = getConcentrationMetrics();

  const [activeMode, setActiveMode] = useState('pomodoro25');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessionPoints, setCompletedSessionPoints] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Interval reference
  const intervalRef = useRef(null);

  // Play synthetic pleasant audio chime using Web Audio API (zero audio files)
  const playSynthesizedChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playTone(523.25, now, 0.4);        // C5
      playTone(659.25, now + 0.15, 0.4); // E5
      playTone(783.99, now + 0.3, 0.6);  // G5
    } catch (e) {
      // Ignore audio error
    }
  };

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (activeMode === 'stopwatch') {
            return prev + 1;
          }

          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, activeMode]);

  const handleSessionComplete = () => {
    const selected = MODES.find((m) => m.id === activeMode);
    const sessionMins = selected && selected.minutes > 0 ? selected.minutes : Math.max(1, Math.round(timeLeft / 60));

    // Award bonus focus XP & log session
    const res = logFocusSession(sessionMins, 'focus');
    setCompletedSessionPoints(res.pointsEarned);

    playSynthesizedChime();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // Ignore
    }

    // Auto dismiss celebration pill after 8s
    setTimeout(() => {
      setCompletedSessionPoints(null);
    }, 8000);
  };

  const switchMode = (modeId) => {
    setIsRunning(false);
    setActiveMode(modeId);
    setCompletedSessionPoints(null);
    const target = MODES.find((m) => m.id === modeId);
    if (target && target.minutes > 0) {
      setTimeLeft(target.minutes * 60);
    } else {
      setTimeLeft(0);
    }
  };

  const togglePlay = () => {
    setIsRunning((prev) => !prev);
    setCompletedSessionPoints(null);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCompletedSessionPoints(null);
    const target = MODES.find((m) => m.id === activeMode);
    if (target && target.minutes > 0) {
      setTimeLeft(target.minutes * 60);
    } else {
      setTimeLeft(0);
    }
  };

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const targetPercentage = Math.min(100, Math.round((todayFocusMinutes / Math.max(1, dailyFocusTargetMinutes)) * 100));

  return (
    <div className={`rounded-[18px] bg-white border border-[#d9d9dd] shadow-2xs overflow-hidden transition-all duration-200 ${className}`}>
      {/* Header bar: Compact or Expand toggle */}
      <div className="px-4 py-3 bg-[#eeece7]/30 border-b border-[#d9d9dd]/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-[#75758a]'}`} />
          <span className="text-[13px] font-medium text-[#17171c] flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-[#ff7759]" />
            <span>Deep Work Focus Hub</span>
          </span>
          {isRunning && (
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold animate-pulse">
              In Session
            </span>
          )}
        </div>

        {/* Daily Goal Quick Badge & Collapse Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#75758a]">
            <span>Today: {todayFocusMinutes}m / {dailyFocusTargetMinutes}m ({targetPercentage}%)</span>
            <div className="w-16 h-1.5 bg-[#d9d9dd] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${targetPercentage}%` }} />
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            title={soundEnabled ? 'Mute session alerts' : 'Enable session alerts'}
            className="p-1 rounded-md text-[#75758a] hover:text-[#17171c] cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-[11px] font-medium text-[#75758a] hover:text-[#17171c] cursor-pointer"
          >
            <span>{isExpanded ? 'Compact' : 'Settings'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Focus Strip */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Mode Buttons */}
        <div className="flex items-center gap-1 bg-[#eeece7]/50 p-1 rounded-full border border-[#d9d9dd] text-[12px]">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeMode === m.id
                  ? 'bg-[#17171c] text-white font-medium shadow-xs'
                  : 'text-[#75758a] hover:text-[#17171c]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Center: Digital Time Display */}
        <div className="flex items-center gap-4">
          <div className="text-[28px] sm:text-[32px] font-bold font-mono tracking-tight text-[#17171c]">
            {formatTime(timeLeft)}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className={`h-9 px-4 rounded-full font-medium text-[13px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-[#17171c] hover:bg-[#2b2b36] text-white'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
            </button>

            <button
              onClick={resetTimer}
              title="Reset Timer"
              className="p-2 rounded-full border border-[#d9d9dd] hover:bg-[#eeece7]/40 text-[#75758a] hover:text-[#17171c] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Celebration Notification */}
      {completedSessionPoints !== null && (
        <div className="mx-4 mb-3 p-2.5 rounded-[12px] bg-emerald-50 border border-emerald-200 flex items-center justify-between text-[12px] text-emerald-800 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Deep Focus Session Completed!</span>
            <span>+{completedSessionPoints} Focus XP awarded.</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700">Concentration boosted ✓</span>
        </div>
      )}

      {/* Expanded Concentration Health Card */}
      {isExpanded && (
        <div className="px-4 py-3.5 bg-[#fafafa] border-t border-[#d9d9dd] text-[12px] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#17171c]">Concentration & Deliberate Practice Index</span>
            <span className="font-mono font-bold text-[#ff7759]">{metrics.rating} ({metrics.score}%)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 rounded-[8px] bg-white border border-[#d9d9dd]">
              <span className="text-[#75758a] block">Accuracy</span>
              <span className="font-mono font-bold text-[#17171c]">{metrics.cleanAccuracy}% Clean</span>
            </div>
            <div className="p-2 rounded-[8px] bg-white border border-[#d9d9dd]">
              <span className="text-[#75758a] block">Daily Goal</span>
              <span className="font-mono font-bold text-emerald-600">{metrics.targetProgress}% Target</span>
            </div>
            <div className="p-2 rounded-[8px] bg-white border border-[#d9d9dd]">
              <span className="text-[#75758a] block">Sessions</span>
              <span className="font-mono font-bold text-[#17171c]">{metrics.focusSessionsCompleted} Completed</span>
            </div>
            <div className="p-2 rounded-[8px] bg-white border border-[#d9d9dd]">
              <span className="text-[#75758a] block">Total Focus</span>
              <span className="font-mono font-bold text-[#17171c]">{metrics.focusMinutes} Mins</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
