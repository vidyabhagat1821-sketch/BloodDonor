import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authService } from '../../services/authService';
import { Building2, Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';

export const HospitalProfilePage: React.FC = () => {
  const currentHospital = authService.getCurrentUser();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg('Hospital details updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="hospital" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Hospital Profile & Registration</h1>
            <p className="text-xs text-slate-500">Official medical institute details, registration credentials, and trauma hotline numbers.</p>
          </div>

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {successMsg}
            </div>
          )}

          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-2xl border border-blue-200 shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {currentHospital?.name || 'City Care Hospital & Research Centre'}
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </h2>
                <p className="text-xs text-slate-500 font-mono">Reg No: HOSP-2024-9921 • Verified Trauma Center</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Hospital Credentials</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Hospital Name"
                  defaultValue={currentHospital?.name || 'City Care Hospital & Research Centre'}
                  leftIcon={<Building2 className="w-4 h-4" />}
                />
                <Input
                  label="Registration Number"
                  defaultValue="HOSP-2024-9921"
                  leftIcon={<ShieldCheck className="w-4 h-4" />}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Emergency Contact Hotline"
                  defaultValue="+91 98111 00999"
                  leftIcon={<Phone className="w-4 h-4" />}
                />
                <Input
                  label="Official Email"
                  defaultValue={currentHospital?.email || 'emergency@citycare.org'}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Address / Location"
                  defaultValue="102 Healthcare Avenue, Medical Enclave"
                  leftIcon={<MapPin className="w-4 h-4" />}
                />
                <Input
                  label="Website URL"
                  defaultValue="https://citycare.org"
                  leftIcon={<Globe className="w-4 h-4" />}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="danger" size="md" type="submit" isLoading={isSaving}>
                  Update Hospital Info
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
