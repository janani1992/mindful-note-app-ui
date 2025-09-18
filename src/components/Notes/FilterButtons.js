import React from 'react';
import { FILTER_OPTIONS } from '../../constants/priorities';

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
        : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
    }`}
  >
    {children}
  </button>
);

const FilterButtons = ({ currentFilter, onFilter, onSortByPriority }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {FILTER_OPTIONS.map(option => (
        <FilterButton
          key={option.value}
          active={currentFilter === option.value}
          onClick={() => onFilter(option.value)}
        >
          {option.emoji} {option.label}
        </FilterButton>
      ))}
      <FilterButton
        active={false}
        onClick={onSortByPriority}
      >
        Sort by Priority
      </FilterButton>
    </div>
  );
};

export default FilterButtons;
