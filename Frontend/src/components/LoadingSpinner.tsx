import React from 'react';
import { Loader2, HeartPulse } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Searching emergency network...',
  size = 'md',
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative flex items-center justify-center">
        <HeartPulse className="w-8 h-8 text-red-600 animate-pulse absolute" />
        <Loader2 className={`${sizes[size]} text-red-300 animate-spin`} />
      </div>
      {label && <p className="text-sm font-semibold text-slate-600 mt-4 animate-pulse">{label}</p>}
    </div>
  );
};
