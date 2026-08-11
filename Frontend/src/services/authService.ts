import type { UserRole, User } from '../types';
import { MOCK_DONORS } from '../mock/donors';
import { MOCK_HOSPITALS } from '../mock/hospitals';

const AUTH_KEY = 'blood_donor_auth_user';

export const authService = {
  getCurrentUser(): User | null {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return MOCK_DONORS[0];
  },

  setCurrentUser(user: User): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },

  async login(_identifier: string, _pass: string, role: UserRole): Promise<User> {
    await new Promise((res) => setTimeout(res, 500));
    if (role === 'donor') {
      const donor = MOCK_DONORS[0];
      this.setCurrentUser(donor);
      return donor;
    } else {
      const hospital = MOCK_HOSPITALS[0];
      this.setCurrentUser(hospital);
      return hospital;
    }
  },

  async register(userData: Partial<User> & { role: UserRole }): Promise<User> {
    await new Promise((res) => setTimeout(res, 600));
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New Registered User',
      email: userData.email || 'user@example.com',
      phone: userData.phone || '+91 99000 00000',
      role: userData.role,
    };
    this.setCurrentUser(newUser);
    return newUser;
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  switchUserRole(role: UserRole): User {
    let user: User;
    if (role === 'donor') {
      user = MOCK_DONORS[0];
    } else {
      user = MOCK_HOSPITALS[0];
    }
    this.setCurrentUser(user);
    return user;
  }
};
