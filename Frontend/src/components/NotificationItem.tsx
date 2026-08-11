import React from 'react';
import type { NotificationItemType } from '../types';
import { AlertCircle, CheckCircle2, UserCheck, UserX, Bell, Trash2, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelectRequest?: (requestId: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  onSelectRequest,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'emergency':
        return <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
      case 'donor_accepted':
        return <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'donor_declined':
        return <UserX className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div
      className={clsx(
        'p-4 rounded-xl border transition-all flex items-start gap-4',
        notification.isRead
          ? 'bg-white border-slate-200/80 text-slate-700'
          : 'bg-red-50/40 border-red-200/80 shadow-xs'
      )}
    >
      <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 mt-0.5">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={clsx('text-sm font-bold', notification.isRead ? 'text-slate-800' : 'text-slate-900')}>
            {notification.title}
          </h4>
          {!notification.isRead && (
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0 animate-pulse" />
          )}
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
        
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {notification.timestamp}
          </span>
          <div className="flex items-center gap-2">
            {notification.requestId && onSelectRequest && (
              <button
                onClick={() => onSelectRequest(notification.requestId!)}
                className="text-red-600 hover:text-red-700 font-semibold text-xs hover:underline cursor-pointer"
              >
                View Request
              </button>
            )}
            {!notification.isRead && onMarkAsRead && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-slate-500 hover:text-slate-800 font-medium text-xs cursor-pointer"
              >
                Mark Read
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(notification.id)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Delete Notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
