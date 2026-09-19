import { Injectable, computed, signal } from '@angular/core';
import { Customer, CustomerStatus } from '../models/customer.model';
import { SEED_CUSTOMERS } from '../data/customers';
import { loadJSON, saveJSON } from './storage.util';

const KEY = 'cc_customers';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly _customers = signal<Customer[]>(loadJSON<Customer[]>(KEY, SEED_CUSTOMERS));
  readonly customers = this._customers.asReadonly();

  readonly activeCount = computed(() => this._customers().filter((c) => c.status === 'active').length);
  readonly totalCustomers = computed(() => this._customers().length);

  private persist(list: Customer[]): void {
    saveJSON(KEY, list);
  }

  search(query: string): Customer[] {
    const q = query.trim().toLowerCase();
    if (!q) return this._customers();
    return this._customers().filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }

  setStatus(id: string, status: CustomerStatus): void {
    this._customers.update((list) => {
      const next = list.map((c) => (c.id === id ? { ...c, status } : c));
      this.persist(next);
      return next;
    });
  }

  remove(id: string): void {
    this._customers.update((list) => {
      const next = list.filter((c) => c.id !== id);
      this.persist(next);
      return next;
    });
  }
}
