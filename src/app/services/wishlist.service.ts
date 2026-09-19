import { Injectable, computed, inject, signal } from '@angular/core';
import { ProductService } from './product.service';
import { loadJSON, saveJSON } from './storage.util';

const KEY = 'cc_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private products = inject(ProductService);
  private readonly _ids = signal<number[]>(loadJSON<number[]>(KEY, []));
  readonly ids = this._ids.asReadonly();

  readonly products$ = computed(() =>
    this._ids()
      .map((id) => this.products.byId(id))
      .filter((p): p is NonNullable<typeof p> => !!p)
  );

  readonly count = computed(() => this._ids().length);

  has(id: number): boolean {
    return this._ids().includes(id);
  }

  toggle(id: number): boolean {
    const exists = this.has(id);
    this._ids.update((ids) => (exists ? ids.filter((x) => x !== id) : [...ids, id]));
    saveJSON(KEY, this._ids());
    return !exists; // true if it was just added
  }

  remove(id: number): void {
    this._ids.update((ids) => ids.filter((x) => x !== id));
    saveJSON(KEY, this._ids());
  }
}
