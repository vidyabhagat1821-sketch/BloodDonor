import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { EmergencyRequestCard } from '../../components/EmergencyRequestCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Button } from '../../components/Button';
import { requestService } from '../../services/requestService';
import type { EmergencyRequest } from '../../types';
import { PlusCircle, Activity, Filter } from 'lucide-react';

export const HospitalRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const navigate = useNavigate();

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
    if (statusFilter === 'All') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="hospital" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-6 h-6 text-red-600" /> Active Emergency Requests
              </h1>
              <p className="text-xs text-slate-500">Monitor and update all hospital blood requests and donor response statuses.</p>
            </div>

            <Button
              variant="danger"
              size="md"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={() => navigate('/hospital/request')}
            >
              New Emergency Request
            </Button>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 text-xs overflow-x-auto">
            <Filter className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
            {(['All', 'Active', 'Searching', 'Donor Found', 'Completed', 'Cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {isLoading ? (
            <LoadingSpinner label="Fetching hospital request registry..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((req) => (
                <EmergencyRequestCard
                  key={req.id}
                  request={req}
                  userRole="hospital"
                  onFindDonors={(r) => navigate('/hospital/matches', { state: { requestId: r.id } })}
                  onViewDetails={(r) => alert(`Request ${r.id} details:\nPatient: ${r.patientName}\nStatus: ${r.status}`)}
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
