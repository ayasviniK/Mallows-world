import { useRef, useCallback } from 'react';

export function useSound(soundEnabled = true) {
  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playNotes = useCallback((notes, type = 'sine', duration = 0.1, gainVal = 0.04) => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * (duration * 0.85);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }, [soundEnabled, getAudioContext]);

  const playPet = useCallback(() => {
    // Happy soft sparkle chime (C5 -> E5 -> G5)
    playNotes([523.25, 659.25, 783.99], 'triangle', 0.12, 0.05);
  }, [playNotes]);

  const playTease = useCallback(() => {
    // Playful boop / pout (A3 -> F3)
    playNotes([220.00, 174.61], 'square', 0.09, 0.025);
  }, [playNotes]);

  const playSleep = useCallback(() => {
    // Cozy gentle lullaby descent
    playNotes([440.00, 392.00, 329.63, 261.63], 'sine', 0.22, 0.035);
  }, [playNotes]);

  const playClick = useCallback(() => {
    // Subtle crisp UI tap
    playNotes([780], 'triangle', 0.04, 0.02);
  }, [playNotes]);

  return { playPet, playTease, playSleep, playClick };
}
