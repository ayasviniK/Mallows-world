import React from 'react';
import { MOOD_CONFIG } from '../../constants/petState';

export function ConditionChips({
  stats,
  mood = 'normal',
  onChipClick,
}) {
  const currentMoodConfig = MOOD_CONFIG[mood] || MOOD_CONFIG.normal;

  return (
    <div className="condition-ring" aria-label="Mallow's condition indicators">
      {/* Mood Badge (Top Center) */}
      <button
        type="button"
        className="condition-pill pill-mood"
        onClick={() => onChipClick('mood')}
        aria-label={`Mood: ${currentMoodConfig.label}`}
      >
        <span
          className="mood-badge-dot"
          style={{ background: currentMoodConfig.badgeColor }}
        />
        <span className="mood-badge-text">{currentMoodConfig.label}</span>
      </button>

      {/* Hunger Pill */}
      <button
        type="button"
        className="condition-pill pill-hunger"
        onClick={() => onChipClick('hunger')}
        aria-label={`Hunger: ${Math.round(stats.hunger)} percent`}
      >
        <div className="pill-icon-wrap">♡</div>
        <div className="pill-info">
          <div className="pill-header">
            <span className="pill-label">Hunger</span>
            <span className="pill-value">{Math.round(stats.hunger)}</span>
          </div>
          <div className="pill-progress-bar">
            <div
              className="pill-progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, stats.hunger))}%` }}
            />
          </div>
        </div>
      </button>

      {/* Energy Pill */}
      <button
        type="button"
        className="condition-pill pill-energy"
        onClick={() => onChipClick('energy')}
        aria-label={`Energy: ${Math.round(stats.energy)} percent`}
      >
        <div className="pill-icon-wrap">☾</div>
        <div className="pill-info">
          <div className="pill-header">
            <span className="pill-label">Energy</span>
            <span className="pill-value">{Math.round(stats.energy)}</span>
          </div>
          <div className="pill-progress-bar">
            <div
              className="pill-progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, stats.energy))}%` }}
            />
          </div>
        </div>
      </button>

      {/* Affection Pill */}
      <button
        type="button"
        className="condition-pill pill-affection"
        onClick={() => onChipClick('affection')}
        aria-label={`Affection: ${Math.round(stats.affection)} percent`}
      >
        <div className="pill-icon-wrap">♥</div>
        <div className="pill-info">
          <div className="pill-header">
            <span className="pill-label">Love</span>
            <span className="pill-value">{Math.round(stats.affection)}</span>
          </div>
          <div className="pill-progress-bar">
            <div
              className="pill-progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, stats.affection))}%` }}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
