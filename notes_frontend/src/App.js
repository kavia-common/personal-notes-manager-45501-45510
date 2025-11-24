import React, { useEffect, useState } from 'react';
import './App.css';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import EmptyState from './components/EmptyState';
import { listNotes, createNote, updateNote, deleteNote, getNote } from './services/notesService';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main application component. It wires the Supabase-backed notes CRUD
   * with a two-pane layout (sidebar + editor) and ocean professional styling.
   */

  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  // Apply theme on root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Initial load
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const items = await listNotes();
        setNotes(items);
        if (items.length > 0) setSelectedId(items[0].id);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle light/dark themes. */
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNewNote = async () => {
    setBusy(true);
    try {
      const newNote = await createNote({ title: 'Untitled', content: '' });
      // Prepend new note
      setNotes((prev) => [newNote, ...prev]);
      setSelectedId(newNote.id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert('Failed to create note. Check console for details.');
    } finally {
      setBusy(false);
    }
  };

  const handleSelect = async (id) => {
    setSelectedId(id);
    // Ensure we have the freshest note
    try {
      const latest = await getNote(id);
      setNotes((prev) => prev.map((n) => (n.id === id ? latest : n)));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    setBusy(true);
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedId === id) {
        setSelectedId((prev) => {
          const remaining = notes.filter((n) => n.id !== id);
          return remaining.length ? remaining[0].id : null;
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert('Failed to delete note.');
    } finally {
      setBusy(false);
    }
  };

  const handleChange = async (draft) => {
    if (!selectedNote) return;
    try {
      const updated = await updateNote(selectedNote.id, {
        title: draft.title ?? '',
        content: draft.content ?? '',
      });
      // Move the updated note to the top
      setNotes((prev) => {
        const others = prev.filter((n) => n.id !== updated.id);
        return [updated, ...others];
      });
      setSelectedId(updated.id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <div className="App">
      <div className="app-shell">
        <Topbar onNewNote={handleNewNote} theme={theme} onToggleTheme={toggleTheme} />
        <div className="main">
          <Sidebar
            notes={notes}
            selectedId={selectedId}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
          <div className="editor-wrap">
            <div className="editor-card">
              {loading ? (
                <div className="empty-state">
                  <div className="empty-illustration">⏳</div>
                  <p className="muted">Loading notes...</p>
                </div>
              ) : notes.length === 0 ? (
                <EmptyState onCreate={handleNewNote} />
              ) : selectedNote ? (
                <NoteEditor note={selectedNote} onChange={handleChange} />
              ) : (
                <EmptyState onCreate={handleNewNote} />
              )}
            </div>
            {busy && (
              <div className="muted" style={{ paddingTop: 8 }}>
                Working...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
