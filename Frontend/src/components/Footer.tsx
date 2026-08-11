import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, PhoneCall, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/50">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Blood<span className="text-red-500">Donor</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time emergency blood donor matching system connecting critical hospital requests with nearby verified voluntary blood donors.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-900/50">
              <ShieldCheck className="w-4 h-4" /> ISO 27001 Certified Healthcare Portal
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Home Page</Link></li>
              <li><a href="/#how-it-works" className="hover:text-red-400 transition-colors">How BloodDonor Works</a></li>
              <li><Link to="/donor/dashboard" className="hover:text-red-400 transition-colors">Donor Portal</Link></li>
              <li><Link to="/hospital/dashboard" className="hover:text-red-400 transition-colors">Hospital Portal</Link></li>
              <li><Link to="/hospital/request" className="hover:text-red-400 transition-colors">Post Emergency Request</Link></li>
            </ul>
          </div>

          {/* Blood Compatibility Matrix Quick Guide */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-4">Compatibility Guide</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><strong className="text-red-400">O- Negative:</strong> Universal Donor (Gives to All)</li>
              <li><strong className="text-blue-400">AB+ Positive:</strong> Universal Recipient (Receives All)</li>
              <li><strong className="text-slate-300">A+ / B+:</strong> Common Compatible Donor Groups</li>
              <li><strong className="text-slate-300">Platelets & Plasma:</strong> Emergency Red Cell Transfusions</li>
            </ul>
          </div>

          {/* Emergency Support */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 mb-4">Emergency Hotline</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-bold bg-red-950/40 p-3 rounded-xl border border-red-900/50">
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span>1800-DONOR-HELP (24x7)</span>
              </div>
              <p className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-slate-500" /> emergency@blooddonor.org
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" /> Central Medical Logistics Tower, Metro City
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BloodDonor Emergency Matching System. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Hospital Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
