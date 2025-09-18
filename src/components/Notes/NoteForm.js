import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { PRIORITIES } from '../../constants/priorities';
import { validateNote } from '../../utils/validation';

const NoteForm = ({ note, onSubmit, onCancel, isEditing, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'MEDIUM'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        priority: note.priority || 'MEDIUM'
      });
    } else {
      setFormData({ title: '', content: '', priority: 'MEDIUM' });
    }
    setErrors({});
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    const validation = validateNote(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = await onSubmit(formData);
    
    if (result.success) {
      if (!isEditing) {
        setFormData({ title: '', content: '', priority: 'MEDIUM' });
      }
      setErrors({});
    } else {
      setErrors({ general: result.error });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200">
      <div className="space-y-6">
        {errors.general && (
          <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.general}
          </div>
        )}

        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Enter note title..."
          maxLength={100}
        />

        <TextArea
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          error={errors.content}
          placeholder="Write your note content..."
          maxLength={1000}
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          error={errors.priority}
        >
          {Object.values(PRIORITIES).map(priority => (
            <option key={priority.value} value={priority.value}>
              {priority.emoji} {priority.label}
            </option>
          ))}
        </Select>

        <div className="flex gap-3">
          <Button
            variant="primary"
            className="flex-1"
            icon={Plus}
            onClick={handleSubmit}
            loading={loading}
          >
            {isEditing ? 'Update Note' : 'Create Note'}
          </Button>
          
          {isEditing && (
            <Button
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteForm;