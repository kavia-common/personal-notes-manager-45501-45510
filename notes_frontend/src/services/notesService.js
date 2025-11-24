/**
 * Notes service encapsulating CRUD against Supabase.
 * Table: notes
 * Columns:
 *  - id: uuid (primary key)
 *  - title: text
 *  - content: text
 *  - created_at: timestamp with time zone (default now())
 *  - updated_at: timestamp with time zone (default now())
 */

import { getSupabaseClient } from '../lib/supabaseClient';

const TABLE = 'notes';

/**
 * PUBLIC_INTERFACE
 * listNotes
 * Fetch all notes ordered by updated_at desc.
 */
export async function listNotes() {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * PUBLIC_INTERFACE
 * getNote
 * Fetch a single note by id.
 */
export async function getNote(id) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * createNote
 * Create a new note with optional title/content.
 */
export async function createNote({ title = 'Untitled', content = '' } = {}) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ title, content, created_at: now, updated_at: now }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * updateNote
 * Update note fields by id.
 */
export async function updateNote(id, { title, content }) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * deleteNote
 * Delete a note by id.
 */
export async function deleteNote(id) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return true;
}
