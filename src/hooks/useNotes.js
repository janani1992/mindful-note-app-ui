import { useState, useEffect, useCallback } from 'react';
import { noteService } from '../services/noteService';

export const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadNotes = useCallback(async (sortByPriority = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await noteService.getAllNotes(sortByPriority);
      setNotes(data);
    } catch (err) {
      console.error('Error loading notes:', err);
      setError('Failed to load notes. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (noteData) => {
    try {
      await noteService.createNote(noteData);
      await loadNotes();
      return { success: true };
    } catch (err) {
      console.error('Error creating note:', err);
      return { success: false, error: 'Failed to create note' };
    }
  }, [loadNotes]);

  const updateNote = useCallback(async (id, noteData) => {
    try {
      await noteService.updateNote(id, noteData);
      await loadNotes();
      return { success: true };
    } catch (err) {
      console.error('Error updating note:', err);
      return { success: false, error: 'Failed to update note' };
    }
  }, [loadNotes]);

  const deleteNote = useCallback(async (id) => {
    try {
      await noteService.deleteNote(id);
      await loadNotes();
      return { success: true };
    } catch (err) {
      console.error('Error deleting note:', err);
      return { success: false, error: 'Failed to delete note' };
    }
  }, [loadNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote
  };
}