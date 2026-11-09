/**
 * ==========================================================================
 * NEON MORPION — GAMING ENGINE (Architecture 2-Écrans, Tactique, BGM, P2P)
 * ==========================================================================
 */

// ==========================================
// 1. CONTRÔLEUR AUDIO & MUSIQUE SYNTHWAVE
// ==========================================
class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('neon_sound_muted') === 'true';
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.bgmGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem('neon_sound_muted', this.muted);
    return !this.muted;
  }

  playSelect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playMoveX() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playMoveO() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  playVanish() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playTaunt() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.15);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  playAnnounce() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 660];
    notes.forEach((freq, idx) => {
      const start = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.14, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.2);
    });
  }

  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      const start = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.22, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.4);
    });
  }

  playDraw() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.28);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.29);
  }

  toggleBgm() {
    this.init();
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    if (!this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.bgmStep = 0;

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    this.bgmGain.connect(this.ctx.destination);

    const chords = [
      { bass: 73.42, arp: [146.83, 174.61, 220.00, 293.66] },
      { bass: 58.27, arp: [116.54, 146.83, 174.61, 233.08] },
      { bass: 65.41, arp: [130.81, 164.81, 196.00, 261.63] },
      { bass: 55.00, arp: [110.00, 130.81, 164.81, 220.00] }
    ];

    const stepDuration = 240;

    this.bgmTimer = setInterval(() => {
      if (!this.ctx || !this.bgmPlaying) return;

      const chordIdx = Math.floor(this.bgmStep / 4) % chords.length;
      const noteIdx = this.bgmStep % 4;
      const currentChord = chords[chordIdx];
      const now = this.ctx.currentTime;

      if (noteIdx === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, now);

        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(currentChord.bass, now);

        bassGain.gain.setValueAtTime(0.18, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        bassOsc.connect(filter);
        filter.connect(bassGain);
        bassGain.connect(this.bgmGain);

        bassOsc.start(now);
        bassOsc.stop(now + 0.85);
      }

      const arpFreq = currentChord.arp[noteIdx];
      const arpOsc = this.ctx.createOscillator();
      const arpGain = this.ctx.createGain();
      const arpFilter = this.ctx.createBiquadFilter();

      arpFilter.type = 'lowpass';
      arpFilter.frequency.setValueAtTime(900, now);

      arpOsc.type = 'sine';
      arpOsc.frequency.setValueAtTime(arpFreq, now);

      arpGain.gain.setValueAtTime(0.12, now);
      arpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      arpOsc.connect(arpFilter);
      arpFilter.connect(arpGain);
      arpGain.connect(this.bgmGain);

      arpOsc.start(now);
      arpOsc.stop(now + 0.24);

      this.bgmStep = (this.bgmStep + 1) % 16;
    }, stepDuration);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.bgmGain && this.ctx) {
      try {
        this.bgmGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      } catch (_) {}
    }
  }
}

// ==========================================
// 2. MOTEUR DE PARTICULES CANVAS (60 FPS FX)
// ==========================================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animating = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  spawnSparks(x, y, color = '#55f6ff', count = 22) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3.5,
        color,
        alpha: 1,
        decay: 0.025 + Math.random() * 0.025,
        gravity: 0.12
      });
    }
    this.startLoop();
  }

  spawnEvaporation(x, y, color = '#ff4fd8', count = 26) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
      const speed = 1.5 + Math.random() * 4;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 3,
        color,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02,
        gravity: -0.05
      });
    }
    this.startLoop();
  }

  spawnConfetti(count = 75) {
    const colors = ['#55f6ff', '#ff4fd8', '#ffe78a', '#ffffff', '#ff9e00'];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: w * 0.5 + (Math.random() - 0.5) * (w * 0.6),
        y: h * 0.45 + (Math.random() - 0.5) * (h * 0.3),
        vx: (Math.random() - 0.5) * 10,
        vy: -4 - Math.random() * 9,
        size: 3 + Math.random() * 4.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.012 + Math.random() * 0.014,
        gravity: 0.22
      });
    }
    this.startLoop();
  }

  startLoop() {
    if (!this.animating) {
      this.animating = true;
      requestAnimationFrame(() => this.update());
    }
  }

  update() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.globalCompositeOperation = 'lighter';

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.update());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
}

// ==========================================
// 3. SÉLECTEURS DOM & NAVIGATION ÉCRANS
// ==========================================

// Écrans
const homeScreen = document.getElementById('homeScreen');
const gameScreen = document.getElementById('gameScreen');
const startBtn = document.getElementById('startBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const homeMultiBtn = document.getElementById('homeMultiBtn');
const ruleInfoBox = document.getElementById('ruleInfoBox');

// Éléments In-Game
const boardEl = document.getElementById('board');
const stageEl = document.getElementById('stage');
const statusEl = document.getElementById('status');
const turnEl = document.getElementById('turn');
const scoreEl = document.getElementById('score');
const modeEl = document.getElementById('mode');
const modeLabel = document.getElementById('modeLabel');
const levelEl = document.getElementById('level');
const rulesEl = document.getElementById('rules');
const blitzTimerEl = document.getElementById('blitzTimer');
const skinSelect = document.getElementById('skinSelect');
const themeSelect = document.getElementById('themeSelect');
const restartBtn = document.getElementById('restart');
const resetScoreBtn = document.getElementById('resetScore');
const tabletopBtn = document.getElementById('tabletopBtn');
const tabletopStatus = document.getElementById('tabletopStatus');
const cameraBtn = document.getElementById('cameraBtn');
const video = document.getElementById('camera');
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');
const streakVal = document.getElementById('streakVal');
const streakPill = document.getElementById('streakPill');
const fxCanvas = document.getElementById('fxCanvas');

// Audio boutons (Synchronisés Home & Game)
const homeSoundToggle = document.getElementById('homeSoundToggle');
const gameSoundToggle = document.getElementById('gameSoundToggle');
const homeBgmToggle = document.getElementById('homeBgmToggle');
const gameBgmToggle = document.getElementById('gameBgmToggle');

// Home HUD
const homeStreakPill = document.getElementById('homeStreakPill');
const homeStreakVal = document.getElementById('homeStreakVal');
const homeMaxStreakVal = document.getElementById('homeMaxStreakVal');
const homeRankBadge = document.getElementById('homeRankBadge');
const homeStatsBtn = document.getElementById('homeStatsBtn');

// Chrono Blitz & Annonces
const timerWrap = document.getElementById('timerWrap');
const timerBar = document.getElementById('timerBar');
const announcerPopup = document.getElementById('announcerPopup');
const announceMain = document.getElementById('announceMain');
const announceSub = document.getElementById('announceSub');

// Modal Stats & Succès
const statsModal = document.getElementById('statsModal');
const closeStatsModal = document.getElementById('closeStatsModal');
const rankBadge = document.getElementById('rankBadge');
const rankTier = document.getElementById('rankTier');
const rankName = document.getElementById('rankName');
const rankDesc = document.getElementById('rankDesc');
const statGames = document.getElementById('statGames');
const statWins = document.getElementById('statWins');
const statWinrate = document.getElementById('statWinrate');
const statMaxStreak = document.getElementById('statMaxStreak');
const achievementsCount = document.getElementById('achievementsCount');
const achievementsGrid = document.getElementById('achievementsGrid');
const modalShareBtn = document.getElementById('modalShareBtn');
const downloadCardBtn = document.getElementById('downloadCardBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');

// Modal Multijoueur en ligne
const multiModal = document.getElementById('multiModal');
const closeMultiModal = document.getElementById('closeMultiModal');
const myRoomCode = document.getElementById('myRoomCode');
const onlineBadge = document.getElementById('onlineBadge');
const onlineStatusText = document.getElementById('onlineStatusText');
const copyInviteLinkBtn = document.getElementById('copyInviteLinkBtn');
const joinRoomInput = document.getElementById('joinRoomInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');

// Modules
const sound = new SoundController();
const fx = new ParticleSystem(fxCanvas);

// ==========================================
// 4. NAVIGATION & ÉTAT DU JEU
// ==========================================

function showScreen(screenId) {
  if (screenId === 'game') {
    homeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    sessionStorage.setItem('neon_active_screen', 'game');
  } else {
    gameScreen.classList.remove('active');
    homeScreen.classList.add('active');
    sessionStorage.setItem('neon_active_screen', 'home');
    stopBlitzTimer();
    updateStreakDisplay();
  }
}

const SKINS = {
  classic: { X: 'X', O: 'O' },
  combat:  { X: '⚔️', O: '🛡️' },
  cyber:   { X: '💀', O: '🤖' },
  cosmic:  { X: '✦', O: '🌀' },
  royal:   { X: '👑', O: '💎' }
};

let currentSkin = localStorage.getItem('neon_skin') || 'classic';

let cells = Array(9).fill('');
let turn = 'X';
let over = false;
let score = { X: 0, O: 0 };
let stream = null;
let winningLine = [];

let selectedPieceIndex = null;
let playerMoves = { X: [], O: [] };
let isTabletop = false;

// P2P WebRTC
let peer = null;
let connection = null;
let myOnlineSymbol = 'X';
let isOnlineConnected = false;
let currentRoomId = '';
let pingInterval = null;

// Chrono Blitz
let blitzInterval = null;
let blitzTimeRemaining = 0;
let blitzTotalTime = 0;

// Stats persistées
let currentStreak = parseInt(localStorage.getItem('neon_streak') || '0', 10);
let maxStreak = parseInt(localStorage.getItem('neon_max_streak') || '0', 10);
let userStats = JSON.parse(localStorage.getItem('neon_stats') || '{"games":0,"wins":0,"losses":0,"draws":0}');

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// ==========================================
// 5. SUCCÈS & RANGS ELO
// ==========================================

const ACHIEVEMENTS = [
  { id: 'first_win',   icon: '🎯', name: 'Premier Sang',   desc: 'Remporter sa première victoire' },
  { id: 'tactician',   icon: '🧠', name: 'Grand Stratège', desc: 'Gagner en Mode Tactique libre' },
  { id: 'speed_demon', icon: '⚡', name: 'Speed Demon',    desc: 'Gagner avec Chrono Blitz actif' },
  { id: 'streak_3',    icon: '🔥', name: 'En Feu',          desc: 'Série de 3 victoires d’affilée' },
  { id: 'grandmaster', icon: '👑', name: 'Cyber Légende',   desc: 'Atteindre le Rang Grandmaster' },
  { id: 'hard_bot',    icon: '🤖', name: 'Terminator',      desc: 'Battre l’IA en mode Difficile' },
  { id: 'p2p_player',  icon: '🌐', name: 'Netrunner',       desc: 'Jouer un duel en ligne P2P' },
  { id: 'flex_card',   icon: '📸', name: 'Influenceur',     desc: 'Exporter une Carte Cyber HD' }
];

let unlockedAchievements = JSON.parse(localStorage.getItem('neon_achievements') || '[]');

function unlockAchievement(id) {
  if (unlockedAchievements.includes(id)) return;

  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return;

  unlockedAchievements.push(id);
  localStorage.setItem('neon_achievements', JSON.stringify(unlockedAchievements));

  sound.playWin();
  fx.spawnConfetti(50);
  triggerShake();
  showAnnouncement('SUCCÈS DÉBLOQUÉ !', `${ach.icon} ${ach.name}`);
  showToast(`Trophée débloqué : ${ach.name} ! 🏆`);
  updateStatsModal();
}

const RANKS = [
  { minWins: 20, badge: '👑', tier: 'TIER 5', name: 'Cyber Grandmaster', desc: 'Légende absolue de l’arène néon.' },
  { minWins: 12, badge: '💎', tier: 'TIER 4', name: 'Cyber Master', desc: 'Maître incontesté des algorithmes.' },
  { minWins: 6,  badge: '🥇', tier: 'TIER 3', name: 'Neon Knight', desc: 'Combattant d’élite ultra-affûté.' },
  { minWins: 3,  badge: '🥈', tier: 'TIER 2', name: 'Grid Runner', desc: 'En pleine ascension dans la grille.' },
  { minWins: 0,  badge: '🥉', tier: 'TIER 1', name: 'Rookie Néon', desc: 'Fais tes preuves dans l’arène !' }
];

function getPlayerRank() {
  const wins = userStats.wins;
  if (currentStreak >= 5) return RANKS[0];
  return RANKS.find((r) => wins >= r.minWins) || RANKS[RANKS.length - 1];
}

function updateStatsModal() {
  const rank = getPlayerRank();
  rankBadge.textContent = rank.badge;
  rankTier.textContent = rank.tier;
  rankName.textContent = rank.name;
  rankDesc.textContent = rank.desc;

  statGames.textContent = userStats.games;
  statWins.textContent = userStats.wins;
  const winrate = userStats.games > 0 ? Math.round((userStats.wins / userStats.games) * 100) : 0;
  statWinrate.textContent = `${winrate}%`;
  statMaxStreak.textContent = maxStreak;

  achievementsCount.textContent = `${unlockedAchievements.length} / ${ACHIEVEMENTS.length}`;
  achievementsGrid.innerHTML = '';

  ACHIEVEMENTS.forEach((ach) => {
    const isUnlocked = unlockedAchievements.includes(ach.id);
    const item = document.createElement('div');
    item.className = 'achievement-item' + (isUnlocked ? ' unlocked' : '');
    item.innerHTML = `
      <div class="ach-icon">${ach.icon}</div>
      <div class="ach-info">
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.desc}</div>
      </div>
    `;
    achievementsGrid.appendChild(item);
  });
}

function showAnnouncement(main, sub) {
  announceMain.textContent = main;
  announceSub.textContent = sub;
  announcerPopup.classList.remove('show');
  void announcerPopup.offsetWidth;
  announcerPopup.classList.add('show');
  sound.playAnnounce();
}

function triggerShake() {
  stageEl.classList.remove('screen-shake');
  void stageEl.offsetWidth;
  stageEl.classList.add('screen-shake');
}

function triggerHaptic(pattern = 20) {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (_) {}
  }
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateStreakDisplay() {
  // Synchronise écran de jeu et écran d'accueil
  streakVal.textContent = currentStreak;
  homeStreakVal.textContent = currentStreak;
  homeMaxStreakVal.textContent = maxStreak;

  const rank = getPlayerRank();
  homeRankBadge.textContent = `${rank.badge} ${rank.name}`;

  if (currentStreak >= 3) {
    streakPill.classList.add('streak-hot');
    homeStreakPill.classList.add('streak-hot');
  } else {
    streakPill.classList.remove('streak-hot');
    homeStreakPill.classList.remove('streak-hot');
  }
}

function recordWin(winner) {
  userStats.games++;
  const isMe = (modeEl.value === 'online' && winner === myOnlineSymbol) || (modeEl.value !== 'online' && winner === 'X');

  if (isMe) {
    userStats.wins++;
    currentStreak++;
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      localStorage.setItem('neon_max_streak', maxStreak);
    }

    unlockAchievement('first_win');
    if (rulesEl.value === 'tactical') unlockAchievement('tactician');
    if (parseInt(blitzTimerEl.value, 10) > 0) unlockAchievement('speed_demon');
    if (currentStreak >= 3) unlockAchievement('streak_3');
    if (getPlayerRank().tier === 'TIER 5') unlockAchievement('grandmaster');
    if (modeEl.value === 'ai' && levelEl.value === 'hard') unlockAchievement('hard_bot');

    if (currentStreak === 3) showAnnouncement('STREAK x3 !', 'TU ES EN FEU 🔥');
    if (currentStreak === 5) showAnnouncement('DOMINANCE !', 'RANG CYBER GRANDMASTER 👑');
  } else {
    userStats.losses++;
    if (modeEl.value === 'ai' || modeEl.value === 'online') currentStreak = 0;
  }

  localStorage.setItem('neon_stats', JSON.stringify(userStats));
  localStorage.setItem('neon_streak', currentStreak);
  updateStreakDisplay();
}

function recordDraw() {
  userStats.games++;
  userStats.draws++;
  localStorage.setItem('neon_stats', JSON.stringify(userStats));
  updateStreakDisplay();
}

// ==========================================
// 6. MOTEUR DU CHRONO BLITZ
// ==========================================

function startBlitzTimer() {
  stopBlitzTimer();
  const seconds = parseInt(blitzTimerEl.value, 10);
  if (seconds <= 0 || over) {
    timerWrap.classList.remove('active');
    return;
  }

  timerWrap.classList.add('active');
  blitzTotalTime = seconds;
  blitzTimeRemaining = seconds;
  timerBar.classList.remove('urgent');
  timerBar.style.width = '100%';

  const intervalStepMs = 50;
  blitzInterval = setInterval(() => {
    blitzTimeRemaining -= intervalStepMs / 1000;
    const progress = Math.max(0, (blitzTimeRemaining / blitzTotalTime) * 100);
    timerBar.style.width = `${progress}%`;

    if (blitzTimeRemaining <= 1.5 && !timerBar.classList.contains('urgent')) {
      timerBar.classList.add('urgent');
      sound.playTick();
    }

    if (blitzTimeRemaining <= 0) {
      stopBlitzTimer();
      handleBlitzTimeout();
    }
  }, intervalStepMs);
}

function stopBlitzTimer() {
  if (blitzInterval) {
    clearInterval(blitzInterval);
    blitzInterval = null;
  }
}

function handleBlitzTimeout() {
  if (over) return;
  showAnnouncement("TIME'S UP !", `COUP FORCÉ POUR ${turn}`);
  triggerShake();

  if (modeEl.value === 'online' && turn !== myOnlineSymbol) return;

  const currentPieces = cells.map((v, i) => (v === turn ? i : null)).filter((v) => v !== null);

  if (rulesEl.value === 'tactical' && currentPieces.length === 3) {
    const randomFrom = currentPieces[Math.floor(Math.random() * currentPieces.length)];
    const emptyCells = cells.map((v, i) => (v ? null : i)).filter((v) => v !== null);
    if (emptyCells.length > 0) {
      const randomTo = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      executeTacticalMove(randomFrom, randomTo);
    }
    return;
  }

  const available = cells.map((v, i) => (v ? null : i)).filter((v) => v !== null);
  if (available.length > 0) {
    const randomMove = available[Math.floor(Math.random() * available.length)];
    handleCellClick(randomMove, null);
  }
}

// ==========================================
// 7. MULTIJOUEUR EN LIGNE (P2P WebRTC)
// ==========================================

function initPeer() {
  if (peer) return;

  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  currentRoomId = randomCode;
  const peerId = `neon-morp-${randomCode}`;

  try {
    peer = new Peer(peerId, { debug: 1 });
  } catch (err) {
    showToast('Erreur initialisation WebRTC.');
    return;
  }

  peer.on('open', () => {
    myRoomCode.textContent = currentRoomId;
    onlineStatusText.textContent = "En attente d'un adversaire... ⏳";
    onlineBadge.classList.remove('connected');
  });

  peer.on('connection', (conn) => {
    setupConnection(conn, 'X');
  });

  peer.on('error', (err) => {
    if (err.type === 'unavailable-id') {
      peer.destroy();
      peer = null;
      setTimeout(initPeer, 500);
    } else {
      showToast('Connexion P2P indisponible.');
    }
  });
}

function joinRoom(targetCode) {
  const code = targetCode.trim().toUpperCase();
  if (!code) return;

  initPeer();

  showToast(`Connexion au salon ${code}...`);
  onlineStatusText.textContent = `Recherche du salon ${code}...`;

  const conn = peer.connect(`neon-morp-${code}`);
  setupConnection(conn, 'O');
}

function setupConnection(conn, symbol) {
  connection = conn;
  myOnlineSymbol = symbol;

  conn.on('open', () => {
    isOnlineConnected = true;
    modeEl.value = 'online';
    modeLabel.textContent = `En ligne (${myOnlineSymbol})`;
    onlineBadge.classList.add('connected');
    onlineStatusText.textContent = `Connecté ! Vous êtes ${myOnlineSymbol}`;

    unlockAchievement('p2p_player');

    showAnnouncement('ADVERSAIRE CONNECTÉ !', `VOUS ÊTES LE JOUEUR ${myOnlineSymbol}`);
    sound.playWin();
    triggerShake();

    setTimeout(() => {
      multiModal.classList.remove('open');
      showScreen('game');
    }, 1200);

    newGame(false);
    startPing();
  });

  conn.on('data', (data) => {
    handleRemoteMessage(data);
  });

  conn.on('close', () => {
    isOnlineConnected = false;
    stopPing();
    modeEl.value = 'ai';
    modeLabel.textContent = 'vs IA';
    showAnnouncement('DÉCONNECTÉ', 'Adversaire a quitté la partie');
    showToast("L'adversaire s'est déconnecté.");
  });
}

function sendPeerMessage(msg) {
  if (connection && connection.open) {
    connection.send(msg);
  }
}

function handleRemoteMessage(msg) {
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case 'move':
      handleCellClick(msg.index, null, true);
      break;

    case 'move_tactical':
      executeTacticalMove(msg.from, msg.to, true);
      break;

    case 'taunt':
      spawnFloatingEmoji(msg.emoji);
      break;

    case 'newGame':
      rulesEl.value = msg.rules;
      blitzTimerEl.value = msg.blitz;
      newGame(false);
      showAnnouncement('REVANCHE !', 'NOUVELLE PARTIE LANCÉE');
      break;

    case 'ping':
      sendPeerMessage({ type: 'pong', time: msg.time });
      break;

    case 'pong':
      const latency = Math.round((Date.now() - msg.time) / 2);
      modeLabel.textContent = `P2P 🟢 ${latency}ms`;
      break;
  }
}

function startPing() {
  stopPing();
  pingInterval = setInterval(() => {
    if (connection && connection.open) {
      sendPeerMessage({ type: 'ping', time: Date.now() });
    }
  }, 4000);
}

function stopPing() {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }
}

// ==========================================
// 8. LOGIQUE DE JEU, MODE TACTIQUE & GHOST
// ==========================================

function checkWinner(board = cells) {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }

  if (rulesEl.value === 'classic' && board.every(Boolean)) {
    return { player: 'draw', line: [] };
  }

  return null;
}

function say(html) {
  statusEl.innerHTML = html;
  if (isTabletop) {
    tabletopStatus.innerHTML = html;
  }
}

function render() {
  boardEl.innerHTML = '';

  const isTactical = rulesEl.value === 'tactical';
  const playerPiecesCount = cells.filter((v) => v === turn).length;
  const isMovePhase = isTactical && playerPiecesCount === 3;

  const oldestX = rulesEl.value === 'ghost' && playerMoves.X.length === 3 ? playerMoves.X[0] : null;
  const oldestO = rulesEl.value === 'ghost' && playerMoves.O.length === 3 ? playerMoves.O[0] : null;

  const symX = SKINS[currentSkin]?.X || 'X';
  const symO = SKINS[currentSkin]?.O || 'O';

  cells.forEach((val, index) => {
    const btn = document.createElement('button');
    btn.className = 'cell' + (val ? ` ${val.toLowerCase()}` : '');

    if (winningLine.includes(index)) {
      btn.classList.add('win');
    }

    if ((index === oldestX && turn === 'X') || (index === oldestO && turn === 'O')) {
      btn.classList.add('ghost-warning');
    }

    if (isMovePhase && !over) {
      if (val === turn) {
        if (index === selectedPieceIndex) {
          btn.classList.add('selected');
        } else {
          btn.classList.add('selectable');
        }
      } else if (!val && selectedPieceIndex !== null) {
        btn.classList.add('target-cell');
      }
    }

    btn.textContent = val === 'X' ? symX : val === 'O' ? symO : '';
    btn.setAttribute('aria-label', `Case ${index + 1}${val ? ', ' + val : ''}`);

    const isAiTurn = modeEl.value === 'ai' && turn === 'O';
    const isOnlineLocked = modeEl.value === 'online' && turn !== myOnlineSymbol;
    btn.disabled = over || isAiTurn || isOnlineLocked;

    btn.addEventListener('click', (e) => handleCellClick(index, e, false));
    boardEl.appendChild(btn);
  });

  const curSymbol = turn === 'X' ? symX : symO;
  turnEl.textContent = over ? '—' : curSymbol;
  if (modeEl.value === 'two') modeLabel.textContent = isTabletop ? 'Tabletop 180°' : '2 joueurs';
  else if (modeEl.value === 'ai') modeLabel.textContent = 'vs IA';
  scoreEl.textContent = `${score.X} — ${score.O}`;
}

function finish() {
  const result = checkWinner();
  if (!result) return false;

  over = true;
  stopBlitzTimer();
  selectedPieceIndex = null;
  winningLine = result.line;

  const symWinner = result.player ? (result.player === 'X' ? SKINS[currentSkin]?.X : SKINS[currentSkin]?.O) : '';

  if (result.player === 'draw') {
    sound.playDraw();
    say('Égalité ! <span class="accent">Bien joué à tous les deux.</span>');
    recordDraw();
  } else {
    sound.playWin();
    triggerShake();
    triggerHaptic([40, 60, 100]);
    fx.spawnConfetti();

    score[result.player]++;
    recordWin(result.player);

    const isMe = modeEl.value === 'online' ? result.player === myOnlineSymbol : result.player === 'X';
    const title = isMe ? `Victoire Explosive (${symWinner}) ! 🏆` : `Victoire du joueur ${symWinner} !`;
    say(`${title}`);
  }

  render();
  return true;
}

function executeTacticalMove(fromIndex, toIndex, fromRemote = false) {
  if (over || !cells[fromIndex] || cells[toIndex]) return;

  const movingPlayer = cells[fromIndex];

  if (modeEl.value === 'online' && !fromRemote) {
    sendPeerMessage({ type: 'move_tactical', from: fromIndex, to: toIndex });
  }

  const fromEl = boardEl.children[fromIndex];
  if (fromEl) {
    const fromRect = fromEl.getBoundingClientRect();
    fx.spawnEvaporation(fromRect.left + fromRect.width / 2, fromRect.top + fromRect.height / 2);
  }

  const toEl = boardEl.children[toIndex];
  if (toEl) {
    const toRect = toEl.getBoundingClientRect();
    const color = movingPlayer === 'X'
      ? getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim()
      : getComputedStyle(document.documentElement).getPropertyValue('--pink').trim();
    fx.spawnSparks(toRect.left + toRect.width / 2, toRect.top + toRect.height / 2, color);
  }

  cells[fromIndex] = '';
  cells[toIndex] = movingPlayer;
  selectedPieceIndex = null;

  if (movingPlayer === 'X') sound.playMoveX();
  else sound.playMoveO();
  triggerHaptic(20);

  if (finish()) return;

  turn = turn === 'X' ? 'O' : 'X';
  render();

  const symTurn = turn === 'X' ? SKINS[currentSkin]?.X : SKINS[currentSkin]?.O;
  const isMyTurnOnline = modeEl.value === 'online' && turn === myOnlineSymbol;
  if (modeEl.value === 'online') {
    say(isMyTurnOnline ? `À vous de jouer, joueur <span class="accent">${symTurn}</span> !` : `En attente du joueur <span class="accent">${symTurn}</span>...`);
  } else {
    const pCount = cells.filter((v) => v === turn).length;
    if (rulesEl.value === 'tactical' && pCount === 3) {
      say(`Au joueur <span class="accent">${symTurn}</span> : choisis un pion à déplacer.`);
    } else {
      say(`Au joueur <span class="accent">${symTurn}</span> de jouer.`);
    }
  }

  startBlitzTimer();

  if (modeEl.value === 'ai' && turn === 'O') {
    setTimeout(aiTurn, 340);
  }
}

function handleCellClick(index, event, fromRemote = false) {
  if (over) return;

  if (modeEl.value === 'online' && !fromRemote && turn !== myOnlineSymbol) {
    return;
  }

  const isTactical = rulesEl.value === 'tactical';
  const playerPiecesCount = cells.filter((v) => v === turn).length;
  const symTurn = turn === 'X' ? SKINS[currentSkin]?.X : SKINS[currentSkin]?.O;

  if (isTactical && playerPiecesCount === 3) {
    if (cells[index] === turn) {
      selectedPieceIndex = index;
      sound.playSelect();
      triggerHaptic(14);
      render();
      say(`Pion <span class="accent">${symTurn}</span> sélectionné. Choisis une case vide où le déplacer.`);
      return;
    }

    if (selectedPieceIndex !== null && !cells[index]) {
      executeTacticalMove(selectedPieceIndex, index, fromRemote);
      return;
    }

    if (selectedPieceIndex === null && !cells[index]) {
      say(`⚠️ <span class="accent">Sélectionne d'abord</span> un de tes pions pour le déplacer !`);
      triggerHaptic(12);
      return;
    }

    return;
  }

  if (cells[index]) return;

  const rect = event ? event.currentTarget.getBoundingClientRect() : (boardEl.children[index] ? boardEl.children[index].getBoundingClientRect() : null);
  const clickX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const clickY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

  if (modeEl.value === 'online' && !fromRemote) {
    sendPeerMessage({ type: 'move', index });
  }

  if (turn === 'X') {
    sound.playMoveX();
    fx.spawnSparks(clickX, clickY, getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim());
    triggerHaptic(18);
  } else {
    sound.playMoveO();
    fx.spawnSparks(clickX, clickY, getComputedStyle(document.documentElement).getPropertyValue('--pink').trim());
    triggerHaptic(18);
  }

  if (rulesEl.value === 'ghost') {
    const currentQueue = playerMoves[turn];

    if (currentQueue.length >= 3) {
      const vanishedIndex = currentQueue.shift();
      cells[vanishedIndex] = '';

      const oldCellEl = boardEl.children[vanishedIndex];
      if (oldCellEl) {
        const oldRect = oldCellEl.getBoundingClientRect();
        fx.spawnEvaporation(oldRect.left + oldRect.width / 2, oldRect.top + oldRect.height / 2);
      }
      sound.playVanish();
      showAnnouncement('GHOSTED !', 'PIÈCE DÉSINTÉGRÉE ⚡');
    }

    currentQueue.push(index);
  }

  cells[index] = turn;

  if (finish()) return;

  turn = turn === 'X' ? 'O' : 'X';
  render();

  const nextSym = turn === 'X' ? SKINS[currentSkin]?.X : SKINS[currentSkin]?.O;
  const isMyTurnOnline = modeEl.value === 'online' && turn === myOnlineSymbol;
  if (modeEl.value === 'online') {
    say(isMyTurnOnline ? `À vous de jouer, joueur <span class="accent">${nextSym}</span> !` : `En attente du joueur <span class="accent">${nextSym}</span>...`);
  } else {
    const nextPlayerCount = cells.filter((v) => v === turn).length;
    if (rulesEl.value === 'tactical' && nextPlayerCount === 3) {
      say(`Au joueur <span class="accent">${nextSym}</span> : choisis un pion à déplacer.`);
    } else {
      say(`Au joueur <span class="accent">${nextSym}</span> de jouer.`);
    }
  }

  startBlitzTimer();

  if (modeEl.value === 'ai' && turn === 'O') {
    setTimeout(aiTurn, 320);
  }
}

// ==========================================
// 9. IA TACTIQUE & MINIMAX
// ==========================================

function aiTurn() {
  if (over) return;

  const isTactical = rulesEl.value === 'tactical';
  const aiPieces = cells.map((v, i) => (v === 'O' ? i : null)).filter((v) => v !== null);

  if (isTactical && aiPieces.length === 3) {
    const bestTactical = getBestTacticalMove('O');
    if (bestTactical) {
      executeTacticalMove(bestTactical.from, bestTactical.to, false);
      return;
    }
  }

  let move;
  if (rulesEl.value === 'classic') {
    if (levelEl.value === 'hard') {
      move = bestMove(cells, 'O').index;
    } else {
      const empty = cells.map((v, i) => (v ? null : i)).filter((v) => v !== null);
      const winMove = findWinning(cells, 'O') ?? findWinning(cells, 'X');
      move = winMove !== null ? winMove : empty[Math.floor(Math.random() * empty.length)];
    }
  } else if (rulesEl.value === 'ghost') {
    move = getGhostAiMove();
  } else {
    const winMove = findWinning(cells, 'O') ?? findWinning(cells, 'X');
    if (winMove !== null) move = winMove;
    else if (!cells[4]) move = 4;
    else {
      const corners = [0, 2, 6, 8].filter((i) => !cells[i]);
      move = corners.length > 0 ? corners[Math.floor(Math.random() * corners.length)] : cells.findIndex((v) => !v);
    }
  }

  if (move === undefined || move === null || move === -1) return;

  const targetBtn = boardEl.children[move];
  handleCellClick(move, { currentTarget: targetBtn }, false);

  if (Math.random() < 0.2) {
    setTimeout(() => spawnFloatingEmoji('💀'), 400);
  }
}

function getBestTacticalMove(player) {
  const opponent = player === 'O' ? 'X' : 'O';
  const myPieces = cells.map((v, i) => (v === player ? i : null)).filter((v) => v !== null);
  const emptyCells = cells.map((v, i) => (v ? null : i)).filter((v) => v !== null);

  for (const from of myPieces) {
    for (const to of emptyCells) {
      cells[from] = '';
      cells[to] = player;
      const w = checkWinner(cells);
      cells[from] = player;
      cells[to] = '';

      if (w && w.player === player) {
        return { from, to };
      }
    }
  }

  for (const from of myPieces) {
    for (const to of emptyCells) {
      cells[from] = '';
      cells[to] = player;

      let opponentCanWin = false;
      const oppPieces = cells.map((v, i) => (v === opponent ? i : null)).filter((v) => v !== null);
      const remainingEmpty = cells.map((v, i) => (v ? null : i)).filter((v) => v !== null);

      for (const oppFrom of oppPieces) {
        for (const oppTo of remainingEmpty) {
          cells[oppFrom] = '';
          cells[oppTo] = opponent;
          const oppWin = checkWinner(cells);
          cells[oppFrom] = opponent;
          cells[oppTo] = '';

          if (oppWin && oppWin.player === opponent) {
            opponentCanWin = true;
            break;
          }
        }
        if (opponentCanWin) break;
      }

      cells[from] = player;
      cells[to] = '';

      if (!opponentCanWin) {
        return { from, to };
      }
    }
  }

  for (const from of myPieces) {
    if (emptyCells.includes(4) && from !== 4) {
      return { from, to: 4 };
    }
  }

  const randomFrom = myPieces[Math.floor(Math.random() * myPieces.length)];
  const randomTo = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return { from: randomFrom, to: randomTo };
}

function findWinning(board, player) {
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = player;
      const w = checkWinner(board);
      board[i] = '';
      if (w && w.player === player) return i;
    }
  }
  return null;
}

function bestMove(board, player) {
  const res = checkWinner(board);
  if (res) {
    return { score: res.player === 'O' ? 10 : res.player === 'X' ? -10 : 0 };
  }

  const choices = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = player;
      const nextScore = bestMove(board, player === 'O' ? 'X' : 'O').score;
      board[i] = '';
      choices.push({ index: i, score: nextScore });
    }
  }

  if (player === 'O') {
    return choices.reduce((best, curr) => (curr.score > best.score ? curr : best));
  }
  return choices.reduce((best, curr) => (curr.score < best.score ? curr : best));
}

function getGhostAiMove() {
  const simulatedBoard = [...cells];
  if (playerMoves.O.length >= 3) {
    simulatedBoard[playerMoves.O[0]] = '';
  }

  const win = findWinning(simulatedBoard, 'O');
  if (win !== null) return win;

  const simulatedBoardX = [...cells];
  if (playerMoves.X.length >= 3) {
    simulatedBoardX[playerMoves.X[0]] = '';
  }
  const block = findWinning(simulatedBoardX, 'X');
  if (block !== null && !cells[block]) return block;

  if (!cells[4]) return 4;

  const corners = [0, 2, 6, 8].filter((i) => !cells[i]);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  const available = cells.map((v, i) => (v ? null : i)).filter((v) => v !== null);
  return available[Math.floor(Math.random() * available.length)];
}

// ==========================================
// 10. TAUNTS & ÉMOJIS EN DIRECT
// ==========================================

function spawnFloatingEmoji(emoji) {
  sound.playTaunt();
  triggerHaptic(25);

  const emojiEl = document.createElement('div');
  emojiEl.className = 'floating-emoji';
  emojiEl.textContent = emoji;
  stageEl.appendChild(emojiEl);

  setTimeout(() => emojiEl.remove(), 1250);
}

document.querySelectorAll('.taunt-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const emoji = btn.dataset.emoji;
    spawnFloatingEmoji(emoji);

    if (modeEl.value === 'online') {
      sendPeerMessage({ type: 'taunt', emoji });
    }
  });
});

// ==========================================
// 11. EXPORT DE CARTE CYBER HD (CANVAS 1080x1080)
// ==========================================

function exportCyberCard() {
  unlockAchievement('flex_card');

  const rank = getPlayerRank();
  const winrate = userStats.games > 0 ? Math.round((userStats.wins / userStats.games) * 100) : 0;
  const symX = SKINS[currentSkin]?.X || 'X';
  const symO = SKINS[currentSkin]?.O || 'O';

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createRadialGradient(540, 200, 50, 540, 540, 750);
  bgGrad.addColorStop(0, '#172750');
  bgGrad.addColorStop(0.5, '#090d20');
  bgGrad.addColorStop(1, '#050710');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.strokeStyle = '#55f6ff';
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 40, 1000, 1000);

  ctx.strokeStyle = '#ff4fd8';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 55, 970, 970);

  ctx.fillStyle = '#55f6ff';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('AR PLAYGROUND · CYBER DOSSIER', 540, 140);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 90px sans-serif';
  ctx.fillText('NEON MORPION', 540, 240);

  ctx.font = '120px sans-serif';
  ctx.fillText(rank.badge, 540, 390);

  ctx.fillStyle = '#ffe78a';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(`${rank.tier} — ${rank.name}`, 540, 470);

  const statsY = 540;
  const boxWidth = 210;
  const boxHeight = 160;
  const gap = 30;
  const startX = 540 - (boxWidth * 4 + gap * 3) / 2;

  const stats = [
    { label: 'PARTIES', val: userStats.games },
    { label: 'VICTOIRES', val: userStats.wins },
    { label: 'WINRATE', val: `${winrate}%` },
    { label: 'STREAK MAX', val: `🔥 ${maxStreak}` }
  ];

  stats.forEach((s, i) => {
    const x = startX + i * (boxWidth + gap);
    ctx.fillStyle = 'rgba(18, 28, 57, 0.85)';
    ctx.strokeStyle = '#55f6ff55';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(x, statsY, boxWidth, boxHeight, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px sans-serif';
    ctx.fillText(s.val, x + boxWidth / 2, statsY + 75);

    ctx.fillStyle = '#9db2db';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(s.label, x + boxWidth / 2, statsY + 125);
  });

  const gridStartX = 390;
  const gridStartY = 740;
  const cellSize = 100;

  ctx.strokeStyle = '#53668e88';
  ctx.lineWidth = 4;
  for (let r = 1; r < 3; r++) {
    ctx.beginPath();
    ctx.moveTo(gridStartX, gridStartY + r * cellSize);
    ctx.lineTo(gridStartX + 300, gridStartY + r * cellSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gridStartX + r * cellSize, gridStartY);
    ctx.lineTo(gridStartX + r * cellSize, gridStartY + 300);
    ctx.stroke();
  }

  cells.forEach((val, idx) => {
    if (!val) return;
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const cx = gridStartX + col * cellSize + cellSize / 2;
    const cy = gridStartY + row * cellSize + cellSize / 2 + 25;

    ctx.fillStyle = val === 'X' ? '#55f6ff' : '#ff4fd8';
    ctx.font = '850 70px sans-serif';
    ctx.fillText(val === 'X' ? symX : symO, cx, cy);
  });

  ctx.fillStyle = '#cad5f0';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('DÉFIE-MOI SUR NEON MORPION', 540, 1010);

  const a = document.createElement('a');
  a.download = `neon-morpion-${rank.name.toLowerCase().replace(/\s+/g, '-')}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();

  showToast('Carte Cyber HD générée et téléchargée ! 📸');
}

// ==========================================
// 12. CYCLE DE VIE & ÉVÉNEMENTS
// ==========================================

function newGame(broadcast = true) {
  stopBlitzTimer();
  cells = Array(9).fill('');
  playerMoves = { X: [], O: [] };
  selectedPieceIndex = null;
  turn = 'X';
  over = false;
  winningLine = [];
  render();

  const symTurn = turn === 'X' ? SKINS[currentSkin]?.X : SKINS[currentSkin]?.O;

  if (modeEl.value === 'online') {
    say(myOnlineSymbol === 'X' ? `À vous de commencer, joueur <span class="accent">${symTurn}</span> !` : `En attente du premier coup de <span class="accent">${symTurn}</span>...`);
    if (broadcast) {
      sendPeerMessage({
        type: 'newGame',
        rules: rulesEl.value,
        blitz: blitzTimerEl.value
      });
    }
  } else {
    say(`Au joueur <span class="accent">${symTurn}</span> de commencer.`);
  }

  startBlitzTimer();
}

function resetScore() {
  score = { X: 0, O: 0 };
  currentStreak = 0;
  localStorage.setItem('neon_streak', '0');
  updateStreakDisplay();
  newGame();
  showToast('Scores et séries réinitialisés !');
}

// Navigation Écrans (Start & Back)
startBtn.addEventListener('click', () => {
  sound.init();
  sound.playAnnounce();
  showScreen('game');
  newGame(true);
});

backToMenuBtn.addEventListener('click', () => {
  if (!over && cells.some(Boolean)) {
    const confirmLeave = window.confirm('Une partie est en cours. Veux-tu vraiment revenir aux réglages ?');
    if (!confirmLeave) return;
  }
  showScreen('home');
});

homeMultiBtn.addEventListener('click', () => {
  initPeer();
  multiModal.classList.add('open');
});

// Boutons In-Game
restartBtn.addEventListener('click', () => newGame(true));
resetScoreBtn.addEventListener('click', resetScore);

tabletopBtn.addEventListener('click', () => {
  isTabletop = !isTabletop;
  stageEl.classList.toggle('tabletop-active', isTabletop);
  tabletopBtn.classList.toggle('primary', isTabletop);
  tabletopBtn.textContent = isTabletop ? '✓ Table ON' : '🔄 Table 180°';
  render();
  say(`Au joueur <span class="accent">${turn === 'X' ? SKINS[currentSkin]?.X : SKINS[currentSkin]?.O}</span> de jouer.`);
  showToast(isTabletop ? 'Mode Tabletop actif (180°) 📱' : 'Mode normal restauré');
});

modeEl.addEventListener('change', () => {
  if (modeEl.value === 'two') {
    tabletopBtn.style.display = 'inline-flex';
  } else {
    tabletopBtn.style.display = 'none';
    isTabletop = false;
    stageEl.classList.remove('tabletop-active');
  }

  if (modeEl.value === 'online') {
    initPeer();
    multiModal.classList.add('open');
  } else {
    if (connection) {
      connection.close();
      connection = null;
    }
  }
});

rulesEl.addEventListener('change', () => {
  const chosenRule = rulesEl.value;
  if (chosenRule === 'tactical') {
    ruleInfoBox.innerHTML = `<strong>Règle Tactique :</strong> Pose tes 3 pions, puis choisis librement lequel déplacer vers n'importe quelle case vide. Stratégie pure !`;
  } else if (chosenRule === 'ghost') {
    ruleInfoBox.innerHTML = `<strong>Règle Infini Ghost :</strong> 3 pions max par joueur. Poser le 4ème pion fait disparaître le 1er (qui clignote). 0 match nul !`;
  } else {
    ruleInfoBox.innerHTML = `<strong>Règle Classique :</strong> Morpion 9 cases traditionnel. Aligne 3 symboles identiques pour remporter la victoire.`;
  }
  showToast(`Règle : ${rulesEl.options[rulesEl.selectedIndex].text}`);
});

blitzTimerEl.addEventListener('change', () => {
  showToast(`Chrono Blitz : ${blitzTimerEl.options[blitzTimerEl.selectedIndex].text}`);
});

skinSelect.addEventListener('change', (e) => {
  currentSkin = e.target.value;
  localStorage.setItem('neon_skin', currentSkin);
  render();
  showToast(`Skin : ${skinSelect.options[skinSelect.selectedIndex].text}`);
});

levelEl.addEventListener('change', () => {
  if (modeEl.value === 'ai') newGame();
});

themeSelect.addEventListener('change', (e) => {
  const chosen = e.target.value;
  document.documentElement.dataset.theme = chosen;
  localStorage.setItem('neon_theme', chosen);
  showToast(`Thème : ${themeSelect.options[themeSelect.selectedIndex].text}`);
});

// Synchronisation des boutons Audio (Home & Game)
function syncSoundUI(isEnabled) {
  document.querySelectorAll('.sound-icon').forEach((el) => {
    el.textContent = isEnabled ? '🔊' : '🔇';
  });
  document.querySelectorAll('.sound-text').forEach((el) => {
    el.textContent = isEnabled ? 'SFX ON' : 'SFX OFF';
  });
}

function syncBgmUI(isBgmOn) {
  document.querySelectorAll('.bgm-icon').forEach((el) => {
    el.textContent = isBgmOn ? '🎵' : '🔇';
  });
  document.querySelectorAll('.bgm-text').forEach((el) => {
    el.textContent = isBgmOn ? 'Musique ON' : 'Musique OFF';
  });
  [homeBgmToggle, gameBgmToggle].forEach((btn) => {
    if (btn) btn.classList.toggle('active-music', isBgmOn);
  });
}

function handleSoundToggle() {
  sound.init();
  const isEnabled = sound.toggle();
  syncSoundUI(isEnabled);
  showToast(isEnabled ? 'Effets sonores activés ! 🔊' : 'SFX coupés 🔇');
}

function handleBgmToggle() {
  sound.init();
  const isBgmOn = sound.toggleBgm();
  syncBgmUI(isBgmOn);
  showToast(isBgmOn ? 'Musique Synthwave Lo-Fi lancée ! 🎵' : 'Musique en pause 🔇');
}

homeSoundToggle.addEventListener('click', handleSoundToggle);
gameSoundToggle.addEventListener('click', handleSoundToggle);

homeBgmToggle.addEventListener('click', handleBgmToggle);
gameBgmToggle.addEventListener('click', handleBgmToggle);

// Modals
closeMultiModal.addEventListener('click', () => multiModal.classList.remove('open'));
multiModal.addEventListener('click', (e) => {
  if (e.target === multiModal) multiModal.classList.remove('open');
});

copyInviteLinkBtn.addEventListener('click', async () => {
  const inviteUrl = `${window.location.origin}${window.location.pathname}#room=${currentRoomId}`;
  try {
    await navigator.clipboard.writeText(inviteUrl);
    showToast('Lien copié ! Envoie-le à ton adversaire 📋');
  } catch (_) {
    showToast(`Code salon : ${currentRoomId}`);
  }
});

joinRoomBtn.addEventListener('click', () => {
  const code = joinRoomInput.value.trim().toUpperCase();
  if (code) joinRoom(code);
  else showToast('Entre un code de salon valide.');
});

homeStatsBtn.addEventListener('click', () => {
  updateStatsModal();
  statsModal.classList.add('open');
});

closeStatsModal.addEventListener('click', () => statsModal.classList.remove('open'));
statsModal.addEventListener('click', (e) => {
  if (e.target === statsModal) statsModal.classList.remove('open');
});

downloadCardBtn.addEventListener('click', exportCyberCard);

resetStatsBtn.addEventListener('click', () => {
  userStats = { games: 0, wins: 0, losses: 0, draws: 0 };
  currentStreak = 0;
  maxStreak = 0;
  unlockedAchievements = [];
  localStorage.setItem('neon_stats', JSON.stringify(userStats));
  localStorage.setItem('neon_streak', '0');
  localStorage.setItem('neon_max_streak', '0');
  localStorage.setItem('neon_achievements', '[]');
  updateStatsModal();
  updateStreakDisplay();
  showToast('Profil, statistiques et succès réinitialisés !');
});

// Partage
shareBtn.addEventListener('click', shareScore);
modalShareBtn.addEventListener('click', shareScore);

async function shareScore() {
  const rank = getPlayerRank();
  const winrate = userStats.games > 0 ? Math.round((userStats.wins / userStats.games) * 100) : 0;
  const shareText = `🎮 NEON MORPION\nMon Rang : ${rank.badge} ${rank.name}\n🏆 Succès : ${unlockedAchievements.length}/${ACHIEVEMENTS.length} | 🔥 Streak : ${maxStreak} | Winrate : ${winrate}%\nViens tester :`;
  const shareUrl = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'NEON MORPION — Cyberpunk Arcade',
        text: shareText,
        url: shareUrl
      });
      return;
    } catch (_) {}
  }

  try {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    showToast('Rang copié dans le presse-papier ! 🔥');
  } catch (_) {
    showToast('Partage indisponible sur ce navigateur.');
  }
}

// Caméra AR
cameraBtn.addEventListener('click', async () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
    video.srcObject = null;
    document.body.classList.remove('camera-on');
    cameraBtn.textContent = '◎ Caméra AR';
    return;
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });
    video.srcObject = stream;
    await video.play();
    document.body.classList.add('camera-on');
    cameraBtn.textContent = '✕ Couper caméra';
  } catch (err) {
    say('Caméra indisponible ou permission refusée.');
  }
});

// ==========================================
// 13. CHARGEMENT INITIAL & PWA
// ==========================================

function initApp() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  const savedTheme = localStorage.getItem('neon_theme') || 'cyber';
  document.documentElement.dataset.theme = savedTheme;
  themeSelect.value = savedTheme;

  currentSkin = localStorage.getItem('neon_skin') || 'classic';
  skinSelect.value = currentSkin;

  syncSoundUI(!sound.muted);
  syncBgmUI(false);

  updateStreakDisplay();

  // Restauration de l'écran actif en cas de rechargement/rafraîchissement
  const savedScreen = sessionStorage.getItem('neon_active_screen');
  if (savedScreen === 'game') {
    showScreen('game');
    render();
  } else {
    showScreen('home');
  }

  // Détection URL #room= pour connexion P2P directe
  const hash = window.location.hash;
  if (hash.startsWith('#room=')) {
    const inviteCode = hash.replace('#room=', '').trim();
    if (inviteCode) {
      showScreen('game');
      setTimeout(() => joinRoom(inviteCode), 600);
    }
  }
}

initApp();
