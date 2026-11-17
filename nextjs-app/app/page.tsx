'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { sounds } from '@/lib/soundFX';
import { Badge } from '@/lib/types';

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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  shape: 'circle' | 'square' | 'star';
}

export default function BadgesLandingPage() {
  const [totalVEs, setTotalVEs] = useState(50);
  const [streakDays, setStreakDays] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [celebrationBadge, setCelebrationBadge] = useState<Badge | null>(null);
  const [animatingBadgeId, setAnimatingBadgeId] = useState<number | null>(null);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Confetti Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'star') {
          // Draw 4-point star
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.3, -s * 0.3);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.3, s * 0.3);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.3, s * 0.3);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.3, -s * 0.3);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const triggerConfetti = (originX?: number, originY?: number, count = 70) => {
    const x = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
    const y = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);
    const colors = ['#fbbf24', '#f59e0b', '#fde68a', '#34d399', '#22d3ee', '#ffffff', '#ffd700'];
    const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'square', 'star'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const toggleBadge = (id: number, clickEvent?: React.MouseEvent) => {
    const targetBadge = badges.find((b) => b.id === id);
    if (!targetBadge) return;

    const nextState = !targetBadge.unlocked;

    if (nextState) {
      // UNLOCK ANIMATION TRIGGER
      if (soundEnabled) sounds.playFanfare();
      const rect = clickEvent?.currentTarget?.getBoundingClientRect();
      const originX = rect ? rect.left + rect.width / 2 : undefined;
      const originY = rect ? rect.top + rect.height / 2 : undefined;

      triggerConfetti(originX, originY, 80);
      setAnimatingBadgeId(id);
      setTimeout(() => setAnimatingBadgeId(null), 1400);

      const updated = { ...targetBadge, unlocked: true };
      setCelebrationBadge(updated);
      showToast(`🏆 UNLOCKED: ${targetBadge.name} (${targetBadge.rank})!`);
    } else {
      // LOCK (RESET) TRIGGER
      if (soundEnabled) sounds.playCoinChime();
      showToast(`🔒 ${targetBadge.name} Badge locked for testing.`);
    }

    setBadges((prev) =>
      prev.map((b) => (b.id === id ? { ...b, unlocked: nextState } : b))
    );

    if (selectedBadge?.id === id) {
      setSelectedBadge((prev) => (prev ? { ...prev, unlocked: nextState } : null));
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const highestBadge = [...badges].filter((b) => b.unlocked).pop() || badges[0];
  const nextBadge = badges.find((b) => !b.unlocked);

  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#161827] text-[#f5f3ed] relative">
      {/* Particle Canvas for Celebrations */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161827]/95 border border-amber-500/40 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#161827]/90 backdrop-blur-md border-b border-white/10 px-6 py-3">
        <div className="max-w-[1512px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-[#161827] border border-amber-500/50 flex items-center justify-center font-black text-amber-300 shadow-[0_0_12px_rgba(183,130,42,0.35)]">
              V
            </div>
            <div className="text-base font-extrabold text-white">
              VELOOP <span className="font-medium text-amber-400 text-sm">Badges</span>
            </div>
          </div>

          {/* Quick Header Milestone */}
          <div className="hidden sm:flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-slate-300">
              Tier: <strong className="text-amber-300 font-bold">{highestBadge.name} ({highestBadge.level})</strong>
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="text-slate-400">
              <strong className="text-white font-bold">{unlockedCount} / 10</strong> Unlocked
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showToast(soundEnabled ? '🔇 Audio FX Muted' : '🔊 Audio FX Enabled');
              }}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:scale-105 transition-transform"
              title="Toggle Sound FX"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button
              onClick={() => setIsQuestsOpen(true)}
              className="bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-bold px-3.5 py-1.5 rounded-full hover:bg-amber-500/30 transition-colors"
            >
              🎯 Earn VEs
            </button>
            <div
              onClick={() => setIsQuestsOpen(true)}
              className="bg-white/5 border border-amber-500/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 cursor-pointer hover:border-amber-400 transition-colors"
              title="Click to earn more VEs"
            >
              <img src="/assets/coin-3d.png" alt="" className="w-5 h-5 object-contain" />
              <span className="text-xs font-bold text-amber-100">{totalVEs} VEs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-[#161827] flex items-center justify-center text-[11px] font-black">
                V
              </div>
              <span className="text-xs font-semibold text-slate-300 hidden md:inline">Miner #8492</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Badges Landing Page Content */}
      <main className="flex-1 max-w-[1512px] w-full mx-auto p-6 space-y-8">
        
        {/* ================= 1. MILESTONE OVERVIEW BANNER (Figma Node 192:81) ================= */}
        <section className="relative bg-[#181c30] rounded-3xl border border-amber-500/25 p-8 md:p-10 overflow-hidden shadow-2xl">
          <div className="absolute -top-16 right-[15%] w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                10-Level 3D Achievement<br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  Badge Design System
                </span>
              </h1>

              <div className="space-y-3 max-w-2xl">
                {nextBadge ? (
                  <>
                    <div className="text-base text-white">
                      {highestBadge.name} earned. Next up: <strong className="text-amber-400">{nextBadge.name} — {nextBadge.rank}</strong>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">{nextBadge.req}</p>

                    {/* Dual Milestone Bars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">VEs earned</span>
                          <span className="text-amber-300 font-bold">{totalVEs} / 250 VEs</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                            style={{ width: `${Math.min(100, (totalVEs / 250) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Active streak</span>
                          <span className="text-amber-300 font-bold">{streakDays} / 3 days</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                            style={{ width: `${Math.min(100, (streakDays / 3) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 pt-1">
                      {Math.max(0, 250 - totalVEs)} VEs and {Math.max(0, 3 - streakDays)} more active days to unlock {nextBadge.name}.
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-amber-300">🌟 All 10 Badges Unlocked! Absolute Legend!</div>
                    <p className="text-xs text-slate-300">You have achieved the ultimate status in the VELOOP 3D Badge Collection.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Summary Column */}
            <div className="w-full lg:w-auto lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 grid grid-cols-3 lg:grid-cols-1 gap-6 min-w-[180px]">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{unlockedCount} / 10</div>
                <div className="text-xs text-slate-400 font-medium">Badges unlocked</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">{highestBadge.name}</div>
                <div className="text-xs text-slate-400 font-medium">Current tier</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">{totalVEs} VEs</div>
                <div className="text-xs text-slate-400 font-medium">Total earned</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. BADGES TOOLBAR & FILTER ================= */}
        <section className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">10 — Badge Collection (3D)</h2>
            <p className="text-xs sm:text-sm text-slate-400">All unlocked badges remain permanently in your miner achievement ledger.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setBadgeFilter('all')}
              className={`px-4 py-1.5 rounded-xl transition-all ${badgeFilter === 'all' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              All 10 Badges
            </button>
            <button
              onClick={() => setBadgeFilter('unlocked')}
              className={`px-4 py-1.5 rounded-xl transition-all ${badgeFilter === 'unlocked' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Unlocked Only
            </button>
            <button
              onClick={() => setBadgeFilter('locked')}
              className={`px-4 py-1.5 rounded-xl transition-all ${badgeFilter === 'locked' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Locked Only
            </button>
          </div>
        </section>

        {/* ================= 3. 10-LEVEL 3D BADGES RESPONSIVE GRID ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map((badge) => {
            const isJustUnlocked = animatingBadgeId === badge.id;

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 group overflow-hidden ${
                  isJustUnlocked
                    ? 'animate-card-unlock bg-[#222744] z-10'
                    : badge.unlocked
                    ? 'bg-[#1e2238]/70 border-amber-500/30 hover:border-amber-400 hover:-translate-y-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.55)]'
                    : 'bg-[#181c30]/65 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Diagonal Light Sweep Ray during unlock */}
                {isJustUnlocked && (
                  <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep pointer-events-none z-30" />
                )}

                {/* Floating "+1 UNLOCKED!" ribbon banner during unlock */}
                {isJustUnlocked && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-celebration bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-[0_0_20px_#fbbf24] z-40 whitespace-nowrap pointer-events-none">
                    ✨ BADGE UNLOCKED! ✨
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider ${
                    badge.unlocked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-slate-400'
                  }`}>
                    {badge.level}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBadge(badge.id, e);
                    }}
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                      badge.unlocked
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-amber-400/50'
                    }`}
                  >
                    {badge.unlocked ? '● Unlocked' : '○ Locked'}
                  </button>
                </div>

                {/* 3D Badge Art Frame */}
                <div className="relative h-48 flex items-center justify-center p-2">
                  {/* Expanding Shockwave Ring during unlock */}
                  {isJustUnlocked && (
                    <div className="absolute w-36 h-36 rounded-full border-2 border-amber-400 animate-shockwave pointer-events-none z-10" />
                  )}

                  <img
                    src={badge.unlocked ? badge.imgUnlocked : badge.imgLocked}
                    alt={badge.name}
                    className={`max-h-full max-w-full object-contain transition-transform duration-500 ${
                      isJustUnlocked
                        ? 'animate-badge-unlock'
                        : 'drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] group-hover:scale-105'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-xl font-black text-white flex items-center gap-2">
                    <span>{badge.name}</span>
                    {badge.unlocked && <span className="text-amber-400 text-sm">✦</span>}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">{badge.rank}</div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{badge.desc}</p>
                </div>

                <div className="bg-black/35 rounded-xl p-2.5 text-[11px] text-slate-300 flex items-center gap-2 mt-auto border border-white/5">
                  <span className="text-amber-400">🎯</span>
                  <span className="truncate">{badge.req}</span>
                </div>
              </div>
            );
          })}
        </section>

      </main>

      {/* ================= GRAND UNLOCK CELEBRATION MODAL ================= */}
      {celebrationBadge && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setCelebrationBadge(null)}
        >
          <div
            className="relative bg-gradient-to-b from-[#1e233d] to-[#121422] border-2 border-amber-400/60 rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-[0_0_80px_rgba(245,158,11,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sunburst Rotating Light Rays in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <div
                className="w-[600px] h-[600px] rounded-full animate-sunburst"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.3) 15deg, transparent 30deg, rgba(251,191,36,0.3) 45deg, transparent 60deg, rgba(251,191,36,0.3) 75deg, transparent 90deg, rgba(251,191,36,0.3) 105deg, transparent 120deg, rgba(251,191,36,0.3) 135deg, transparent 150deg, rgba(251,191,36,0.3) 165deg, transparent 180deg, rgba(251,191,36,0.3) 195deg, transparent 210deg, rgba(251,191,36,0.3) 225deg, transparent 240deg, rgba(251,191,36,0.3) 255deg, transparent 270deg, rgba(251,191,36,0.3) 285deg, transparent 300deg, rgba(251,191,36,0.3) 315deg, transparent 330deg, rgba(251,191,36,0.3) 345deg, transparent 360deg)'
                }}
              />
            </div>

            {/* Glowing Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/25 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

            <div className="relative z-10 flex justify-between items-center">
              <span className="text-xs font-black tracking-widest text-amber-300 uppercase px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
                {celebrationBadge.level}
              </span>
              <button
                onClick={() => setCelebrationBadge(null)}
                className="text-slate-400 hover:text-white text-2xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative z-10 space-y-1">
              <div className="text-xs font-black uppercase tracking-widest text-amber-400 animate-pulse">
                ✦ ACHIEVEMENT UNLOCKED ✦
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {celebrationBadge.name}
              </h2>
              <div className="text-sm font-extrabold uppercase tracking-wider text-amber-300">
                {celebrationBadge.rank}
              </div>
            </div>

            {/* 3D Badge Visual with Unlock Pop Animation */}
            <div className="relative z-10 h-60 flex items-center justify-center">
              <img
                src={celebrationBadge.imgUnlocked}
                alt={celebrationBadge.name}
                className="max-h-full max-w-full object-contain animate-badge-unlock drop-shadow-[0_20px_40px_rgba(245,158,11,0.6)]"
              />
            </div>

            <p className="relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              {celebrationBadge.desc}
            </p>

            <div className="relative z-10 bg-black/40 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-left space-y-1">
              <div className="font-bold text-amber-400">Unlock Criteria Achieved:</div>
              <div className="text-slate-300">{celebrationBadge.req}</div>
            </div>

            <button
              onClick={() => {
                if (soundEnabled) sounds.playCoinChime();
                setCelebrationBadge(null);
              }}
              className="relative z-10 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-base shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:brightness-110 active:scale-98 transition-all"
            >
              Collect Badge &amp; Continue ✨
            </button>
          </div>
        </div>
      )}

      {/* Quests Modal */}
      {isQuestsOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsQuestsOpen(false)}>
          <div className="bg-[#1a1e33] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-white">🎯 Instant VE Quests</h3>
              <button onClick={() => setIsQuestsOpen(false)} className="text-slate-400 hover:text-white text-2xl font-bold">✕</button>
            </div>
            <p className="text-xs text-slate-400">Complete tasks to immediately boost your earned VEs and speed up milestone unlocks.</p>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Watch Sponsor Clip</div>
                  <div className="text-xs text-amber-400 font-bold">+5 VEs &middot; Instant Reward</div>
                </div>
                <button
                  onClick={() => {
                    setTotalVEs((t) => t + 5);
                    if (soundEnabled) sounds.playCoinChime();
                    triggerConfetti(undefined, undefined, 25);
                    showToast('📺 +5 VEs earned from clip!');
                  }}
                  className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-500/30 transition-colors"
                >
                  Watch
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Miner Coin Tap Rush</div>
                  <div className="text-xs text-amber-400 font-bold">+15 VEs &middot; Mini Game</div>
                </div>
                <button
                  onClick={() => {
                    setTotalVEs((t) => t + 15);
                    if (soundEnabled) sounds.playCoinChime();
                    triggerConfetti(undefined, undefined, 35);
                    showToast('🎮 +15 VEs earned from mini game!');
                  }}
                  className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-500/30 transition-colors"
                >
                  Play
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Daily Miner Check-in</div>
                  <div className="text-xs text-amber-400 font-bold">+25 VEs &middot; +1 Active Streak Day</div>
                </div>
                <button
                  onClick={() => {
                    setStreakDays((s) => s + 1);
                    setTotalVEs((t) => t + 25);
                    if (soundEnabled) sounds.playFanfare();
                    triggerConfetti(undefined, undefined, 50);
                    showToast('✅ Streak boosted! +25 VEs earned!');
                  }}
                  className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-500/30 transition-colors"
                >
                  Claim
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Refer a Miner Friend</div>
                  <div className="text-xs text-amber-400 font-bold">+50 VEs &middot; Referral Bonus</div>
                </div>
                <button
                  onClick={() => {
                    setTotalVEs((t) => t + 50);
                    if (soundEnabled) sounds.playCoinChime();
                    triggerConfetti(undefined, undefined, 50);
                    showToast('🚀 Referral link copied! +50 VEs awarded!');
                  }}
                  className="bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-500/30 transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badge Inspect Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedBadge(null)}>
          <div className="bg-[#1a1e33] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <button onClick={() => setSelectedBadge(null)} className="text-slate-400 hover:text-white text-2xl font-bold">✕</button>
            </div>
            <div className="h-52 flex items-center justify-center relative">
              <img
                src={selectedBadge.unlocked ? selectedBadge.imgUnlocked : selectedBadge.imgLocked}
                alt={selectedBadge.name}
                className={`max-h-full max-w-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)] ${
                  animatingBadgeId === selectedBadge.id ? 'animate-badge-unlock' : ''
                }`}
              />
            </div>
            <span className="inline-block text-[11px] font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {selectedBadge.level}
            </span>
            <h3 className="text-2xl font-black text-white">{selectedBadge.name}</h3>
            <div className="text-xs font-bold uppercase text-amber-400">{selectedBadge.rank}</div>
            <p className="text-xs text-slate-400 leading-relaxed">{selectedBadge.desc}</p>
            <div className="bg-black/40 rounded-xl p-3 text-left space-y-1">
              <div className="text-xs font-bold text-amber-400">Unlock Criteria:</div>
              <div className="text-xs text-slate-300">{selectedBadge.req}</div>
            </div>
            <button
              onClick={(e) => {
                toggleBadge(selectedBadge.id, e);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-200 text-[#161827] font-black text-sm hover:opacity-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              {selectedBadge.unlocked ? 'Lock Badge (Reset)' : 'Unlock Badge ✨'}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0f172a]/50 py-5 px-6 mt-auto">
        <div className="max-w-[1512px] mx-auto flex items-center justify-between gap-4 flex-wrap text-xs text-slate-400">
          <span className="font-bold text-white">VELOOP Rewards &bull; 10-Level 3D Achievement Badges</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span>Connected to VELOOP Core &bull; Fully Responsive</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
