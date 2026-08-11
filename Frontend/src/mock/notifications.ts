import type { NotificationItemType, DonationHistoryItem } from '../types';

export const MOCK_NOTIFICATIONS: NotificationItemType[] = [
  {
    id: 'notif-1',
    userId: 'donor-1',
    type: 'emergency',
    title: 'CRITICAL BLOOD REQUEST NEARBY',
    message: 'City Care Hospital requires 3 units of O- blood within 1.2 km of your location.',
    timestamp: '10 mins ago',
    isRead: false,
    requestId: 'req-101',
  },
  {
    id: 'notif-2',
    userId: 'donor-1',
    type: 'hospital_response',
    title: 'Hospital Confirmed Donation Time',
    message: 'St. Jude Hospital has scheduled your donation window for today at 2:00 PM.',
    timestamp: '1 hour ago',
    isRead: false,
    requestId: 'req-102',
  },
  {
    id: 'notif-3',
    userId: 'donor-1',
    type: 'system',
    title: 'Donation Eligibility Updated',
    message: 'Thank you for keeping your availability status active. You are listed as an Emergency Donor.',
    timestamp: '1 day ago',
    isRead: true,
  },
  {
    id: 'notif-4',
    userId: 'hosp-1',
    type: 'donor_accepted',
    title: 'Donor Accepted Emergency Alert!',
    message: 'Dr. Rajesh Sharma (O-) has accepted your emergency blood request req-101.',
    timestamp: '15 mins ago',
    isRead: false,
    requestId: 'req-101',
  },
  {
    id: 'notif-5',
    userId: 'hosp-1',
    type: 'donor_accepted',
    title: 'Donor Accepted Emergency Alert!',
    message: 'Sunita Menon (AB-) responded to your emergency request req-104.',
    timestamp: '45 mins ago',
    isRead: true,
    requestId: 'req-104',
  }
];

export const MOCK_DONATION_HISTORY: DonationHistoryItem[] = [
  {
    id: 'hist-1',
    donorId: 'donor-1',
    hospitalName: 'City Care Hospital',
    hospitalLocation: 'Metro City',
    donationDate: '2026-03-10',
    unitsDonated: 1,
    bloodGroup: 'O-',
    status: 'Completed',
  },
  {
    id: 'hist-2',
    donorId: 'donor-1',
    hospitalName: 'St. Jude Super Specialty Hospital',
    hospitalLocation: 'Metro City',
    donationDate: '2025-11-05',
    unitsDonated: 1,
    bloodGroup: 'O-',
    status: 'Verified',
  },
  {
    id: 'hist-3',
    donorId: 'donor-1',
    hospitalName: 'Red Cross Emergency Center',
    hospitalLocation: 'Metro City',
    donationDate: '2025-07-22',
    unitsDonated: 1,
    bloodGroup: 'O-',
    status: 'Completed',
  }
];
