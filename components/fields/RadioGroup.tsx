'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '@/lib/schema';

interface RadioGroupProps {
  name: keyof FormData;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  register: UseFormRegister<FormData>;
  error?: FieldError;
}

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
  register,
  error,
}: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option}
          className={`radio-option ${value === option ? 'selected' : ''}`}
        >
          <input
            type="radio"
            {...register(name)}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              value === option 
                ? 'border-[rgb(4,20,37)] bg-[rgb(4,20,37)]' 
                : 'border-gray-300'
            }`}>
              {value === option && (
                <div className="w-2 h-2 rounded-full bg-white" />
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
