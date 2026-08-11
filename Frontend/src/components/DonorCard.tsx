import React from 'react';
import type { DonorProfile } from '../types';
import { Card } from './Card';
import { BloodGroupBadge } from './BloodGroupBadge';
import { AvailabilityBadge } from './Badge';
import { Button } from './Button';
import { MapPin, Phone, Calendar, ShieldCheck, HeartPulse } from 'lucide-react';

interface DonorCardProps {
  donor: DonorProfile;
  onContact?: (donor: DonorProfile) => void;
  onViewProfile?: (donor: DonorProfile) => void;
}

export const DonorCard: React.FC<DonorCardProps> = ({
  donor,
  onContact,
  onViewProfile,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
      {donor.isEmergencyDonor && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1">
          <HeartPulse className="w-3 h-3 animate-pulse" /> Emergency Ready
        </div>
      )}

      <div className="flex items-start gap-4">
        {donor.avatarUrl ? (
          <img
            src={donor.avatarUrl}
            alt={donor.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-red-100 shadow-xs"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 font-extrabold flex items-center justify-center text-xl border border-red-200">
            {donor.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 truncate">{donor.name}</h3>
            <span title="Verified Donor">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            </span>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{donor.location.address}, {donor.location.city}</span>
            {donor.distanceKm && (
              <span className="ml-1 font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[11px]">
                {donor.distanceKm} km away
              </span>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <AvailabilityBadge availability={donor.availability} size="sm" />
            <span className="text-[11px] text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
              <Calendar className="w-3 h-3 text-slate-400" />
              Last: {donor.lastDonationDate || 'N/A'}
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center justify-center">
          <BloodGroupBadge bloodGroup={donor.bloodGroup} size="lg" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500">
          Total Donations: <strong className="text-slate-800">{donor.totalDonationsCount}</strong>
        </span>
        <div className="flex items-center gap-2">
          {onViewProfile && (
            <Button variant="outline" size="sm" onClick={() => onViewProfile(donor)}>
              Profile
            </Button>
          )}
          {onContact && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Phone className="w-3.5 h-3.5" />}
              onClick={() => onContact(donor)}
            >
              Contact
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
