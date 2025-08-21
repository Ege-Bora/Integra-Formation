'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '@/lib/schema';

interface TextAreaProps {
  name: keyof FormData;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  onNext?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  name,
  placeholder = "Type your answer here…",
  register,
  error,
  onNext,
  onKeyDown,
}: TextAreaProps) {
  const field = register(name);

  return (
    <div>
      <textarea
        {...field}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px]"
        onKeyDown={onKeyDown || ((e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onNext?.();
          }
        })}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
