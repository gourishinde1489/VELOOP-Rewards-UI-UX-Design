/**
 * VELOOP REWARDS — WEB APP CONTROLLER
 * High-fidelity interactive logic for Mining Session & 10-Level 3D Badge System
 * Supporting Fluid, Desktop (1440x450), Tablet (834x540), and Mobile (402x874) views.
 */

// ==========================================
// 1. STATE MANAGEMENT
// ==========================================
const AppState = {
  isMining: false,
  sessionEarned: 38,
  totalVEs: 50,
  streakDays: 1,
  progressPercent: 5,
  remainingSeconds: 45 * 60 + 20, // 45:20 Remaining...
  miningInterval: null,
  timerInterval: null,
  soundEnabled: true,
  activeFilter: 'all',
  activeView: 'fluid',

  // 10-Level 3D Achievement Badges Data (Figma Page 02)
  badges: [
    {
      id: 1,
      level: 'LEVEL 01',
      name: 'Bronze',
      rank: 'FIRST STEP',
      desc: 'The first milestone in the miner\'s journey. Awarded upon activating the VELOOP account and successfully mining the first batch of VEs.',
      req: 'Activate account & start initial mining session',
      unlocked: true,
      imgUnlocked: 'assets/badge-01-bronze.png',
      imgLocked: 'assets/badge-02-silver-locked.png'
    },
    {
      id: 2,
      level: 'LEVEL 02',
      name: 'Silver',
      rank: 'RISING STAR',
      desc: 'Represents the user\'s first true progression beyond novice status, proving sustained engagement and consistency.',
      req: 'Earn 250 VEs & maintain a 3-day active streak',
      unlocked: false,
      imgUnlocked: 'assets/badge-02-silver.png',
      imgLocked: 'assets/badge-02-silver-locked.png'
    },
    {
      id: 3,
      level: 'LEVEL 03',
      name: 'Gold',
      rank: 'REWARD HUNTER',
      desc: 'A meaningful milestone signaling high dedication. Visually distinct with regal 3-point coronet and amber depth.',
      req: 'Earn 750 VEs & maintain a 7-day active streak',
      unlocked: false,
      imgUnlocked: 'assets/badge-03-gold.png',
      imgLocked: 'assets/badge-03-gold-locked.png'
    },
    {
      id: 4,
      level: 'LEVEL 04',
      name: 'Platinum',
      rank: 'ELITE EARNER',
      desc: 'Represents serious dedication and high daily volume. Features cold crystalline platinum geometry with razor-cut armor plates.',
      req: 'Earn 1,500 VEs & maintain a 14-day active streak',
      unlocked: false,
      imgUnlocked: 'assets/badge-04-platinum.png',
      imgLocked: 'assets/badge-04-platinum-locked.png'
    },
    {
      id: 5,
      level: 'LEVEL 05',
      name: 'Diamond',
      rank: 'HIGH ACHIEVER',
      desc: 'Advanced achievement tier displaying refractive crystalline geometry with multi-angled prism lighting and cyan flares.',
      req: 'Earn 3,000 VEs & maintain a 30-day active streak',
      unlocked: false,
      imgUnlocked: 'assets/badge-05-diamond.png',
      imgLocked: 'assets/badge-05-diamond-locked.png'
    },
    {
      id: 6,
      level: 'LEVEL 06',
      name: 'Emerald',
      rank: 'REWARD MASTER',
      desc: 'Higher achievement tier featuring deep velvet forest emerald gemstone, sophisticated with a heavy 3D gold chassis.',
      req: 'Earn 6,000 VEs & complete 50 platform quests',
      unlocked: false,
      imgUnlocked: 'assets/badge-06-emerald.png',
      imgLocked: 'assets/badge-06-emerald-locked.png'
    },
    {
      id: 7,
      level: 'LEVEL 07',
      name: 'Sapphire',
      rank: 'TOP PERFORMER',
      desc: 'High-level achievement radiating aristocratic prestige. Rich royal blue hues set inside delicate platinum scrollwork.',
      req: 'Earn 12,000 VEs & reach Top 5% miner rank',
      unlocked: false,
      imgUnlocked: 'assets/badge-07-sapphire.png',
      imgLocked: 'assets/badge-07-sapphire-locked.png'
    },
    {
      id: 8,
      level: 'LEVEL 08',
      name: 'Ruby',
      rank: 'ELITE',
      desc: 'Prestigious achievement tier. Features deep, dramatic pigeon-blood crimson facets and sweeping dark titanium gold-edged wings.',
      req: 'Earn 25,000 VEs & maintain a 60-day active streak',
      unlocked: false,
      imgUnlocked: 'assets/badge-08-ruby.png',
      imgLocked: 'assets/badge-08-ruby-locked.png'
    },
    {
      id: 9,
      level: 'LEVEL 09',
      name: 'Master',
      rank: 'MASTER ACHIEVER',
      desc: 'Very high achievement tier noticeably more prestigious than previous badges. Features an 8-point radiating gold star and dual gem insets.',
      req: 'Earn 50,000 VEs & mentor 10 active miners',
      unlocked: false,
      imgUnlocked: 'assets/badge-09-master.png',
      imgLocked: 'assets/badge-09-master-locked.png'
    },
    {
      id: 10,
      level: 'LEVEL 10',
      name: 'Legend',
      rank: 'VELOOP LEGEND',
      desc: 'The ultimate achievement badge in the entire collection! Communicates extreme difficulty, astronomical prestige, and absolute mastery.',
      req: 'Earn 100,000 VEs & achieve all seasonal accolades',
      unlocked: false,
      imgUnlocked: 'assets/badge-10-legend.png',
      imgLocked: 'assets/badge-10-legend-locked.png'
    }
  ]
};

// ==========================================
// 2. SYNTHESIZED WEB AUDIO SOUND FX
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCoinChime() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playMiningStart() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  playFanfare() {
    if (!AppState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    });
  }
}

const sounds = new SoundFX();

// ==========================================
// 3. CANVAS PARTICLE FX
// ==========================================
class ParticleFX {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, count = 28, color = '#fcd34d') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        radius: Math.random() * 4 + 2,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

let fx = null;

// ==========================================
// 4. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, icon = '✨') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 5. SYNCHRONIZED MULTI-SCREEN DATA BINDING
// ==========================================
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Synchronize all progress bars, timers, and balances across ALL screens
function syncAllUI() {
  const timeFormatted = `${formatTime(AppState.remainingSeconds)} Remaining...`;
  const pctFormatted = `${Math.floor(AppState.progressPercent)}%`;
  const earnedFormatted = `+${AppState.sessionEarned} VEs`;
  const totalFormatted = `${AppState.totalVEs} VEs`;
  const streakFormatted = `${AppState.streakDays} Day${AppState.streakDays > 1 ? 's' : ''}`;

  // Top header balance
  const totalHeaderVal = document.getElementById('total-ves-val');
  if (totalHeaderVal) totalHeaderVal.textContent = totalFormatted;

  // Sync all session earned pills
  document.querySelectorAll('.shared-session-earned').forEach(el => {
    el.textContent = earnedFormatted;
  });

  // Sync all progress fills and percentage labels
  document.querySelectorAll('.shared-progress-fill').forEach(el => {
    el.style.width = `${AppState.progressPercent}%`;
  });
  document.querySelectorAll('.shared-progress-text').forEach(el => {
    el.textContent = pctFormatted;
  });

  // Sync all countdown timer texts
  document.querySelectorAll('.shared-timer-text').forEach(el => {
    el.textContent = timeFormatted;
  });

  // Sync all button states
  document.querySelectorAll('.shared-mining-btn').forEach(btn => {
    if (AppState.isMining) {
      btn.classList.add('mining-active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('mining-active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  document.querySelectorAll('.shared-btn-label').forEach(el => {
    el.textContent = AppState.isMining ? 'Mining Active ⚡' : 'Start Mining';
  });

  document.querySelectorAll('.shared-status-cue').forEach(el => {
    el.textContent = AppState.isMining 
      ? 'Mining session in progress. Passive rewards generating...'
      : 'Session ready. Click to activate passive VE mining.';
  });

  // Sync metrics grid
  document.querySelectorAll('.shared-streak-days').forEach(el => {
    el.textContent = streakFormatted;
  });

  const vesLeft = Math.max(0, 250 - AppState.totalVEs);
  document.querySelectorAll('.shared-ves-left').forEach(el => {
    el.textContent = vesLeft > 0 ? `${vesLeft} VEs left` : 'Silver Unlocked!';
  });

  // Milestone Banner Sync
  const bannerVes = document.getElementById('stat-total-ves');
  const bannerVesText = document.getElementById('banner-ves-progress-text');
  const bannerVesFill = document.getElementById('banner-ves-fill');
  const bannerStreakText = document.getElementById('banner-streak-progress-text');
  const bannerStreakFill = document.getElementById('banner-streak-fill');

  if (bannerVes) bannerVes.textContent = totalFormatted;
  if (bannerVesText) bannerVesText.textContent = `${AppState.totalVEs} / 250 VEs`;
  if (bannerVesFill) bannerVesFill.style.width = `${Math.min(100, (AppState.totalVEs / 250) * 100)}%`;

  if (bannerStreakText) bannerStreakText.textContent = `${AppState.streakDays} / 3 days`;
  if (bannerStreakFill) bannerStreakFill.style.width = `${Math.min(100, (AppState.streakDays / 3) * 100)}%`;
}

// Toggle Mining State
function toggleMining(event) {
  AppState.isMining = !AppState.isMining;

  if (AppState.isMining) {
    sounds.playMiningStart();
    showToast('Mining session activated! Passive rewards generating.', '⚡');

    if (fx && event) {
      fx.burst(event.clientX, event.clientY, 25, '#fbbf24');
    }

    // Timer Interval
    AppState.timerInterval = setInterval(() => {
      if (AppState.remainingSeconds > 0) {
        AppState.remainingSeconds--;
        AppState.progressPercent = Math.min(100, AppState.progressPercent + 0.02);
        syncAllUI();
      } else {
        clearInterval(AppState.timerInterval);
      }
    }, 1000);

    // Earning Accumulation Interval
    AppState.miningInterval = setInterval(() => {
      AppState.sessionEarned += 1;
      AppState.totalVEs += 1;
      syncAllUI();
      checkMilestones();
    }, 4000);

  } else {
    clearInterval(AppState.timerInterval);
    clearInterval(AppState.miningInterval);
    showToast('Mining session paused.', '⏸️');
  }

  syncAllUI();
}

// Claim Rewards Action
function claimRewards(event) {
  sounds.playCoinChime();
  const reward = AppState.sessionEarned;
  if (fx && event) fx.burst(event.clientX, event.clientY, 35, '#ffd700');
  showToast(`Harvested +${reward} VEs from active session!`, '💰');
}

// Check Tier Milestones & Auto-Unlock Badges
function checkMilestones() {
  const silver = AppState.badges.find(b => b.id === 2);
  if (silver && !silver.unlocked && AppState.totalVEs >= 250 && AppState.streakDays >= 3) {
    silver.unlocked = true;
    sounds.playFanfare();
    showToast('🎉 Milestone Reached: You unlocked the Silver Achievement Badge!', '🏆');
    renderBadges();
  }
}

// ==========================================
// 6. 10-LEVEL 3D BADGE SYSTEM RENDERER
// ==========================================
function renderBadges() {
  const container = document.getElementById('badges-grid-container');
  if (!container) return;

  container.innerHTML = '';

  const filter = AppState.activeFilter;
  const filtered = AppState.badges.filter(b => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  filtered.forEach(badge => {
    const card = document.createElement('div');
    card.className = `badge-card ${badge.unlocked ? 'is-unlocked' : 'is-locked'}`;
    card.dataset.id = badge.id;

    card.innerHTML = `
      <div class="badge-card-header">
        <span class="level-tag">${badge.level}</span>
        <button class="badge-toggle-btn ${badge.unlocked ? 'btn-unlocked' : 'btn-locked'}" data-toggle-id="${badge.id}">
          <span>${badge.unlocked ? '● Unlocked' : '○ Locked'}</span>
          <span style="opacity: 0.7; font-size: 10px;">Toggle</span>
        </button>
      </div>

      <div class="badge-art-frame" data-inspect-id="${badge.id}">
        <img src="${badge.unlocked ? badge.imgUnlocked : badge.imgLocked}" alt="${badge.name} 3D Badge" class="badge-art-img" loading="lazy" />
      </div>

      <div class="badge-info">
        <h4 class="badge-name">${badge.name}</h4>
        <span class="badge-rank">${badge.rank}</span>
        <p class="badge-desc">${badge.desc}</p>
      </div>

      <div class="badge-criteria">
        <span class="criteria-icon">🎯</span>
        <span>${badge.req}</span>
      </div>
    `;

    // Toggle button listener
    const toggleBtn = card.querySelector('.badge-toggle-btn');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBadgeLock(badge.id, e);
    });

    // Card inspect listener
    card.addEventListener('click', () => {
      openBadgeModal(badge);
    });

    container.appendChild(card);
  });

  // Update badge count summary
  const unlockedCount = AppState.badges.filter(b => b.unlocked).length;
  const countPill = document.getElementById('nav-badge-pill');
  const statCount = document.getElementById('stat-unlocked-count');
  const statCurrent = document.getElementById('stat-current-achieve');
  const headerTier = document.getElementById('header-tier-tag');

  if (countPill) countPill.textContent = `${unlockedCount}/10`;
  if (statCount) statCount.textContent = `${unlockedCount} / 10`;

  const highest = [...AppState.badges].reverse().find(b => b.unlocked);
  if (highest) {
    if (statCurrent) statCurrent.textContent = highest.name;
    if (headerTier) headerTier.textContent = `${highest.name} Tier`;
    document.querySelectorAll('.shared-rank-tag').forEach(el => {
      el.textContent = `${highest.name} (${highest.level})`;
    });
  }
}

// Toggle Badge Unlock Status
function toggleBadgeLock(badgeId, event) {
  const badge = AppState.badges.find(b => b.id === badgeId);
  if (!badge) return;

  badge.unlocked = !badge.unlocked;

  if (badge.unlocked) {
    sounds.playFanfare();
    if (fx && event) fx.burst(event.clientX, event.clientY, 40, '#fcd34d');
    showToast(`Unlocked ${badge.name} Badge (${badge.rank})!`, '🏆');
  } else {
    sounds.playCoinChime();
    showToast(`${badge.name} Badge locked for progression testing.`, '🔒');
  }

  renderBadges();
  syncAllUI();
}

// ==========================================
// 7. VIEWPORT SWITCHER CONTROLLER
// ==========================================
function switchView(viewName) {
  AppState.activeView = viewName;

  // Update switcher buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Show corresponding view container
  document.querySelectorAll('.stage-view').forEach(stage => {
    stage.classList.remove('active');
  });

  const targetMap = {
    'fluid': 'fluid-view-container',
    'desktop': 'desktop-view-container',
    'tablet': 'tablet-view-container',
    'mobile': 'mobile-view-container',
    'badges': 'badges-view-container'
  };

  const activeStage = document.getElementById(targetMap[viewName]);
  if (activeStage) {
    activeStage.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 8. MODAL CONTROLLERS
// ==========================================
let currentModalBadge = null;

function openBadgeModal(badge) {
  currentModalBadge = badge;
  const modal = document.getElementById('badge-modal');
  const img = document.getElementById('modal-badge-img');
  const level = document.getElementById('modal-level-tag');
  const title = document.getElementById('modal-badge-title');
  const rank = document.getElementById('modal-badge-rank');
  const desc = document.getElementById('modal-badge-desc');
  const req = document.getElementById('modal-badge-req');
  const toggleBtn = document.getElementById('modal-toggle-unlock-btn');

  img.src = badge.unlocked ? badge.imgUnlocked : badge.imgLocked;
  level.textContent = badge.level;
  title.textContent = badge.name;
  rank.textContent = badge.rank;
  desc.textContent = badge.desc;
  req.textContent = badge.req;
  toggleBtn.textContent = badge.unlocked ? 'Lock Badge (Reset)' : 'Unlock Badge ✨';

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeBadgeModal() {
  const modal = document.getElementById('badge-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  currentModalBadge = null;
}

function openQuestsModal() {
  const modal = document.getElementById('quests-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeQuestsModal() {
  const modal = document.getElementById('quests-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function completeQuest(rewardAmount, questName, event) {
  sounds.playCoinChime();
  AppState.totalVEs += rewardAmount;
  AppState.sessionEarned += rewardAmount;
  syncAllUI();

  if (fx && event) fx.burst(event.clientX, event.clientY, 30, '#34d399');
  showToast(`+${rewardAmount} VEs earned from: ${questName}!`, '🎁');
  checkMilestones();
}

// ==========================================
// 9. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  fx = new ParticleFX('fx-canvas');

  // Viewport Switcher Listeners
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });

  // Brand click returns to fluid view
  const brandBtn = document.getElementById('brand-home-btn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => switchView('fluid'));
  }

  // Bind all Start Mining buttons across all screens
  document.querySelectorAll('.shared-mining-btn').forEach(btn => {
    btn.addEventListener('click', toggleMining);
  });

  // Bind all claim triggers
  document.querySelectorAll('.btn-claim-trigger').forEach(card => {
    card.addEventListener('click', claimRewards);
  });

  // Sound Toggle
  const soundBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      AppState.soundEnabled = !AppState.soundEnabled;
      soundIcon.textContent = AppState.soundEnabled ? '🔊' : '🔇';
      showToast(`Audio FX ${AppState.soundEnabled ? 'Enabled' : 'Muted'}`, AppState.soundEnabled ? '🔊' : '🔇');
    });
  }

  // Quests Modal open triggers
  const btnOpenQuests = document.getElementById('btn-open-quests');
  if (btnOpenQuests) btnOpenQuests.addEventListener('click', openQuestsModal);

  const balancePill = document.getElementById('user-balance-pill');
  if (balancePill) balancePill.addEventListener('click', openQuestsModal);

  document.querySelectorAll('.activity-chip').forEach(chip => {
    chip.addEventListener('click', openQuestsModal);
  });

  // Badge Filters
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.activeFilter = pill.dataset.filter;
      renderBadges();
    });
  });

  // Modal Closers
  const badgeModalClose = document.getElementById('badge-modal-close');
  if (badgeModalClose) badgeModalClose.addEventListener('click', closeBadgeModal);

  const modalToggleUnlock = document.getElementById('modal-toggle-unlock-btn');
  if (modalToggleUnlock) {
    modalToggleUnlock.addEventListener('click', (e) => {
      if (currentModalBadge) {
        toggleBadgeLock(currentModalBadge.id, e);
        closeBadgeModal();
      }
    });
  }

  const questsModalClose = document.getElementById('quests-modal-close');
  if (questsModalClose) questsModalClose.addEventListener('click', closeQuestsModal);

  // Quest Action Buttons
  const btnWatchAd = document.getElementById('btn-quest-watch-ad');
  if (btnWatchAd) {
    btnWatchAd.addEventListener('click', (e) => {
      btnWatchAd.disabled = true;
      btnWatchAd.textContent = 'Watching...';
      setTimeout(() => {
        completeQuest(5, 'Watch Ad Sponsor Clip', e);
        btnWatchAd.disabled = false;
        btnWatchAd.textContent = 'Watch (5s)';
      }, 1500);
    });
  }

  const btnPlayGame = document.getElementById('btn-quest-play-game');
  if (btnPlayGame) {
    btnPlayGame.addEventListener('click', (e) => {
      completeQuest(15, 'Miner Coin Tap Rush', e);
    });
  }

  const btnCheckin = document.getElementById('btn-quest-checkin');
  if (btnCheckin) {
    btnCheckin.addEventListener('click', (e) => {
      AppState.streakDays += 1;
      completeQuest(25, 'Daily Miner Check-in', e);
      btnCheckin.textContent = 'Claimed Today ✅';
      btnCheckin.disabled = true;
    });
  }

  const btnInvite = document.getElementById('btn-quest-invite');
  if (btnInvite) {
    btnInvite.addEventListener('click', (e) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      completeQuest(50, 'Miner Referral Invitation', e);
      btnInvite.textContent = 'Link Copied! 🔗';
    });
  }

  // Backdrop click closes modals
  window.addEventListener('click', (e) => {
    const badgeModal = document.getElementById('badge-modal');
    const questsModal = document.getElementById('quests-modal');
    if (e.target === badgeModal) closeBadgeModal();
    if (e.target === questsModal) closeQuestsModal();
  });

  // Initial Sync
  syncAllUI();
  renderBadges();
});
