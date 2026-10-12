import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { Habitat } from './components/Habitat/Habitat';
import { Dock } from './components/Dock/Dock';
import { FeaturePreviewModal } from './components/Overlays/FeaturePreviewModal';
import { useSound } from './hooks/useSound';
import { INITIAL_PET_STATE, DIALOGUES } from './constants/petState';
import './styles/global.css';
import './App.css';

export default function App() {
  const [stats, setStats] = useState(INITIAL_PET_STATE);
  const [mood, setMood] = useState('normal'); // 'normal' | 'delighted' | 'pouting' | 'sleeping'
  const [visualState, setVisualState] = useState('idle'); // 'idle' | 'bouncing' | 'wobbling' | 'sleeping'
  const [dialogue, setDialogue] = useState(DIALOGUES.normal[0]);
  const [isSleeping, setIsSleeping] = useState(false);
  const [particles, setParticles] = useState([]);
  const [modalFeature, setModalFeature] = useState(null);

  const tapHistoryRef = useRef([]);
  const moodTimerRef = useRef(null);

  const { playPet, playTease, playSleep, playClick } = useSound(stats.soundEnabled);

  // Helper to pick random dialogue from a category
  const pickDialogue = useCallback((category) => {
    const list = DIALOGUES[category] || DIALOGUES.normal;
    return list[Math.floor(Math.random() * list.length)];
  }, []);

  // Spawn visual floating particle (heart, zzz, spark)
  const spawnParticle = useCallback((type, count = 1) => {
    const newItems = Array.from({ length: count }, (_, i) => ({
      id: `${Date.now()}-${Math.random()}-${i}`,
      type,
      x: (Math.random() - 0.5) * 60, // scatter horizontally
    }));
    setParticles((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)));
    }, 1800);
  }, []);

  // Set transient mood & visual state with timer
  const triggerTransientState = useCallback((nextMood, nextVisual, nextDialogue, duration = 1500) => {
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
    setMood(nextMood);
    setVisualState(nextVisual);
    if (nextDialogue) setDialogue(nextDialogue);

    moodTimerRef.current = setTimeout(() => {
      if (isSleeping) {
        setMood('sleeping');
        setVisualState('sleeping');
        setDialogue(pickDialogue('sleepy'));
      } else {
        setMood('normal');
        setVisualState('idle');
        setDialogue(pickDialogue('normal'));
      }
    }, duration);
  }, [isSleeping, pickDialogue]);

  // Direct Petting Interaction (Handles normal gentle pet vs rapid annoyance)
  const handlePet = useCallback(() => {
    const now = Date.now();
    tapHistoryRef.current = tapHistoryRef.current.filter((t) => now - t < 1300);
    tapHistoryRef.current.push(now);

    // If sleeping, wake up softly
    if (isSleeping) {
      setIsSleeping(false);
      playPet();
      spawnParticle('heart', 2);
      triggerTransientState('delighted', 'bouncing', "✦ Yawwn... that was a very sweet wake-up pat!", 1600);
      return;
    }

    // Rapid repeated tapping: triggered when clicked > 3 times in 1.3s
    if (tapHistoryRef.current.length > 3) {
      playTease();
      spawnParticle('spark', 2);
      setStats((prev) => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - 2),
      }));
      triggerTransientState('pouting', 'wobbling', pickDialogue('teased'), 1800);
      return;
    }

    // Normal gentle petting
    playPet();
    spawnParticle('heart', 3);
    setStats((prev) => {
      const nextAffection = Math.min(100, prev.affection + 2);
      const nextHappiness = Math.min(100, prev.happiness + 3);
      const nextBond = prev.bond + 1;
      const nextLevel = Math.min(9, Math.floor(nextBond / 20) + 1);
      const nextCoins = prev.bond % 5 === 0 ? prev.coins + 1 : prev.coins;

      return {
        ...prev,
        affection: nextAffection,
        happiness: nextHappiness,
        bond: nextBond,
        level: nextLevel,
        coins: nextCoins,
      };
    });

    triggerTransientState('delighted', 'bouncing', pickDialogue('happy'), 1400);
  }, [isSleeping, playPet, playTease, spawnParticle, triggerTransientState, pickDialogue]);

  // Tease Interaction
  const handleTease = useCallback(() => {
    playTease();
    spawnParticle('spark', 2);
    setStats((prev) => ({
      ...prev,
      happiness: Math.max(0, prev.happiness - 4),
      affection: Math.max(0, prev.affection - 1),
    }));
    triggerTransientState('pouting', 'wobbling', pickDialogue('teased'), 1700);
  }, [playTease, spawnParticle, triggerTransientState, pickDialogue]);

  // Rest / Nap Toggle
  const handleToggleRest = useCallback(() => {
    if (moodTimerRef.current) clearTimeout(moodTimerRef.current);

    if (!isSleeping) {
      // Put to sleep
      setIsSleeping(true);
      setMood('sleeping');
      setVisualState('sleeping');
      setDialogue(pickDialogue('sleepy'));
      playSleep();
      spawnParticle('zzz', 2);

      // Periodically spawn zzz while sleeping
      setStats((prev) => ({
        ...prev,
        energy: Math.min(100, prev.energy + 15),
      }));
    } else {
      // Wake up
      setIsSleeping(false);
      setMood('normal');
      setVisualState('idle');
      setDialogue("Mallow is fully refreshed and ready to wiggle!");
      playPet();
      spawnParticle('heart', 2);
    }
  }, [isSleeping, playSleep, playPet, spawnParticle, pickDialogue]);

  // Cycle dialogue on speech bubble click
  const handleCycleDialogue = useCallback(() => {
    playClick();
    const cat = isSleeping ? 'sleepy' : mood === 'pouting' ? 'teased' : mood === 'delighted' ? 'happy' : 'normal';
    setDialogue(pickDialogue(cat));
  }, [isSleeping, mood, playClick, pickDialogue]);

  // Click on condition chip
  const handleChipClick = useCallback((chipKey) => {
    playClick();
    if (chipKey === 'hunger') {
      setDialogue(stats.hunger > 60 ? "I can hear the food bowl calling my name..." : "Hunger is fine! But I won't say no to snacks.");
    } else if (chipKey === 'energy') {
      setDialogue(stats.energy < 30 ? "Tiny eyelids are heavy... REST is looking very cozy." : "Full of bounce and marshmallow energy!");
    } else if (chipKey === 'affection') {
      setDialogue("Every pat adds a little shimmer to Mallow's heart.");
    } else if (chipKey === 'mood') {
      setDialogue(`Current status: ${mood.toUpperCase()}! Very important mood.`);
    }
  }, [stats, mood, playClick]);

  // Sound toggle
  const handleToggleSound = useCallback(() => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  // Spawning occasional Zzz while sleeping
  useEffect(() => {
    if (!isSleeping) return;
    const interval = setInterval(() => {
      spawnParticle('zzz', 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [isSleeping, spawnParticle]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalFeature) return;
      const key = e.key.toLowerCase();
      if (key === 'p' || key === ' ') {
        e.preventDefault();
        handlePet();
      } else if (key === 'r') {
        e.preventDefault();
        handleToggleRest();
      } else if (key === 't') {
        e.preventDefault();
        handleTease();
      } else if (key === 'm') {
        e.preventDefault();
        handleToggleSound();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalFeature, handlePet, handleToggleRest, handleTease, handleToggleSound]);

  return (
    <div className="app-viewport">
      {/* Subtle Ambient Dust Layer */}
      <div className="ambient-dust" aria-hidden="true" />

      {/* Retro Top Header & HUD */}
      <Header
        level={stats.level}
        coins={stats.coins}
        soundEnabled={stats.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenHelp={() => setModalFeature('help')}
      />

      {/* Main Cozy Stage / Habitat Scene */}
      <main className="main-stage-wrapper">
        <Habitat
          stats={stats}
          mood={mood}
          dialogue={dialogue}
          onCycleDialogue={handleCycleDialogue}
          onChipClick={handleChipClick}
          onPetMallow={handlePet}
          visualState={visualState}
          particles={particles}
          isSleeping={isSleeping}
        />
      </main>

      {/* Bottom Tactile Action Dock */}
      <Dock
        isSleeping={isSleeping}
        onPet={handlePet}
        onToggleRest={handleToggleRest}
        onTease={handleTease}
        onOpenFeatureModal={(key) => setModalFeature(key)}
      />

      {/* Footer status line */}
      <footer className="toy-footer-status">
        Mallow's Little World ✦ React prototype · <span>Click Mallow or press P to pet</span>
      </footer>

      {/* Feature Preview Modal for Kitchen, Market & Wardrobe */}
      <FeaturePreviewModal
        featureKey={modalFeature}
        onClose={() => setModalFeature(null)}
      />
    </div>
  );
}
