import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { authService } from '../../services/authService';
import type { BloodGroup, UserRole } from '../../types';
import { HeartPulse, Lock, Mail, User, Phone, MapPin, Heart, ShieldCheck, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('donor');
  
  // Donor Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [city, setCity] = useState('Metro City');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState<'Available' | 'Unavailable' | 'Recently Donated'>('Available');
  const [isEmergencyDonor, setIsEmergencyDonor] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Hospital Form Fields
  const [hospitalRegNo, setHospitalRegNo] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (!agreedTerms) {
      setError('You must accept the terms & conditions to proceed.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.register({
        name: fullName,
        email,
        phone,
        role,
      });
      setSuccessMsg('Registration successful! Redirecting to your portal...');
      setTimeout(() => {
        if (role === 'donor') {
          navigate('/donor/dashboard');
        } else {
          navigate('/hospital/dashboard');
        }
      }, 800);
    } catch (err: any) {
      setError('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O- (Universal Donor)' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-md shadow-red-200">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create Account</h1>
            <p className="text-xs text-slate-500 font-medium">
              Join the emergency blood matching network today
            </p>
          </div>

          {/* Role Toggle */}
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
              <Heart className="w-4 h-4" /> Register as Donor
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
              <Building2 className="w-4 h-4" /> Register as Hospital
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={role === 'donor' ? 'Full Name' : 'Hospital Name'}
                  placeholder={role === 'donor' ? 'Dr. Rajesh Sharma' : 'City Care Hospital'}
                  leftIcon={<User className="w-4 h-4" />}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  leftIcon={<Phone className="w-4 h-4" />}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                {role === 'donor' ? (
                  <Select
                    label="Blood Group"
                    options={bloodGroupOptions}
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  />
                ) : (
                  <Input
                    label="Hospital Reg. Number"
                    placeholder="HOSP-2026-XXXX"
                    leftIcon={<ShieldCheck className="w-4 h-4" />}
                    value={hospitalRegNo}
                    onChange={(e) => setHospitalRegNo(e.target.value)}
                    required
                  />
                )}
              </div>

              {role === 'donor' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Gender"
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' },
                    ]}
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                  />

                  <Input
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />

                  <Select
                    label="Availability Status"
                    options={[
                      { value: 'Available', label: 'Available to Donate' },
                      { value: 'Recently Donated', label: 'Recently Donated' },
                      { value: 'Unavailable', label: 'Unavailable' },
                    ]}
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City / Location"
                  placeholder="Metro City"
                  leftIcon={<MapPin className="w-4 h-4" />}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

                <Input
                  label={role === 'donor' ? 'Address / Locality' : 'Emergency Contact Line'}
                  placeholder={role === 'donor' ? 'Sector 17, Main Avenue' : '+91 98111 00999'}
                  leftIcon={role === 'donor' ? <MapPin className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  value={role === 'donor' ? address : emergencyContact}
                  onChange={(e) => (role === 'donor' ? setAddress(e.target.value) : setEmergencyContact(e.target.value))}
                  required
                />
              </div>

              {role === 'donor' && (
                <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <HeartPulse className="w-4 h-4 text-red-600" /> Emergency Donor Network
                    </h4>
                    <p className="text-[11px] text-slate-500">Allow instant alerts during critical O- and rare group requests</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEmergencyDonor}
                    onChange={(e) => setIsEmergencyDonor(e.target.checked)}
                    className="w-5 h-5 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  isPassword
                  placeholder="Minimum 6 characters"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Input
                  label="Confirm Password"
                  isPassword
                  placeholder="Re-enter password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 font-medium cursor-pointer">
                  I agree to the <a href="#" className="text-red-600 underline">Terms of Service</a> & <a href="#" className="text-red-600 underline">Medical Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                variant={role === 'donor' ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Complete Registration
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already registered?{' '}
              <Link to="/login" className="text-red-600 font-bold hover:underline">
                Sign In to Your Account
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
