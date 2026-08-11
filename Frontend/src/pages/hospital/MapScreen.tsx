import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { MapPanel } from '../../components/MapPanel';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { donorService } from '../../services/donorService';
import { authService } from '../../services/authService';
import type { DonorProfile } from '../../types';
import { MapPin } from 'lucide-react';

export const MapScreenPage: React.FC = () => {
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentHospital = authService.getCurrentUser();

  useEffect(() => {
    loadMapDonors();
  }, []);

  const loadMapDonors = async () => {
    setIsLoading(true);
    try {
      const data = await donorService.getDonors({ maxDistanceKm: 25 });
      setDonors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="hospital" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-600" /> Geographic Donor Radar
              </h1>
              <p className="text-xs text-slate-500">Real-time geospatial tracking of voluntary blood donors surrounding hospital trauma centers.</p>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner label="Initializing geospatial radar map canvas..." size="lg" />
          ) : (
            <MapPanel
              hospitalName={currentHospital?.name || 'City Care Hospital & Research Centre'}
              donors={donors}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};
