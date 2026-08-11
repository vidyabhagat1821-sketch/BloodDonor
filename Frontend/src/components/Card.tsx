import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'flat' | 'critical';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className,
  ...props
}) => {
  const base = 'rounded-2xl p-6 transition-all duration-200';
  
  const variants = {
    default: 'bg-white border border-slate-200/80 shadow-xs hover:shadow-md',
    outline: 'bg-white border-2 border-slate-200',
    flat: 'bg-slate-50 border border-slate-100',
    critical: 'bg-rose-50/50 border border-red-200 shadow-sm shadow-red-100',
  };

  return (
    <div
      className={clsx(
        base,
        variants[variant],
        hoverEffect && 'hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
