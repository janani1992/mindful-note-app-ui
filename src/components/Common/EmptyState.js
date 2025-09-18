import React from 'react';
import { Tag } from 'lucide-react';
import Button from '../UI/Button';

const EmptyState = ({ message, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
      <Tag className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-700 mb-2">No notes found</h3>
    <p className="text-slate-500 mb-4">{message}</p>
    {onAction && (
      <Button onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;