import React from 'react';
import type { EmergencyRequest } from '../types';
import { Card } from './Card';
import { BloodGroupBadge } from './BloodGroupBadge';
import { UrgencyBadge, StatusBadge } from './Badge';
import { Button } from './Button';
import { MapPin, Phone, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface EmergencyRequestCardProps {
  request: EmergencyRequest;
  distanceKm?: number;
  userRole?: 'donor' | 'hospital' | 'admin';
  onAccept?: (req: EmergencyRequest) => void;
  onDecline?: (req: EmergencyRequest) => void;
  onViewDetails?: (req: EmergencyRequest) => void;
  onFindDonors?: (req: EmergencyRequest) => void;
}

export const EmergencyRequestCard: React.FC<EmergencyRequestCardProps> = ({
  request,
  distanceKm = 1.8,
  userRole = 'donor',
  onAccept,
  onDecline,
  onViewDetails,
  onFindDonors,
}) => {
  const isCritical = request.urgency === 'Critical';

  return (
    <Card
      variant={isCritical ? 'critical' : 'default'}
      className={clsx('relative overflow-hidden transition-all', isCritical && 'ring-1 ring-red-300')}
    >
      {/* Top Banner Accent */}
      <div
        className={clsx(
          'absolute top-0 left-0 right-0 h-1.5',
          request.urgency === 'Critical' ? 'bg-red-600 animate-pulse' : request.urgency === 'Urgent' ? 'bg-amber-500' : 'bg-emerald-500'
        )}
      />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <UrgencyBadge urgency={request.urgency} size="sm" />
            <StatusBadge status={request.status} size="sm" />
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {request.unitsNeeded} {request.unitsNeeded === 1 ? 'Unit' : 'Units'} Needed
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            {request.hospitalName}
          </h3>

          <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>{request.hospitalAddress}</span>
            <span className="font-bold text-red-600 ml-1">({distanceKm} km away)</span>
          </p>

          <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Contact: {request.hospitalContact}</span>
          </p>

          {request.additionalInfo && (
            <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="italic">{request.additionalInfo}</p>
            </div>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Required By: {new Date(request.requiredBy).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span>Matched: <strong>{request.matchedDonorsCount || 0} Donors</strong></span>
          </div>
        </div>

        {/* Right Blood Group Badge */}
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-red-50/60 border border-red-100 shrink-0">
          <span className="text-[10px] uppercase font-bold text-red-700 mb-1">Blood Group</span>
          <BloodGroupBadge bloodGroup={request.bloodGroup} size="lg" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">
          Req ID: <strong className="font-mono text-slate-600">{request.id}</strong>
        </span>

        <div className="flex items-center gap-2">
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={() => onViewDetails(request)}>
              View Details
            </Button>
          )}

          {userRole === 'donor' && (
            <>
              {onDecline && (
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<XCircle className="w-3.5 h-3.5 text-slate-400" />}
                  onClick={() => onDecline(request)}
                >
                  Decline
                </Button>
              )}
              {onAccept && (
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  onClick={() => onAccept(request)}
                >
                  Accept & Help
                </Button>
              )}
            </>
          )}

          {userRole === 'hospital' && onFindDonors && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onFindDonors(request)}
            >
              Find Matching Donors
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
