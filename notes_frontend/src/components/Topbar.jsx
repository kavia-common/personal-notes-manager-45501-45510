import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Topbar
 * Application top navigation bar with create note action and theme toggle.
 */
export default function Topbar({ onNewNote, theme, onToggleTheme }) {
  /** This is a public function. */
  return (
    <div className="topbar">
      <div className="brand">
        <span className="brand-icon">🗒️</span>
        <span className="brand-title">Ocean Notes</span>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-primary" onClick={onNewNote} aria-label="Create note">
          + New note
        </button>
        <button className="btn btn-ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  );
}
