import React from 'react';
import type { HospitalProfile } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { Building2, MapPin, Phone, ExternalLink, Activity } from 'lucide-react';

interface HospitalCardProps {
  hospital: HospitalProfile;
  onRequestBlood?: (hospital: HospitalProfile) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onRequestBlood }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg border border-blue-100 shrink-0">
          <Building2 className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 truncate">{hospital.name}</h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Reg: {hospital.registrationNumber}</p>
          
          <p className="text-xs text-slate-600 flex items-center gap-1 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{hospital.address}, {hospital.city}</span>
          </p>

          <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700">{hospital.emergencyContact}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          Active Requests: <strong className="text-slate-800">{hospital.totalRequestsCount}</strong>
        </span>
        <div className="flex items-center gap-2">
          {hospital.website && (
            <a
              href={hospital.website}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {onRequestBlood && (
            <Button variant="danger" size="sm" onClick={() => onRequestBlood(hospital)}>
              Request Blood
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
