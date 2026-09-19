import { Injectable, computed, inject, signal } from '@angular/core';
import { ProductService } from './product.service';

/** id -> qty. Not persisted, matching the original site's in-memory cart. */
@Injectable({ providedIn: 'root' })
export class CartService {
  private products = inject(ProductService);
  private readonly _cart = signal<Record<number, number>>({});
  readonly cart = this._cart.asReadonly();

  readonly lines = computed(() => {
    const cart = this._cart();
    return Object.keys(cart)
      .map(Number)
      .filter((id) => cart[id] > 0)
      .map((id) => {
        const product = this.products.byId(id)!;
        return { product, qty: cart[id] };
      })
      .filter((line) => !!line.product);
  });

  readonly totalCount = computed(() =>
    Object.values(this._cart()).reduce((sum, qty) => sum + qty, 0)
  );

  readonly subtotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.product.price * line.qty, 0)
  );

  add(id: number): void {
    this._cart.update((cart) => ({ ...cart, [id]: (cart[id] ?? 0) + 1 }));
  }

  increment(id: number): void {
    this.add(id);
  }

  decrement(id: number): void {
    this._cart.update((cart) => {
      const next = { ...cart };
      if (!next[id]) return next;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  remove(id: number): void {
    this._cart.update((cart) => {
      const next = { ...cart };
      delete next[id];
      return next;
    });
  }

  clear(): void {
    this._cart.set({});
  }
}
