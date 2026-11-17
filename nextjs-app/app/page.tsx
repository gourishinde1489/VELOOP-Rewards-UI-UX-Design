'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { sounds } from '@/lib/soundFX';
import { Badge, ViewMode } from '@/lib/types';

const INITIAL_BADGES: Badge[] = [
  {
    id: 1,
    level: 'LEVEL 01',
    name: 'Bronze',
    rank: 'FIRST STEP',
    desc: 'The first milestone in the miner\'s journey. Awarded upon activating the VELOOP account and successfully mining the first batch of VEs.',
    req: 'Activate account & start initial mining session',
    unlocked: true,
    imgUnlocked: '/assets/badge-01-bronze.png',
    imgLocked: '/assets/badge-02-silver-locked.png'
  },
  {
    id: 2,
    level: 'LEVEL 02',
    name: 'Silver',
    rank: 'RISING STAR',
    desc: 'Represents the user\'s first true progression beyond novice status, proving sustained engagement and consistency.',
    req: 'Earn 250 VEs & maintain a 3-day active streak',
    unlocked: false,
    imgUnlocked: '/assets/badge-02-silver.png',
    imgLocked: '/assets/badge-02-silver-locked.png'
  },
  {
    id: 3,
    level: 'LEVEL 03',
    name: 'Gold',
    rank: 'REWARD HUNTER',
    desc: 'A meaningful milestone signaling high dedication. Visually distinct with regal 3-point coronet and amber depth.',
    req: 'Earn 750 VEs & maintain a 7-day active streak',
    unlocked: false,
    imgUnlocked: '/assets/badge-03-gold.png',
    imgLocked: '/assets/badge-03-gold-locked.png'
  },
  {
    id: 4,
    level: 'LEVEL 04',
    name: 'Platinum',
    rank: 'ELITE EARNER',
    desc: 'Represents serious dedication and high daily volume. Features cold crystalline platinum geometry with razor-cut armor plates.',
    req: 'Earn 1,500 VEs & maintain a 14-day active streak',
    unlocked: false,
    imgUnlocked: '/assets/badge-04-platinum.png',
    imgLocked: '/assets/badge-04-platinum-locked.png'
  },
  {
    id: 5,
    level: 'LEVEL 05',
    name: 'Diamond',
    rank: 'HIGH ACHIEVER',
    desc: 'Advanced achievement tier displaying refractive crystalline geometry with multi-angled prism lighting and cyan flares.',
    req: 'Earn 3,000 VEs & maintain a 30-day active streak',
    unlocked: false,
    imgUnlocked: '/assets/badge-05-diamond.png',
    imgLocked: '/assets/badge-05-diamond-locked.png'
  },
  {
    id: 6,
    level: 'LEVEL 06',
    name: 'Emerald',
    rank: 'REWARD MASTER',
    desc: 'Higher achievement tier featuring deep velvet forest emerald gemstone, sophisticated with a heavy 3D gold chassis.',
    req: 'Earn 6,000 VEs & complete 50 platform quests',
    unlocked: false,
    imgUnlocked: '/assets/badge-06-emerald.png',
    imgLocked: '/assets/badge-06-emerald-locked.png'
  },
  {
    id: 7,
    level: 'LEVEL 07',
    name: 'Sapphire',
    rank: 'TOP PERFORMER',
    desc: 'High-level achievement radiating aristocratic prestige. Rich royal blue hues set inside delicate platinum scrollwork.',
    req: 'Earn 12,000 VEs & reach Top 5% miner rank',
    unlocked: false,
    imgUnlocked: '/assets/badge-07-sapphire.png',
    imgLocked: '/assets/badge-07-sapphire-locked.png'
  },
  {
    id: 8,
    level: 'LEVEL 08',
    name: 'Ruby',
    rank: 'ELITE',
    desc: 'Prestigious achievement tier. Features deep, dramatic pigeon-blood crimson facets and sweeping dark titanium gold-edged wings.',
    req: 'Earn 25,000 VEs & maintain a 60-day active streak',
    unlocked: false,
    imgUnlocked: '/assets/badge-08-ruby.png',
    imgLocked: '/assets/badge-08-ruby-locked.png'
  },
  {
    id: 9,
    level: 'LEVEL 09',
    name: 'Master',
    rank: 'MASTER ACHIEVER',
    desc: 'Very high achievement tier noticeably more prestigious than previous badges. Features an 8-point radiating gold star and dual gem insets.',
    req: 'Earn 50,000 VEs & mentor 10 active miners',
    unlocked: false,
    imgUnlocked: '/assets/badge-09-master.png',
    imgLocked: '/assets/badge-09-master-locked.png'
  },
  {
    id: 10,
    level: 'LEVEL 10',
    name: 'Legend',
    rank: 'VELOOP LEGEND',
    desc: 'The ultimate achievement badge in the entire collection! Communicates extreme difficulty, astronomical prestige, and absolute mastery.',
    req: 'Earn 100,000 VEs & achieve all seasonal accolades',
    unlocked: false,
    imgUnlocked: '/assets/badge-10-legend.png',
    imgLocked: '/assets/badge-10-legend-locked.png'
  }
];

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('fluid');
  const [isMining, setIsMining] = useState(false);
  const [sessionEarned, setSessionEarned] = useState(38);
  const [totalVEs, setTotalVEs] = useState(50);
  const [streakDays, setStreakDays] = useState(1);
  const [progressPercent, setProgressPercent] = useState(5);
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60 + 20);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // Mining session tick effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let earner: NodeJS.Timeout;

    if (isMining) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
        setProgressPercent((prev) => Math.min(100, prev + 0.02));
      }, 1000);

      earner = setInterval(() => {
        setSessionEarned((s) => s + 1);
        setTotalVEs((t) => t + 1);
      }, 4000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(earner);
    };
  }, [isMining]);

  const toggleMining = () => {
    if (!isMining) {
      if (soundEnabled) sounds.playMiningStart();
      showToast('⚡ Mining session activated! Passive VEs generating.');
    } else {
      showToast('⏸️ Mining session paused.');
    }
    setIsMining(!isMining);
  };

  const claimRewards = () => {
    if (soundEnabled) sounds.playCoinChime();
    showToast(`💰 Harvested +${sessionEarned} VEs from active session!`);
  };

  const toggleBadge = (id: number) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextState = !b.unlocked;
          if (nextState) {
            if (soundEnabled) sounds.playFanfare();
            showToast(`🏆 Unlocked ${b.name} Badge (${b.rank})!`);
          } else {
            if (soundEnabled) sounds.playCoinChime();
            showToast(`🔒 ${b.name} Badge locked for progression testing.`);
          }
          return { ...b, unlocked: nextState };
        }
        return b;
      })
    );
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#161827] text-[#f5f3ed]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161827]/95 border border-amber-500/40 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#161827]/90 backdrop-blur-md border-b border-white/10 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('fluid')}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500/30 to-[#161827] border border-amber-500/50 flex items-center justify-center font-black text-amber-300">
              V
            </div>
            <div className="text-base font-bold text-white">
              VELOOP <span className="font-normal text-white/80">Rewards</span>
            </div>
          </div>

          {/* Viewport Screen Switcher Toolbar */}
          <div className="flex items-center gap-1.5 bg-slate-900/70 p-1 rounded-full border border-white/10 overflow-x-auto text-xs font-semibold">
            <span className="text-slate-400 px-2">View Screen:</span>
            <button
              onClick={() => setViewMode('fluid')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'fluid' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌐 Fluid Responsive
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'desktop' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              💻 Desktop (1440px)
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'tablet' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              📱 Tablet (834px)
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'mobile' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              📲 Mobile (402px)
            </button>
            <button
              onClick={() => setViewMode('badges')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'badges' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏆 Badges System
              <span className="bg-amber-500/30 text-amber-200 text-[10px] px-1.5 py-0.5 rounded-full">{unlockedCount}/10</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:scale-105"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button
              onClick={() => setIsQuestsOpen(true)}
              className="bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-bold px-3.5 py-1.5 rounded-full hover:bg-amber-500/30"
            >
              🎯 Quests
            </button>
            <div
              onClick={() => setIsQuestsOpen(true)}
              className="bg-white/5 border border-amber-500/40 px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer hover:border-amber-400"
            >
              <img src="/assets/coin-3d.png" alt="" className="w-5 h-5 object-contain" />
              <span className="text-xs font-bold text-amber-100">{totalVEs} VEs</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6">
        {/* ================= 1. FLUID RESPONSIVE VIEW ================= */}
        {viewMode === 'fluid' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative bg-[#161827] rounded-3xl border border-white/10 overflow-hidden shadow-2xl min-h-[480px] flex items-center">
              {/* Background Art */}
              <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none hidden md:block">
                <img src="/assets/hero-desktop.png" alt="" className="w-full h-full object-cover object-right" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#161827] via-[#161827]/80 to-transparent" />
              </div>

              {/* Glassmorphic Left Controls Box */}
              <div className="relative z-10 max-w-[660px] m-6 md:m-9 bg-[#20243a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-7 md:p-9 shadow-xl space-y-6">
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="font-black text-amber-400">V</span>
                  <span><strong>VELOOP</strong> Rewards</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Mine &amp; <span className="gold-gradient-text text-4xl md:text-5xl">EARN</span>
                  </h1>
                  <p className="text-slate-400 text-sm">Activate your mining session and earn VEs while you stay engaged.</p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 flex-wrap">
                  {/* Earned Pill */}
                  <div
                    onClick={claimRewards}
                    className="bg-white/5 border border-amber-500/40 rounded-xl p-3 flex items-center gap-4 cursor-pointer hover:border-amber-400 hover:scale-105 transition-all shadow-inner"
                  >
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      <img src="/assets/coin-3d.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-medium">Earned</div>
                      <div className="text-lg font-bold gold-gradient-text">+{sessionEarned} VEs</div>
                    </div>
                  </div>

                  {/* Progress Block */}
                  <div className="space-y-2 flex-1 min-w-[220px]">
                    <div className="text-xs text-slate-300 font-medium">Mining progress</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-white/90 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-500 rounded-full transition-all duration-300 shadow-[0_0_8px_#b7822a]"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white min-w-[28px]">{Math.floor(progressPercent)}%</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span>⏱️</span>
                      <span>{formatTimer(remainingSeconds)} Remaining...</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={toggleMining}
                    className={`relative w-[161px] h-[41px] rounded-full border border-white font-bold text-slate-900 text-sm overflow-hidden flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                      isMining ? 'ring-4 ring-amber-400/50' : 'hover:scale-105'
                    }`}
                  >
                    <img src="/assets/btn-gold.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <span className="relative z-10">{isMining ? 'Mining Active ⚡' : 'Start Mining'}</span>
                  </button>
                  <span className="text-xs text-slate-400 italic">
                    {isMining ? 'Mining in progress. Passively accumulating VEs.' : 'Session ready. Click to activate mining.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Filmstrip Bar */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Boost Your Mining Speed:</span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto">
                <button onClick={() => setIsQuestsOpen(true)} className="bg-white/5 border border-white/10 hover:border-amber-400/60 rounded-xl px-4 py-2 flex items-center gap-2.5 text-xs">
                  <span>📺</span>
                  <div className="text-left font-semibold"><div>Watch Ads &gt;</div><div className="text-amber-400 text-[10px]">+5 VEs</div></div>
                </button>
                <button onClick={() => setIsQuestsOpen(true)} className="bg-white/5 border border-white/10 hover:border-amber-400/60 rounded-xl px-4 py-2 flex items-center gap-2.5 text-xs">
                  <span>🎮</span>
                  <div className="text-left font-semibold"><div>Play Games &gt;</div><div className="text-amber-400 text-[10px]">+15 VEs</div></div>
                </button>
                <button onClick={() => setIsQuestsOpen(true)} className="bg-white/5 border border-white/10 hover:border-amber-400/60 rounded-xl px-4 py-2 flex items-center gap-2.5 text-xs">
                  <span>📋</span>
                  <div className="text-left font-semibold"><div>Complete Tasks &gt;</div><div className="text-amber-400 text-[10px]">+25 VEs</div></div>
                </button>
                <button onClick={() => setIsQuestsOpen(true)} className="bg-white/5 border border-white/10 hover:border-amber-400/60 rounded-xl px-4 py-2 flex items-center gap-2.5 text-xs">
                  <span>✦</span>
                  <div className="text-left font-semibold"><div>And More &gt;</div><div className="text-amber-400 text-[10px]">+50 VEs</div></div>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1e2238]/60 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-2xl p-2.5 bg-white/5 rounded-xl">🔥</div>
                <div><div className="text-lg font-bold">{streakDays} Day</div><div className="text-xs text-slate-400">Mining Streak</div></div>
              </div>
              <div className="bg-[#1e2238]/60 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-2xl p-2.5 bg-white/5 rounded-xl">⛏️</div>
                <div><div className="text-lg font-bold">0.85 VE/min</div><div className="text-xs text-slate-400">Current Hashrate</div></div>
              </div>
              <div className="bg-[#1e2238]/60 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-2xl p-2.5 bg-white/5 rounded-xl">🛡️</div>
                <div><div className="text-lg font-bold">Bronze (Lv 01)</div><div className="text-xs text-slate-400">Achievement Rank</div></div>
              </div>
              <div className="bg-[#1e2238]/60 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-2xl p-2.5 bg-white/5 rounded-xl">💎</div>
                <div><div className="text-lg font-bold">200 VEs left</div><div className="text-xs text-slate-400">Until Silver Tier</div></div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. EXACT DESKTOP FRAME (1440x450) ================= */}
        {viewMode === 'desktop' && (
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-full max-w-[1440px] flex justify-between text-xs bg-slate-900/60 p-2 rounded-lg border border-white/10">
              <span className="font-bold text-amber-300">Figma Canvas: Desktop — Hero variant 06</span>
              <span className="font-mono text-slate-400">1440 × 450 px</span>
            </div>
            <div className="relative w-[1440px] h-[450px] bg-[#161827] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-[900px] h-[450px]">
                <img src="/assets/hero-desktop.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 shadow-[inset_60px_-60px_70px_0px_#161827]" />
              </div>
              <div className="absolute top-[37px] left-[29px] w-[661px] h-[376px] bg-[#20243a]/20 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between border border-white/10">
                <div className="flex items-center gap-2 text-sm text-white">
                  <span className="font-black text-amber-400">V</span>
                  <span><strong>VELOOP</strong> Rewards</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Mine &amp; <span className="gold-gradient-text text-5xl">EARN</span></h1>
                  <p className="text-slate-400 text-sm mt-1">Activate your mining session and earn VEs while you stay engaged.</p>
                </div>
                <div className="flex items-center gap-6">
                  <div onClick={claimRewards} className="bg-white/5 border border-amber-500/40 rounded-xl p-3 flex items-center gap-4 cursor-pointer">
                    <img src="/assets/coin-3d.png" alt="" className="w-12 h-12 object-contain" />
                    <div><div className="text-xs text-slate-400">Earned</div><div className="text-xl font-bold gold-gradient-text">+{sessionEarned} VEs</div></div>
                  </div>
                  <div className="w-[250px] space-y-2">
                    <div className="text-xs text-slate-400">Mining progress</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-600 to-amber-300" style={{ width: `${progressPercent}%` }} />
                      </div>
                      <span className="text-xs font-bold text-white">{Math.floor(progressPercent)}%</span>
                    </div>
                    <div className="text-xs text-slate-400">⏱️ {formatTimer(remainingSeconds)} Remaining...</div>
                  </div>
                </div>
                <button onClick={toggleMining} className="w-[161px] h-[41px] rounded-full border border-white font-bold text-slate-900 text-sm overflow-hidden relative flex items-center justify-center">
                  <img src="/assets/btn-gold.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="relative z-10">{isMining ? 'Mining Active ⚡' : 'Start Mining'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. EXACT TABLET FRAME (834x540) ================= */}
        {viewMode === 'tablet' && (
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-full max-w-[834px] flex justify-between text-xs bg-slate-900/60 p-2 rounded-lg border border-white/10">
              <span className="font-bold text-amber-300">Figma Canvas: Tablet — Responsive reward landing</span>
              <span className="font-mono text-slate-400">834 × 540 px</span>
            </div>
            <div className="relative w-[834px] h-[540px] bg-[#161827] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-[-60px] w-[954px] h-[537px]">
                <img src="/assets/hero-tablet.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 left-0 w-[834px] h-[92px] bg-[#161827]/80 backdrop-blur-xl" />
              <div className="absolute top-0 left-0 w-[115px] h-[540px] bg-[#161827]/80 backdrop-blur-xl" />
              <div className="absolute top-[86px] left-[166px] w-[419px] h-[79px] pointer-events-none">
                <img src="/assets/ellipse-glow.svg" alt="" className="w-full h-full" />
              </div>
              <div className="absolute top-[26px] left-[30px] w-[572px] z-10 space-y-1">
                <div className="flex items-center gap-2 text-sm text-white">
                  <span className="font-black text-amber-400">V</span>
                  <span><strong>VELOOP</strong> Rewards</span>
                </div>
                <h1 className="text-3xl font-bold">Mine &amp; <span className="gold-gradient-text text-4xl">EARN</span></h1>
                <p className="text-slate-300 text-xs">Activate your mining session and earn VEs while you stay engaged.</p>
              </div>
              <button
                onClick={toggleMining}
                className="absolute top-[92px] left-[638px] z-20 w-[161px] h-[41px] rounded-full border border-white font-bold text-slate-900 text-sm overflow-hidden flex items-center justify-center shadow-2xl"
              >
                <img src="/assets/btn-gold.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="relative z-10">{isMining ? 'Mining Active ⚡' : 'Start Mining'}</span>
              </button>
              <div className="absolute top-[205px] left-[30px] w-[340px] h-[281px] bg-[#20243a]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col justify-center gap-6 z-10">
                <div onClick={claimRewards} className="bg-white/5 border border-amber-500/40 rounded-xl p-3 flex items-center gap-4 cursor-pointer">
                  <img src="/assets/coin-3d.png" alt="" className="w-12 h-12 object-contain" />
                  <div><div className="text-xs text-slate-400">Earned</div><div className="text-xl font-bold gold-gradient-text">+{sessionEarned} VEs</div></div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-slate-400">Mining progress</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-600 to-amber-300" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white">{Math.floor(progressPercent)}%</span>
                  </div>
                  <div className="text-xs text-slate-400">⏱️ {formatTimer(remainingSeconds)} Remaining...</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. EXACT MOBILE FRAME (402x874) ================= */}
        {viewMode === 'mobile' && (
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-full max-w-[402px] flex justify-between text-xs bg-slate-900/60 p-2 rounded-lg border border-white/10">
              <span className="font-bold text-amber-300">Figma Canvas: Mobile — Responsive</span>
              <span className="font-mono text-slate-400">402 × 874 px</span>
            </div>
            <div className="relative w-[402px] h-[874px] bg-[#161827] rounded-[36px] overflow-hidden border-2 border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-8 flex items-center justify-between px-6 text-xs text-slate-400 z-30">
                <span>9:41</span>
                <span>LTE 100%</span>
              </div>
              <div className="absolute top-[51px] left-[9px] w-[384px] h-[143px] bg-[#20243a]/20 backdrop-blur-xl rounded-xl p-4 border border-white/10 flex flex-col justify-center gap-2 z-20">
                <div className="flex items-center gap-2 text-xs text-white">
                  <span className="font-black text-amber-400">V</span>
                  <span><strong>VELOOP</strong> Rewards</span>
                </div>
                <h1 className="text-2xl font-bold">Mine &amp; <span className="gold-gradient-text text-3xl">EARN</span></h1>
                <p className="text-slate-400 text-xs">Activate your mining session and earn VEs while you stay engaged.</p>
              </div>
              <div className="absolute top-[155px] left-[-33px] w-[468px] h-[455px]">
                <img src="/assets/hero-mobile.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 shadow-[inset_0_40px_40px_#161827,inset_0_-40px_40px_#161827]" />
              </div>
              <div className="absolute top-[497px] left-[18px] w-[366px] h-[291px] bg-[#20243a]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col justify-between z-20">
                <div onClick={claimRewards} className="bg-white/5 border border-amber-500/40 rounded-xl p-2.5 flex items-center gap-4 cursor-pointer w-[185px]">
                  <img src="/assets/coin-3d.png" alt="" className="w-10 h-10 object-contain" />
                  <div><div className="text-[10px] text-slate-400">Earned</div><div className="text-base font-bold gold-gradient-text">+{sessionEarned} VEs</div></div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs text-slate-400">Mining progress</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-600 to-amber-300" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white">{Math.floor(progressPercent)}%</span>
                  </div>
                  <div className="text-[11px] text-slate-400">⏱️ {formatTimer(remainingSeconds)} Remaining...</div>
                </div>
                <button onClick={toggleMining} className="w-[161px] h-[41px] rounded-full border border-white font-bold text-slate-900 text-sm overflow-hidden relative flex items-center justify-center">
                  <img src="/assets/btn-gold.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="relative z-10">{isMining ? 'Mining Active ⚡' : 'Start Mining'}</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 flex items-center justify-center z-30">
                <div className="w-32 h-1 bg-white/60 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. BADGES VIEW (PAGE 02) ================= */}
        {viewMode === 'badges' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative bg-[#1e2238]/70 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 overflow-hidden shadow-2xl">
              <div className="relative z-10 flex items-start justify-between gap-8 flex-wrap">
                <div className="max-w-[700px] space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    10-Level 3D Achievement<br />
                    <span className="gold-gradient-text-alt text-4xl md:text-5xl">Badge Design System</span>
                  </h2>
                  <div className="space-y-2">
                    <div className="font-semibold text-white">Bronze earned. Next up: <strong className="text-amber-400">Silver — Rising Star</strong></div>
                    <div className="text-xs text-slate-400">Earn 250 VEs &amp; maintain a 3-day active streak</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs"><span className="text-slate-400">VEs earned</span><span className="text-amber-300 font-bold">{totalVEs} / 250 VEs</span></div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (totalVEs / 250) * 100)}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs"><span className="text-slate-400">Active streak</span><span className="text-amber-300 font-bold">{streakDays} / 3 days</span></div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (streakDays / 3) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8 space-y-4 min-w-[160px]">
                  <div><div className="text-2xl font-extrabold text-amber-400">{unlockedCount} / 10</div><div className="text-xs text-slate-400">Badges unlocked</div></div>
                  <div><div className="text-2xl font-extrabold text-emerald-400">Bronze</div><div className="text-xs text-slate-400">Current tier</div></div>
                  <div><div className="text-2xl font-extrabold text-cyan-400">{totalVEs} VEs</div><div className="text-xs text-slate-400">Total earned</div></div>
                </div>
              </div>
            </div>

            {/* Badges Filter */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-bold text-white">10 — Badge Collection (3D)</h3>
                <p className="text-xs text-slate-400">Bronze earned. Your achievements stay forever in your collection.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setBadgeFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl ${badgeFilter === 'all' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                >
                  All 10 Badges
                </button>
                <button
                  onClick={() => setBadgeFilter('unlocked')}
                  className={`px-3.5 py-1.5 rounded-xl ${badgeFilter === 'unlocked' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                >
                  Unlocked Only
                </button>
                <button
                  onClick={() => setBadgeFilter('locked')}
                  className={`px-3.5 py-1.5 rounded-xl ${badgeFilter === 'locked' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
                >
                  Locked Only
                </button>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBadges.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                    badge.unlocked
                      ? 'bg-[#1e2238]/70 border-amber-500/30 hover:border-amber-400 hover:-translate-y-1.5 shadow-xl'
                      : 'bg-[#181c30]/65 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${badge.unlocked ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-400'}`}>
                      {badge.level}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBadge(badge.id);
                      }}
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        badge.unlocked ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      {badge.unlocked ? '● Unlocked' : '○ Locked'}
                    </button>
                  </div>

                  <div className="h-48 flex items-center justify-center">
                    <img
                      src={badge.unlocked ? badge.imgUnlocked : badge.imgLocked}
                      alt={badge.name}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xl font-extrabold text-white">{badge.name}</div>
                    <div className="text-[11px] font-bold uppercase text-amber-400">{badge.rank}</div>
                    <p className="text-xs text-slate-400 line-clamp-2">{badge.desc}</p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-2 text-[11px] text-slate-300 flex items-center gap-1.5 mt-auto">
                    <span>🎯</span>
                    <span className="truncate">{badge.req}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quests Modal */}
      {isQuestsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsQuestsOpen(false)}>
          <div className="bg-[#1a1e33] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">🎯 Instant VE Quests</h3>
              <button onClick={() => setIsQuestsOpen(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <p className="text-xs text-slate-400">Complete tasks to earn VEs and accelerate your tier progression.</p>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                <div><div className="text-sm font-semibold text-white">Watch Short Ad</div><div className="text-xs text-amber-400 font-bold">+5 VEs</div></div>
                <button onClick={() => { setTotalVEs((t) => t + 5); showToast('📺 +5 VEs earned!'); }} className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs px-3.5 py-1.5 rounded-lg hover:bg-amber-500/30">
                  Watch
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                <div><div className="text-sm font-semibold text-white">Miner Coin Rush</div><div className="text-xs text-amber-400 font-bold">+15 VEs</div></div>
                <button onClick={() => { setTotalVEs((t) => t + 15); showToast('🎮 +15 VEs earned!'); }} className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs px-3.5 py-1.5 rounded-lg hover:bg-amber-500/30">
                  Play
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                <div><div className="text-sm font-semibold text-white">Daily Check-in</div><div className="text-xs text-amber-400 font-bold">+25 VEs</div></div>
                <button onClick={() => { setStreakDays((s) => s + 1); setTotalVEs((t) => t + 25); showToast('✅ Streak boosted! +25 VEs earned!'); }} className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs px-3.5 py-1.5 rounded-lg hover:bg-amber-500/30">
                  Claim
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                <div><div className="text-sm font-semibold text-white">Refer a Friend</div><div className="text-xs text-amber-400 font-bold">+50 VEs</div></div>
                <button onClick={() => { setTotalVEs((t) => t + 50); showToast('🚀 Referral bonus! +50 VEs earned!'); }} className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs px-3.5 py-1.5 rounded-lg hover:bg-amber-500/30">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badge Inspect Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedBadge(null)}>
          <div className="bg-[#1a1e33] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <button onClick={() => setSelectedBadge(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="h-44 flex items-center justify-center">
              <img
                src={selectedBadge.unlocked ? selectedBadge.imgUnlocked : selectedBadge.imgLocked}
                alt=""
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </div>
            <div className="text-xs font-black uppercase text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full inline-block">
              {selectedBadge.level}
            </div>
            <h3 className="text-2xl font-bold text-white">{selectedBadge.name}</h3>
            <div className="text-xs font-bold text-amber-500 uppercase">{selectedBadge.rank}</div>
            <p className="text-xs text-slate-300">{selectedBadge.desc}</p>
            <div className="bg-black/30 rounded-xl p-3 text-xs text-left">
              <div className="text-amber-300 font-bold">Unlock Criteria:</div>
              <div className="text-slate-300 mt-1">{selectedBadge.req}</div>
            </div>
            <button
              onClick={() => {
                toggleBadge(selectedBadge.id);
                setSelectedBadge(null);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-slate-900 font-bold text-sm"
            >
              {selectedBadge.unlocked ? 'Lock Badge (Reset)' : 'Unlock Badge ✨'}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/40 px-6 py-4 mt-auto">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <span>&copy; 2026 VELOOP Rewards Network. Multi-Screen Responsive Next.js App.</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> All Devices &amp; Badges Synchronized</span>
        </div>
      </footer>
    </div>
  );
}
