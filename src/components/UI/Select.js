import React from 'react';

const Select = ({ 
  label, 
  error, 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border-2 ${error ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Select;