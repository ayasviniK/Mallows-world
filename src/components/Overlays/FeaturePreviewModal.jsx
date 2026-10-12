import React, { useEffect } from 'react';
import './FeaturePreviewModal.css';

const FEATURE_DATA = {
  food: {
    badge: 'Phase 2 Architecture Ready',
    title: "Mallow's Kitchen",
    subtitle: 'Warm snacks, preferences & eating rituals',
    icon: '🍲',
    content: (
      <>
        <p>
          The feeding tray module is planned for Phase 2:
        </p>
        <ul>
          <li><strong>Warm Bowl</strong> (everyday meal), <strong>Strawberry</strong> (rare favorite treat), <strong>Moon Cookie</strong>, and <strong>Sparkle Treat</strong>.</li>
          <li><strong>Preference Discovery</strong> system: Mallow learns their favorite foods, unlocking unique journal memories.</li>
          <li><strong>Real-time Meal Windows</strong>: Bonus rewards for breakfast, afternoon snack, and dinner times.</li>
          <li><strong>Locked Eating Animation</strong>: Mallow munches happily with dynamic mouth chewing sprites!</li>
        </ul>
      </>
    )
  },
  shop: {
    badge: 'Phase 2 Architecture Ready',
    title: 'The Tiny Market',
    subtitle: 'Cozy accessories and room decorations',
    icon: '⌂',
    content: (
      <>
        <p>
          The marketplace module is planned for Phase 2:
        </p>
        <ul>
          <li><strong>Wearable Treasures</strong>: Berry Beanie, Blush Bow, Tiny Crown, Jelly Glasses, and Almost Halo.</li>
          <li><strong>Cozy Habitat Decor</strong>: Soft cloud pillows and room items.</li>
          <li><strong>Economy & Affordability</strong>: Earning coins through daily care and bond milestones.</li>
        </ul>
      </>
    )
  },
  wardrobe: {
    badge: 'Phase 2 Architecture Ready',
    title: "Mallow's Wardrobe",
    subtitle: 'Dress up & unlockable coat skins',
    icon: '✿',
    content: (
      <>
        <p>
          The wardrobe and appearance studio is planned for Phase 2:
        </p>
        <ul>
          <li><strong>Live Character Dress-Up</strong>: Equip and unequip owned accessories onto the new sprite.</li>
          <li><strong>Rare Skin Transformations</strong>: Lavender (Original), Moonbeam (Bond Level 3), and Golden Mallow (Bond Level 5 + Strawberry Discovery).</li>
          <li><strong>Interactive Mini Preview</strong>: Try on outfits before leaving the closet!</li>
        </ul>
      </>
    )
  },
  help: {
    badge: 'Prototype Phase 1 Status',
    title: "Mallow's Little World (React)",
    subtitle: 'Prototype design & creature interaction',
    icon: '✦',
    content: (
      <>
        <p>
          Welcome to the new React + Vite rebuild prototype:
        </p>
        <ul>
          <li><strong>Adorable Creature Redesign</strong>: Squishy mochi cat silhouette, dual eye reflections, twitching ears, rosy blush, and bouncy animations.</li>
          <li><strong>Touch & Click Interactions</strong>: Direct pet, gentle nap mode with floating Zzz's, and teasing with funny dramatic pouts.</li>
          <li><strong>Pure Web Audio Synthesizer</strong>: Pleasant retro chimes with zero external audio assets.</li>
          <li><strong>Isolated Environment</strong>: Fresh game state running independently in <code>mallow-react/</code> without touching existing saves.</li>
        </ul>
      </>
    )
  }
};

export function FeaturePreviewModal({ featureKey, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!featureKey) return null;
  const data = FEATURE_DATA[featureKey] || FEATURE_DATA.help;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <span className="modal-badge">{data.badge}</span>

        <div className="modal-title-row">
          <div className="modal-feature-icon" aria-hidden="true">{data.icon}</div>
          <div>
            <h2 id="modal-title">{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>
        </div>

        <div className="modal-body-content">
          {data.content}
        </div>

        <button type="button" className="modal-action-btn" onClick={onClose}>
          Got it! Continue Playing ✦
        </button>
      </div>
    </div>
  );
}
