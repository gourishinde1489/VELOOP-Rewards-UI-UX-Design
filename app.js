/**
 * VELOOP REWARDS — 10-LEVEL 3D ACHIEVEMENT BADGES LANDING CONTROLLER
 * High-fidelity interactive logic for Badge Progression, 3D Collectibles & Milestones
 * Extracted from Figma Node 192:37
 */

// ==========================================
// 1. STATE MANAGEMENT
// ==========================================
const AppState = {
  totalVEs: 50,
  streakDays: 1,
  soundEnabled: true,
  activeFilter: 'all',

  // 10-Level 3D Achievement Badges Data (Figma Page 02)
  badges: [
    {
      id: 1,
      level: 'LEVEL 01',
      name: 'Bronze',
      rank: 'FIRST STEP',
      desc: 'The first milestone in the miner\'s journey. Awarded upon activating the VELOOP account and successfully mining the first batch of VEs.',
      req: 'Activate account & start initial mining session',
      targetVEs: 50,
      targetStreak: 1,
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
      targetVEs: 250,
      targetStreak: 3,
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
      targetVEs: 750,
      targetStreak: 7,
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
      targetVEs: 1500,
      targetStreak: 14,
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
      targetVEs: 3000,
      targetStreak: 30,
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
      targetVEs: 6000,
      targetStreak: 45,
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
      targetVEs: 12000,
      targetStreak: 60,
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
      targetVEs: 25000,
      targetStreak: 90,
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
      targetVEs: 50000,
      targetStreak: 120,
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
      targetVEs: 100000,
      targetStreak: 180,
      unlocked: false,
      imgUnlocked: 'assets/badge-10-legend.png',
      imgLocked: 'assets/badge-10-legend-locked.png'
    }
  ]
};

// ==========================================
// 2. AUDIO SYNTHESIZER (WEB AUDIO API)
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
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (_) {}
  }

  playFanfare() {
    if (!AppState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [
        { freq: 523.25, delay: 0.00 }, // C5
        { freq: 659.25, delay: 0.08 }, // E5
        { freq: 783.99, delay: 0.16 }, // G5
        { freq: 1046.50, delay: 0.25 }  // C6
      ];

      // Arpeggio
      notes.forEach(({ freq, delay }) => {
        const now = this.ctx.currentTime + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
      });

      // Triumphant chord
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq) => {
        const now = this.ctx.currentTime + 0.32;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch (_) {}
  }
}

const sounds = new SoundFX();

// ==========================================
// 3. CANVAS PARTICLE FX (CONFETTI & STARS)
// ==========================================
class ParticleFX {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, count = 75, color) {
    if (!this.canvas) return;
    const originX = x ?? window.innerWidth / 2;
    const originY = y ?? window.innerHeight / 2;
    const colors = ['#fbbf24', '#f59e0b', '#fde68a', '#34d399', '#22d3ee', '#ffffff', '#ffd700'];
    const shapes = ['circle', 'square', 'star'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        life: 1,
        decay: Math.random() * 0.016 + 0.01,
        size: Math.random() * 7 + 3,
        color: color || colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14; // gravity
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'star') {
        const s = p.size;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s);
        this.ctx.lineTo(s * 0.3, -s * 0.3);
        this.ctx.lineTo(s, 0);
        this.ctx.lineTo(s * 0.3, s * 0.3);
        this.ctx.lineTo(0, s);
        this.ctx.lineTo(-s * 0.3, s * 0.3);
        this.ctx.lineTo(-s, 0);
        this.ctx.lineTo(-s * 0.3, -s * 0.3);
        this.ctx.closePath();
        this.ctx.fill();
      } else if (p.shape === 'square') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

let fx = null;

// ==========================================
// 4. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, icon = '✨') {
  const container = document.getElementById('toast-container');
  if (!container) return;
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
// 5. 10-LEVEL 3D BADGE SYSTEM RENDERER
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
        <h3 class="badge-name">${badge.name} ${badge.unlocked ? '<span style="color:#fbbf24; font-size:14px;">✦</span>' : ''}</h3>
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

  syncMilestoneUI();
}

// ==========================================
// 6. SYNC MILESTONE UI & METADATA
// ==========================================
function syncMilestoneUI() {
  const unlockedBadges = AppState.badges.filter(b => b.unlocked);
  const unlockedCount = unlockedBadges.length;

  // Header Counters
  const totalHeaderVal = document.getElementById('total-ves-val');
  if (totalHeaderVal) totalHeaderVal.textContent = `${AppState.totalVEs} VEs`;

  const headerUnlocked = document.getElementById('header-unlocked-pill');
  if (headerUnlocked) headerUnlocked.textContent = `${unlockedCount} / 10`;

  // Highest Tier Badge
  const highestBadge = [...unlockedBadges].pop() || AppState.badges[0];
  const headerHighest = document.getElementById('header-highest-badge');
  const headerTier = document.getElementById('header-tier-tag');
  const statCurrent = document.getElementById('stat-current-achieve');

  if (headerHighest) headerHighest.textContent = `${highestBadge.name} (${highestBadge.level})`;
  if (headerTier) headerTier.textContent = `${highestBadge.name} Tier`;
  if (statCurrent) statCurrent.textContent = highestBadge.name;

  // Next Milestone Target Badge
  const nextBadge = AppState.badges.find(b => !b.unlocked);
  const nextTitle = document.getElementById('banner-next-title');
  const nextReq = document.getElementById('banner-next-req');
  const subtext = document.getElementById('banner-subtext');
  const bannerVesText = document.getElementById('banner-ves-progress-text');
  const bannerVesFill = document.getElementById('banner-ves-fill');
  const bannerStreakText = document.getElementById('banner-streak-progress-text');
  const bannerStreakFill = document.getElementById('banner-streak-fill');

  if (nextBadge) {
    if (nextTitle) nextTitle.innerHTML = `${highestBadge.name} earned. Next up: <strong>${nextBadge.name} — ${nextBadge.rank}</strong>`;
    if (nextReq) nextReq.textContent = nextBadge.req;

    const targetVEs = nextBadge.targetVEs || 250;
    const targetStreak = nextBadge.targetStreak || 3;

    const vesLeft = Math.max(0, targetVEs - AppState.totalVEs);
    const streakLeft = Math.max(0, targetStreak - AppState.streakDays);

    if (subtext) {
      subtext.textContent = `${vesLeft > 0 ? `${vesLeft} VEs` : 'VEs goal reached'} and ${streakLeft > 0 ? `${streakLeft} more active days` : 'Streak ready'} to unlock ${nextBadge.name}.`;
    }

    if (bannerVesText) bannerVesText.textContent = `${AppState.totalVEs} / ${targetVEs} VEs`;
    if (bannerVesFill) bannerVesFill.style.width = `${Math.min(100, (AppState.totalVEs / targetVEs) * 100)}%`;

    if (bannerStreakText) bannerStreakText.textContent = `${AppState.streakDays} / ${targetStreak} days`;
    if (bannerStreakFill) bannerStreakFill.style.width = `${Math.min(100, (AppState.streakDays / targetStreak) * 100)}%`;
  } else {
    // All 10 Badges Unlocked!
    if (nextTitle) nextTitle.innerHTML = `🌟 <strong>All 10 Badges Unlocked! Absolute Legend!</strong>`;
    if (nextReq) nextReq.textContent = 'You have mastered the entire VELOOP 3D Badge System.';
    if (subtext) subtext.textContent = 'Maximum tier achieved. Permanent honors recorded on chain.';
    if (bannerVesText) bannerVesText.textContent = `${AppState.totalVEs} VEs`;
    if (bannerVesFill) bannerVesFill.style.width = '100%';
    if (bannerStreakText) bannerStreakText.textContent = `${AppState.streakDays} days`;
    if (bannerStreakFill) bannerStreakFill.style.width = '100%';
  }

  // Summary Column
  const statCount = document.getElementById('stat-unlocked-count');
  const statTotal = document.getElementById('stat-total-ves');

  if (statCount) statCount.textContent = `${unlockedCount} / 10`;
  if (statTotal) statTotal.textContent = `${AppState.totalVEs} VEs`;
}

// ==========================================
// 7. UNLOCK ANIMATION & CELEBRATION TRIGGER
// ==========================================
function toggleBadgeLock(badgeId, event) {
  const badge = AppState.badges.find(b => b.id === badgeId);
  if (!badge) return;

  const nextState = !badge.unlocked;
  badge.unlocked = nextState;

  if (nextState) {
    // UNLOCK ANIMATION TRIGGER
    sounds.playFanfare();

    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;

    if (event) {
      clickX = event.clientX;
      clickY = event.clientY;
    }

    if (fx) {
      fx.burst(clickX, clickY, 80);
    }

    // Trigger in-card shockwave and 3D pop on the existing DOM card before re-render
    const cardEl = document.querySelector(`.badge-card[data-id="${badgeId}"]`);
    if (cardEl) {
      cardEl.classList.add('is-just-unlocked');

      const shockwave = document.createElement('div');
      shockwave.className = 'unlock-shockwave-ring';
      cardEl.appendChild(shockwave);

      const sheen = document.createElement('div');
      sheen.className = 'unlock-shimmer-sweep';
      cardEl.appendChild(sheen);

      const pill = document.createElement('div');
      pill.className = 'unlock-float-pill';
      pill.textContent = '✨ BADGE UNLOCKED! ✨';
      cardEl.appendChild(pill);

      const img = cardEl.querySelector('.badge-art-img');
      if (img) {
        img.src = badge.imgUnlocked;
        img.classList.add('animate-badge-unlock');
      }
    }

    // Open Grand Celebration Modal
    openCelebrationModal(badge);

    showToast(`🏆 UNLOCKED: ${badge.name} Badge (${badge.rank})!`);
  } else {
    // LOCK (RESET)
    sounds.playCoinChime();
    showToast(`${badge.name} Badge locked for testing.`, '🔒');
  }

  // Update data & UI
  setTimeout(() => {
    renderBadges();
  }, 100);
}

// Auto-check milestone unlocks based on VEs and streak
function checkMilestones() {
  AppState.badges.forEach(badge => {
    if (!badge.unlocked && AppState.totalVEs >= badge.targetVEs && AppState.streakDays >= badge.targetStreak) {
      badge.unlocked = true;
      sounds.playFanfare();
      if (fx) fx.burst(window.innerWidth / 2, window.innerHeight / 2, 80);
      openCelebrationModal(badge);
      showToast(`🎉 Milestone Reached: You unlocked ${badge.name} (${badge.rank})!`, '🏆');
    }
  });
  renderBadges();
}

// ==========================================
// 8. MODAL CONTROLLERS
// ==========================================
let currentModalBadge = null;

function openCelebrationModal(badge) {
  const modal = document.getElementById('celebration-modal');
  if (!modal) return;

  const levelTag = document.getElementById('celebration-level-tag');
  const title = document.getElementById('celebration-title');
  const rank = document.getElementById('celebration-rank');
  const img = document.getElementById('celebration-badge-img');
  const desc = document.getElementById('celebration-desc');
  const req = document.getElementById('celebration-req');

  if (levelTag) levelTag.textContent = badge.level;
  if (title) title.textContent = badge.name;
  if (rank) rank.textContent = badge.rank;
  if (img) {
    img.src = badge.imgUnlocked;
    img.classList.remove('celebration-img');
    void img.offsetWidth; // trigger reflow
    img.classList.add('celebration-img');
  }
  if (desc) desc.textContent = badge.desc;
  if (req) req.textContent = badge.req;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeCelebrationModal() {
  const modal = document.getElementById('celebration-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  sounds.playCoinChime();
  if (fx) fx.burst(window.innerWidth / 2, window.innerHeight / 2, 35);
}

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
  img.classList.remove('animate-badge-unlock');
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
  syncMilestoneUI();

  if (fx && event) fx.burst(event.clientX, event.clientY, 35, '#34d399');
  showToast(`+${rewardAmount} VEs earned from: ${questName}!`, '🎁');
  checkMilestones();
}

// ==========================================
// 9. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  fx = new ParticleFX('fx-canvas');

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

  // Badge Filter Buttons
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      AppState.activeFilter = pill.dataset.filter;
      renderBadges();
    });
  });

  // Modal Closers
  const badgeModalClose = document.getElementById('badge-modal-close');
  if (badgeModalClose) badgeModalClose.addEventListener('click', closeBadgeModal);

  const celebrationClose = document.getElementById('celebration-modal-close');
  if (celebrationClose) celebrationClose.addEventListener('click', closeCelebrationModal);

  const celebrationClaim = document.getElementById('celebration-claim-btn');
  if (celebrationClaim) celebrationClaim.addEventListener('click', closeCelebrationModal);

  const modalToggleUnlock = document.getElementById('modal-toggle-unlock-btn');
  if (modalToggleUnlock) {
    modalToggleUnlock.addEventListener('click', (e) => {
      if (currentModalBadge) {
        const id = currentModalBadge.id;
        closeBadgeModal();
        toggleBadgeLock(id, e);
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
    const celebrationModal = document.getElementById('celebration-modal');
    const questsModal = document.getElementById('quests-modal');
    if (e.target === badgeModal) closeBadgeModal();
    if (e.target === celebrationModal) closeCelebrationModal();
    if (e.target === questsModal) closeQuestsModal();
  });

  // Initial Render
  renderBadges();
});
