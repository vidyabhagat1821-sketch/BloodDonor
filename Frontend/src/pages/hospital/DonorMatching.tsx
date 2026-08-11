import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { DonorCard } from '../../components/DonorCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Select } from '../../components/Select';
import { BloodGroupBadge } from '../../components/BloodGroupBadge';
import { donorService } from '../../services/donorService';
import { requestService } from '../../services/requestService';
import type { DonorProfile, EmergencyRequest } from '../../types';
import { Users, Filter, ArrowUpDown, ShieldCheck } from 'lucide-react';

export const DonorMatchingPage: React.FC = () => {
  const routeLocation = useLocation();
  const requestId = routeLocation.state?.requestId || 'req-101';

  const [request, setRequest] = useState<EmergencyRequest | null>(null);
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [sortBy, setSortBy] = useState<'nearest' | 'available'>('nearest');

  useEffect(() => {
    fetchMatches();
  }, [requestId]);

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const req = await requestService.getRequestById(requestId);
      setRequest(req || null);
      const bg = req?.bloodGroup || 'O-';
      const matched = await donorService.getMatchingDonorsForRequest(bg);
      setDonors(matched);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  let filtered = donors.filter((d) => {
    if (selectedBloodGroup !== 'All' && d.bloodGroup !== selectedBloodGroup) return false;
    if ((d.distanceKm || 0) > maxDistance) return false;
    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'nearest') {
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    } else {
      if (a.availability === 'Available' && b.availability !== 'Available') return -1;
      if (a.availability !== 'Available' && b.availability === 'Available') return 1;
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="hospital" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-red-600" /> Automated Donor Matching Engine
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Matching algorithms searching real-time geo-coordinates for compatible donor groups.
              </p>
            </div>

            {request && (
              <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl border border-red-100 shrink-0">
                <BloodGroupBadge bloodGroup={request.bloodGroup} size="md" />
                <div>
                  <span className="text-[10px] font-bold text-red-700 uppercase block">Required Group</span>
                  <span className="text-xs font-black text-slate-900">{request.unitsNeeded} Units ({request.urgency})</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-500 uppercase tracking-wider">
                <Filter className="w-4 h-4 text-slate-400" /> Filters:
              </span>

              <div className="w-36">
                <Select
                  options={[
                    { value: 'All', label: 'All Blood Types' },
                    { value: 'O-', label: 'O-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'A+', label: 'A+' },
                    { value: 'B+', label: 'B+' },
                  ]}
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Max Radius:</span>
                {[5, 10, 25].map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setMaxDistance(dist)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      maxDistance === dist
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dist} km
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">Sort by:</span>
              <button
                onClick={() => setSortBy('nearest')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  sortBy === 'nearest' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Nearest First
              </button>
              <button
                onClick={() => setSortBy('available')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  sortBy === 'available' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Available First
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner label="Finding suitable donors in your vicinity..." size="lg" />
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <strong>{filtered.length} compatible donors</strong> found within {maxDistance} km of hospital location.
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Real-Time Sync</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((donor) => (
                  <DonorCard
                    key={donor.id}
                    donor={donor}
                    onContact={(d) => alert(`Dispatching SMS and call notification to ${d.name} (${d.phone})`)}
                    onViewProfile={(d) => alert(`Viewing donor details for ${d.name}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};
