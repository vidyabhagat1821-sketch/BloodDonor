import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { EmergencyRequestCard } from '../../components/EmergencyRequestCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { requestService } from '../../services/requestService';
import type { EmergencyRequest } from '../../types';
import { AlertCircle, Filter } from 'lucide-react';

export const DonorRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const data = await requestService.getEmergencyRequests();
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = requests.filter((r) => {
    if (urgencyFilter === 'All') return true;
    return r.urgency === urgencyFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="donor" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" /> Emergency Blood Requests
              </h1>
              <p className="text-xs text-slate-500">Live requests from nearby hospitals requiring urgent voluntary blood donations.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 text-xs">
              <Filter className="w-4 h-4 text-slate-400 ml-2" />
              {(['All', 'Critical', 'Urgent', 'Normal'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setUrgencyFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    urgencyFilter === lvl
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner label="Fetching nearby emergency requests..." />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No Emergency Requests"
              description="There are currently no active requests matching your selected urgency filter."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((req, idx) => (
                <EmergencyRequestCard
                  key={req.id}
                  request={req}
                  distanceKm={(idx + 1) * 1.6}
                  userRole="donor"
                  onAccept={(r) => alert(`Request ${r.id} accepted! Hospital contact details: ${r.hospitalContact}`)}
                  onDecline={(r) => setRequests(requests.filter((item) => item.id !== r.id))}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};
