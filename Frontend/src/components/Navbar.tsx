import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, PhoneCall, ShieldAlert, LogOut, User as UserIcon, Building2 } from 'lucide-react';
import { Button } from './Button';
import { authService } from '../services/authService';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleSwitch = (role: 'donor' | 'hospital') => {
    authService.switchUserRole(role);
    if (role === 'donor') {
      navigate('/donor/dashboard');
    } else {
      navigate('/hospital/dashboard');
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Emergency Top Banner */}
      <div className="bg-red-600 text-white text-[11px] font-bold py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 container mx-auto">
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>24/7 National Emergency Blood Helpline: <strong>1800-DONOR-HELP (1800-366-674)</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="opacity-80">Role Demo:</span>
          <button
            onClick={() => handleRoleSwitch('donor')}
            className={`hover:underline cursor-pointer ${currentUser?.role === 'donor' ? 'font-black underline' : ''}`}
          >
            Donor View
          </button>
          <span>|</span>
          <button
            onClick={() => handleRoleSwitch('hospital')}
            className={`hover:underline cursor-pointer ${currentUser?.role === 'hospital' ? 'font-black underline' : ''}`}
          >
            Hospital View
          </button>
        </div>
      </div>

      <nav className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tight flex items-center">
              Blood<span className="text-red-600">Donor</span>
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold -mt-1">
              Emergency Match
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className={`hover:text-red-600 transition-colors ${location.pathname === '/' ? 'text-red-600 font-bold' : ''}`}>
            Home
          </Link>
          <a href="/#how-it-works" className="hover:text-red-600 transition-colors">
            How It Works
          </a>
          <Link to="/donor/dashboard" className="hover:text-red-600 transition-colors flex items-center gap-1">
            <UserIcon className="w-3.5 h-3.5 text-slate-400" /> For Donors
          </Link>
          <Link to="/hospital/dashboard" className="hover:text-red-600 transition-colors flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" /> For Hospitals
          </Link>
          <Link to="/hospital/request" className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" /> Emergency Help
          </Link>
        </div>

        {/* Right Auth / Profile Button */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                to={currentUser.role === 'donor' ? '/donor/dashboard' : '/hospital/dashboard'}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold text-slate-800"
              >
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black">
                  {currentUser.name.charAt(0)}
                </div>
                <span>{currentUser.name}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-3.5 h-3.5" />}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-medium text-slate-700 text-sm">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 py-1">
              Home
            </Link>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 py-1">
              How It Works
            </a>
            <Link to="/donor/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 py-1">
              For Donors Dashboard
            </Link>
            <Link to="/hospital/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600 py-1">
              For Hospitals Dashboard
            </Link>
            <Link to="/hospital/request" onClick={() => setMobileMenuOpen(false)} className="text-red-600 font-bold py-1">
              Create Emergency Request
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <p className="text-xs text-slate-400 font-bold uppercase">Quick Role Switcher</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleRoleSwitch('donor')}>
                Switch to Donor
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleRoleSwitch('hospital')}>
                Switch to Hospital
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                Logout ({currentUser.name})
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
