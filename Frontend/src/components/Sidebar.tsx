import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  AlertCircle,
  Bell,
  History,
  Settings,
  LogOut,
  PlusCircle,
  Users,
  MapPin,
  Building2,
  HeartPulse,
} from 'lucide-react';
import { authService } from '../services/authService';
import { clsx } from 'clsx';

interface SidebarProps {
  role?: 'donor' | 'hospital';
}

export const Sidebar: React.FC<SidebarProps> = ({ role = 'donor' }) => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const donorLinks = [
    { to: '/donor/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/donor/profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
    { to: '/donor/requests', label: 'Emergency Requests', icon: <AlertCircle className="w-4 h-4" /> },
    { to: '/donor/notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { to: '/donor/history', label: 'Donation History', icon: <History className="w-4 h-4" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const hospitalLinks = [
    { to: '/hospital/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/hospital/request', label: 'Create Request', icon: <PlusCircle className="w-4 h-4 text-red-500" /> },
    { to: '/hospital/requests', label: 'Active Requests', icon: <AlertCircle className="w-4 h-4" /> },
    { to: '/hospital/matches', label: 'Donor Matches', icon: <Users className="w-4 h-4" /> },
    { to: '/hospital/map', label: 'Map Radar', icon: <MapPin className="w-4 h-4" /> },
    { to: '/hospital/notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { to: '/hospital/profile', label: 'Hospital Profile', icon: <Building2 className="w-4 h-4" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const links = role === 'donor' ? donorLinks : hospitalLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800">
      {/* Profile Header Widget */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-900/50">
          {currentUser?.name.charAt(0) || (role === 'donor' ? 'D' : 'H')}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-white truncate">{currentUser?.name || 'User Profile'}</h4>
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-red-400 border border-slate-700 mt-0.5">
            {role === 'donor' ? <HeartPulse className="w-3 h-3 text-red-500" /> : <Building2 className="w-3 h-3 text-blue-400" />}
            {role === 'donor' ? 'Registered Donor' : 'Verified Hospital'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all',
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              )
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Quick Role Toggle & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Account</span>
        </button>
      </div>
    </aside>
  );
};
