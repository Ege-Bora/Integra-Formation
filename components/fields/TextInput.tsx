'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '@/lib/schema';

interface TextInputProps {
  name: keyof FormData;
  placeholder?: string;
  type?: 'text' | 'number';
  register: UseFormRegister<FormData>;
  error?: FieldError;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function TextInput({
  name,
  placeholder = "Type your answer here…",
  type = "text",
  register,
  error,
  onKeyDown,
}: TextInputProps) {
  return (
    <div>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="form-input"
        onKeyDown={onKeyDown}
      />
      {error && (
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      )}
    </div>
  );
}
