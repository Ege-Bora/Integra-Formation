'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '@/lib/schema';

interface MatrixCheckboxProps {
  name: keyof FormData;
  options: { key: string; label: string }[];
  values: Record<string, boolean>;
  onChange: (values: Record<string, boolean>) => void;
  register: UseFormRegister<FormData>;
  error?: any;
}

export default function MatrixCheckbox({
  name,
  options,
  values,
  onChange,
  register,
  error,
}: MatrixCheckboxProps) {
  const handleToggle = (key: string) => {
    const newValues = {
      ...values,
      [key]: !values[key],
    };
    onChange(newValues);
  };

  return (
    <div className="space-y-3">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700 mb-3">
          <div>Hizmet</div>
          <div className="text-center">Seçiniz</div>
        </div>
        
        {options.map(({ key, label }) => (
          <div key={key} className="grid grid-cols-2 gap-4 items-center py-3 border-b border-gray-200 last:border-b-0">
            <div className="text-gray-900 font-medium">{label}</div>
            <div className="flex justify-center">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={values[key] || false}
                  onChange={() => handleToggle(key)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  values[key]
                    ? 'border-primary-600 bg-primary-600' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  {values[key] && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      )}
    </div>
  );
}
