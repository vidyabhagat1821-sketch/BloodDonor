import type { EmergencyRequest, DonorResponse, RequestStatus } from '../types';
import { MOCK_EMERGENCY_REQUESTS } from '../mock/requests';

let requestsStore = [...MOCK_EMERGENCY_REQUESTS];
let responsesStore: DonorResponse[] = [
  {
    id: 'resp-1',
    requestId: 'req-101',
    donorId: 'donor-1',
    donorName: 'Dr. Rajesh Sharma',
    donorPhone: '+91 98765 43210',
    donorBloodGroup: 'O-',
    status: 'Accepted',
    responseTime: '10 mins ago',
    distanceKm: 1.2,
  },
  {
    id: 'resp-2',
    requestId: 'req-101',
    donorId: 'donor-4',
    donorName: 'Sunita Menon',
    donorPhone: '+91 99887 66554',
    donorBloodGroup: 'O-',
    status: 'Accepted',
    responseTime: '25 mins ago',
    distanceKm: 4.5,
  }
];

export const requestService = {
  async getEmergencyRequests(filters?: {
    status?: RequestStatus;
    hospitalId?: string;
    bloodGroup?: string;
  }): Promise<EmergencyRequest[]> {
    await new Promise((res) => setTimeout(res, 400));
    let list = [...requestsStore];

    if (filters) {
      if (filters.status) {
        list = list.filter((r) => r.status === filters.status);
      }
      if (filters.hospitalId) {
        list = list.filter((r) => r.hospitalId === filters.hospitalId);
      }
      if (filters.bloodGroup) {
        list = list.filter((r) => r.bloodGroup === filters.bloodGroup);
      }
    }
    return list;
  },

  async getRequestById(id: string): Promise<EmergencyRequest | undefined> {
    await new Promise((res) => setTimeout(res, 300));
    return requestsStore.find((r) => r.id === id);
  },

  async createEmergencyRequest(requestData: Omit<EmergencyRequest, 'id' | 'createdAt' | 'status' | 'matchedDonorsCount' | 'acceptedDonorsCount'>): Promise<EmergencyRequest> {
    await new Promise((res) => setTimeout(res, 600));
    const newRequest: EmergencyRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      status: 'Searching',
      createdAt: new Date().toISOString(),
      matchedDonorsCount: Math.floor(Math.random() * 10) + 3,
      acceptedDonorsCount: 0,
    };
    requestsStore.unshift(newRequest);
    return newRequest;
  },

  async respondToRequest(requestId: string, donorId: string, donorName: string, donorPhone: string, donorBloodGroup: any, status: 'Accepted' | 'Declined'): Promise<DonorResponse> {
    await new Promise((res) => setTimeout(res, 500));
    const response: DonorResponse = {
      id: `resp-${Date.now()}`,
      requestId,
      donorId,
      donorName,
      donorPhone,
      donorBloodGroup,
      status,
      responseTime: 'Just now',
      distanceKm: 1.5,
    };
    responsesStore.unshift(response);

    const req = requestsStore.find((r) => r.id === requestId);
    if (req && status === 'Accepted') {
      req.acceptedDonorsCount = (req.acceptedDonorsCount || 0) + 1;
      req.status = 'Donor Found';
    }
    return response;
  },

  async getResponsesForRequest(requestId: string): Promise<DonorResponse[]> {
    await new Promise((res) => setTimeout(res, 300));
    return responsesStore.filter((resp) => resp.requestId === requestId);
  },

  async updateRequestStatus(requestId: string, status: RequestStatus): Promise<EmergencyRequest> {
    await new Promise((res) => setTimeout(res, 400));
    const idx = requestsStore.findIndex((r) => r.id === requestId);
    if (idx !== -1) {
      requestsStore[idx] = { ...requestsStore[idx], status };
      return requestsStore[idx];
    }
    throw new Error('Request not found');
  }
};
