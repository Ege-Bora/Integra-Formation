'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '@/lib/schema';

interface CheckboxListProps {
  name: keyof FormData;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  register: UseFormRegister<FormData>;
  error?: any;
}

export default function CheckboxList({
  name,
  options,
  values,
  onChange,
  register,
  error,
}: CheckboxListProps) {
  const handleToggle = (option: string) => {
    const newValues = values.includes(option)
      ? values.filter(v => v !== option)
      : [...values, option];
    onChange(newValues);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option}
          className={`checkbox-option ${values.includes(option) ? 'selected' : ''}`}
        >
          <input
            type="checkbox"
            checked={values.includes(option)}
            onChange={() => handleToggle(option)}
            className="sr-only"
          />
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
              values.includes(option)
                ? 'border-[rgb(4,20,37)] bg-[rgb(4,20,37)]' 
                : 'border-gray-300'
            }`}>
              {values.includes(option) && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-gray-900 font-medium">{option}</span>
          </div>
        </label>
      ))}
      {error && (
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      )}
    </div>
  );
}
