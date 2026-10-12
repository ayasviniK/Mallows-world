import React from 'react';
import { Scenery } from './Scenery';
import { ConditionChips } from './ConditionChips';
import { ThoughtBubble } from './ThoughtBubble';
import { Mallow } from '../Creature/Mallow';
import './Habitat.css';

export function Habitat({
  stats,
  mood,
  dialogue,
  onCycleDialogue,
  onChipClick,
  onPetMallow,
  visualState,
  particles,
  isSleeping,
}) {
  return (
    <section className="habitat-container" aria-label="Mallow's cozy room habitat">
      {/* Ambient Lighting Gradient */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Cozy Nook Scenery (Window, Shelf, Rug, Props) */}
      <Scenery />

      {/* Floating Condition Indicators */}
      <ConditionChips
        stats={stats}
        mood={mood}
        onChipClick={onChipClick}
      />

      {/* Speech Bubble */}
      <ThoughtBubble
        text={dialogue}
        onClick={onCycleDialogue}
      />

      {/* Creature Zone */}
      <div className="habitat-creature-zone">
        <Mallow
          visualState={visualState}
          onPet={onPetMallow}
          particles={particles}
          isSleeping={isSleeping}
        />
      </div>
    </section>
  );
}
