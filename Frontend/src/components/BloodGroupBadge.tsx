import React from 'react';
import type { BloodGroup } from '../types';
import { clsx } from 'clsx';
import { Droplet } from 'lucide-react';

interface BloodGroupBadgeProps {
  bloodGroup: BloodGroup;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDrop?: boolean;
  className?: string;
}

export const BloodGroupBadge: React.FC<BloodGroupBadgeProps> = ({
  bloodGroup,
  size = 'md',
  showDrop = true,
  className,
}) => {
  const isUniversalDonor = bloodGroup === 'O-';
  const isUniversalRecipient = bloodGroup === 'AB+';

  const sizes = {
    sm: 'text-xs px-2 py-0.5 font-bold gap-1',
    md: 'text-sm px-3 py-1 font-bold gap-1.5',
    lg: 'text-base px-4 py-1.5 font-black gap-2',
    xl: 'text-2xl px-5 py-3 font-black gap-2.5 rounded-2xl',
  };

  return (
    <div className="inline-flex flex-col items-center gap-0.5">
      <span
        className={clsx(
          'inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-sm shadow-red-200 border border-red-400/30',
          sizes[size],
          className
        )}
      >
        {showDrop && <Droplet className={clsx('fill-current', size === 'sm' ? 'w-3 h-3' : size === 'xl' ? 'w-6 h-6' : 'w-4 h-4')} />}
        {bloodGroup}
      </span>
      {isUniversalDonor && size !== 'sm' && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Universal Donor</span>
      )}
      {isUniversalRecipient && size !== 'sm' && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Universal Recipient</span>
      )}
    </div>
  );
};
