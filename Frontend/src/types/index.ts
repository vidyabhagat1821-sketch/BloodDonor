export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserRole = 'donor' | 'hospital' | 'admin';

export type UrgencyLevel = 'Critical' | 'Urgent' | 'Normal';

export type RequestStatus = 'Active' | 'Searching' | 'Donor Found' | 'Completed' | 'Cancelled';

export type AvailabilityStatus = 'Available' | 'Unavailable' | 'Recently Donated';

export interface Location {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface DonorProfile extends User {
  role: 'donor';
  bloodGroup: BloodGroup;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  location: Location;
  lastDonationDate?: string;
  availability: AvailabilityStatus;
  isEmergencyDonor: boolean;
  totalDonationsCount: number;
  distanceKm?: number;
}

export interface HospitalProfile extends User {
  role: 'hospital';
  registrationNumber: string;
  address: string;
  city: string;
  location: Location;
  emergencyContact: string;
  website?: string;
  totalRequestsCount: number;
}

export interface EmergencyRequest {
  id: string;
  patientId: string;
  patientName?: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  urgency: UrgencyLevel;
  requiredBy: string; // ISO date/time string
  hospitalId: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalContact: string;
  hospitalLocation: Location;
  additionalInfo?: string;
  status: RequestStatus;
  createdAt: string;
  matchedDonorsCount?: number;
  acceptedDonorsCount?: number;
}

export interface DonorResponse {
  id: string;
  requestId: string;
  donorId: string;
  donorName: string;
  donorPhone: string;
  donorBloodGroup: BloodGroup;
  status: 'Accepted' | 'Declined' | 'Pending' | 'Completed';
  responseTime: string;
  distanceKm: number;
}

export interface NotificationItemType {
  id: string;
  userId: string;
  type: 'emergency' | 'donor_accepted' | 'donor_declined' | 'hospital_response' | 'completed' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  requestId?: string;
}

export interface DonationHistoryItem {
  id: string;
  donorId: string;
  hospitalName: string;
  hospitalLocation: string;
  donationDate: string;
  unitsDonated: number;
  bloodGroup: BloodGroup;
  status: 'Completed' | 'Verified';
}

export interface BloodCompatibility {
  giveTo: BloodGroup[];
  receiveFrom: BloodGroup[];
}
