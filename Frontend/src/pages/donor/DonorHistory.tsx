import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { BloodGroupBadge } from '../../components/BloodGroupBadge';
import { MOCK_DONATION_HISTORY } from '../../mock/notifications';
import { History, ShieldCheck, Download, Award } from 'lucide-react';
import { Button } from '../../components/Button';

export const DonorHistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="donor" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <History className="w-6 h-6 text-red-600" /> Donation History Log
              </h1>
              <p className="text-xs text-slate-500">Record of verified voluntary blood donations and hospital acknowledgments.</p>
            </div>

            <Button variant="outline" size="sm" leftIcon={<Award className="w-4 h-4 text-amber-500" />}>
              Download Donor Certificate
            </Button>
          </div>

          <div className="space-y-4">
            {MOCK_DONATION_HISTORY.map((hist) => (
              <Card key={hist.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <BloodGroupBadge bloodGroup={hist.bloodGroup} size="md" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{hist.hospitalName}</h3>
                    <p className="text-xs text-slate-500">{hist.hospitalLocation} • Date: <strong className="text-slate-700">{hist.donationDate}</strong></p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 justify-between">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800 block">{hist.unitsDonated} Unit Donated</span>
                    <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {hist.status}
                    </span>
                  </div>

                  <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" onClick={() => alert(`Downloading receipt for donation ${hist.id}`)} />}>
                    Receipt
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
