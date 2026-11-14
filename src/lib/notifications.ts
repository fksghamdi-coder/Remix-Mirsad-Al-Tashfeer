// src/lib/notifications.ts
import { SyncEngine } from './syncEngine';
// نظام إشعارات التطبيق والإنذارات الأمنية

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  broadcast?: boolean;
  timestamp: number;
  expiresAt?: number;
  read?: boolean;
}

const NOTIFICATIONS_KEY = 'mirsad_notifications_v1';

export function getNotifications(): AppNotification[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    const list: AppNotification[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    return list.filter((n) => !n.expiresAt || n.expiresAt > now);
  } catch {
    return [];
  }
}

export function saveNotifications(notifications: AppNotification[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch (err) {
    console.warn('Failed to save notifications', err);
  }
}

export function createNotification(
  input: Omit<AppNotification, 'id' | 'timestamp'>
): AppNotification {
  const notif: AppNotification = {
    ...input,
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    read: false,
  };

  const list = getNotifications();
  list.unshift(notif);
  saveNotifications(list.slice(0, 100));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mirsad-notification', { detail: notif }));
  }

  return notif;
}

export function markAsRead(id: string): void {
  const list = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  saveNotifications(list);
}

export function clearNotifications(): void {
  saveNotifications([]);
}
