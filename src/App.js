import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Calendar, Tag } from 'lucide-react';

// Simple inline version without external files
const API_BASE = 'http://localhost:8080/api';

const PRIORITIES = {
  LOW: { emoji: '🟢', color: 'bg-green-100 text-green-800' },
  MEDIUM: { emoji: '🟡', color: 'bg-yellow-100 text-yellow-800' },
  HIGH: { emoji: '🔴', color: 'bg-red-100 text-red-800' },
  URGENT: { emoji: '🚨', color: 'bg-red-200 text-red-900' }
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '', priority: 'MEDIUM' });

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/notes`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to load notes');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async () => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ title: '', content: '', priority: 'MEDIUM' });
        loadNotes();
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (response.ok) loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            📝 Note App
          </h1>
          <p className="text-xl text-slate-600">Organize your thoughts with priority</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                    placeholder="Enter note title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
                    placeholder="Write your note..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  >
                    <option value="LOW">🟢 Low</option>
                    <option value="MEDIUM">🟡 Medium</option>
                    <option value="HIGH">🔴 High</option>
                    <option value="URGENT">🚨 Urgent</option>
                  </select>
                </div>

                <button
                  onClick={createNote}
                  disabled={!formData.title || !formData.content}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  Create Note
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No notes yet</h3>
                <p className="text-slate-500">Create your first note to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map(note => {
                  const priority = PRIORITIES[note.priority];
                  const date = new Date(note.createdAt).toLocaleDateString();
                  
                  return (
                    <div key={note.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-400">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex-1">{note.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.color} ml-2`}>
                          {priority.emoji} {note.priority}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-4 line-clamp-3">{note.content}</p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {date}
                        </div>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}