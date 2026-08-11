import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { BloodGroupBadge } from '../../components/BloodGroupBadge';
import { AvailabilityBadge } from '../../components/Badge';
import { authService } from '../../services/authService';
import { donorService } from '../../services/donorService';
import { User, Phone, Mail, MapPin, HeartPulse, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DonorProfilePage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [availability, setAvailability] = useState<'Available' | 'Unavailable' | 'Recently Donated'>(
    (currentUser as any)?.availability || 'Available'
  );
  const [isEmergencyDonor, setIsEmergencyDonor] = useState((currentUser as any)?.isEmergencyDonor ?? true);
  const [lastDonationDate, setLastDonationDate] = useState((currentUser as any)?.lastDonationDate || '2026-03-10');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (currentUser?.id) {
        await donorService.updateProfile(currentUser.id, {
          availability,
          isEmergencyDonor,
          lastDonationDate,
        });
      }
      setSuccessMsg('Profile settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      alert('Failed to save profile updates.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="donor" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Donor Profile</h1>
            <p className="text-xs text-slate-500">Manage your personal medical information, blood type, and emergency availability.</p>
          </div>

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {successMsg}
            </div>
          )}

          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-full bg-red-600 text-white font-black text-3xl flex items-center justify-center border-4 border-red-100 shadow-md">
                {currentUser?.name.charAt(0) || 'D'}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {currentUser?.name || 'Dr. Rajesh Sharma'}
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </h2>
                <p className="text-xs text-slate-500 font-mono">Donor ID: {currentUser?.id || 'donor-1'}</p>
                <div className="flex items-center gap-2 pt-1">
                  <BloodGroupBadge bloodGroup={(currentUser as any)?.bloodGroup || 'O-'} size="sm" />
                  <AvailabilityBadge availability={availability} size="sm" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Medical & Availability Settings</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Availability Status"
                  options={[
                    { value: 'Available', label: 'Available to Donate' },
                    { value: 'Recently Donated', label: 'Recently Donated (3 Months Pause)' },
                    { value: 'Unavailable', label: 'Currently Unavailable' },
                  ]}
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                />

                <Input
                  label="Last Donation Date"
                  type="date"
                  value={lastDonationDate}
                  onChange={(e) => setLastDonationDate(e.target.value)}
                />
              </div>

              <div className="p-4 bg-red-50/60 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-red-600" /> Emergency Donor Network Alert Toggle
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Receive high-priority SMS and push alerts when ICU patients within 15 km need urgent O- blood.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isEmergencyDonor}
                  onChange={(e) => setIsEmergencyDonor(e.target.checked)}
                  className="w-5 h-5 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                />
              </div>

              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 pt-4">Personal & Contact Info</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  defaultValue={currentUser?.name || 'Dr. Rajesh Sharma'}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Email"
                  defaultValue={currentUser?.email || 'rajesh.sharma@example.com'}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
                <Input
                  label="Phone Number"
                  defaultValue={currentUser?.phone || '+91 98765 43210'}
                  leftIcon={<Phone className="w-4 h-4" />}
                />
                <Input
                  label="City / Location"
                  defaultValue="Metro City"
                  leftIcon={<MapPin className="w-4 h-4" />}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" size="md" type="submit" isLoading={isSaving}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>
        </main>
      </div>

      <Footer />
    </div>
  );
};
