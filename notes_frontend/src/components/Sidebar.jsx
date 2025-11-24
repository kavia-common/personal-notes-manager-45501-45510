import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Renders the list of notes with selection and deletion.
 */
export default function Sidebar({ notes, selectedId, onSelect, onDelete }) {
  /** This is a public function. */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="muted">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
      </div>
      <div className="notes-list" role="list">
        {notes.map((n) => (
          <button
            key={n.id}
            role="listitem"
            className={`note-list-item ${selectedId === n.id ? 'active' : ''}`}
            onClick={() => onSelect(n.id)}
            title={n.title || 'Untitled'}
          >
            <div className="note-list-item-content">
              <div className="note-title">{n.title || 'Untitled'}</div>
              <div className="note-snippet">{(n.content || '').slice(0, 80) || 'No content yet'}</div>
            </div>
            <div className="note-list-item-actions">
              <button
                className="btn btn-icon btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(n.id);
                }}
                aria-label={`Delete ${n.title || 'note'}`}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </button>
        ))}
        {notes.length === 0 && <div className="empty-list muted">No notes yet</div>}
      </div>
    </aside>
  );
}
