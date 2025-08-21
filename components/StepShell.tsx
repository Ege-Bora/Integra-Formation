'use client';

import { ReactNode } from 'react';

interface StepShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  canGoNext?: boolean;
  isSubmitting?: boolean;
}

export default function StepShell({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isFirstStep = false,
  isLastStep = false,
  canGoNext = true,
  isSubmitting = false,
}: StepShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Adım {currentStep}/{totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% tamamlandı</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {title}
              </h1>
              {description && (
                <p className="text-gray-600 text-lg">
                  {description}
                </p>
              )}
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {children}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={onPrevious}
                disabled={isFirstStep}
                className={`btn-secondary ${
                  isFirstStep ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Geri
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={!canGoNext || isSubmitting}
                  className={`btn-primary ${
                    !canGoNext || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!canGoNext}
                  className={`btn-primary ${
                    !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  İleri
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
