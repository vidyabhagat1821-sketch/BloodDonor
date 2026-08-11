import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { authService } from '../services/authService';
import { Settings, Bell, Shield, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg('Settings saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role={currentUser?.role === 'hospital' ? 'hospital' : 'donor'} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-slate-700" /> Account Settings & Privacy
            </h1>
            <p className="text-xs text-slate-500">Manage your notification channels, security parameters, and privacy preferences.</p>
          </div>

          {savedMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {savedMsg}
            </div>
          )}

          <Card className="p-6 space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Notification Preferences */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Bell className="w-4 h-4 text-red-600" /> Emergency Notification Channels
                </h3>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Instant SMS Alerts</span>
                      <span className="text-slate-500">Receive SMS notifications on critical blood emergencies.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Email Digest & Alerts</span>
                      <span className="text-slate-500">Receive email notifications for hospital responses.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotifs}
                      onChange={(e) => setEmailNotifs(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Browser Push Notifications</span>
                      <span className="text-slate-500">Real-time desktop alerts when open in background.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushNotifs}
                      onChange={(e) => setPushNotifs(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                  </label>
                </div>
              </div>

              {/* Privacy Controls */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Shield className="w-4 h-4 text-blue-600" /> Privacy & Visibility Controls
                </h3>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Hide Phone Number from Public Search</span>
                    <span className="text-slate-500">Only verified hospital trauma desks will be able to view your phone number.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacyMode}
                    onChange={(e) => setPrivacyMode(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" size="md" type="submit">
                  Save All Preferences
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
