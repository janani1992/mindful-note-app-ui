import React from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { PRIORITIES } from '../../constants/priorities';
import { getRelativeTime } from '../../utils/dateUtils';
import Button from '../UI/Button';

const NoteCard = ({ note, onEdit, onDelete, onClick }) => {
  const priority = PRIORITIES[note.priority];

  return (
    <div 
      onClick={() => onClick(note)}
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 ${priority.cardBorder} group`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 flex-1">
          {note.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.color} flex items-center gap-1 ml-2`}>
          <span>{priority.emoji}</span>
          {priority.label}
        </span>
      </div>

      <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
        {note.content}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3 h-3" />
          {getRelativeTime(note.createdAt)}
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;