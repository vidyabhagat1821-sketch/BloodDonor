import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { NotificationItem } from '../../components/NotificationItem';
import { Button } from '../../components/Button';
import { notificationService } from '../../services/notificationService';
import { authService } from '../../services/authService';
import type { NotificationItemType } from '../../types';
import { Bell, CheckCheck } from 'lucide-react';

export const DonorNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItemType[]>([]);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadNotifs();
  }, []);

  const loadNotifs = async () => {
    const data = await notificationService.getNotifications(currentUser?.id);
    setNotifications(data);
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead(currentUser?.id);
    loadNotifs();
  };

  const handleDelete = async (id: string) => {
    await notificationService.deleteNotification(id);
    loadNotifs();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar role="donor" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <Bell className="w-6 h-6 text-red-600" /> Notifications Center
              </h1>
              <p className="text-xs text-slate-500">Real-time alerts regarding emergency blood requests and hospital updates.</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<CheckCheck className="w-4 h-4 text-emerald-600" />}
                onClick={handleMarkAllRead}
              >
                Mark All as Read
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                You have no active notifications.
              </div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onMarkAsRead={async (id) => {
                    await notificationService.markAsRead(id);
                    loadNotifs();
                  }}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
