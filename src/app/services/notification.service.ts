import { Injectable, computed, signal } from '@angular/core';
import { AppNotification } from '../models/order.model';
import { loadJSON, saveJSON } from './storage.util';

const KEY = 'cc_notifications';

const STARTER: AppNotification[] = [
  { id: 'welcome', title: 'Welcome to Cradle & Care', text: 'Save your favorite baby essentials and keep your account details ready for checkout.', time: 'Just now', read: false },
  { id: 'shipping', title: 'Free shipping reminder', text: 'Orders over $50 ship free within 24 hours.', time: 'Today', read: false },
  { id: 'promo', title: '10% off your first order', text: 'Subscribe to restock alerts in the newsletter section to receive your welcome offer.', time: 'Today', read: false },
];

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications = signal<AppNotification[]>(this.initial());
  readonly notifications = this._notifications.asReadonly();

  readonly unreadCount = computed(() => this._notifications().filter((n) => !n.read).length);

  private initial(): AppNotification[] {
    const stored = loadJSON<AppNotification[]>(KEY, []);
    if (stored.length) return stored;
    saveJSON(KEY, STARTER);
    return STARTER;
  }

  add(title: string, text: string, unread = true): void {
    this._notifications.update((list) => {
      const next = [{ id: 'n-' + Date.now(), title, text, time: 'Just now', read: !unread }, ...list].slice(0, 20);
      saveJSON(KEY, next);
      return next;
    });
  }

  markRead(id: string): void {
    this._notifications.update((list) => {
      const next = list.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveJSON(KEY, next);
      return next;
    });
  }

  markAllRead(): void {
    this._notifications.update((list) => {
      const next = list.map((n) => ({ ...n, read: true }));
      saveJSON(KEY, next);
      return next;
    });
  }
}
