import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState
 * Shown when there are no notes or none selected.
 */
export default function EmptyState({ onCreate }) {
  /** This is a public function. */
  return (
    <div className="empty-state">
      <div className="empty-illustration">🌊</div>
      <h2>Welcome to Ocean Notes</h2>
      <p className="muted">Create your first note to get started.</p>
      <button className="btn btn-primary btn-large" onClick={onCreate}>
        + Create a note
      </button>
    </div>
  );
}
