import React from 'react';
import './Dock.css';

export function Dock({
  isSleeping = false,
  onPet,
  onToggleRest,
  onTease,
  onOpenFeatureModal,
}) {
  return (
    <nav className="toy-dock-container" aria-label="Main action controls">
      {/* Primary Pet Action */}
      <button
        type="button"
        className="dock-card-btn dock-pet"
        onClick={onPet}
        aria-label="Pet Mallow"
      >
        <span className="dock-art-box" aria-hidden="true">♡</span>
        <div className="dock-text">
          <b>PET</b>
          <small>show some love</small>
        </div>
      </button>

      {/* Primary Rest / Nap Action */}
      <button
        type="button"
        className={`dock-card-btn dock-rest ${isSleeping ? 'active-state' : ''}`}
        onClick={onToggleRest}
        aria-label={isSleeping ? 'Wake Mallow up' : 'Put Mallow to sleep'}
      >
        <span className="dock-art-box" aria-hidden="true">☾</span>
        <div className="dock-text">
          <b>{isSleeping ? 'WAKE' : 'REST'}</b>
          <small>{isSleeping ? 'rise & shine' : 'take a nap'}</small>
        </div>
      </button>

      {/* Tease Action */}
      <button
        type="button"
        className="dock-card-btn dock-tease"
        onClick={onTease}
        aria-label="Tease Mallow"
      >
        <span className="dock-art-box" aria-hidden="true">!</span>
        <div className="dock-text">
          <b>TEASE</b>
          <small>tiny mischief</small>
        </div>
      </button>

      {/* Dock Divider */}
      <div className="dock-separator" aria-hidden="true" />

      {/* Secondary Drawer: Kitchen / Food */}
      <button
        type="button"
        className="dock-icon-btn"
        onClick={() => onOpenFeatureModal('food')}
        aria-label="Food kitchen (Phase 2 preview)"
        title="Kitchen & Feeding"
      >
        <span className="dock-icon-symbol">🍲</span>
        <span className="dock-icon-label">FOOD</span>
      </button>

      {/* Secondary Drawer: The Tiny Market */}
      <button
        type="button"
        className="dock-icon-btn"
        onClick={() => onOpenFeatureModal('shop')}
        aria-label="The Tiny Market (Phase 2 preview)"
        title="Shop & Market"
      >
        <span className="dock-icon-symbol">⌂</span>
        <span className="dock-icon-label">SHOP</span>
      </button>

      {/* Secondary Drawer: Wardrobe */}
      <button
        type="button"
        className="dock-icon-btn"
        onClick={() => onOpenFeatureModal('wardrobe')}
        aria-label="Wardrobe & Closet (Phase 2 preview)"
        title="Wardrobe"
      >
        <span className="dock-icon-symbol">✿</span>
        <span className="dock-icon-label">CLOSET</span>
      </button>
    </nav>
  );
}
