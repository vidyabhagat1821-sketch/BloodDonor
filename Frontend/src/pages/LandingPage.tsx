import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { BloodGroupBadge } from '../components/BloodGroupBadge';
import { BLOOD_COMPATIBILITY_MATRIX } from '../mock/donors';
import {
  HeartPulse,
  Search,
  MapPin,
  CheckCircle2,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import type { BloodGroup } from '../types';

export const LandingPage: React.FC = () => {
  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/80 via-white to-slate-50 pt-12 pb-20 lg:py-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-400/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="w-4 h-4 animate-pulse text-red-600" />
                <span>Next-Gen Emergency Blood Matching</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Find Blood. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-600">
                  Save Lives.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                When emergencies strike, seconds matter. BloodDonor instantly connects hospital ICUs with verified nearby donors using automated blood group compatibility and geo-radar tracking.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/hospital/request" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-red-200" leftIcon={<Search className="w-5 h-5" />}>
                    Find a Donor Now
                  </Button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<UserCheck className="w-5 h-5 text-red-600" />}>
                    Become a Voluntary Donor
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500 border-t border-slate-200/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free & Voluntary
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Hospitals
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Geo Radar
                </span>
              </div>
            </div>

            {/* Right Visual Graphic Card */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Live Emergency Radar</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Response: &lt; 3 mins</span>
                </div>

                <div className="space-y-4">
                  {/* Mock Radar Card 1 */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BloodGroupBadge bloodGroup="O-" size="md" />
                      <div>
                        <h4 className="text-xs font-bold text-white">City Care Hospital ICU</h4>
                        <p className="text-[11px] text-slate-400">Req: 3 Units • Critical</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                      4 Donors Matched
                    </span>
                  </div>

                  {/* Mock Radar Card 2 */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BloodGroupBadge bloodGroup="A+" size="md" />
                      <div>
                        <h4 className="text-xs font-bold text-white">St. Jude Emergency</h4>
                        <p className="text-[11px] text-slate-400">Req: 2 Units • Urgent</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800">
                      8 Donors Matched
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500" /> Radius: 10.0 km
                  </span>
                  <Link to="/hospital/map" className="text-red-400 font-bold hover:underline flex items-center gap-1">
                    Open Radar View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <h3 className="text-3xl sm:text-4xl font-black text-red-600">12,450+</h3>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Verified Donors</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">450+</h3>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Partner Hospitals</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl sm:text-4xl font-black text-red-600">8,920</h3>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Lives Saved</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">&lt; 15 mins</h3>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Avg Match Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How BloodDonor Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-600">Simplified 4-Step Process</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How BloodDonor Works</h2>
            <p className="text-sm text-slate-600 font-medium">
              Designed for speed, efficiency and reliability in critical medical emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 font-black text-xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-xs">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Hospital Posts Request</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hospital emergency desk inputs patient blood group, required units, and urgency level.
              </p>
            </Card>

            <Card className="text-center p-6 relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 font-black text-xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Automated Geo Matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Algorithm identifies compatible donors within a custom radius based on distance & availability.
              </p>
            </Card>

            <Card className="text-center p-6 relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 font-black text-xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Instant Alert Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Push notifications and SMS alerts are triggered to nearby registered emergency donors.
              </p>
            </Card>

            <Card className="text-center p-6 relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 font-black text-xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-xs">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Donor Responds & Donates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Donors accept request in one tap, get directions to hospital, and complete blood donation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Blood Group Compatibility Overview Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-600">Medical Standards</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Blood Group Compatibility Matrix</h2>
            <p className="text-sm text-slate-600 font-medium">
              Understand which blood types can be safely donated and received during urgent transfusions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">Blood Group</th>
                  <th className="p-4 font-bold">Can Give Blood To</th>
                  <th className="p-4 font-bold">Can Receive Blood From</th>
                  <th className="p-4 font-bold text-center">Status Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {bloodGroups.map((bg) => {
                  const comp = BLOOD_COMPATIBILITY_MATRIX[bg];
                  return (
                    <tr key={bg} className="hover:bg-red-50/40 transition-colors">
                      <td className="p-4 font-black text-slate-900">
                        <BloodGroupBadge bloodGroup={bg} size="sm" />
                      </td>
                      <td className="p-4 text-slate-700">
                        <div className="flex flex-wrap gap-1">
                          {comp.giveTo.map((g) => (
                            <span key={g} className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-800">
                              {g}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-slate-700">
                        <div className="flex flex-wrap gap-1">
                          {comp.receiveFrom.map((r) => (
                            <span key={r} className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-800">
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {bg === 'O-' ? (
                          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-extrabold text-[10px]">
                            UNIVERSAL DONOR
                          </span>
                        ) : bg === 'AB+' ? (
                          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[10px]">
                            UNIVERSAL RECIPIENT
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                            COMPATIBLE
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Emergency Call-To-Action Banner */}
      <section className="py-16 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl font-black">Are You a Medical Representative or Hospital?</h2>
            <p className="text-red-100 text-sm font-medium">
              Create an urgent request in under 60 seconds and notify dozens of nearby compatible donors immediately.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/hospital/request">
              <Button variant="secondary" size="lg">
                Create Emergency Request
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
