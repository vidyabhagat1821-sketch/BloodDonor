import React from 'react';
import { clsx } from 'clsx';
import type { UrgencyLevel, RequestStatus, AvailabilityStatus } from '../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'critical' | 'urgent' | 'normal' | 'success' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  pulse = false,
  className,
}) => {
  const base = 'inline-flex items-center gap-1.5 font-semibold rounded-full uppercase tracking-wider';

  const variants = {
    critical: 'bg-red-100 text-red-800 border border-red-200',
    urgent: 'bg-amber-100 text-amber-900 border border-amber-200',
    normal: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={clsx(base, variants[variant], sizes[size], className)}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};

export const UrgencyBadge: React.FC<{ urgency: UrgencyLevel; size?: 'sm' | 'md' }> = ({ urgency, size = 'md' }) => {
  if (urgency === 'Critical') {
    return <Badge variant="critical" size={size} pulse>CRITICAL EMERGENCY</Badge>;
  }
  if (urgency === 'Urgent') {
    return <Badge variant="urgent" size={size}>URGENT</Badge>;
  }
  return <Badge variant="normal" size={size}>NORMAL</Badge>;
};

export const StatusBadge: React.FC<{ status: RequestStatus; size?: 'sm' | 'md' }> = ({ status, size = 'md' }) => {
  switch (status) {
    case 'Active':
      return <Badge variant="critical" size={size} pulse>Active</Badge>;
    case 'Searching':
      return <Badge variant="warning" size={size} pulse>Searching Donors</Badge>;
    case 'Donor Found':
      return <Badge variant="info" size={size}>Donor Found</Badge>;
    case 'Completed':
      return <Badge variant="success" size={size}>Completed</Badge>;
    case 'Cancelled':
      return <Badge variant="neutral" size={size}>Cancelled</Badge>;
    default:
      return <Badge variant="neutral" size={size}>{status}</Badge>;
  }
};

export const AvailabilityBadge: React.FC<{ availability: AvailabilityStatus; size?: 'sm' | 'md' }> = ({ availability, size = 'md' }) => {
  switch (availability) {
    case 'Available':
      return <Badge variant="success" size={size}>Available to Donate</Badge>;
    case 'Recently Donated':
      return <Badge variant="warning" size={size}>Recently Donated</Badge>;
    case 'Unavailable':
      return <Badge variant="neutral" size={size}>Unavailable</Badge>;
    default:
      return <Badge variant="neutral" size={size}>{availability}</Badge>;
  }
};
