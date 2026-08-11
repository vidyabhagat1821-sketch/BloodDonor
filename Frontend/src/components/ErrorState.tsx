import React from 'react';
import { Button } from './Button';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message = 'Failed to load emergency data. Please check your network connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-rose-50/50 rounded-2xl border border-rose-200">
      <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3 border border-rose-200">
        <AlertOctagon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-rose-950">{title}</h3>
      <p className="text-xs text-rose-700 max-w-sm mt-1 mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5" />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
