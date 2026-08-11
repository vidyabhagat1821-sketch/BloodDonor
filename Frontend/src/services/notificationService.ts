import type { NotificationItemType } from '../types';
import { MOCK_NOTIFICATIONS } from '../mock/notifications';

let notificationsStore = [...MOCK_NOTIFICATIONS];

export const notificationService = {
  async getNotifications(userId?: string): Promise<NotificationItemType[]> {
    await new Promise((res) => setTimeout(res, 300));
    if (userId) {
      return notificationsStore.filter((n) => n.userId === userId || n.userId === 'all');
    }
    return [...notificationsStore];
  },

  async markAsRead(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 200));
    const notif = notificationsStore.find((n) => n.id === id);
    if (notif) {
      notif.isRead = true;
    }
  },

  async markAllAsRead(userId?: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    notificationsStore = notificationsStore.map((n) => {
      if (!userId || n.userId === userId) {
        return { ...n, isRead: true };
      }
      return n;
    });
  },

  async deleteNotification(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 200));
    notificationsStore = notificationsStore.filter((n) => n.id !== id);
  }
};
