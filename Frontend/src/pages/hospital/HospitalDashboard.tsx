import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { DashboardCard } from '../../components/DashboardCard';
import { EmergencyRequestCard } from '../../components/EmergencyRequestCard';
import { DonorCard } from '../../components/DonorCard';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { requestService } from '../../services/requestService';
import { donorService } from '../../services/donorService';
import { authService } from '../../services/authService';
import type { EmergencyRequest, DonorProfile, HospitalProfile } from '../../types';
import {
  PlusCircle,
  Users,
  AlertCircle,
  CheckCircle2,
  Activity,
  MapPin,
} from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const [hospitalStore] = useState<HospitalProfile | null>(authService.getCurrentUser() as any);
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [nearbyDonors, setNearbyDonors] = useState<DonorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadHospitalDashboard();
  }, []);

  const loadHospitalDashboard = async () => {
    setIsLoading(true);
    try {
      const reqs = await requestService.getEmergencyRequests();
      const donors = await donorService.getDonors({ maxDistanceKm: 10 });
      setRequests(reqs);
      setNearbyDonors(donors);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const activeCount = requests.filter((r) => r.status === 'Active' || r.status === 'Searching').length;
  const matchedCount = requests.reduce((sum, r) => sum + (r.matchedDonorsCount || 0), 0);
  const responsesCount = requests.reduce((sum, r) => sum + (r.acceptedDonorsCount || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner label="Loading hospital trauma center console..." size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="hospital" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {hospitalStore?.name || 'City Care Hospital & Research Centre'}
                </h1>
                <span className="bg-blue-50 text-blue-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200">
                  Verified Hospital
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {hospitalStore?.address || '102 Healthcare Avenue, Medical Enclave'} • Emergency Desk: {hospitalStore?.emergencyContact || '+91 98111 00999'}
              </p>
            </div>

            <Link to="/hospital/request">
              <Button variant="danger" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Create Emergency Request
              </Button>
            </Link>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Active Requests"
              value={activeCount}
              subtitle="Live ICU blood requirements"
              icon={<AlertCircle className="w-6 h-6 text-red-600" />}
              color="red"
            />
            <DashboardCard
              title="Donors Matched"
              value={matchedCount}
              subtitle="Compatible within 10 km"
              icon={<Users className="w-6 h-6 text-blue-600" />}
              color="blue"
            />
            <DashboardCard
              title="Responses Received"
              value={responsesCount}
              subtitle="Accepted & en route"
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              color="emerald"
            />
            <DashboardCard
              title="Requests Completed"
              value="24"
              subtitle="Successful transfusions"
              icon={<Activity className="w-6 h-6 text-slate-700" />}
              color="slate"
            />
          </div>

          {/* Active Emergency Requests Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" /> Active Emergency Blood Requests
                </h2>
                <p className="text-xs text-slate-500">Track real-time donor responses and matching updates.</p>
              </div>
              <Link to="/hospital/requests" className="text-xs font-bold text-red-600 hover:underline">
                View All Requests →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((req) => (
                <EmergencyRequestCard
                  key={req.id}
                  request={req}
                  userRole="hospital"
                  onFindDonors={(r) => navigate('/hospital/matches', { state: { requestId: r.id } })}
                  onViewDetails={(r) => alert(`Request ID: ${r.id}\nPatient: ${r.patientName}\nUnits: ${r.unitsNeeded}\nUrgency: ${r.urgency}`)}
                />
              ))}
            </div>
          </div>

          {/* Nearby Available Donors Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> Nearby Standby Donors (Radar)
                </h2>
                <p className="text-xs text-slate-500">Voluntary donors ready for instant alert dispatch within 10 km.</p>
              </div>
              <Link to="/hospital/map" className="text-xs font-bold text-blue-600 hover:underline">
                Open Map Visualizer →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyDonors.slice(0, 3).map((donor) => (
                <DonorCard
                  key={donor.id}
                  donor={donor}
                  onContact={(d) => alert(`Contacting ${d.name} at ${d.phone}`)}
                  onViewProfile={(d) => alert(`Viewing donor profile of ${d.name}`)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
