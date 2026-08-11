import type { DonorProfile, BloodGroup } from '../types';
import { MOCK_DONORS, BLOOD_COMPATIBILITY_MATRIX } from '../mock/donors';

let donorsStore = [...MOCK_DONORS];

export const donorService = {
  async getDonors(filters?: {
    bloodGroup?: BloodGroup;
    availability?: string;
    maxDistanceKm?: number;
    emergencyOnly?: boolean;
  }): Promise<DonorProfile[]> {
    await new Promise((res) => setTimeout(res, 400));
    let list = [...donorsStore];

    if (filters) {
      if (filters.bloodGroup) {
        list = list.filter((d) => d.bloodGroup === filters.bloodGroup);
      }
      if (filters.availability && filters.availability !== 'All') {
        list = list.filter((d) => d.availability === filters.availability);
      }
      if (filters.maxDistanceKm) {
        list = list.filter((d) => (d.distanceKm || 0) <= filters.maxDistanceKm!);
      }
      if (filters.emergencyOnly) {
        list = list.filter((d) => d.isEmergencyDonor);
      }
    }
    return list;
  },

  async getDonorById(id: string): Promise<DonorProfile | undefined> {
    await new Promise((res) => setTimeout(res, 300));
    return donorsStore.find((d) => d.id === id);
  },

  async getMatchingDonorsForRequest(requiredBloodGroup: BloodGroup): Promise<DonorProfile[]> {
    await new Promise((res) => setTimeout(res, 700));
    const compatibleGroups = Object.entries(BLOOD_COMPATIBILITY_MATRIX)
      .filter(([_, comp]) => comp.giveTo.includes(requiredBloodGroup))
      .map(([group]) => group as BloodGroup);

    return donorsStore.filter((d) => compatibleGroups.includes(d.bloodGroup));
  },

  async updateAvailability(donorId: string, availability: 'Available' | 'Unavailable' | 'Recently Donated'): Promise<DonorProfile> {
    await new Promise((res) => setTimeout(res, 400));
    const idx = donorsStore.findIndex((d) => d.id === donorId);
    if (idx !== -1) {
      donorsStore[idx] = { ...donorsStore[idx], availability };
      return donorsStore[idx];
    }
    throw new Error('Donor not found');
  },

  async updateProfile(donorId: string, updates: Partial<DonorProfile>): Promise<DonorProfile> {
    await new Promise((res) => setTimeout(res, 500));
    const idx = donorsStore.findIndex((d) => d.id === donorId);
    if (idx !== -1) {
      donorsStore[idx] = { ...donorsStore[idx], ...updates };
      return donorsStore[idx];
    }
    throw new Error('Donor not found');
  }
};
