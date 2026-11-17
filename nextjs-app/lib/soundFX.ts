class SoundFX {
  private ctx: AudioContext | null = null;

  private init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCoinChime() {
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
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;

    // Celebratory arpeggio + triumphant final chord
    const arpeggio = [
      { note: 523.25, time: 0.00 }, // C5
      { note: 659.25, time: 0.08 }, // E5
      { note: 783.99, time: 0.16 }, // G5
      { note: 1046.50, time: 0.25 }, // C6
    ];

    const finalChord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major triumph chord

    // Play arpeggio
    arpeggio.forEach(({ note, time }) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + time;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });

    // Play triumphant sustained chord
    finalChord.forEach((freq) => {
      if (!this.ctx) return;
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
  }
}

export const sounds = new SoundFX();
