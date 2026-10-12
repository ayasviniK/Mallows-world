import React from 'react';
import './Mallow.css';

export function Mallow({
  visualState = 'idle',
  onPet,
  particles = [],
  isSleeping = false,
}) {
  const getAnimationClass = () => {
    if (isSleeping) return 'state-sleeping';
    if (visualState === 'bouncing') return 'state-bouncing';
    if (visualState === 'wobbling') return 'state-wobbling';
    return 'state-idle';
  };

  return (
    <div className="mallow-stage" onClick={onPet} role="button" tabIndex={0} aria-label="Pet Mallow directly">
      <div className="mallow-tap-hint">
        {isSleeping ? 'shh... sleeping ☾' : 'tap to pet ✦'}
      </div>

      <div className="mallow-touch-area">
        {/* Shadow */}
        <div className="mallow-shadow" aria-hidden="true" />

        {/* Character Container */}
        <div className={`mallow-body-wrap ${getAnimationClass()}`}>
          {/* Tail */}
          <div className="mallow-tail" aria-hidden="true" />

          {/* Ears with staggered twitches */}
          <div className="mallow-ear ear-left" aria-hidden="true">
            <div className="mallow-ear-inner" />
          </div>
          <div className="mallow-ear ear-right" aria-hidden="true">
            <div className="mallow-ear-inner" />
          </div>

          {/* Feet */}
          <div className="mallow-foot foot-left" aria-hidden="true" />
          <div className="mallow-foot foot-right" aria-hidden="true" />

          {/* Main squishy body */}
          <div className="mallow-core" aria-hidden="true">
            <div className="mallow-belly" />
          </div>

          {/* Face elements */}
          <div className="mallow-face" aria-hidden="true">
            {/* Expressive Eyes */}
            <div className="mallow-eye eye-left">
              <span className="eye-sparkle-main" />
              <span className="eye-sparkle-sub" />
            </div>
            <div className="mallow-eye eye-right">
              <span className="eye-sparkle-main" />
              <span className="eye-sparkle-sub" />
            </div>

            {/* Rosy Cheeks */}
            <div className="mallow-cheek cheek-left" />
            <div className="mallow-cheek cheek-right" />

            {/* Snout with sweet mouth */}
            <div className="mallow-snout">
              <div className="mallow-nose" />
              <div className="mallow-mouth" />
            </div>
          </div>

          {/* Tiny Paws */}
          <div className="mallow-paw paw-left" aria-hidden="true" />
          <div className="mallow-paw paw-right" aria-hidden="true" />
        </div>

        {/* Floating Particles (Hearts, Zzz, Sparks) */}
        <div className="particle-emitter" aria-hidden="true">
          {particles.map((p) => {
            if (p.type === 'heart') {
              return (
                <span key={p.id} className="heart-particle" style={{ left: `${p.x}px` }}>
                  ♥
                </span>
              );
            }
            if (p.type === 'zzz') {
              return (
                <span key={p.id} className="zzz-particle" style={{ left: `${p.x}px` }}>
                  z
                </span>
              );
            }
            if (p.type === 'spark') {
              return (
                <span key={p.id} className="spark-particle" style={{ left: `${p.x}px` }}>
                  ✦
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
