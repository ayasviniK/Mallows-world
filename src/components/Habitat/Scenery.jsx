import React from 'react';

export function Scenery() {
  return (
    <div className="scenery-layer" aria-hidden="true">
      {/* Fairy Lights */}
      <div className="fairy-lights">
        <div className="fairy-wire" />
        <span className="fairy-bulb bulb-butter" />
        <span className="fairy-bulb bulb-strawberry" />
        <span className="fairy-bulb bulb-mint" />
        <span className="fairy-bulb bulb-lavender" />
        <span className="fairy-bulb bulb-butter" />
      </div>

      {/* Moon Window */}
      <div className="scenery-window">
        <div className="window-moon">☾</div>
        <div className="window-cloud" />
        <span className="window-star star-1">✦</span>
        <span className="window-star star-2">·</span>
        <div className="window-frame-cross-v" />
        <div className="window-frame-cross-h" />
      </div>

      {/* Wooden Hanging Shelf */}
      <div className="scenery-shelf">
        <div className="shelf-plant">
          <div className="plant-leaf leaf-1" />
          <div className="plant-leaf leaf-2" />
          <div className="plant-leaf leaf-3" />
          <div className="plant-pot" />
        </div>
        <div className="shelf-jar">✦</div>
      </div>

      {/* Wall Note */}
      <div className="wall-note">
        be kind to<br />small things ♡
      </div>

      {/* Floor & Planks */}
      <div className="scenery-floor">
        <div className="floor-plank plank-1" />
        <div className="floor-plank plank-2" />

        {/* Scalloped Plush Rug */}
        <div className="cozy-rug">
          <span className="rug-star">✦</span>
          <span className="rug-star">·</span>
          <span className="rug-star">✧</span>
        </div>

        {/* Bowl Prop */}
        <div className="food-bowl-prop">
          <span className="bowl-steam">☁</span>
          <span>♡</span>
        </div>

        {/* Star Toy */}
        <div className="toy-star-prop">★</div>
      </div>
    </div>
  );
}
