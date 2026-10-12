import React from 'react';
import './Header.css';

export function Header({
  level = 1,
  coins = 30,
  soundEnabled = true,
  onToggleSound,
  onOpenHelp,
}) {
  return (
    <header className="toy-header">
      <div className="wordmark">
        <div className="wordmark-sprite" aria-hidden="true">✦</div>
        <div className="wordmark-title-block">
          <strong>Mallow's <i>Little World</i></strong>
          <small>A cozy sanctuary for a very important little creature</small>
        </div>
      </div>

      <div className="hud-group" aria-label="Game stats and toggles">
        {/* Level badge */}
        <div className="hud-chip" title="Bond Level">
          <span className="hud-icon icon-level" aria-hidden="true">★</span>
          <div className="hud-details">
            <small>LVL</small>
            <b>{level}</b>
          </div>
        </div>

        {/* Coins badge */}
        <div className="hud-chip" title="Coins">
          <span className="hud-icon icon-coin" aria-hidden="true">●</span>
          <div className="hud-details">
            <small>COINS</small>
            <b>{coins}</b>
          </div>
        </div>

        {/* Sound Toggle */}
        <button
          type="button"
          className="round-hud-btn"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
        >
          {soundEnabled ? '♫' : '×'}
        </button>

        {/* Help / Prototype Info button */}
        <button
          type="button"
          className="round-hud-btn"
          onClick={onOpenHelp}
          aria-label="About this prototype"
          title="About this prototype"
        >
          ?
        </button>
      </div>
    </header>
  );
}
