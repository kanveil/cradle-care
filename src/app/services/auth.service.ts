import { Injectable, computed, signal } from '@angular/core';
import { CurrentUser, StoredUser } from '../models/user.model';
import { loadJSON, saveJSON } from './storage.util';

const USER_KEY = 'cc_user';
const CURRENT_KEY = 'cc_current_user';

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _current = signal<CurrentUser | null>(loadJSON<CurrentUser | null>(CURRENT_KEY, null));
  readonly current = this._current.asReadonly();
  readonly isLoggedIn = computed(() => !!this._current() && !!this.getStoredUser());

  getStoredUser(): StoredUser | null {
    return loadJSON<StoredUser | null>(USER_KEY, null);
  }

  async signup(name: string, email: string, password: string): Promise<{ ok: boolean; message?: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const stored = this.getStoredUser();
    if (stored && stored.email === normalizedEmail) {
      return { ok: false, message: 'An account with that email already exists.' };
    }
    const passwordHash = await hashPassword(password);
    const user: StoredUser = { name: name.trim(), email: normalizedEmail, passwordHash, phone: '', zip: '', address: '', billing: '' };
    saveJSON(USER_KEY, user);
    const current: CurrentUser = { name: user.name, email: user.email };
    this._current.set(current);
    saveJSON(CURRENT_KEY, current);
    return { ok: true };
  }

  async login(email: string, password: string): Promise<{ ok: boolean; message?: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const stored = this.getStoredUser();
    const passwordHash = await hashPassword(password);
    if (!stored || stored.email !== normalizedEmail || stored.passwordHash !== passwordHash) {
      return { ok: false, message: 'Email or password is incorrect.' };
    }
    const current: CurrentUser = { name: stored.name, email: stored.email };
    this._current.set(current);
    saveJSON(CURRENT_KEY, current);
    return { ok: true };
  }

  logout(): void {
    this._current.set(null);
    localStorage.removeItem(CURRENT_KEY);
  }

  updateProfile(patch: Partial<Pick<StoredUser, 'name' | 'phone' | 'zip' | 'address' | 'billing'>>): void {
    const user = this.getStoredUser();
    if (!user) return;
    const updated: StoredUser = { ...user, ...patch, name: patch.name?.trim() || user.name };
    saveJSON(USER_KEY, updated);
    const current: CurrentUser = { name: updated.name, email: updated.email };
    this._current.set(current);
    saveJSON(CURRENT_KEY, current);
  }
}
