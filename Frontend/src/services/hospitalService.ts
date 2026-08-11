import type { HospitalProfile } from '../types';
import { MOCK_HOSPITALS } from '../mock/hospitals';

let hospitalStore = [...MOCK_HOSPITALS];

export const hospitalService = {
  async getHospitals(): Promise<HospitalProfile[]> {
    await new Promise((res) => setTimeout(res, 300));
    return [...hospitalStore];
  },

  async getHospitalById(id: string): Promise<HospitalProfile | undefined> {
    await new Promise((res) => setTimeout(res, 300));
    return hospitalStore.find((h) => h.id === id);
  },

  async updateHospitalProfile(id: string, updates: Partial<HospitalProfile>): Promise<HospitalProfile> {
    await new Promise((res) => setTimeout(res, 400));
    const idx = hospitalStore.findIndex((h) => h.id === id);
    if (idx !== -1) {
      hospitalStore[idx] = { ...hospitalStore[idx], ...updates };
      return hospitalStore[idx];
    }
    throw new Error('Hospital not found');
  }
};
