import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

import { DonorDashboard } from './pages/donor/DonorDashboard';
import { DonorProfilePage } from './pages/donor/DonorProfile';
import { DonorRequestsPage } from './pages/donor/DonorRequests';
import { DonorNotificationsPage } from './pages/donor/DonorNotifications';
import { DonorHistoryPage } from './pages/donor/DonorHistory';

import { HospitalDashboard } from './pages/hospital/HospitalDashboard';
import { CreateEmergencyRequestPage } from './pages/hospital/CreateEmergencyRequest';
import { HospitalRequestsPage } from './pages/hospital/HospitalRequests';
import { DonorMatchingPage } from './pages/hospital/DonorMatching';
import { MapScreenPage } from './pages/hospital/MapScreen';
import { HospitalNotificationsPage } from './pages/hospital/HospitalNotifications';
import { HospitalProfilePage } from './pages/hospital/HospitalProfile';

import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Donor Routes */}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/profile" element={<DonorProfilePage />} />
        <Route path="/donor/requests" element={<DonorRequestsPage />} />
        <Route path="/donor/notifications" element={<DonorNotificationsPage />} />
        <Route path="/donor/history" element={<DonorHistoryPage />} />

        {/* Hospital Routes */}
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/hospital/request" element={<CreateEmergencyRequestPage />} />
        <Route path="/hospital/requests" element={<HospitalRequestsPage />} />
        <Route path="/hospital/matches" element={<DonorMatchingPage />} />
        <Route path="/hospital/map" element={<MapScreenPage />} />
        <Route path="/hospital/notifications" element={<HospitalNotificationsPage />} />
        <Route path="/hospital/profile" element={<HospitalProfilePage />} />

        {/* Settings Route */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
