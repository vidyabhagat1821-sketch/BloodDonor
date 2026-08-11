import React, { useState } from 'react';
import type { DonorProfile, Location } from '../types';
import { BloodGroupBadge } from './BloodGroupBadge';
import { AvailabilityBadge } from './Badge';
import { Button } from './Button';
import { MapPin, Navigation, Compass, Layers, Phone, HeartPulse, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

interface MapPanelProps {
  hospitalName?: string;
  hospitalLocation?: Location;
  donors: DonorProfile[];
  onSelectDonor?: (donor: DonorProfile) => void;
  selectedDonorId?: string;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  hospitalName = 'City Care Hospital & Research Centre',
  hospitalLocation: _hospitalLocation = { address: '102 Healthcare Avenue', city: 'Metro City', lat: 28.6150, lng: 77.2100 },
  donors,
  onSelectDonor,
  selectedDonorId,
}) => {
  const [activeDonor, setActiveDonor] = useState<DonorProfile | null>(
    donors.find((d) => d.id === selectedDonorId) || donors[0] || null
  );
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [selectedDistanceFilter, setSelectedDistanceFilter] = useState<number>(10);

  const filteredDonors = donors.filter((d) => (d.distanceKm || 0) <= selectedDistanceFilter);

  const handleDonorClick = (donor: DonorProfile) => {
    setActiveDonor(donor);
    if (onSelectDonor) onSelectDonor(donor);
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[650px] relative">
      {/* Interactive Mock Map Canvas */}
      <div className="flex-1 relative bg-slate-950 overflow-hidden flex flex-col justify-between p-4">
        {/* Map Grid Pattern background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#ef4444 1px, #0f172a 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        {/* Dynamic Distance Radius Rings around Hospital */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[200px] h-[200px] rounded-full border border-red-500/20 bg-red-500/5 animate-pulse" />
          <div className="w-[380px] h-[380px] rounded-full border border-red-500/10 absolute" />
          <div className="w-[550px] h-[550px] rounded-full border border-slate-700/20 absolute" />
        </div>

        {/* Map Top Bar Controls */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-red-500 animate-spin" style={{ animationDuration: '10s' }} />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Geographic Donor Radar</h4>
              <p className="text-[11px] text-slate-400">Centred at: {hospitalName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium hidden sm:inline">Layer:</span>
            {(['streets', 'satellite', 'terrain'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setMapLayer(layer)}
                className={clsx(
                  'px-2.5 py-1 rounded-lg capitalize font-semibold transition-all cursor-pointer',
                  mapLayer === layer ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                )}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* Map Center & Marker Plot Canvas */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-4">
          {/* Hospital Center Marker Pin */}
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/50 border-4 border-white beacon-effect z-20">
              <Navigation className="w-6 h-6 fill-current" />
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap shadow-lg">
              🏥 {hospitalName}
            </div>
          </div>

          {/* Render Donor Location Nodes relative to hospital center */}
          {filteredDonors.map((donor, idx) => {
            const isSelected = activeDonor?.id === donor.id;
            // Calculate mock coordinates offset around center
            const angle = (idx * (360 / Math.max(1, filteredDonors.length))) * (Math.PI / 180);
            const distRadius = Math.min(220, (donor.distanceKm || 2) * 28 + 50);
            const posX = Math.cos(angle) * distRadius;
            const posY = Math.sin(angle) * distRadius;

            return (
              <div
                key={donor.id}
                style={{ transform: `translate(${posX}px, ${posY}px)` }}
                onClick={() => handleDonorClick(donor)}
                className={clsx(
                  'absolute cursor-pointer transition-all duration-300 group z-10',
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                )}
              >
                {/* Connecting Line to Hospital */}
                <svg
                  className="absolute pointer-events-none overflow-visible"
                  style={{ top: 0, left: 0, width: '1px', height: '1px' }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={-posX}
                    y2={-posY}
                    stroke={isSelected ? '#ef4444' : '#475569'}
                    strokeWidth={isSelected ? '2' : '1'}
                    strokeDasharray={isSelected ? 'none' : '4 4'}
                  />
                </svg>

                {/* Donor Pin */}
                <div
                  className={clsx(
                    'w-9 h-9 rounded-full font-black text-xs flex items-center justify-center shadow-lg border-2 transition-all',
                    isSelected
                      ? 'bg-red-500 text-white border-white ring-4 ring-red-500/40'
                      : 'bg-slate-800 text-red-400 border-red-500 hover:bg-red-600 hover:text-white'
                  )}
                >
                  {donor.bloodGroup}
                </div>

                {/* Tooltip on hover/select */}
                <div
                  className={clsx(
                    'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[11px] p-2 rounded-xl border border-slate-700 whitespace-nowrap shadow-xl flex items-center gap-2 pointer-events-none transition-all',
                    isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  )}
                >
                  <span className="font-bold text-red-400">{donor.name}</span>
                  <span className="text-slate-400">({donor.distanceKm} km)</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Bottom Legend & Filter Bar */}
        <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-600 inline-block" /> Hospital Location
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-800 border border-red-500 inline-block" /> Donor Location
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-red-500 inline-block" /> Proximity Vector
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Radius Filter:</span>
            {[5, 10, 25].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDistanceFilter(dist)}
                className={clsx(
                  'px-2.5 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer',
                  selectedDistanceFilter === dist ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                )}
              >
                {dist} km
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel showing Donor List */}
      <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-500" />
              Nearby Compatible Donors
            </h3>
            <p className="text-xs text-slate-400">
              Showing <span className="text-red-400 font-bold">{filteredDonors.length}</span> donors within {selectedDistanceFilter} km
            </p>
          </div>
        </div>

        {/* Scrollable Donor List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredDonors.map((donor) => {
            const isSelected = activeDonor?.id === donor.id;
            return (
              <div
                key={donor.id}
                onClick={() => handleDonorClick(donor)}
                className={clsx(
                  'p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3',
                  isSelected
                    ? 'bg-slate-800 border-red-500/60 shadow-lg ring-1 ring-red-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BloodGroupBadge bloodGroup={donor.bloodGroup} size="sm" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {donor.name}
                      {donor.isEmergencyDonor && <HeartPulse className="w-3 h-3 text-red-500" />}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{donor.location.address}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-red-400 block">{donor.distanceKm} km</span>
                  <AvailabilityBadge availability={donor.availability} size="sm" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Donor Details Action Box */}
        {activeDonor && (
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">Selected Donor</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Match
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white">{activeDonor.name}</h4>
                <p className="text-xs text-slate-400">{activeDonor.phone}</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Phone className="w-3.5 h-3.5" />}
                onClick={() => alert(`Initiating direct call to ${activeDonor.name} (${activeDonor.phone})`)}
              >
                Call Donor
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
