import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteEditor
 * Editor for the currently selected note. Supports title and content editing with debounced save.
 */
export default function NoteEditor({ note, onChange }) {
  /** This is a public function. */
  const [draft, setDraft] = useState(note || { title: '', content: '' });

  useEffect(() => {
    setDraft(note || { title: '', content: '' });
  }, [note?.id]);

  // Debounce saving
  useEffect(() => {
    if (!note) return;
    const handle = setTimeout(() => {
      if (draft.title !== note.title || draft.content !== note.content) {
        onChange(draft);
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [draft.title, draft.content]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!note) return null;

  return (
    <div className="editor">
      <input
        className="editor-title"
        placeholder="Title"
        value={draft.title || ''}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />
      <textarea
        className="editor-content"
        placeholder="Start typing your note..."
        value={draft.content || ''}
        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
      />
    </div>
  );
}
