import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { authService } from '../../services/authService';
import type { UserRole } from '../../types';
import { HeartPulse, Lock, Mail, UserCheck, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('donor');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!identifier || !password) {
      setError('Please enter your email/phone and password.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.login(identifier, password, role);
      setSuccessMsg('Login successful! Redirecting to your dashboard...');
      setTimeout(() => {
        if (role === 'donor') {
          navigate('/donor/dashboard');
        } else {
          navigate('/hospital/dashboard');
        }
      }, 700);
    } catch (err: any) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-md shadow-red-200">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Welcome Back</h1>
            <p className="text-xs text-slate-500 font-medium">
              Access your emergency blood donor or hospital portal
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="flex bg-slate-200/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('donor')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'donor'
                  ? 'bg-white text-red-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" /> Donor Portal
            </button>
            <button
              type="button"
              onClick={() => setRole('hospital')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'hospital'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" /> Hospital Portal
            </button>
          </div>

          <Card className="p-6 sm:p-8 shadow-xl">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email or Phone Number"
                type="text"
                placeholder={role === 'donor' ? 'e.g. rajesh@example.com or +91 98765 43210' : 'e.g. emergency@citycare.org'}
                leftIcon={<Mail className="w-4 h-4" />}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />

              <Input
                label="Password"
                isPassword
                placeholder="Enter your password"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs font-medium">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to demo email!'); }} className="text-red-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                variant={role === 'donor' ? 'primary' : 'secondary'}
                size="lg"
                className="w-full mt-2"
                isLoading={isLoading}
              >
                Sign In to {role === 'donor' ? 'Donor Portal' : 'Hospital Portal'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-red-600 font-bold hover:underline">
                Register as {role === 'donor' ? 'a Donor' : 'a Hospital'}
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
