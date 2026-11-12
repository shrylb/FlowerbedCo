import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playChime: () => void;
  playCartChime: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: true,
  toggleSound: () => {},
  playChime: () => {},
  playCartChime: () => {},
});

let audioCtx: AudioContext | null = null;
let lastChimeTime = 0;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function playSynthesizedChime(volume: number = 0.045) {
  const now = performance.now();
  if (now - lastChimeTime < 45) return;
  lastChimeTime = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  // Delicate boutique botanical chords: G5 (783.99Hz), C6 (1046.5Hz), E6 (1318.5Hz)
  const frequencies = [783.99, 1046.5, 1318.5];

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t + idx * 0.02);

    // Ultra-soft envelope: 4ms smooth linear attack, gentle exponential decay
    gain.gain.setValueAtTime(0.0001, t + idx * 0.02);
    gain.gain.linearRampToValueAtTime(volume / (idx + 1), t + idx * 0.02 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.02 + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t + idx * 0.02);
    osc.stop(t + idx * 0.02 + 0.32);
  });
}

function playSynthesizedCartChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  // Ascending celebratory chord: E5, G5, C6, E6
  const notes = [659.25, 783.99, 1046.5, 1318.5];

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t + idx * 0.04);

    gain.gain.setValueAtTime(0.0001, t + idx * 0.04);
    gain.gain.linearRampToValueAtTime(0.04, t + idx * 0.04 + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.04 + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t + idx * 0.04);
    osc.stop(t + idx * 0.04 + 0.42);
  });
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Enabled by default as requested by user ("play the chime sound everytime a button is clicked, users can opt to mute")
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('flowerbed_sound_enabled');
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('flowerbed_sound_enabled', String(next));
      } catch {
        // localStorage unavailable
      }
      if (next) {
        // Play confirming chime when unmuting
        playSynthesizedChime(0.05);
      }
      return next;
    });
  }, []);

  const playChime = useCallback(() => {
    if (!soundEnabled) return;
    playSynthesizedChime();
  }, [soundEnabled]);

  const playCartChime = useCallback(() => {
    if (!soundEnabled) return;
    playSynthesizedCartChime();
  }, [soundEnabled]);

  // Global click interceptor: Every button / interactive clickable plays the chime
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!soundEnabled) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest<HTMLElement>(
        'button, [role="button"], a[href], input[type="submit"], input[type="button"], [data-clickable="true"]'
      );

      if (!clickable) return;

      // Skip elements that explicitly opt out or the mute toggle button itself
      if (
        clickable.getAttribute('data-sound') === 'none' ||
        clickable.getAttribute('data-sound-toggle') === 'true'
      ) {
        return;
      }

      playSynthesizedChime();
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [soundEnabled]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playChime, playCartChime }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
