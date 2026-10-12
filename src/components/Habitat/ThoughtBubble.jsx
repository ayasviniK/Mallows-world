import React from 'react';

export function ThoughtBubble({ text, onClick }) {
  return (
    <div
      className="thought-bubble-container"
      onClick={onClick}
      role="status"
      aria-live="polite"
      title="Click to hear another thought"
    >
      <div className="thought-bubble-card">
        <span>{text}</span>
        <div className="thought-bubble-tail" aria-hidden="true" />
      </div>
    </div>
  );
}
