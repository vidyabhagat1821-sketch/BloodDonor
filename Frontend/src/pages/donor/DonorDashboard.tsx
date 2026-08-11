import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { DashboardCard } from '../../components/DashboardCard';
import { EmergencyRequestCard } from '../../components/EmergencyRequestCard';
import { NotificationItem } from '../../components/NotificationItem';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { BloodGroupBadge } from '../../components/BloodGroupBadge';
import { AvailabilityBadge } from '../../components/Badge';
import { requestService } from '../../services/requestService';
import { notificationService } from '../../services/notificationService';
import { authService } from '../../services/authService';
import type { EmergencyRequest, NotificationItemType, DonorProfile } from '../../types';
import { MOCK_DONATION_HISTORY } from '../../mock/notifications';
import {
  Droplet,
  CheckCircle2,
  AlertCircle,
  History,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const [user] = useState<DonorProfile | null>(authService.getCurrentUser() as any);
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptedRequests, setAcceptedRequests] = useState<string[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const reqList = await requestService.getEmergencyRequests();
      const notifList = await notificationService.getNotifications(user?.id);
      setRequests(reqList);
      setNotifications(notifList);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (req: EmergencyRequest) => {
    if (!user) return;
    try {
      await requestService.respondToRequest(
        req.id,
        user.id,
        user.name,
        user.phone,
        user.bloodGroup,
        'Accepted'
      );
      setAcceptedRequests([...acceptedRequests, req.id]);
      alert(`Thank you ${user.name}! Your acceptance has been dispatched to ${req.hospitalName}. They will contact you shortly.`);
      loadDashboardData();
    } catch (e) {
      alert('Error responding to request.');
    }
  };

  const handleDeclineRequest = (req: EmergencyRequest) => {
    setRequests(requests.filter((r) => r.id !== req.id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner label="Loading your donor dashboard..." size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="donor" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
          {/* Welcome Header & Availability Quick Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Welcome back, {user?.name || 'Dr. Rajesh Sharma'}!
                </h1>
                <span title="Verified Donor">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Your voluntary donation helps save lives in critical hospital emergencies.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-red-50/60 p-3 rounded-xl border border-red-100 shrink-0">
              <BloodGroupBadge bloodGroup={user?.bloodGroup || 'O-'} size="md" />
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Current Status</span>
                <AvailabilityBadge availability={user?.availability || 'Available'} size="sm" />
              </div>
            </div>
          </div>

          {/* Profile Completion Bar */}
          <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HeartPulse className="w-8 h-8 text-white shrink-0 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold">Donor Profile Completion: 92%</h4>
                <p className="text-xs text-red-100">Keep your last donation date updated to stay active in geo-matching.</p>
              </div>
            </div>
            <div className="w-32 bg-red-950/40 h-3 rounded-full overflow-hidden border border-red-400/40 hidden sm:block">
              <div className="bg-white h-full w-[92%] rounded-full" />
            </div>
          </div>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="My Blood Group"
              value={user?.bloodGroup || 'O-'}
              subtitle="Universal Donor"
              icon={<Droplet className="w-6 h-6 text-red-600" />}
              color="red"
            />
            <DashboardCard
              title="Availability Status"
              value={user?.availability || 'Available'}
              subtitle="Emergency Ready"
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              color="emerald"
            />
            <DashboardCard
              title="Emergency Alerts"
              value={requests.length}
              subtitle="Nearby hospital requests"
              icon={<AlertCircle className="w-6 h-6 text-amber-600" />}
              color="amber"
            />
            <DashboardCard
              title="Total Donations"
              value={user?.totalDonationsCount || 12}
              subtitle="Completed & Verified"
              icon={<History className="w-6 h-6 text-blue-600" />}
              color="blue"
            />
          </div>

          {/* Current & Nearby Emergency Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" /> Current Emergency Requests
                </h2>
                <p className="text-xs text-slate-500">
                  Critical requests within 10 km that require your blood group
                </p>
              </div>
              <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                {requests.length} Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((req, idx) => (
                <EmergencyRequestCard
                  key={req.id}
                  request={req}
                  distanceKm={(idx + 1) * 1.4}
                  userRole="donor"
                  onAccept={handleAcceptRequest}
                  onDecline={handleDeclineRequest}
                  onViewDetails={(r) => alert(`Emergency Details for Request ${r.id}:\n\nHospital: ${r.hospitalName}\nUnits Required: ${r.unitsNeeded}\nUrgency: ${r.urgency}\nPatient Info: ${r.patientName || 'Emergency Patient'}\nNotes: ${r.additionalInfo}`)}
                />
              ))}
            </div>
          </div>

          {/* Recent Notifications & History Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Notifications */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    notification={notif}
                    onMarkAsRead={(id) => {
                      notificationService.markAsRead(id);
                      loadDashboardData();
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Donation History Snapshot */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Recent Donation History</h3>
              <div className="bg-white rounded-2xl border border-slate-200 p-4 divide-y divide-slate-100">
                {MOCK_DONATION_HISTORY.map((hist) => (
                  <div key={hist.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900">{hist.hospitalName}</h4>
                      <p className="text-slate-500">{hist.donationDate} • {hist.unitsDonated} Unit ({hist.bloodGroup})</p>
                    </div>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {hist.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
