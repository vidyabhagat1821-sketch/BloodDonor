import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { BloodGroupBadge } from '../../components/BloodGroupBadge';
import { requestService } from '../../services/requestService';
import { authService } from '../../services/authService';
import type { BloodGroup, UrgencyLevel } from '../../types';
import {
  AlertCircle,
  PlusCircle,
  User,
  Building2,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { clsx } from 'clsx';

export const CreateEmergencyRequestPage: React.FC = () => {
  const currentHospital = authService.getCurrentUser();

  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState(`PAT-${Math.floor(1000 + Math.random() * 9000)}`);
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [unitsNeeded, setUnitsNeeded] = useState<number>(2);
  const [urgency, setUrgency] = useState<UrgencyLevel>('Critical');
  const [requiredBy, setRequiredBy] = useState<string>(
    new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );
  const [hospitalName, setHospitalName] = useState(currentHospital?.name || 'City Care Hospital & Research Centre');
  const [hospitalAddress, setHospitalAddress] = useState('102 Healthcare Avenue, Medical Enclave');
  const [contactNumber, setContactNumber] = useState(currentHospital?.phone || '+91 98111 00999');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [createdReqId, setCreatedReqId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newReq = await requestService.createEmergencyRequest({
        patientId,
        patientName,
        bloodGroup,
        unitsNeeded,
        urgency,
        requiredBy: new Date(requiredBy).toISOString(),
        hospitalId: currentHospital?.id || 'hosp-1',
        hospitalName,
        hospitalAddress,
        hospitalContact: contactNumber,
        hospitalLocation: {
          address: hospitalAddress,
          city: 'Metro City',
          lat: 28.6150,
          lng: 77.2100,
        },
        additionalInfo,
      });

      setCreatedReqId(newReq.id);
      setShowConfirmationModal(true);
    } catch (err) {
      alert('Failed to submit emergency request.');
    } finally {
      setIsLoading(false);
    }
  };

  const bloodGroupOptions = [
    { value: 'O-', label: 'O- (Universal Negative - Highest Demand)' },
    { value: 'O+', label: 'O+' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="hospital" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-red-600" /> Create Emergency Blood Request
              </h1>
              <p className="text-xs text-slate-500">
                Broadcast an urgent blood request to all compatible donors within geo proximity.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Urgency Selector Card */}
            <Card className="p-6 border-red-200 bg-white">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Select Urgency Level
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['Critical', 'Urgent', 'Normal'] as const).map((level) => {
                  const isSelected = urgency === level;
                  return (
                    <div
                      key={level}
                      onClick={() => setUrgency(level)}
                      className={clsx(
                        'p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center',
                        isSelected
                          ? level === 'Critical'
                            ? 'border-red-600 bg-red-50 text-red-900 shadow-md ring-2 ring-red-500/20'
                            : level === 'Urgent'
                            ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                            : 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      )}
                    >
                      {level === 'Critical' && <AlertTriangle className="w-6 h-6 text-red-600 mb-1 animate-pulse" />}
                      <span className="font-extrabold text-sm uppercase">{level}</span>
                      <span className="text-[11px] text-slate-500 mt-1">
                        {level === 'Critical'
                          ? 'Immediate (ICU / Surgery)'
                          : level === 'Urgent'
                          ? 'Needed within 6 hours'
                          : 'Needed within 24 hours'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Patient & Medical Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Patient Name"
                  placeholder="e.g. Karan Sharma"
                  leftIcon={<User className="w-4 h-4" />}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />

                <Input
                  label="Patient ID / Hospital File No."
                  placeholder="PAT-8819"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Blood Group Required"
                  options={bloodGroupOptions}
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                />

                <Input
                  label="Units Required"
                  type="number"
                  min="1"
                  max="10"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(parseInt(e.target.value) || 1)}
                  required
                />

                <Input
                  label="Required By Date & Time"
                  type="datetime-local"
                  value={requiredBy}
                  onChange={(e) => setRequiredBy(e.target.value)}
                  required
                />
              </div>

              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 pt-4">
                Hospital Location & Contact Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Hospital Name"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  leftIcon={<Building2 className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Emergency Contact Phone"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4" />}
                  required
                />
              </div>

              <Input
                label="Hospital Address / Trauma Wing"
                value={hospitalAddress}
                onChange={(e) => setHospitalAddress(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Additional Medical Instructions
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  placeholder="e.g. Emergency surgery scheduled in Trauma Ward 4. Universal negative donor preferred."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button variant="outline" type="button" onClick={() => navigate('/hospital/dashboard')}>
                  Cancel
                </Button>
                <Button variant="danger" type="submit" size="lg" isLoading={isLoading} leftIcon={<AlertCircle className="w-4 h-4" />}>
                  Dispatch Emergency Alert Now
                </Button>
              </div>
            </Card>
          </form>
        </main>
      </div>

      {/* Submission Confirmation Modal */}
      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Emergency Request Dispatched!"
        size="md"
        footer={
          <div className="flex items-center gap-2 w-full justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmationModal(false);
                navigate('/hospital/dashboard');
              }}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setShowConfirmationModal(false);
                navigate('/hospital/matches', { state: { requestId: createdReqId } });
              }}
            >
              View Donor Matches
            </Button>
          </div>
        }
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-50">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Broadcasting Emergency Alert</h3>
            <p className="text-xs text-slate-500 mt-1">
              Request ID <strong className="font-mono text-slate-800">{createdReqId}</strong> has been created. Alerts sent to compatible <BloodGroupBadge bloodGroup={bloodGroup} size="sm" /> donors within 10 km.
            </p>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};
